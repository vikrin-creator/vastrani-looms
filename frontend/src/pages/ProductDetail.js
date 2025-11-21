import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { getProductById } from '../data/catalogData';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
        
        // Set default selected color to first available color
        if (data.product.colors && data.product.colors.length > 0) {
          setSelectedColor(data.product.colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', { product, selectedColor, quantity });
  };

  const handleAddToWishlist = () => {
    // TODO: Implement add to wishlist functionality
    console.log('Add to wishlist:', product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-maroon font-crimson">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-beige">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-maroon font-crimson">Product not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm font-merriweather">
          <Link to="/" className="text-maroon hover:text-gold transition-colors">Home</Link>
          <span className="mx-2 text-maroon">/</span>
          <Link to="/products" className="text-maroon hover:text-gold transition-colors">Products</Link>
          <span className="mx-2 text-maroon">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-maroon shadow-lg">
              <img
                src={product.images && product.images[selectedImage] ? product.images[selectedImage].url : '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-gold shadow-md' : 'border-maroon/30 hover:border-maroon'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-crimson font-bold text-maroon mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-gold text-xl">
                      star
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 font-merriweather">(4.8)</span>
                </div>
              </div>
              <p className="text-3xl font-crimson font-bold text-maroon mb-4">
                ₹{parseFloat(product.price).toLocaleString('en-IN')}
              </p>
            </div>

            <div className="border-t border-maroon/20 pt-6">
              <p className="text-gray-700 font-merriweather leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Fabric Info */}
            {product.fabric && (
              <div className="border-t border-maroon/20 pt-6">
                <h3 className="text-lg font-crimson font-semibold text-maroon mb-2">Fabric</h3>
                <p className="text-gray-700 font-merriweather">{product.fabric}</p>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="border-t border-maroon/20 pt-6">
                <h3 className="text-lg font-crimson font-semibold text-maroon mb-3">
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative`}
                      title={color.name}
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor?.code === color.code
                            ? 'border-gold shadow-md scale-110'
                            : 'border-maroon/30 hover:border-maroon hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.code }}
                      />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-merriweather whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="border-t border-maroon/20 pt-6">
              <h3 className="text-lg font-crimson font-semibold text-maroon mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border-2 border-maroon text-maroon hover:bg-maroon hover:text-white transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="text-xl font-merriweather w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border-2 border-maroon text-maroon hover:bg-maroon hover:text-white transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-maroon text-white py-3 px-6 rounded-lg font-crimson text-lg hover:bg-maroon/90 transition-colors flex items-center justify-center space-x-2"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleAddToWishlist}
                className="w-14 h-14 border-2 border-maroon text-maroon hover:bg-maroon hover:text-white transition-colors rounded-lg flex items-center justify-center"
              >
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            {/* Collapsible Details */}
            <div className="border-t border-maroon/20 pt-6 space-y-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none font-crimson text-lg text-maroon">
                  <span>Product Details</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="mt-4 text-gray-700 font-merriweather space-y-2">
                  <p><strong>Category:</strong> {product.category_name || 'N/A'}</p>
                  <p><strong>Collection:</strong> {product.collection_name || 'N/A'}</p>
                  {product.fabric && <p><strong>Fabric:</strong> {product.fabric}</p>}
                  <p><strong>SKU:</strong> {product.sku}</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none font-crimson text-lg text-maroon">
                  <span>Shipping & Returns</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="mt-4 text-gray-700 font-merriweather space-y-2">
                  <p>Free shipping on orders above ₹5000</p>
                  <p>Easy returns within 7 days of delivery</p>
                  <p>Delivery in 5-7 business days</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-maroon/20 pt-12">
            <h2 className="text-3xl font-crimson font-bold text-maroon mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-white rounded-lg overflow-hidden border-2 border-maroon/20 hover:border-gold hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.images && relatedProduct.images[0] ? relatedProduct.images[0].url : '/placeholder.jpg'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-crimson text-lg text-maroon mb-2 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xl font-crimson font-bold text-maroon">
                      ₹{parseFloat(relatedProduct.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
