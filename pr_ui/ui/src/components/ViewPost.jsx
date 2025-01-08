import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Stack, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../config/env"; // Replace with your actual API endpoint

const AdminPosts = () => {
  const [adminPosts, setAdminPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminPosts = async () => {
      try {
        const response = await axios.get(`${API}/admin/post`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const filteredPosts = response.data.filter(
          (post) => post.user_to_role?.Role === "admin"
        );
        setAdminPosts(filteredPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin posts:", error);
        setLoading(false);
      }
    };

    fetchAdminPosts();
  }, []);

  const handleViewPost = (id) => {
    navigate(`/dashboard/post/admin-detail/${id}`);
  };

  return (
    <Stack spacing={3} style={{ marginTop: "50px" }}>
      {loading ? (
        <CircularProgress style={{ margin: "auto" }} />
      ) : adminPosts.length > 0 ? (
        adminPosts.map((post) => (
          <Card
            key={post.post_id}
            style={{
              borderLeft: "5px solid blue",
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
      ) : (
        <Typography variant="h6" align="center">
          No posts available.
        </Typography>
      )}
    </Stack>
  );
};

export default AdminPosts;
