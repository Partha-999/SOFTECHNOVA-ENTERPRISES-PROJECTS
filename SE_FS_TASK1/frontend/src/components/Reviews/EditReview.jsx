import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '../Rating';
import AuthContext from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

function EditReview() {
  const [formData, setFormData] = useState({
    movie: '',
    title: '',
    text: '',
    rating: 0
  });

  const { movie, title, text, rating } = formData;
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data.user_id !== user.id) navigate('/dashboard');
        
        setFormData({
          movie: data.movie,
          title: data.title,
          text: data.text,
          rating: data.rating
        });
      } catch (error) {
        console.error('Error fetching review:', error.message);
        navigate('/dashboard');
      }
    };

    fetchReview();
  }, [id, user, navigate]);

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
        .update(formData)
        .eq('id', id);

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating review:', error.message);
    }
  };

  return (
    <div className="review-form">
      <h1>Edit Review</h1>
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
          Update Review
        </button>
      </form>
    </div>
  );
}

export default EditReview;