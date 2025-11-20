import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [mobileShopExpanded, setMobileShopExpanded] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsShopDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 200); // 200ms delay to allow cursor movement
    setHoverTimeout(timeout);
  };

  const collections = [
    'Kanjivaram Classics',
    'Banarasi Heritage Weaves',
    'Chanderi Grace Collection',
    'Patola & Bandhej Treasures',
    'Kota Doria Light Weaves',
    'Tussar & Bhagalpuri Elegance',
    'Zari Royale Collection',
    'Handcrafted Luxe Sarees',
    'Pure Silk Premium Edit',
    'Embroidered Grand Couture',
    'Heirloom Wedding Luxuries',
    'Bridal Radiance Collection',
    'Festive Sparkle Edit',
    'Party Glam Sarees',
    'Haldi–Mehndi Celebration Picks'
  ];

  const categories = [
    'Kanchipuram',
    'Banarasi',
    'Mysore Silk',
    'Soft Silk',
    'Organza',
    'Linen',
    'Tussar',
    'Chanderi',
    'Cotton',
    'Pure Silk',
    'Designer Sarees',
    'Soft Banarasi',
    'Semi Banarasi',
    'Tissue Banarasi',
    'Gadwal',
    'Narayanpet',
    'Ikkat',
    'Kanchi Padya'
  ];

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-secondary/30 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2 sm:py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="size-8 sm:size-9 md:size-10">
            <img 
              src="/Logo_Transparent.png" 
              alt="Vastrani Looms Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-primary dark:text-secondary text-lg sm:text-xl md:text-2xl font-bold font-display leading-tight tracking-[-0.015em]">
            Vastrani Looms
          </h2>
        </div>
        
        <nav className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-6 xl:gap-9">
          <Link className="text-text-light dark:text-text-dark text-sm lg:text-base font-medium font-body leading-normal hover:text-secondary" to="/">Home</Link>
          
          {/* Shop Now Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              className="text-text-light dark:text-text-dark text-sm lg:text-base font-medium font-body leading-normal hover:text-secondary flex items-center gap-1" 
              to="/products"
            >
              Shop Now
              <span className="material-symbols-outlined text-xs lg:text-sm">keyboard_arrow_down</span>
            </Link>
            
            {/* Mega Menu Dropdown */}
            {isShopDropdownOpen && (
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-[280px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[900px] bg-background-light dark:bg-background-dark border border-secondary/30 rounded-lg shadow-xl z-50 p-3 sm:p-4 md:p-5 lg:p-6"
                style={{ marginTop: '0.5rem' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Shop By Type Column */}
                  <div className="hidden lg:block border-r border-secondary/20 pr-3 mr-6 min-w-[120px]">
                    <h3 className="text-primary dark:text-secondary text-sm md:text-base font-bold font-display mb-2 md:mb-3">
                      SHOP BY TYPE
                    </h3>
                  </div>
                  
                  {/* Collections and Categories Container */}
                  <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    {/* Collections Column */}
                    <div className="flex-1">
                      <h3 className="text-primary dark:text-secondary text-sm md:text-base font-bold font-display mb-2 md:mb-3">
                        COLLECTION
                      </h3>
                      <div className="space-y-0.5 sm:space-y-1">
                        {collections.map((collection, index) => (
                          <Link
                            key={index}
                            to={`/products?collection=${encodeURIComponent(collection)}`}
                            className="block text-text-light dark:text-text-dark text-xs sm:text-sm font-body leading-relaxed hover:text-secondary hover:bg-primary/5 dark:hover:bg-secondary/5 px-1 sm:px-2 py-0.5 sm:py-1 rounded transition-colors"
                          >
                            {collection}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* Categories Column */}
                    <div className="flex-1">
                      <h3 className="text-primary dark:text-secondary text-sm md:text-base font-bold font-display mb-2 md:mb-3">
                        CATEGORY
                      </h3>
                      <div className="space-y-0.5 sm:space-y-1">
                        {categories.map((category, index) => (
                          <Link
                            key={index}
                            to={`/products?category=${encodeURIComponent(category)}`}
                            className="block text-text-light dark:text-text-dark text-xs sm:text-sm font-body leading-relaxed hover:text-secondary hover:bg-primary/5 dark:hover:bg-secondary/5 px-1 sm:px-2 py-0.5 sm:py-1 rounded transition-colors"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* View All Link */}
                <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-secondary/20 text-center">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1 sm:gap-2 bg-primary text-white dark:bg-secondary dark:text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold font-body hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors"
                  >
                    View All Products
                    <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link className="text-text-light dark:text-text-dark text-sm lg:text-base font-medium font-body leading-normal hover:text-secondary" to="/about">About Us</Link>
          <Link className="text-text-light dark:text-text-dark text-sm lg:text-base font-medium font-body leading-normal hover:text-secondary" to="/contact">Contact</Link>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop Icons - Always visible on desktop */}
          <button className="hidden md:flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-primary/10 dark:bg-secondary/10 text-text-light dark:text-text-dark hover:bg-primary/20 dark:hover:bg-secondary/20">
            <span className="material-symbols-outlined text-2xl">person</span>
          </button>
          <button className="hidden md:flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-primary/10 dark:bg-secondary/10 text-text-light dark:text-text-dark hover:bg-primary/20 dark:hover:bg-secondary/20">
            <span className="material-symbols-outlined text-2xl">favorite</span>
          </button>
          <button className="hidden md:flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-primary/10 dark:bg-secondary/10 text-text-light dark:text-text-dark hover:bg-primary/20 dark:hover:bg-secondary/20">
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          </button>
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-primary/10 dark:bg-secondary/10 text-text-light dark:text-text-dark hover:bg-primary/20 dark:hover:bg-secondary/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-secondary/30 px-4 sm:px-6 py-3 sm:py-4 z-40 max-h-[70vh] overflow-y-auto">
          {/* Mobile Icons Section */}
          <div className="flex justify-center gap-6 mb-6 pb-4 border-b border-secondary/20">
            <button className="flex flex-col items-center gap-1 text-text-light dark:text-text-dark hover:text-secondary">
              <span className="material-symbols-outlined text-2xl">person</span>
              <span className="text-xs font-body">Account</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-text-light dark:text-text-dark hover:text-secondary">
              <span className="material-symbols-outlined text-2xl">favorite</span>
              <span className="text-xs font-body">Wishlist</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-text-light dark:text-text-dark hover:text-secondary">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
              <span className="text-xs font-body">Cart</span>
            </button>
          </div>
          
          <nav className="flex flex-col gap-4">
            <Link 
              className="text-text-light dark:text-text-dark text-base font-medium font-body leading-normal hover:text-secondary" 
              to="/"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setMobileShopExpanded(false);
                setMobileExpandedSection(null);
              }}
            >
              Home
            </Link>
            
            {/* Mobile Shop Section */}
            {!mobileShopExpanded ? (
              // Level 1: Shop Now Button
              <button
                className="text-left text-text-light dark:text-text-dark text-base font-medium font-body leading-normal hover:text-secondary flex items-center gap-2"
                onClick={() => setMobileShopExpanded(true)}
              >
                Shop Now
                <span className="material-symbols-outlined text-sm">keyboard_arrow_right</span>
              </button>
            ) : (
              // Level 2: Shop Categories
              <div className="space-y-2">
                {/* Back Button */}
                <button
                  className="flex items-center gap-2 text-secondary text-sm font-body mb-3"
                  onClick={() => {
                    setMobileShopExpanded(false);
                    setMobileExpandedSection(null);
                  }}
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Back to Menu
                </button>
                
                {!mobileExpandedSection ? (
                  // Level 2: Main Shop Options
                  <>
                    {/* Shop By Type - Direct Link */}
                    <Link
                      className="block text-text-light dark:text-text-dark text-base font-medium font-body leading-normal hover:text-secondary py-2 border-b border-secondary/20"
                      to="/products"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMobileShopExpanded(false);
                        setMobileExpandedSection(null);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>SHOP BY TYPE</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </div>
                    </Link>
                    
                    {/* Collection - Expandable */}
                    <button
                      className="w-full text-left text-text-light dark:text-text-dark text-base font-medium font-body leading-normal hover:text-secondary py-2 border-b border-secondary/20"
                      onClick={() => setMobileExpandedSection('collections')}
                    >
                      <div className="flex items-center justify-between">
                        <span>COLLECTION</span>
                        <span className="material-symbols-outlined text-sm">keyboard_arrow_right</span>
                      </div>
                    </button>
                    
                    {/* Category - Expandable */}
                    <button
                      className="w-full text-left text-text-light dark:text-text-dark text-base font-medium font-body leading-normal hover:text-secondary py-2"
                      onClick={() => setMobileExpandedSection('categories')}
                    >
                      <div className="flex items-center justify-between">
                        <span>CATEGORY</span>
                        <span className="material-symbols-outlined text-sm">keyboard_arrow_right</span>
                      </div>
                    </button>
                  </>
                ) : (
                  // Level 3: Expanded Lists
                  <div className="space-y-1">
                    {/* Back to Shop Options */}
                    <button
                      className="flex items-center gap-2 text-secondary text-sm font-body mb-3"
                      onClick={() => setMobileExpandedSection(null)}
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      Back to Shop
                    </button>
                    
                    {mobileExpandedSection === 'collections' && (
                      <>
                        <h4 className="text-primary dark:text-secondary text-sm font-bold font-display mb-2">COLLECTIONS</h4>
                        {collections.map((collection, index) => (
                          <Link
                            key={index}
                            className="block text-text-light dark:text-text-dark text-sm font-body leading-relaxed hover:text-secondary hover:bg-primary/5 dark:hover:bg-secondary/5 px-2 py-1 rounded"
                            to={`/products?collection=${encodeURIComponent(collection)}`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileShopExpanded(false);
                              setMobileExpandedSection(null);
                            }}
                          >
                            {collection}
                          </Link>
                        ))}
                      </>
                    )}
                    
                    {mobileExpandedSection === 'categories' && (
                      <>
                        <h4 className="text-primary dark:text-secondary text-sm font-bold font-display mb-2">CATEGORIES</h4>
                        {categories.map((category, index) => (
                          <Link
                            key={index}
                            className="block text-text-light dark:text-text-dark text-sm font-body leading-relaxed hover:text-secondary hover:bg-primary/5 dark:hover:bg-secondary/5 px-2 py-1 rounded"
                            to={`/products?category=${encodeURIComponent(category)}`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileShopExpanded(false);
                              setMobileExpandedSection(null);
                            }}
                          >
                            {category}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <Link 
              className="text-text-light dark:text-text-dark text-base font-medium font-body leading-normal hover:text-secondary" 
              to="/about"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setMobileShopExpanded(false);
                setMobileExpandedSection(null);
              }}
            >
              About Us
            </Link>
            <Link 
              className="text-text-light dark:text-text-dark text-base font-medium font-body leading-normal hover:text-secondary" 
              to="/contact"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setMobileShopExpanded(false);
                setMobileExpandedSection(null);
              }}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;