import React from 'react';
import ReviewList from '../components/Reviews/ReviewList';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Movie Reviews</h1>
      <ReviewList />
    </div>
  );
}

export default Home;