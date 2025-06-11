import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import AuthContext from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
  .from('reviews')
  .select(`
    *,
    profiles!inner(*)
  `)
  .order('created_at', { ascending: false });

      console.log("Fetched reviews:", data); // Debug log
      console.log("Fetch error:", error); // Debug log

      if (error) throw error;
        setReviews(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

  fetchReviews();
}, []);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews: {error}</div>;

  return (
    <div className="reviews-container">
      {user && (
        <Link to="/add-review" className="btn btn-primary">
          Add Review
        </Link>
      )}
      <h2>Movie Reviews</h2>
      <div className="reviews-grid">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>
    </div>
  );
}

export default ReviewList;