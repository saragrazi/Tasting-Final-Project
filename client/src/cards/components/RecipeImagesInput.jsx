import React, { useEffect, useMemo, useRef, useState } from "react";
import { array, bool, func, number } from "prop-types";
import { Box, IconButton, LinearProgress, Modal, Backdrop, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const THEME_COLOR = "#d06b6b";
const MAX_IMAGES = 3;
const TILE_SIZE = 96;

const Tile = ({ src, onRemove, onView }) => (
  <Box
    sx={{
      position: "relative",
      width: TILE_SIZE,
      height: TILE_SIZE,
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "1px 1px 8px rgba(0,0,0,0.25)",
      flexShrink: 0,
      transition: "transform 0.2s ease",
      "&:hover": { transform: "scale(1.03)" },
    }}
  >
    <Box
      component="img"
      src={src}
      alt="תמונת מנה"
      onClick={onView}
      sx={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" }}
    />
    <IconButton
      size="small"
      onClick={onRemove}
      aria-label="הסר תמונה"
      sx={{
        position: "absolute",
        top: 2,
        left: 2,
        backgroundColor: "rgba(0,0,0,0.55)",
        color: "#fff",
        width: 22,
        height: 22,
        "&:hover": { backgroundColor: "#d06b6b" },
      }}
    >
      <DeleteIcon sx={{ fontSize: 14 }} />
    </IconButton>
  </Box>
);

const RecipeImagesInput = ({ currentImages, onCurrentImagesChange, newImages, onNewImagesChange, pending, uploadProgress }) => {
  const inputRef = useRef(null);
  const [viewingSrc, setViewingSrc] = useState(null);

  const newImageUrls = useMemo(() => newImages.map((file) => URL.createObjectURL(file)), [newImages]);

  useEffect(() => {
    return () => newImageUrls.forEach((url) => URL.revokeObjectURL(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newImageUrls]);

  const totalCount = currentImages.length + newImages.length;
  const remainingSlots = MAX_IMAGES - totalCount;

  const handleFilesSelected = (event) => {
    const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/"));
    if (files.length > 0) {
      onNewImagesChange([...newImages, ...files.slice(0, remainingSlots)]);
    }
    event.target.value = "";
  };

  const removeCurrentImage = (index) => {
    onCurrentImagesChange(currentImages.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    onNewImagesChange(newImages.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
        {currentImages.map((image, index) => (
          <Tile
            key={`current-${image.url}-${index}`}
            src={image.url}
            onView={() => setViewingSrc(image.url)}
            onRemove={() => removeCurrentImage(index)}
          />
        ))}
        {newImages.map((file, index) => (
          <Tile
            key={`new-${file.name}-${index}`}
            src={newImageUrls[index]}
            onView={() => setViewingSrc(newImageUrls[index])}
            onRemove={() => removeNewImage(index)}
          />
        ))}
        {remainingSlots > 0 && (
          <Box
            onClick={() => inputRef.current?.click()}
            sx={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              borderRadius: "10px",
              border: `2px dashed ${THEME_COLOR}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: THEME_COLOR,
              flexShrink: 0,
              transition: "background-color 0.2s ease",
              "&:hover": { backgroundColor: "rgba(208,107,107,0.08)" },
            }}
          >
            <AddPhotoAlternateIcon />
            <Typography variant="caption" sx={{ mt: 0.5 }}>
              הוספת תמונה
            </Typography>
          </Box>
        )}
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFilesSelected}
      />

      <Typography variant="caption" sx={{ display: "block", mt: 1, fontWeight: 700 }}>
        {totalCount}/{MAX_IMAGES} תמונות
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
        אם לא תעלו תמונה, תוצג תמונת ברירת מחדל.
      </Typography>

      {pending && (
        <Box sx={{ mt: 1.5, width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(208,107,107,0.15)",
              "& .MuiLinearProgress-bar": { backgroundColor: THEME_COLOR, borderRadius: 4 },
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, textAlign: "center" }}>
            {uploadProgress < 100 ? `מעלה תמונות... ${uploadProgress}%` : "שומר את המתכון..."}
          </Typography>
        </Box>
      )}

      <Modal
        open={Boolean(viewingSrc)}
        onClose={() => setViewingSrc(null)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          },
        }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
      >
        <Box
          sx={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", outline: "none" }}
          onClick={() => setViewingSrc(null)}
        >
          <IconButton
            onClick={() => setViewingSrc(null)}
            sx={{
              position: "absolute",
              top: -18,
              right: -18,
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={viewingSrc}
            alt="תמונת מנה"
            onClick={(event) => event.stopPropagation()}
            sx={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "12px",
              boxShadow: "0 0 40px rgba(0,0,0,0.6)",
              display: "block",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

RecipeImagesInput.propTypes = {
  currentImages: array,
  onCurrentImagesChange: func,
  newImages: array,
  onNewImagesChange: func.isRequired,
  pending: bool,
  uploadProgress: number,
};

RecipeImagesInput.defaultProps = {
  currentImages: [],
  onCurrentImagesChange: () => {},
  newImages: [],
  pending: false,
  uploadProgress: 0,
};

export default RecipeImagesInput;
