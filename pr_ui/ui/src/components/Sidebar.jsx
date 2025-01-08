import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ReviewIcon from "@mui/icons-material/RateReview";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Sidebar = () => (
  <div
    style={{
      width: "250px",
      backgroundColor: "#fff",
      height: "100vh",
      borderRight: "1px solid #e0e0e0",
      paddingTop: "20px",
      marginTop: "-5px",
    }}
  >
    <div style={{ padding: "10px 20px", fontWeight: "bold", fontSize: "1.2rem" }}>
      Online Notice Board
    </div>
    <Divider />
    <List>
      <ListItem button component={Link} to="/dashboard/metrics">
        <DashboardIcon style={{ marginRight: "10px" }} />
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/clubs">
        <GroupIcon style={{ marginRight: "10px" }} />
        <ListItemText primary="Manage Clubs" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/posts/review">
        <ReviewIcon style={{ marginRight: "10px" }} />
        <ListItemText primary="Review Posts" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/posts/create">
        <PostAddIcon style={{ marginRight: "10px" }} />
        <ListItemText primary="Create Post" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/posts/view">
        <ArrowUpwardIcon style={{ marginRight: "10px" }} />
        <ListItemText primary="View Post" />
      </ListItem>
    </List>
  </div>
);

export default Sidebar;
