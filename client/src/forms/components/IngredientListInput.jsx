import React, { useRef, useState } from "react";
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

const IngredientListInput = ({ name, label, value, onChange, error, required }) => {
  const [items, setItems] = useState(() => (value && value.length ? value : [emptyRow()]));
  const lastEmitted = useRef(value);

  if (value !== lastEmitted.current) {
    lastEmitted.current = value;
    const nextItems = value && value.length ? value : [emptyRow()];
    if (JSON.stringify(nextItems) !== JSON.stringify(items)) {
      setItems(nextItems);
    }
  }

  const emitChange = (nextItems) => {
    lastEmitted.current = nextItems;
    setItems(nextItems);
    onChange({ target: { name, value: nextItems } });
  };

  const handleNameChange = (index, newName) => {
    const next = [...items];
    next[index] = { ...next[index], name: newName, quantity: null };
    emitChange(next);
  };

  const handleAdd = () => emitChange([...items, emptyRow()]);

  const handleRemove = (index) => {
    if (items.length === 1) return;
    emitChange(items.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      {required && !error && (
        <Typography variant="caption" dir="rtl" sx={{ display: "block", mb: 0.5, textAlign: "right", color: "#d32f2f" }}>
          שדה חובה
        </Typography>
      )}
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
            onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
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
