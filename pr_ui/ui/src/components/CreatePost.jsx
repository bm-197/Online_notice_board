import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios"; // Use Axios for making HTTP requests

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", body: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");

  const handleSubmit = async () => {
    const payload = {
      post_title: post.title,
      post_body: post.body,
      //   post_tags: post.tags, // Include tags if the backend supports it
    };

    try {
      console.log(payload);
      const response = await axios.post(
        "http://127.0.0.1:8000/admin/post",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Role: "admin",
          },
        }
      );
      console.log(response.data);
      if (response.data.success === "yes") {
        setResponseMessage("Post created successfully!");
        setPost({ title: "", content: "" });
        setResponseType("success");
      } else {
        setResponseMessage(`Error: ${response.data.error}`);
        setResponseType("error");
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
            color: responseType === "success" ? "green" : "red",
          }}
        >
          {responseMessage}
        </Typography>
      )}
    </div>
  );
};

export default CreatePost;
