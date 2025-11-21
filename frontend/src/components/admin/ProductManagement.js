import React, { useState, useEffect } from 'react';
import { dataStore } from '../../data/catalogData';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    sku: '',
    stock: '',
    category: '',
    collection: '',
    colors: [],
    images: []
  });

  const [colorInput, setColorInput] = useState({ name: '', code: '#800000' });

  // Load categories and collections on mount
  useEffect(() => {
    const updateData = () => {
      setCategories(dataStore.getCategories());
      setCollections(dataStore.getCollections());
    };
    
    updateData();
    const unsubscribe = dataStore.subscribe(updateData);
    
    return () => unsubscribe();
  }, []);

  const handleAddColor = () => {
    if (colorInput.name && colorInput.code) {
      setFormData({
        ...formData,
        colors: [...formData.colors, { ...colorInput, id: Date.now() }]
      });
      setColorInput({ name: '', code: '#800000' });
    }
  };

  const handleRemoveColor = (colorId) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter(color => color.id !== colorId)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      salePrice: '',
      sku: '',
      stock: '',
      category: '',
      collection: '',
      colors: [],
      images: []
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-bold text-primary dark:text-secondary">Products</h2>
          <p className="text-sm text-text-light/60 dark:text-text-dark/60 font-body">Manage your saree products</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              salePrice: '',
              sku: '',
              stock: '',
              category: '',
              collection: '',
              colors: [],
              images: []
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary dark:bg-secondary text-white dark:text-primary px-4 py-2 rounded-lg hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors font-body font-semibold"
        >
          <span className="material-symbols-outlined">add</span>
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary/10 dark:bg-secondary/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase tracking-wider">Colors</th>
              <th className="px-6 py-3 text-right text-xs font-body font-bold text-primary dark:text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-text-light/60 dark:text-text-dark/60 font-body">
                  No products added yet. Click "Add Product" to get started.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-primary/5 dark:hover:bg-secondary/5">
                  <td className="px-6 py-4">
                    <div className="font-body font-semibold text-text-light dark:text-text-dark">{product.name}</div>
                    <div className="text-sm text-text-light/60 dark:text-text-dark/60">{product.collection}</div>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{product.sku}</td>
                  <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">
                    ₹{product.price}
                    {product.salePrice && (
                      <span className="ml-2 text-xs text-secondary line-through">₹{product.salePrice}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{product.stock}</td>
                  <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{product.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color) => (
                        <div
                          key={color.id}
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color.code }}
                          title={color.name}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-text-light/60 dark:text-text-dark/60">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-primary dark:text-secondary hover:text-primary/70 dark:hover:text-secondary/70"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-display font-bold text-primary dark:text-secondary">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                    Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                    Collection
                  </label>
                  <select
                    value={formData.collection}
                    onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                  >
                    <option value="">Select Collection</option>
                    {collections.map((col) => (
                      <option key={col.id} value={col.name}>{col.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Color Management */}
              <div>
                <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                  Available Colors
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Color name"
                    value={colorInput.name}
                    onChange={(e) => setColorInput({ ...colorInput, name: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                  />
                  <input
                    type="color"
                    value={colorInput.code}
                    onChange={(e) => setColorInput({ ...colorInput, code: e.target.value })}
                    className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-4 py-2 bg-primary dark:bg-secondary text-white dark:text-primary rounded-lg hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color) => (
                    <div
                      key={color.id}
                      className="flex items-center gap-2 bg-primary/10 dark:bg-secondary/10 px-3 py-2 rounded-lg"
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color.code }}
                      />
                      <span className="text-sm font-body text-text-light dark:text-text-dark">{color.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(color.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                  <p className="text-sm text-text-light/60 dark:text-text-dark/60 font-body">
                    Click to upload or drag and drop images
                  </p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-body"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary dark:bg-secondary text-white dark:text-primary rounded-lg hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors font-body font-semibold"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
