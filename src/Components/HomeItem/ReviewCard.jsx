import React from 'react';
import { FaStar } from 'react-icons/fa';


const ReviewCard = ({ review }) => {
  const {
    reviewerName,
    reviewText,
    propertyName,
    rating,
    reviewerPhoto,
  } = review;

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-2xl p-6 mx-auto hover:shadow-2xl transition">

      <div className="flex items-center gap-4 mb-4">
        <img
          src={reviewerPhoto}
          alt={reviewerName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{reviewerName}</h3>
          <p className="text-xs text-gray-500">{propertyName}</p>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {reviewText}
      </p>

      <p className="text-yellow-500 font-bold">
        <FaStar /> {rating}
      </p>
    </div>
  );
};

export default ReviewCard;
