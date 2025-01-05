import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios"; // Use Axios for making HTTP requests
import { API } from "../config.js/env";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", body: "", expiration_date: "" });
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    const payload = {
      post_title: post.title,
      post_body: post.body,
      post_expiray_date: null,
      //   post_tags: post.tags,
    };

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        `${API}/admin/post`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if (response.status == 200) {
        setResponseMessage("Post created successfully!");
        setPost({ title: "", body: "", expiration_date: ""});
      } else {
        setResponseMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      setResponseMessage("An error occurred while creating the post.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", marginTop: "65px"}}>
      <Typography variant="h5" color="black">
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
        style={{ marginBottom: "10px" }}
      />
      {/* <TextField
        label="Tags"
        value={post.tags}
        onChange={(e) => setPost({ ...post, tags: e.target.value })}
        fullWidth
      /> */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "10px" }}
      >
        Submit
      </Button>
      {responseMessage && (
        <Typography
          style={{
            marginTop: "10px",
            color: response.status == 200 ? "green" : "red",
          }}
        >
          {responseMessage}
        </Typography>
      )}
    </div>
  );
};

export default CreatePost;
