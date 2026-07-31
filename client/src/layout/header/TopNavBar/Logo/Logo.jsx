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
          style={{ height: "30px", marginLeft: "10px" }}
        />
        <Typography
          variant="h4"
          sx={{
            display: { xs: "none", md: "inline-flex" },
            marginLeft: 2,
            fontFamily: "fantasy",
          }}
        >
          Tasting
        </Typography>
      </NavBarLink>
    </>
  );
};

export default Logo;
