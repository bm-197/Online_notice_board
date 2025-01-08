import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, CircularProgress, Button, TextField, Stack } from "@mui/material";
import axios from "axios";
import { API } from "../config/env"; // Replace with your actual API endpoint

const AdminPostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({
    post_title: "",
    post_body: "",
  });

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${API}/admin/post/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const postData = response.data[0];
        setPost(postData);
        setEditedPost({
          post_title: postData.post_title || "",
          post_body: postData.post_body || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Failed to load post details.");
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(
        `${API}/admin/post/${id}`,
        {
          post_title: editedPost.post_title,
          post_body: editedPost.post_body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setPost((prevPost) => ({
        ...prevPost,
        post_title: editedPost.post_title,
        post_body: editedPost.post_body,
      }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to save changes.");
    }
  };

  if (loading) {
    return <CircularProgress style={{ display: "block", margin: "auto", marginTop: "50px" }} />;
  }

  if (error) {
    return (
      <Typography color="error" align="center" style={{ marginTop: "50px" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Card style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <CardContent>
        {editMode ? (
          <Stack spacing={2}>
            <TextField
              label="Post Title"
              variant="outlined"
              fullWidth
              value={editedPost.post_title}
              onChange={(e) =>
                setEditedPost((prev) => ({ ...prev, post_title: e.target.value }))
              }
            />
            <TextField
              label="Post Body"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={editedPost.post_body}
              onChange={(e) =>
                setEditedPost((prev) => ({ ...prev, post_body: e.target.value }))
              }
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              {post?.post_title || "Untitled Post"}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {post?.post_body || "No content available."}
            </Typography>
            <Typography variant="body2" style={{ marginTop: "20px", color: "gray" }}>
              Posted By: {post?.user_to_role?.user_name || "Anonymous"}
            </Typography>
            <Typography variant="body2" style={{ marginTop: "20px", color: "gray" }}>
              Created At: {new Date(post?.created_at).toLocaleString()}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: "30px" }}
              onClick={() => setEditMode(true)}
            >
              Edit Post
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminPostDetails;
