import React from "react";
import { Outlet, useNavigate } from "react-router-dom"; // To render nested routes and navigate
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Button } from "@mui/material";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", backgroundColor: "#f0f0f0" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet /> {/* Nested routes will render here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
