import React, { useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const DashboardMetrics = () => {
  // Dummy data for metrics
  const metrics = {
    totalClubs: 10,
    totalPosts: 50,
    pendingPosts: 5,
    approvedPosts: 40,
    rejectedPosts: 5,
  };

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Dashboard Overview
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Total Clubs Registered</Typography>
            <Typography variant="h4" color="primary">
              {metrics.totalClubs}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Total Posts Created</Typography>
            <Typography variant="h4" color="primary">
              {metrics.totalPosts}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Pending Posts for Review</Typography>
            <Typography variant="h4" color="primary">
              {metrics.pendingPosts}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Approved Posts</Typography>
            <Typography variant="h4" color="primary">
              {metrics.approvedPosts}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Rejected Posts</Typography>
            <Typography variant="h4" color="primary">
              {metrics.rejectedPosts}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardMetrics;
