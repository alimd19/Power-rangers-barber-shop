import React, { useContext } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { UserContext } from "../../contexts/UserContext";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";

const drawerWidth = 240;

export default function NavBar({ children }) {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    updateUser("REMOVE_USER", {});
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        className="nav"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6" noWrap component="div">
              Power Rangers Barber Shop
            </Typography>
          </Box>
          <Typography variant="h6" component="div">
            {user.name}
          </Typography>
          <IconButton aria-label="user-icon" onClick={handleClick}>
            <AccountBoxIcon fontSize="large" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box className="user-nav" >
            <List>
              {[
                { link: "Appointments", path: "/appointment" },
                { link: "Appointment History", path: "/appointmenthistory" },
                { link: "Book Appointment", path: "/booking" },
                { link: "Profile Setup", path: "/profile" },
              ].map((text, index) => (
                <ListItem className="list" key={index}>
                  <CustomLink to={text.path}>{text.link}</CustomLink>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box>
          <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />
          <Box sx={{ p: 3 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolevedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolevedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
