import React, { useEffect, useState } from "react";
import { array, bool, func, number, object, oneOfType, string } from "prop-types";
import { Box } from "@mui/material";

const SLIDE_DURATION_MS = 2000;
const THEME_COLOR = "#d06b6b";

const RecipeImageStory = ({ images, onImageClick, height, width, imgSx, cursor, playOnHover, interactive }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [cycleComplete, setCycleComplete] = useState(false);
  const hasMultiple = images.length > 1;
  const isPlaying = interactive && hasMultiple && (!playOnHover || hovered) && !cycleComplete;

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (playOnHover && !hovered) {
      setActiveIndex(0);
      setCycleComplete(false);
    }
  }, [playOnHover, hovered]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setTimeout(() => {
      setActiveIndex((current) => {
        const next = current + 1;
        if (next >= images.length) {
          if (playOnHover) setCycleComplete(true);
          return 0;
        }
        return next;
      });
    }, SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isPlaying, activeIndex, images.length, playOnHover]);

  const segmentWidth = (index) => {
    if (!interactive) return "0%";
    if (playOnHover && (!hovered || cycleComplete)) return "0%";
    return index <= activeIndex ? "100%" : "0%";
  };

  const activeImage = images[activeIndex];

  return (
    <Box
      onMouseEnter={interactive && playOnHover ? () => setHovered(true) : undefined}
      onMouseLeave={interactive && playOnHover ? () => setHovered(false) : undefined}
      sx={{ position: "relative", display: width === "100%" ? "block" : "inline-block", width, height }}
    >
      {hasMultiple && (
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
            display: "flex",
            gap: 0.5,
            zIndex: 2,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex(index);
              }}
              sx={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.45)",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 0 3px rgba(0,0,0,0.5)",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  backgroundColor: THEME_COLOR,
                  width: segmentWidth(index),
                  transition: index === activeIndex && isPlaying ? `width ${SLIDE_DURATION_MS}ms linear` : "none",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
      <Box
        component="img"
        src={activeImage?.url}
        alt={activeImage?.alt || ""}
        onClick={onImageClick}
        sx={{
          width: "100%",
          height: "100%",
          cursor,
          ...imgSx,
        }}
      />
    </Box>
  );
};

RecipeImageStory.propTypes = {
  images: array.isRequired,
  onImageClick: func,
  height: oneOfType([string, number, object]),
  width: oneOfType([string, number]),
  imgSx: object,
  cursor: string,
  playOnHover: bool,
  interactive: bool,
};

RecipeImageStory.defaultProps = {
  onImageClick: undefined,
  height: "100%",
  width: "100%",
  imgSx: {},
  cursor: "default",
  playOnHover: false,
  interactive: true,
};

export default RecipeImageStory;
