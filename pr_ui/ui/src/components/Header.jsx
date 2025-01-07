import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Avatar, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const Header = () => {
  const navigate = useNavigate();

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/signin");
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        zIndex: 1201,
      }}
    >
      <Toolbar style={{ justifyContent: "space-between", padding: "0 20px" }}>
        <Typography variant="h6" style={{ fontWeight: "bold", color: "#1976d2" }}>
          PR Dashboard
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <Avatar style={{ backgroundColor: "#1976d2" }}>A</Avatar>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleLogout}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
