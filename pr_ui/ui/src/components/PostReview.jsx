import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

const PostReview = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Event 1", status: "Pending" },
    { id: 2, title: "Event 2", status: "Pending" },
  ]);

  const handleApprove = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: "Approved" } : post));
  };

  const handleReject = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: "Rejected" } : post));
  };

  return (
    <div style={{ padding: "20px", marginTop: "65px" }}>
      <Typography variant="h5">Review Posts</Typography>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "10px" }}>
          <Typography>{post.title}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleApprove(post.id)}
            style={{ marginRight: "10px" }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleReject(post.id)}
          >
            Reject
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PostReview;
