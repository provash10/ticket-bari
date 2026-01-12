import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const { reviewerName, reviewText, propertyName, rating, reviewerPhoto } = review;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-3xl p-6 flex flex-col justify-between h-full hover:shadow-2xl transition-transform transform hover:-translate-y-2">
      
      {/* Reviewer Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={reviewerPhoto || 'https://via.placeholder.com/150'}
          alt={reviewerName}
          className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
        />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{reviewerName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{propertyName}</p>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-4">
        "{reviewText}"
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-auto">
        <FaStar className="text-yellow-400" />
        <span className="font-semibold text-gray-900 dark:text-gray-100">{rating}</span>
      </div>
    </div>
  );
};

export default ReviewCard;

