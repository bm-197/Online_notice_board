import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardMetrics from "../components/DashboardMetrics";

const Dashboard = () => {
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#f9f9f9" }}>
        <Header />
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Outlet /> {/* Nested routes render here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
