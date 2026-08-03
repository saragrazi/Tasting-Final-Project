import React from "react";
import Typography from "@mui/material/Typography";
import NavBarLink from "../../../../routes/NavBarLink";
import ROUTES from "../../../../routes/routesModel";

const Logo = () => {
  return (
    <>
      <NavBarLink to={ROUTES.ROOT}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/chefs-hat-white.png`}
          alt="כובע שף"
          style={{ height: "26px", marginLeft: "8px" }}
        />
        <Typography
          sx={{
            display: "inline-flex",
            marginLeft: { xs: 0, md: 2 },
            fontFamily: "fantasy",
            fontSize: { xs: "1.1rem", sm: "1.4rem", md: "2.125rem" },
            whiteSpace: "nowrap",
          }}
        >
          Tasting
        </Typography>
      </NavBarLink>
    </>
  );
};

export default Logo;
