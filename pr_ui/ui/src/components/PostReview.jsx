import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Stack, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../config/env"; // Replace with your actual API endpoint

const PostReview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/admin/post`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleViewPost = (id) => {
    navigate(`/dashboard/post/detail/${id}`);
  };

  return (
    <Stack spacing={3} style={{ marginTop: "50px" }}>
      {loading ? (
        <CircularProgress style={{ margin: "auto" }} />
      ) : (
        posts.map((post) => (
          <Card
            key={post.post_id}
            style={{
              borderLeft: "5px solid orange",
            }}
          >
            <CardContent>
              <Typography variant="h6">{post.post_title}</Typography>
              <Typography color="textSecondary">{"Status: Pending"}</Typography>
              <div style={{ marginTop: "10px" }}>
                <Button
                  variant="outlined"
                  color="info"
                  size="small"
                  onClick={() => handleViewPost(post.post_id)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  );
};

export default PostReview;
