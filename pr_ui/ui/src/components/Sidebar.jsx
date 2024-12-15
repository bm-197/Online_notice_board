import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div style={{ width: "250px", height: "100vh", backgroundColor: "#0012", marginTop: "65px"}}>
    <List>
      <ListItem>
        <ListItemText primary="PR Dashboard" />
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/dashboard/clubs">
        <ListItemText primary="Manage Clubs" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/posts/review">
        <ListItemText primary="Review Posts" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/posts/create">
        <ListItemText primary="Create Post" />
      </ListItem>
    </List>
  </div>
);

export default Sidebar;
