import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../Rating';
import AuthContext from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

function AddReview() {
  const [formData, setFormData] = useState({
    movie: '',
    title: '',
    text: '',
    rating: 0
  });

  const { movie, title, text, rating } = formData;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRatingChange = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          movie,
          title,
          text,
          rating,
          user_id: user.id
        }]);

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding review:', error.message);
    }
  };

  if (!user) {
    return <div>Please login to add a review</div>;
  }

  return (
    <div className="review-form">
      <h1>Add Review</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="movie">Movie Title</label>
          <input
            type="text"
            name="movie"
            value={movie}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Review Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Review Text</label>
          <textarea
            name="text"
            value={text}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Rating</label>
          <Rating value={rating} onChange={onRatingChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default AddReview;