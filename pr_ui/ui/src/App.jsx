import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import ClubManagement from "./components/ClubManagement";
import PostReview from "./components/PostReview";
import CreatePost from "./components/CreatePost";

const App = () => {
  const isAuthenticated = localStorage.getItem("adminToken") === "authenticated";

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
          <Route path="/dashboard/clubs" element={<ClubManagement />} />
          <Route path="/dashboard/posts/review" element={<PostReview />} />
          <Route path="/dashboard/posts/create" element={<CreatePost />} />
        </Route>

        {/* Redirect all other routes */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default App;
