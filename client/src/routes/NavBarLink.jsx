import React from "react";
import { string, node } from "prop-types";
import { Link } from "react-router-dom";

const NavBarLink = ({ to, color, children }) => {
  return (
    <Link to={to} style={{ color, textDecoration: "none" }}>
      {children}
    </Link>
  );
};

NavBarLink.propTypes = {
  to: string.isRequired,
  color: string.isRequired,
  children: node.isRequired,
};

NavBarLink.defaultProps = {
  color: "#fff",
};

export default NavBarLink;