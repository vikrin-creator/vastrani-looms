import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-primary dark:text-secondary text-4xl font-bold font-display leading-tight tracking-[-0.015em] text-center mb-8">
          Contact Us
        </h1>
        <p className="text-center text-text-light/80 dark:text-text-dark/80 font-body mb-12 max-w-2xl mx-auto">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-background-light dark:bg-background-dark border border-secondary/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold font-display text-primary dark:text-secondary mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-secondary/30 bg-background-light dark:bg-background-dark focus:ring-secondary focus:border-secondary"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-secondary/30 bg-background-light dark:bg-background-dark focus:ring-secondary focus:border-secondary"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border-secondary/30 bg-background-light dark:bg-background-dark focus:ring-secondary focus:border-secondary"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-secondary/30 bg-background-light dark:bg-background-dark focus:ring-secondary focus:border-secondary"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-lg border-secondary/30 bg-background-light dark:bg-background-dark focus:ring-secondary focus:border-secondary"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white dark:bg-secondary dark:text-primary py-3 rounded-lg font-bold hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-primary/5 dark:bg-secondary/5 rounded-lg p-6">
              <h3 className="text-xl font-bold font-display text-primary dark:text-secondary mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4 font-body text-text-light dark:text-text-dark">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-1">location_on</span>
                  <div>
                    <p className="font-semibold">Visit our Store</p>
                    <p>123 Silk Street, Textile District<br />Bangalore, Karnataka 560001<br />India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-1">phone</span>
                  <div>
                    <p className="font-semibold">Call us</p>
                    <p>+91 80 2345 6789<br />+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-1">email</span>
                  <div>
                    <p className="font-semibold">Email us</p>
                    <p>info@vastranilooms.com<br />orders@vastranilooms.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-1">schedule</span>
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p>Monday - Saturday: 10:00 AM - 7:00 PM<br />Sunday: 11:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background-light dark:bg-background-dark border border-secondary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold font-display text-primary dark:text-secondary mb-4">
                Follow Us
              </h3>
              <p className="font-body text-text-light/80 dark:text-text-dark/80 mb-4">
                Stay connected with us on social media for the latest updates, new arrivals, and behind-the-scenes glimpses of our weaving process.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary p-3 rounded-full hover:bg-primary/20 dark:hover:bg-secondary/20 transition-colors">
                  <span className="material-symbols-outlined">facebook</span>
                </button>
                <button className="bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary p-3 rounded-full hover:bg-primary/20 dark:hover:bg-secondary/20 transition-colors">
                  <span className="material-symbols-outlined">instagram</span>
                </button>
                <button className="bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary p-3 rounded-full hover:bg-primary/20 dark:hover:bg-secondary/20 transition-colors">
                  <span className="material-symbols-outlined">pinterest</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;