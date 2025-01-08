import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Signin";
import ClubManagement from "./components/ClubManagement";
import PostReview from "./components/PostReview";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import DashboardMetrics from "./components/DashboardMetrics";
import Dashboard from "./pages/Dashboard";
import ViewPost from "./components/ViewPost";
import AdminPostDetails from "./components/AdminPostDetail";

const App = () => {
  const isAuthenticated = localStorage.getItem("adminToken") ? true : false;

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
        >
          <Route path="/dashboard/metrics" element={<DashboardMetrics/>} />
          <Route path="/dashboard/clubs" element={<ClubManagement />} />
          <Route path="/dashboard/posts/review" element={<PostReview />} />
          <Route path="/dashboard/posts/view" element={<ViewPost />} />
          <Route path="/dashboard/posts/create" element={<CreatePost />} />
          <Route path="/dashboard/post/detail/:id" element={<PostDetails />} />
          <Route path="/dashboard/post/admin-detail/:id" element={<AdminPostDetails />} />
        </Route>

        {/* Redirect all other routes */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default App;
