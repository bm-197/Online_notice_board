import React, { useState } from "react";
import { Button, TextField, Typography, Box, Card, Stack, Divider, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../config.js/env";

// Styled Card for consistent UI design
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "300px",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!credentials.email || !/\S+@\S+\.\S+/.test(credentials.email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!credentials.password || credentials.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/signin`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data?.access_token) {
        localStorage.setItem("adminToken", response.data.access_token);
        setResponseMessage("Sign-in successful!");
        setTimeout(() => navigate("/dashboard"), 1500); // Redirect after 1.5 seconds
      } else {
        setResponseMessage(response.data.error || "Sign-in failed");
      }
    } catch (error) {
      setResponseMessage(
        `An error occurred: ${error.response?.data?.error || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInContainer direction="column" justifyContent="center">
      <StyledCard variant="outlined">
        <Typography component="h1" variant="h4" sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
          Admin Sign-In
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            error={emailError}
            helperText={emailErrorMessage}
            color={emailError ? "error" : "primary"}
            disabled={loading}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            error={passwordError}
            helperText={passwordErrorMessage}
            color={passwordError ? "error" : "primary"}
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleSignIn}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Sign In"}
          </Button>
          {responseMessage && (
            <Typography
              sx={{
                marginTop: 2,
                color: responseMessage.includes("successful") ? "green" : "red",
                textAlign: "center",
              }}
            >
              {responseMessage}
            </Typography>
          )}
        </Box>
      </StyledCard>
    </SignInContainer>
  );
};

export default SignIn;