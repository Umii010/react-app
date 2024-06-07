import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';


export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('Logout failed');
        // Add user-facing error message here (e.g., toast notification)
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Add user-facing error message here
    }
  };

  return (
    <>
     <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 30 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Card 1</Typography>
            <Typography>Content for card 1.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Card 2</Typography>
            <Typography>Content for card 2.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Card 3</Typography>
            <Typography>Content for card 3.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
