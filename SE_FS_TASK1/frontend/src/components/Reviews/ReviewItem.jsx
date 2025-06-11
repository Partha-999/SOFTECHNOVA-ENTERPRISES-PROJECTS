import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import AuthContext from '../../context/AuthContext';

function ReviewItem({ review }) {
  const { user } = useContext(AuthContext);
  
  // Handle both old and new user data structure
  const username = review.profiles?.username || 'Anonymous';

  return (
    <div className="review-card">
      <h3>{review.movie}</h3>
      <h4>{review.title}</h4>
      <Rating value={review.rating} readOnly />
      <p>{review.text}</p>
      <p className="review-author">By: {username}</p>
      {user?.id === review.user_id && (
        <div className="review-actions">
          <Link to={`/edit-review/${review.id}`} className="btn btn-sm">
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

export default ReviewItem;