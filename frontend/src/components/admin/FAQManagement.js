import React, { useState } from 'react';

const FAQManagement = () => {
  // eslint-disable-next-line no-unused-vars
  const [faqs, setFaqs] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    visible: true
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-display font-bold text-primary dark:text-secondary">FAQs</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary dark:bg-secondary text-white dark:text-primary px-4 py-2 rounded-lg hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors font-body font-semibold"
        >
          <span className="material-symbols-outlined">add</span>
          Add FAQ
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-text-light/60 dark:text-text-dark/60">
        <span className="material-symbols-outlined text-6xl mb-4 block text-gray-300">help</span>
        <p className="font-body">No FAQs added yet. Click "Add FAQ" to create your first question.</p>
      </div>
    </div>
  );
};

export default FAQManagement;
