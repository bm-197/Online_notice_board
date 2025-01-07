import React, { useState } from "react";
import { Button, TextField, Typography, CircularProgress, Card, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { API } from "../config/env";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "500px",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", body: "", expiration_date: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const payload = {
      post_title: post.title,
      post_body: post.body,
      post_expiray_date: null,
    };

    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        `${API}/admin/post`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Post created successfully!");
        setPost({ title: "", body: "", expiration_date: "" });
        setResponseType("Success");
      } else {
        setResponseMessage(`Error: ${response.data.error}`);
        setResponseType("Error");
      }
    } catch (error) {
      setResponseMessage("An error occurred while creating the post.");
      setResponseType("Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3} style={{ marginTop: "65px", alignItems: "center" }}>
      <StyledCard>
        <Typography variant="h5" align="center">
          Create Post
        </Typography>
        <TextField
          label="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Content"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          fullWidth
          multiline
          rows={4}
          style={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "10px" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Submit"}
        </Button>
        {responseMessage && (
          <Typography
            style={{
              marginTop: "10px",
              color: responseType === "Error" ? "red" : "green",
              textAlign: "center",
            }}
          >
            {responseMessage}
          </Typography>
        )}
      </StyledCard>
    </Stack>
  );
};

export default CreatePost;
