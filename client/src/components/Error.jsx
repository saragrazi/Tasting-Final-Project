import React from "react";
import { string } from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Error = ({ errorMessage }) => {
  return (
    <Container
      sx={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        py: 6,
      }}
    >
      <Typography variant="h5">אופס... משהו השתבש</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
        נסו שוב בעוד כמה דקות
      </Typography>
      <Box
        component="img"
        src="/assets/images/broken-robot.png"
        alt="רובוט שבור"
        sx={{
          width: { xs: 260, sm: 420 },
          height: { xs: 260, sm: 420 },
          objectFit: "cover",
          objectPosition: "30% 45%",
          mt: 2,
          maskImage: "radial-gradient(circle at center, black 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 65%, transparent 100%)",
        }}
      />
    </Container>
  );
};

Error.propTypes = {
  errorMessage: string,
};

export default Error;
