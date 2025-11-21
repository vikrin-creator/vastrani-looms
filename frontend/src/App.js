import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Route - No Header/Footer */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        
        {/* Public Routes - With Header/Footer */}
        <Route path="*" element={
          <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-body">
            <div className="layout-container flex h-full grow flex-col">
              <div className="w-full">
                <div className="layout-content-container flex flex-col w-full">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Homepage />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;