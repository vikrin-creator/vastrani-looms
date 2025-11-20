import React from 'react';

// Auto-deployment test - this comment will trigger a build and deployment
const Homepage = () => {
  return (
    <>
      {/* HeroSection */}
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="relative @container">
          <div 
            className="flex min-h-[60vh] flex-col gap-6 rounded-lg bg-cover bg-center bg-no-repeat items-center justify-center p-4" 
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("/hero-section.png")`
            }}
          >
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-wide">
                <span>Weaving a Legacy of Timeless</span>
                <br />
                <span>Elegance</span>
              </h1>
              <h2 className="text-white/90 text-lg font-body font-normal leading-normal @[480px]:text-xl">
                Experience the artistry of handcrafted sarees, a tradition passed down through generations.
              </h2>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 @[480px]:h-14 @[480px]:px-8 bg-secondary text-primary text-base font-bold font-body leading-normal tracking-[0.015em] hover:bg-secondary/90 transition-colors">
              <span className="truncate">Discover Our Heritage</span>
            </button>
          </div>
        </div>
      </section>

      {/* Shop By Occasion */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="decorative-frame">
          <h2 className="text-primary dark:text-secondary text-3xl font-bold font-display leading-tight tracking-[-0.015em] text-center pb-6">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group relative overflow-hidden rounded-lg">
              <div 
                className="bg-cover bg-center flex flex-col justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" 
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%), url("/Wedding.png")`
                }}
              >
                <p className="text-white text-xl font-bold font-display leading-tight w-full text-center">Kanchipuram</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg">
              <div 
                className="bg-cover bg-center flex flex-col justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" 
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%), url("/Festive.png")`
                }}
              >
                <p className="text-white text-xl font-bold font-display leading-tight w-full text-center">Banarasi</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg">
              <div 
                className="bg-cover bg-center flex flex-col justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" 
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%), url("/Casual.png")`
                }}
              >
                <p className="text-white text-xl font-bold font-display leading-tight w-full text-center">Mysoure Silk</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg">
              <div 
                className="bg-cover bg-center flex flex-col justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" 
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%), url("/Formal.png")`
                }}
              >
                <p className="text-white text-xl font-bold font-display leading-tight w-full text-center">Soft Silk</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg">
              <div 
                className="bg-cover bg-center flex flex-col justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" 
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%), url("/organza.png")`
                }}
              >
                <p className="text-white text-xl font-bold font-display leading-tight w-full text-center">Organza</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg">
              <div 
                className="bg-cover bg-center flex flex-col justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" 
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%), url("/Linen.png")`
                }}
              >
                <p className="text-white text-xl font-bold font-display leading-tight w-full text-center">Linen</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg">
              <div 
                className="bg-cover bg-center flex flex-col justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" 
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%), url("/Tussar.png")`
                }}
              >
                <p className="text-white text-xl font-bold font-display leading-tight w-full text-center">Tussar</p>
              </div>
            </div>
                

          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-primary dark:text-secondary text-3xl font-bold font-display leading-tight tracking-[-0.015em] text-center pb-6">
          Our Bestsellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-background-light dark:bg-background-dark border border-secondary/20 rounded-lg overflow-hidden group">
            <div 
              className="bg-cover bg-center aspect-square" 
              style={{ backgroundImage: `url('/Royal Banarasi Silk.png')` }}
            ></div>
            <div className="p-4">
              <h3 className="text-lg font-bold font-display text-text-light dark:text-text-dark">Royal Banarasi Silk</h3>
              <p className="font-body text-text-light/80 dark:text-text-dark/80">An exquisite handwoven masterpiece.</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-primary dark:text-secondary">₹4999</span>
                <button className="bg-primary text-white dark:bg-secondary dark:text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-background-light dark:bg-background-dark border border-secondary/20 rounded-lg overflow-hidden group">
            <div 
              className="bg-cover bg-center aspect-square" 
              style={{ backgroundImage: `url('/Kanchipuram Grandeur.png')` }}
            ></div>
            <div className="p-4">
              <h3 className="text-lg font-bold font-display text-text-light dark:text-text-dark">Kanchipuram Grandeur</h3>
              <p className="font-body text-text-light/80 dark:text-text-dark/80">Pure silk with traditional temple borders.</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-primary dark:text-secondary">₹5500</span>
                <button className="bg-primary text-white dark:bg-secondary dark:text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-background-light dark:bg-background-dark border border-secondary/20 rounded-lg overflow-hidden group">
            <div 
              className="bg-cover bg-center aspect-square" 
              style={{ backgroundImage: `url('/Elegant Chanderi Cotton.png')` }}
            ></div>
            <div className="p-4">
              <h3 className="text-lg font-bold font-display text-text-light dark:text-text-dark">Elegant Chanderi Cotton</h3>
              <p className="font-body text-text-light/80 dark:text-text-dark/80">Lightweight and perfect for day wear.</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-primary dark:text-secondary">₹2500</span>
                <button className="bg-primary text-white dark:bg-secondary dark:text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-primary/5 dark:bg-secondary/5">
        <h2 className="text-primary dark:text-secondary text-3xl font-bold font-display leading-tight tracking-[-0.015em] text-center pb-8">
          Why Choose Vastrani Looms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="text-secondary text-5xl">
              <span className="material-symbols-outlined !text-5xl">spa</span>
            </div>
            <h3 className="text-xl font-bold font-display text-text-light dark:text-text-dark">Handwoven Artistry</h3>
            <p className="text-text-light/80 dark:text-text-dark/80 font-body">
              Each saree is a unique piece of art, crafted by master weavers with generations of expertise.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="text-secondary text-5xl">
              <span className="material-symbols-outlined !text-5xl">verified</span>
            </div>
            <h3 className="text-xl font-bold font-display text-text-light dark:text-text-dark">Authentic Materials</h3>
            <p className="text-text-light/80 dark:text-text-dark/80 font-body">
              We use only the finest, ethically-sourced silks, cottons, and zari for unmatched quality.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="text-secondary text-5xl">
              <span className="material-symbols-outlined !text-5xl">auto_awesome</span>
            </div>
            <h3 className="text-xl font-bold font-display text-text-light dark:text-text-dark">Timeless Designs</h3>
            <p className="text-text-light/80 dark:text-text-dark/80 font-body">
              Our collections blend classic motifs with contemporary elegance, creating heirlooms for the future.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-primary dark:text-secondary text-3xl font-bold font-display leading-tight tracking-[-0.015em] text-center pb-8">
          What Our Patrons Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="decorative-frame">
            <p className="font-body italic text-text-light dark:text-text-dark">
              "The saree I received was breathtaking. The quality is beyond anything I've found online. It was the star of the wedding!"
            </p>
            <p className="font-display font-bold text-primary dark:text-secondary mt-4">- Ananya Sharma</p>
          </div>
          
          <div className="decorative-frame">
            <p className="font-body italic text-text-light dark:text-text-dark">
              "Vastrani Looms understands heritage and luxury. Their collection is curated with impeccable taste. Highly recommended."
            </p>
            <p className="font-display font-bold text-primary dark:text-secondary mt-4">- Priya Kulkarni</p>
          </div>
          
          <div className="decorative-frame">
            <p className="font-body italic text-text-light dark:text-text-dark">
              "I bought a gift for my mother, and she was overjoyed. The craftsmanship is truly exceptional. Thank you for preserving this art."
            </p>
            <p className="font-display font-bold text-primary dark:text-secondary mt-4">- Rohan Desai</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;