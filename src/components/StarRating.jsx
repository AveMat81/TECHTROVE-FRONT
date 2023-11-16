// StarRating.js
import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ totalStars, value, setValue, handlerraitingBack }) => {

  const handlerRaiting = (newValue) =>{
    setValue(newValue)
    handlerraitingBack(newValue)
  }

  return (
    <Rating
      name="simple-controlled"
      value={value}
      // onChange={(event, newValue) => , handlerraitingBack(newValue)}
      onChange={(event, newValue) => handlerRaiting(newValue)}
      max={totalStars}
      icon={<StarIcon style={{ color: 'yellow' }} />}
      emptyIcon={<StarBorderIcon style={{ color: 'yellow' }} />}
    />
  );
};

export default StarRating;
