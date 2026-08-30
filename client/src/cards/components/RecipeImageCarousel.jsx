import React, { useEffect, useState } from "react";
import { array, func, number, object, oneOfType, string } from "prop-types";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const THEME_COLOR = "#d06b6b";

const RecipeImageCarousel = ({ images, onImageClick, height, initialIndex, objectFit, imgSx }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [images, initialIndex]);

  const goPrev = (event) => {
    event.stopPropagation();
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = (event) => {
    event.stopPropagation();
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const activeImage = images[activeIndex];

  return (
    <Box sx={{ position: "relative", width: "100%", height }}>
      <Box
        component="img"
        src={activeImage?.url}
        alt={activeImage?.alt || "תמונת המתכון"}
        onClick={(event) => onImageClick(activeIndex, event)}
        sx={{
          width: "100%",
          height: "100%",
          objectFit,
          cursor: "pointer",
          display: "block",
          ...imgSx,
        }}
      />
      {hasMultiple && (
        <>
          <IconButton
            onClick={goPrev}
            aria-label="התמונה הקודמת"
            size="small"
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.45)",
              color: "#fff",
              padding: "4px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: THEME_COLOR },
            }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={goNext}
            aria-label="התמונה הבאה"
            size="small"
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.45)",
              color: "#fff",
              padding: "4px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: THEME_COLOR },
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`מעבר לתמונה ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    setActiveIndex(index);
                  }
                }}
                sx={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  cursor: "pointer",
                  backgroundColor: index === activeIndex ? THEME_COLOR : "rgba(255,255,255,0.6)",
                  boxShadow: "0 0 2px rgba(0,0,0,0.6)",
                  transition: "background-color 0.2s ease",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

RecipeImageCarousel.propTypes = {
  images: array.isRequired,
  onImageClick: func.isRequired,
  height: oneOfType([number, object, string]),
  initialIndex: number,
  objectFit: string,
  imgSx: object,
};

RecipeImageCarousel.defaultProps = {
  height: "100%",
  initialIndex: 0,
  objectFit: "cover",
  imgSx: {},
};

export default RecipeImageCarousel;
