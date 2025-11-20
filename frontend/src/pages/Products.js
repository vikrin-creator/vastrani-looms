import React from 'react';

const Products = () => {
  const productCategories = [
    {
      title: "Banarasi Silk Sarees",
      description: "Luxurious silk sarees with intricate gold and silver brocade work",
      image: "/banarasi-collection.jpg",
      priceRange: "$400 - $800"
    },
    {
      title: "Kanchipuram Silk Sarees",
      description: "Traditional temple border sarees with rich colors and motifs",
      image: "/kanchipuram-collection.jpg",
      priceRange: "$450 - $900"
    },
    {
      title: "Chanderi Cotton Sarees",
      description: "Lightweight, comfortable sarees perfect for daily wear",
      image: "/chanderi-collection.jpg",
      priceRange: "$150 - $350"
    },
    {
      title: "Tussar Silk Sarees",
      description: "Natural textured silk sarees with earthy elegance",
      image: "/tussar-collection.jpg",
      priceRange: "$200 - $500"
    },
    {
      title: "Wedding Collection",
      description: "Exquisite bridal sarees for your special day",
      image: "/wedding-collection.jpg",
      priceRange: "$600 - $1200"
    },
    {
      title: "Festival Collection",
      description: "Vibrant sarees perfect for celebrations",
      image: "/festival-collection.jpg",
      priceRange: "$250 - $600"
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-primary dark:text-secondary text-4xl font-bold font-display leading-tight tracking-[-0.015em] text-center mb-4">
          Our Saree Collections
        </h1>
        <p className="text-center text-text-light/80 dark:text-text-dark/80 font-body mb-10 max-w-2xl mx-auto">
          Discover our curated collections of handwoven sarees, each piece crafted with love and attention to detail. 
          From traditional silk to contemporary cotton, find your perfect saree.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div key={index} className="bg-background-light dark:bg-background-dark border border-secondary/20 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div 
                className="bg-cover bg-center aspect-[4/3] transition-transform duration-300 group-hover:scale-105" 
                style={{ backgroundImage: `url('${category.image}')` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-text-light dark:text-text-dark mb-2">
                  {category.title}
                </h3>
                <p className="font-body text-text-light/80 dark:text-text-dark/80 mb-4">
                  {category.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary dark:text-secondary">
                    {category.priceRange}
                  </span>
                  <button className="bg-primary text-white dark:bg-secondary dark:text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-primary/5 dark:bg-secondary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold font-display text-primary dark:text-secondary mb-4">
            Custom Orders Available
          </h2>
          <p className="font-body text-text-light dark:text-text-dark mb-6 max-w-2xl mx-auto">
            Looking for something specific? We offer custom weaving services where you can work directly 
            with our master weavers to create a unique saree tailored to your preferences.
          </p>
          <button className="bg-primary text-white dark:bg-secondary dark:text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors">
            Inquire About Custom Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;