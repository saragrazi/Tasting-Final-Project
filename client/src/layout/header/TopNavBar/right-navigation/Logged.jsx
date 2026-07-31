import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useMenu } from "../menu/MenuProvider";

const Logged = () => {
  const openMenu = useMenu();

  return (
    <Tooltip
      title="פתח הגדרות"
      componentsProps={{
        popper: {
          modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
        },
      }}
    >
      <IconButton
        sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
        onClick={(e) => openMenu(e.currentTarget)}
      >
        <Avatar alt="אוואטר משתמש" src="/assets/images/avatar2.png" />
      </IconButton>
    </Tooltip>
  );
};

export default Logged;
