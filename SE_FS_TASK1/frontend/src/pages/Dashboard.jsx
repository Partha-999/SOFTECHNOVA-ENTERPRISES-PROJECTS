import React from 'react';
import ReviewList from '../components/Reviews/ReviewList';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>
      <ReviewList />
    </div>
  );
}

export default Dashboard;