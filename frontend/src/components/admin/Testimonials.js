import React, { useState } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    comment: '',
    featured: false
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-display font-bold text-primary dark:text-secondary">Customer Testimonials</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary dark:bg-secondary text-white dark:text-primary px-4 py-2 rounded-lg hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors font-body font-semibold"
        >
          <span className="material-symbols-outlined">add</span>
          Add Testimonial
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-text-light/60 dark:text-text-dark/60">
        <span className="material-symbols-outlined text-6xl mb-4 block text-gray-300">format_quote</span>
        <p className="font-body">No testimonials added yet. Click "Add Testimonial" to showcase customer feedback.</p>
      </div>
    </div>
  );
};

export default Testimonials;
