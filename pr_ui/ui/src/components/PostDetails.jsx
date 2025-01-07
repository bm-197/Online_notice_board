import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, CircularProgress, Button, TextField } from "@mui/material";
import axios from "axios";
import { API } from "../config/env"; // Replace with your actual API endpoint

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${API}/admin/post/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        console.log(response.data[0]); // Debugging to ensure data structure is correct
        setPost(response.data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Failed to load post details.");
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress style={{ display: "block", margin: "auto", marginTop: "50px" }} />;
  }

  if (error) {
    return (
      <Typography
        color="error"
        align="center"
        style={{ marginTop: "50px" }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <Card style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {post?.post_title || "Untitled Post"}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {post?.post_body || "No content available."}
        </Typography>
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          Status: {post?.status || "Pending"}
        </Typography>
        <Typography variant="body2" style={{ marginTop: "20px", color: "gray" }}>
          Posted By: {post?.user_to_role?.user_name || "Anonymous"}
        </Typography>

        <div style={{ marginTop: "30px" }}>
          <Button variant="contained" color="primary" disabled style={{ marginRight: "10px" }}>
            Approve
          </Button>
          <TextField
            label="Rejection Reason"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            style={{ marginTop: "10px" }}
          />
          <Button variant="contained" color="secondary" style={{ marginTop: "10px" }}>
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostDetails;
