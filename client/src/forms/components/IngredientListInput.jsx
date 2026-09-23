import React, { useEffect, useRef, useState } from "react";
import { func, string, array, bool } from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const THEME_COLOR = "#d06b6b";

const emptyRow = () => ({ name: "", quantity: null });

// Older recipes still carry a separate numeric quantity. Fold it into the
// free-text line so it stays visible instead of silently disappearing now
// that the UI only edits a single combined field.
const foldLegacyQuantity = (item) =>
  item.quantity !== null && item.quantity !== undefined
    ? { name: `${item.quantity} ${item.name}`.trim(), quantity: null }
    : item;

const IngredientListInput = ({ name, label, value, onChange, error, required }) => {
  const [items, setItems] = useState(() =>
    value && value.length ? value.map(foldLegacyQuantity) : [emptyRow()]
  );
  const lastEmitted = useRef(value);
  const inputRefs = useRef([]);
  const pendingFocus = useRef(null); // { index, cursor? } - where to move the caret after a row split

  if (value !== lastEmitted.current) {
    lastEmitted.current = value;
    const nextItems = value && value.length ? value.map(foldLegacyQuantity) : [emptyRow()];
    if (JSON.stringify(nextItems) !== JSON.stringify(items)) {
      setItems(nextItems);
    }
  }

  useEffect(() => {
    if (!pendingFocus.current) return;
    const { index, cursor } = pendingFocus.current;
    pendingFocus.current = null;
    const el = inputRefs.current[index];
    if (!el) return;
    el.focus();
    const pos = cursor === undefined ? el.value.length : cursor;
    try {
      el.setSelectionRange(pos, pos);
    } catch (e) {
      // some input types don't support setSelectionRange - ignore
    }
  }, [items]);

  const emitChange = (nextItems, focus) => {
    lastEmitted.current = nextItems;
    setItems(nextItems);
    onChange({ target: { name, value: nextItems } });
    if (focus) pendingFocus.current = focus;
  };

  const handleNameChange = (index, newName) => {
    const next = [...items];
    next[index] = { ...next[index], name: newName, quantity: null };
    emitChange(next);
  };

  const hasContent = items.some((item) => item?.name?.trim());

  const handleAdd = () => {
    const next = [...items, emptyRow()];
    emitChange(next, { index: next.length - 1, cursor: 0 });
  };

  const handleRemove = (index) => {
    if (items.length === 1) return;
    emitChange(items.filter((_, i) => i !== index));
  };

  // Enter splits the line at the caret into two ingredient rows, so typing a
  // list and pressing Enter after each one behaves like a plain-text list.
  const handleKeyDown = (e, index) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const el = e.target;
    const pos = el.selectionStart ?? el.value.length;
    const before = el.value.slice(0, pos);
    const after = el.value.slice(pos).replace(/^\s+/, "");
    const next = [...items];
    next[index] = { ...next[index], name: before, quantity: null };
    next.splice(index + 1, 0, { name: after, quantity: null });
    emitChange(next, { index: index + 1, cursor: 0 });
  };

  // Pasting a multi-line list (e.g. copied straight from a recipe) splits it
  // into one row per line instead of dumping everything into a single field.
  const handlePaste = (e, index) => {
    const text = e.clipboardData.getData("text");
    if (!text.includes("\n") && !text.includes("\r")) return; // single line - default paste is fine
    e.preventDefault();
    const el = e.target;
    const pos = el.selectionStart ?? el.value.length;
    const endPos = el.selectionEnd ?? pos;
    const before = el.value.slice(0, pos);
    const after = el.value.slice(endPos);

    const lines = text.split(/\r\n|\r|\n/).map((line) => line.trim());
    lines[0] = before + lines[0];
    lines[lines.length - 1] = lines[lines.length - 1] + after;

    let rows = lines
      .map((line) => ({ name: line, quantity: null }))
      .filter((row) => row.name.trim() !== "");
    if (rows.length === 0) rows = [{ name: "", quantity: null }];

    const next = [...items];
    next.splice(index, 1, ...rows);
    emitChange(next, { index: index + rows.length - 1 });
  };

  inputRefs.current = inputRefs.current.slice(0, items.length);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      {required && !error && !hasContent && (
        <Typography variant="caption" dir="rtl" sx={{ display: "block", mb: 0.5, textAlign: "right", color: "#d32f2f" }}>
          שדה חובה
        </Typography>
      )}
      <Typography variant="caption" dir="rtl" sx={{ display: "block", mb: 1, textAlign: "right", color: "text.secondary" }}>
        💡 טיפ: כדאי לרדת שורה (Enter) אחרי כל מרכיב, כך שהתצוגה במתכון תהיה מסודרת ונוחה לקריאה. אפשר גם להדביק רשימה שלמה בשורות נפרדות והיא תתחלק אוטומטית.
      </Typography>
      {items.map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="כמות + מרכיב"
            placeholder="לדוגמה: 2 כוסות קמח"
            value={item.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            inputRef={(el) => { inputRefs.current[index] = el; }}
            autoComplete="off"
            dir="rtl"
            multiline
            minRows={1}
            inputProps={{ style: { textAlign: "right" } }}
          />
          <IconButton
            size="small"
            onClick={() => handleRemove(index)}
            disabled={items.length === 1}
            aria-label="הסר מרכיב"
            sx={{ flexShrink: 0 }}
          >
            <RemoveCircleOutlineIcon fontSize="small" sx={{ color: items.length === 1 ? undefined : THEME_COLOR }} />
          </IconButton>
        </Box>
      ))}
      {error && (
        <Typography color="error" variant="caption" dir="rtl" sx={{ display: "block", mb: 0.5, textAlign: "right" }}>
          {error}
        </Typography>
      )}
      <Button
        size="small"
        onClick={handleAdd}
        startIcon={<AddCircleIcon fontSize="small" />}
        sx={{ color: THEME_COLOR, textTransform: "none", "&:hover": { backgroundColor: "rgba(208,107,107,0.08)" } }}
      >
        הוסף מרכיב
      </Button>
    </Box>
  );
};

IngredientListInput.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  value: array,
  onChange: func.isRequired,
  error: string,
  required: bool,
};

IngredientListInput.defaultProps = {
  value: [],
  required: false,
};

export default IngredientListInput;
