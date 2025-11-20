import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary/10 dark:bg-secondary/10 px-4 sm:px-6 lg:px-8 py-10 mt-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="size-8">
              <img 
                src="/Logo_Transparent.png" 
                alt="Vastrani Looms Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-bold font-display text-primary dark:text-secondary">Vastrani Looms</h3>
          </div>
          <p className="font-body text-sm text-text-light/80 dark:text-text-dark/80">
            Celebrating the timeless art of Indian handloom weaving. A legacy of elegance for the modern woman.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-bold font-display text-text-light dark:text-text-dark mb-4">Quick Links</h3>
          <ul className="space-y-2 font-body text-sm">
            <li><Link className="hover:text-secondary" to="/">Home</Link></li>
            <li><Link className="hover:text-secondary" to="/products">Shop Now</Link></li>
            <li><Link className="hover:text-secondary" to="/about">About Us</Link></li>
            <li><Link className="hover:text-secondary" to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold font-display text-text-light dark:text-text-dark mb-4">Customer Service</h3>
          <ul className="space-y-2 font-body text-sm">
            <li><button className="hover:text-secondary text-left">Shipping Policy</button></li>
            <li><button className="hover:text-secondary text-left">Return Policy</button></li>
            <li><button className="hover:text-secondary text-left">Privacy Policy</button></li>
            <li><button className="hover:text-secondary text-left">FAQs</button></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold font-display text-text-light dark:text-text-dark mb-4">Stay Connected</h3>
          <p className="font-body text-sm mb-4">Join our newsletter for exclusive updates.</p>
          <form className="flex">
            <input 
              className="w-full rounded-l-lg border-secondary/30 bg-background-light dark:bg-background-dark focus:ring-secondary focus:border-secondary" 
              placeholder="Your Email" 
              type="email"
            />
            <button className="bg-primary text-white dark:bg-secondary dark:text-primary px-4 rounded-r-lg font-bold hover:bg-primary/90 dark:hover:bg-secondary/90">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      
      <div className="text-center text-sm mt-10 pt-6 border-t border-secondary/30">
        <p>© 2024 Vastrani Looms. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;