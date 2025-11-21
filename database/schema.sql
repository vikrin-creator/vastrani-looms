-- Vastrani Looms Database Schema
-- Created: November 21, 2025

-- Create Database
CREATE DATABASE IF NOT EXISTS vastrani_looms 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE vastrani_looms;

-- =============================================
-- Categories Table
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    enabled BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_enabled (enabled),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Collections Table
-- =============================================
CREATE TABLE IF NOT EXISTS collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    enabled BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_enabled (enabled),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Products Table
-- =============================================
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    sku VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2) DEFAULT NULL,
    stock INT DEFAULT 0,
    category_id INT,
    collection_id INT,
    enabled BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_collection (collection_id),
    INDEX idx_enabled (enabled),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Product Colors Table
-- =============================================
CREATE TABLE IF NOT EXISTS product_colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    color_name VARCHAR(100) NOT NULL,
    color_code VARCHAR(7) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Product Images Table
-- =============================================
CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Insert Default Categories
-- =============================================
INSERT INTO categories (name, slug, enabled, display_order) VALUES
('Kanchipuram', 'kanchipuram', TRUE, 1),
('Banarasi', 'banarasi', TRUE, 2),
('Mysore Silk', 'mysore-silk', TRUE, 3),
('Soft Silk', 'soft-silk', TRUE, 4),
('Organza', 'organza', TRUE, 5),
('Linen', 'linen', TRUE, 6),
('Tussar', 'tussar', TRUE, 7),
('Chanderi', 'chanderi', TRUE, 8),
('Cotton', 'cotton', TRUE, 9),
('Pure Silk', 'pure-silk', TRUE, 10),
('Designer Sarees', 'designer-sarees', TRUE, 11),
('Soft Banarasi', 'soft-banarasi', TRUE, 12),
('Semi Banarasi', 'semi-banarasi', TRUE, 13),
('Tissue Banarasi', 'tissue-banarasi', TRUE, 14),
('Gadwal', 'gadwal', TRUE, 15),
('Narayanpet', 'narayanpet', TRUE, 16),
('Ikkat', 'ikkat', TRUE, 17),
('Kanchi Padya', 'kanchi-padya', TRUE, 18);

-- =============================================
-- Insert Default Collections
-- =============================================
INSERT INTO collections (name, slug, enabled, display_order) VALUES
('Kanjivaram Classics', 'kanjivaram-classics', TRUE, 1),
('Banarasi Heritage Weaves', 'banarasi-heritage-weaves', TRUE, 2),
('Chanderi Grace Collection', 'chanderi-grace-collection', TRUE, 3),
('Patola & Bandhej Treasures', 'patola-bandhej-treasures', TRUE, 4),
('Kota Doria Light Weaves', 'kota-doria-light-weaves', TRUE, 5),
('Tussar & Bhagalpuri Elegance', 'tussar-bhagalpuri-elegance', TRUE, 6),
('Zari Royale Collection', 'zari-royale-collection', TRUE, 7),
('Handcrafted Luxe Sarees', 'handcrafted-luxe-sarees', TRUE, 8),
('Pure Silk Premium Edit', 'pure-silk-premium-edit', TRUE, 9),
('Embroidered Grand Couture', 'embroidered-grand-couture', TRUE, 10),
('Heirloom Wedding Luxuries', 'heirloom-wedding-luxuries', TRUE, 11),
('Bridal Radiance Collection', 'bridal-radiance-collection', TRUE, 12),
('Festive Sparkle Edit', 'festive-sparkle-edit', TRUE, 13),
('Party Glam Sarees', 'party-glam-sarees', TRUE, 14),
('Haldi–Mehndi Celebration Picks', 'haldi-mehndi-celebration-picks', TRUE, 15);
