import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/signin", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("API Response:", response.data); // Debugging
  
      if (response.data.success === "yes") {
        localStorage.setItem("adminToken", "authenticated");
        localStorage.setItem("role", "admin");
        setResponseMessage("Sign-in successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setResponseMessage(response.data.error || "Sign-in failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error); // Debugging
      setResponseMessage(
        `An error occurred: ${error.response?.data?.error || error.message}`
      );
    }
  };
  
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Admin Sign-In
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSignIn} fullWidth>
        Sign In
      </Button>
      {responseMessage && (
        <Typography
          sx={{
            marginTop: 2,
            color: responseMessage.includes("successful") ? "green" : "red",
          }}
        >
          {responseMessage}
        </Typography>
      )}
    </Box>
  );
};

export default SignIn;
