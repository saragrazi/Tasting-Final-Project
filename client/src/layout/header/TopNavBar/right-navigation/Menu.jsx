import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Menu = ({ isMenuOpen, anchorEl, onCloseMenu }) => {
  const user = true;
  // const user = false

  return (
    <MuiMenu
      open={isMenuOpen}
      onClose={onCloseMenu}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
      {!user && (
        <Box>
          <MenuItem
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={onCloseMenu}>
            התחברות
          </MenuItem>

          <Button color="inherit">
            <Typography>אודות</Typography>
          </Button>

          <MenuItem
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={onCloseMenu}>
            הרשמה
          </MenuItem>
        </Box>
      )}

      {user && (
        <Box>
          <MenuItem>התנתק</MenuItem>
          <MenuItem onClick={onCloseMenu}>פרופיל</MenuItem>
          <MenuItem onClick={onCloseMenu}>ערוך חשבון</MenuItem>
        </Box>
      )}
    </MuiMenu>
  );
};

export default Menu;