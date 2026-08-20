import React, { useRef, useState } from "react";
import { func, string } from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const THEME_COLOR = "#d06b6b";

const splitToItems = (value) => (value ? value.split("\n") : [""]);

const DynamicListInput = ({ name, label, addLabel, value, onChange, error }) => {
  const [items, setItems] = useState(() => splitToItems(value));
  const lastEmitted = useRef(value);

  if (value !== lastEmitted.current) {
    lastEmitted.current = value;
    const nextItems = splitToItems(value);
    if (nextItems.join("\n") !== items.join("\n")) {
      setItems(nextItems);
    }
  }

  const emitChange = (nextItems) => {
    const joined = nextItems.join("\n");
    lastEmitted.current = joined;
    setItems(nextItems);
    onChange({ target: { name, value: joined } });
  };

  const handleItemChange = (index, newValue) => {
    const next = [...items];
    next[index] = newValue;
    emitChange(next);
  };

  const handleAdd = () => emitChange([...items, ""]);

  const handleRemove = (index) => {
    if (items.length === 1) return;
    emitChange(items.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      {items.map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
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
            aria-label="הסר שורה"
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
        {addLabel}
      </Button>
    </Box>
  );
};

DynamicListInput.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  addLabel: string,
  value: string,
  onChange: func.isRequired,
  error: string,
};

DynamicListInput.defaultProps = {
  value: "",
  addLabel: "הוסף שורה",
};

export default DynamicListInput;
