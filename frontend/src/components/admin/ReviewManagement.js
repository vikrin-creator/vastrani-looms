import React, { useState, useEffect } from 'react';
import { getAllReviews, updateReview, deleteReview } from '../../data/catalogData';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    reviewer_name: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review.id);
    setEditForm({
      reviewer_name: review.reviewer_name,
      rating: review.rating,
      comment: review.comment
    });
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditForm({
      reviewer_name: '',
      rating: 5,
      comment: ''
    });
    setError('');
    setSuccess('');
  };

  const handleSaveEdit = async (reviewId) => {
    try {
      setError('');
      setSuccess('');
      
      await updateReview(reviewId, editForm);
      
      setSuccess('Review updated successfully');
      setEditingReview(null);
      fetchReviews();
    } catch (err) {
      setError('Failed to update review');
      console.error(err);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      
      await deleteReview(reviewId);
      
      setSuccess('Review deleted successfully');
      fetchReviews();
    } catch (err) {
      setError('Failed to delete review');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`material-symbols-outlined text-xl ${
            i <= rating ? 'text-yellow-500' : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
          onClick={() => interactive && onRatingChange && onRatingChange(i)}
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          star
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-primary font-display">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-display font-bold text-primary dark:text-secondary mb-6">
        Review Management
      </h1>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg">
          {success}
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-text-light/30 dark:text-text-dark/30 mb-4">
            rate_review
          </span>
          <p className="text-lg text-text-light/60 dark:text-text-dark/60">
            No reviews available
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-secondary/20"
            >
              {editingReview === review.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-primary dark:text-secondary">
                      Edit Review
                    </h3>
                    <div className="text-sm text-text-light/60 dark:text-text-dark/60">
                      Product: {review.product_name}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Reviewer Name
                    </label>
                    <input
                      type="text"
                      name="reviewer_name"
                      value={editForm.reviewer_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {renderStars(editForm.rating, true, (rating) => 
                        setEditForm(prev => ({ ...prev, rating }))
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      value={editForm.comment}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSaveEdit(review.id)}
                      className="px-6 py-2 bg-primary dark:bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-6 py-2 border border-secondary/20 rounded-lg text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-text-light dark:text-text-dark">
                          {review.reviewer_name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="text-sm text-text-light/60 dark:text-text-dark/60 space-y-1">
                        <p>Product: <span className="font-medium">{review.product_name}</span></p>
                        <p>Posted: {new Date(review.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit Review"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Review"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-text-light dark:text-text-dark leading-relaxed">
                    {review.comment}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;
