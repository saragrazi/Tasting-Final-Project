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
            Login
          </MenuItem>

          <Button color="inherit">
            <Typography>About</Typography>
          </Button>

          <MenuItem
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={onCloseMenu}>
            SignUp
          </MenuItem>
        </Box>
      )}

      {user && (
        <Box>
          <MenuItem>Logout</MenuItem>
          <MenuItem onClick={onCloseMenu}>Profile</MenuItem>
          <MenuItem onClick={onCloseMenu}>Edit account</MenuItem>
        </Box>
      )}
    </MuiMenu>
  );
};

export default Menu;