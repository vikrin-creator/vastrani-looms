import React, { useState, useEffect } from 'react';
import { dataStore } from '../../data/catalogData';

const CategoryManagement = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState('');

  // Load data on mount and subscribe to changes
  useEffect(() => {
    const updateData = () => {
      setCategories(dataStore.getAllCategories());
      setCollections(dataStore.getAllCollections());
    };
    
    updateData();
    const unsubscribe = dataStore.subscribe(updateData);
    
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    try {
      if (activeTab === 'categories') {
        await dataStore.addCategory(itemName);
      } else {
        await dataStore.addCollection(itemName);
      }
      
      setIsModalOpen(false);
      setItemName('');
    } catch (error) {
      alert('Failed to add item: ' + error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      if (activeTab === 'categories') {
        await dataStore.updateCategory(editingItem.id, { name: itemName });
      } else {
        await dataStore.updateCollection(editingItem.id, { name: itemName });
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setItemName('');
    } catch (error) {
      alert('Failed to update item: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item? It will be removed from the Shop Now menu.')) {
      try {
        if (activeTab === 'categories') {
          await dataStore.deleteCategory(id);
        } else {
          await dataStore.deleteCollection(id);
        }
      } catch (error) {
        alert('Failed to delete item: ' + error.message);
      }
    }
  };

  const toggleEnabled = async (id) => {
    try {
      if (activeTab === 'categories') {
        const category = categories.find(c => c.id === id);
        await dataStore.updateCategory(id, { enabled: !category.enabled });
      } else {
        const collection = collections.find(c => c.id === id);
        await dataStore.updateCollection(id, { enabled: !collection.enabled });
      }
    } catch (error) {
      alert('Failed to toggle status: ' + error.message);
    }
  };

  const currentItems = activeTab === 'categories' ? categories : collections;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 font-body font-semibold border-b-2 transition-colors ${
              activeTab === 'categories'
                ? 'border-primary dark:border-secondary text-primary dark:text-secondary'
                : 'border-transparent text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-4 py-2 font-body font-semibold border-b-2 transition-colors ${
              activeTab === 'collections'
                ? 'border-primary dark:border-secondary text-primary dark:text-secondary'
                : 'border-transparent text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark'
            }`}
          >
            Collections
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-bold text-primary dark:text-secondary">
            {activeTab === 'categories' ? 'Categories' : 'Collections'}
          </h2>
          <p className="text-sm text-text-light/60 dark:text-text-dark/60 font-body">
            Manage your product {activeTab}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setItemName('');
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary dark:bg-secondary text-white dark:text-primary px-4 py-2 rounded-lg hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors font-body font-semibold"
        >
          <span className="material-symbols-outlined">add</span>
          Add {activeTab === 'categories' ? 'Category' : 'Collection'}
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary dark:text-secondary">
                  {activeTab === 'categories' ? 'category' : 'collections_bookmark'}
                </span>
              </div>
              <div>
                <p className="font-body font-semibold text-text-light dark:text-text-dark">{item.name}</p>
                <p className="text-xs text-text-light/60 dark:text-text-dark/60">
                  {item.enabled ? 'Active' : 'Disabled'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleEnabled(item.id)}
                className={`p-2 rounded-lg transition-colors ${
                  item.enabled
                    ? 'text-green-600 hover:bg-green-50'
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <span className="material-symbols-outlined">
                  {item.enabled ? 'toggle_on' : 'toggle_off'}
                </span>
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="p-2 text-primary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-display font-bold text-primary dark:text-secondary">
                {editingItem ? 'Edit' : 'Add'} {activeTab === 'categories' ? 'Category' : 'Collection'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-body font-semibold text-text-light dark:text-text-dark mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-text-light dark:text-text-dark"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-body"
                >
                  Cancel
                </button>
                <button
                  onClick={editingItem ? handleUpdate : handleAdd}
                  className="px-6 py-2 bg-primary dark:bg-secondary text-white dark:text-primary rounded-lg hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors font-body font-semibold"
                >
                  {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
