import React, { useState } from 'react';

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      product: 'Kanchipuram Silk Saree',
      customer: 'Priya Sharma',
      rating: 5,
      comment: 'Beautiful saree! The quality is excellent and the colors are vibrant.',
      date: '2024-11-20',
      status: 'pending'
    },
    {
      id: 2,
      product: 'Banarasi Wedding Saree',
      customer: 'Anjali Patel',
      rating: 4,
      comment: 'Good quality, but delivery took longer than expected.',
      date: '2024-11-19',
      status: 'approved'
    },
  ]);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-primary dark:text-secondary">Product Reviews</h2>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-body font-semibold text-text-light dark:text-text-dark">{review.product}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${statusColors[review.status]}`}>
                    {review.status}
                  </span>
                </div>
                <p className="text-sm text-text-light/60 dark:text-text-dark/60 font-body mb-2">
                  By {review.customer} • {review.date}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-xl ${i < review.rating ? 'text-secondary' : 'text-gray-300'}`}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body text-text-light dark:text-text-dark">{review.comment}</p>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-body font-semibold">
                Approve
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-body font-semibold">
                Reject
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-body">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
