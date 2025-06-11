import React from 'react';
import { FaStar } from 'react-icons/fa';

function Rating({ value = 0, onChange, readOnly = false }) {
  return (
    <div className="rating">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            {readOnly ? (
              <FaStar
                className="star"
                color={ratingValue <= value ? '#ffc107' : '#e4e5e9'}
                size={25}
              />
            ) : (
              <>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => onChange(ratingValue)}
                />
                <FaStar
                  className="star"
                  color={ratingValue <= value ? '#ffc107' : '#e4e5e9'}
                  size={25}
                />
              </>
            )}
          </label>
        );
      })}
    </div>
  );
}

export default Rating;