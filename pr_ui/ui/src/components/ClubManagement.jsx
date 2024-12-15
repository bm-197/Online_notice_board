import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const ClubManagement = () => {
  const [clubName, setClubName] = useState("");

  const handleAddClub = () => {
    console.log("Adding Club:", clubName);
    setClubName("");
  };

  return (
    <div style={{ padding: "20px", marginTop: "65px" }}>
      <Typography variant="h5">Manage Clubs</Typography>
      <TextField
        label="Club Name"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClub}
        style={{ marginTop: "10px" }}
      >
        Add Club
      </Button>
    </div>
  );
};

export default ClubManagement;
