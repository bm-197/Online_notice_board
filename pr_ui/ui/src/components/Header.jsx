import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();

  // Logout Functionality
  const handleLogout = () => {
    // Remove authentication token and role from localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");

    // Redirect to the SignIn page
    navigate("/signin");
  };

  return (
    <AppBar position="static" style={{ position: "fixed", backgroundColor: "#1976d2", width: "100%", zIndex:"1021"}}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">PR Dashboard</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
