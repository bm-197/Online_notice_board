import React, { useState } from "react";
import { Button, TextField, Typography, Card, Box, Stack, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { API } from "../config/env";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: "400px",
  margin: "100px auto",
  padding: theme.spacing(3),
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
}));

const ClubManagement = () => {
  const [clubDetails, setClubDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setClubDetails({ ...clubDetails, [field]: value });
  };

  const handleRegisterClub = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/admin/auth_club`, clubDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.status === 200) {
        setResponseMessage("Club registered successfully!");
        setResponseType("success");
        setClubDetails({ name: "", email: "", password: "" });
      } else {
        setResponseMessage(response.data.error || "Failed to register club.");
        setResponseType("error");
      }
    } catch (error) {
      setResponseMessage(error.response?.data?.error || "An error occurred.");
      setResponseType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledCard>
      <Typography variant="h5" align="center" gutterBottom>
        Manage Clubs
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
        Register a new club by providing the details below.
      </Typography>
      <Box component="form" noValidate>
        <Stack spacing={3}>
          <TextField
            label="Club Name"
            value={clubDetails.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Club Email"
            type="email"
            value={clubDetails.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Temporary Password"
            type="password"
            value={clubDetails.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterClub}
            fullWidth
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Register Club"}
          </Button>
        </Stack>
      </Box>
      {responseMessage && (
        <Typography
          variant="body1"
          align="center"
          style={{
            marginTop: "20px",
            color: responseType === "success" ? "green" : "red",
          }}
        >
          {responseMessage}
        </Typography>
      )}
    </StyledCard>
  );
};

export default ClubManagement;
