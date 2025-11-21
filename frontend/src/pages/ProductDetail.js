import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductReviews } from '../data/catalogData';
import ReviewModal from '../components/product/ReviewModal';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const fetchReviews = useCallback(async () => {
    try {
      const reviewData = await getProductReviews(id);
      setReviews(reviewData.reviews);
      setAvgRating(reviewData.avgRating);
      setReviewCount(reviewData.reviewCount);
    } catch (error) {
      // Reviews table might not exist yet - set defaults
      console.warn('Reviews not available:', error.message);
      setReviews([]);
      setAvgRating(0);
      setReviewCount(0);
    }
  }, [id]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        console.log('Fetched product data:', data);
        
        // Handle if product is returned as array (take first item)
        const productData = Array.isArray(data.product) ? data.product[0] : data.product;
        
        console.log('Product:', productData);
        console.log('Product name:', productData?.name);
        console.log('Product description:', productData?.description);
        console.log('Product images:', productData?.images);
        console.log('Related products:', data.relatedProducts);
        
        setProduct(productData);
        setRelatedProducts(data.relatedProducts || []);
        
        // Set default selected color to first available color
        if (productData?.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }

        // Fetch reviews
        fetchReviews();
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, fetchReviews]);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', { product, selectedColor });
  };

  const handleAddToWishlist = () => {
    // TODO: Implement add to wishlist functionality
    console.log('Add to wishlist:', product);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl text-primary font-display">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl text-primary font-display">Product not found</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <img
              alt={product.name}
              className="w-full h-full object-cover aspect-[7/6] hover:scale-105 transition-transform duration-500 cursor-zoom-in"
              src={product.images && product.images[selectedImage] ? `https://seashell-yak-534067.hostingersite.com/${product.images[selectedImage].url}` : '/placeholder.jpg'}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-full overflow-hidden rounded-md cursor-pointer transition-all ${
                    selectedImage === index ? 'border-2 border-primary ring-2 ring-primary ring-offset-2' : 'border-2 border-transparent hover:border-primary/50'
                  }`}
                >
                  <img
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                    src={`https://seashell-yak-534067.hostingersite.com/${image.url}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col py-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight text-text-light dark:text-text-dark">
            {product.name}
          </h1>
          <p className="mt-4 text-lg font-body leading-relaxed">
            {product.description}
          </p>
          <div className="mt-4">
            <span className="text-3xl font-display font-bold text-primary">
              ₹{parseFloat(product.price).toLocaleString('en-IN')}
            </span>
            {product.sale_price && (
              <span className="ml-3 text-xl text-gray-500 line-through">
                ₹{parseFloat(product.sale_price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex text-secondary">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`material-symbols-outlined text-xl ${star <= Math.round(avgRating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
              ))}
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="text-sm font-medium text-text-light dark:text-text-dark hover:text-secondary cursor-pointer underline"
            >
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </button>
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-bold font-body mb-2">
                Color: {selectedColor ? selectedColor.name : ''}
              </p>
              <div className="flex items-center gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor?.code === color.code
                        ? 'border-primary ring-2 ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark ring-primary'
                        : 'border-transparent hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-primary text-white font-bold text-base tracking-wide hover:bg-primary/90 transition-colors shadow-md"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex items-center justify-center h-12 w-12 rounded-lg bg-black/5 dark:bg-white/10 text-primary hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined">favorite_border</span>
            </button>
          </div>

          {/* Details Section */}
          <div className="border-t border-black/10 dark:border-white/10 mt-8 pt-6">
            <details className="group" open={detailsOpen} onToggle={(e) => setDetailsOpen(e.target.open)}>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-bold text-lg font-display">Details</span>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <ul className="mt-4 space-y-2 pl-2 text-sm list-disc list-inside font-body">
                {product.fabric && <li>Fabric: {product.fabric}</li>}
                {product.category_name && <li>Category: {product.category_name}</li>}
                {product.collection_name && <li>Collection: {product.collection_name}</li>}
                <li>Care: Dry Clean Only</li>
              </ul>
            </details>
            <hr className="my-4 border-black/10 dark:border-white/10" />
            <details className="group" open={shippingOpen} onToggle={(e) => setShippingOpen(e.target.open)}>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-bold text-lg font-display">Shipping &amp; Returns</span>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed font-body">
                Free shipping on orders above ₹5000. Eligible for returns within 7 days of delivery.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="py-16 mt-16 bg-primary/5 dark:bg-primary/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-center mb-8">Related Products</h2>
        {relatedProducts.length > 0 ? (
          <div className="flex overflow-x-auto pb-4 gap-6 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="flex h-full flex-col gap-3 rounded-lg min-w-64 flex-shrink-0"
              >
                <div
                  className="w-full bg-cover bg-center rounded-lg shadow-md overflow-hidden"
                  style={{
                    backgroundImage: `url('${relatedProduct.images && relatedProduct.images[0] ? `https://seashell-yak-534067.hostingersite.com/${relatedProduct.images[0].url}` : '/placeholder.jpg'}')`
                  }}
                >
                  <div className="w-full aspect-[4/5]"></div>
                </div>
                <div>
                  <p className="font-display font-bold">{relatedProduct.name}</p>
                  <p className="text-sm text-primary font-medium">
                    ₹{parseFloat(relatedProduct.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 font-body">No related products available.</p>
        )}
      </section>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviews={reviews}
        avgRating={avgRating}
        reviewCount={reviewCount}
        productId={id}
        onReviewSubmitted={fetchReviews}
      />
    </div>
  );
};

export default ProductDetail;
