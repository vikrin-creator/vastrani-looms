-- Add fabric column to products table
-- Run this on Hostinger database

USE u177524058_vastranilooms;

ALTER TABLE products 
ADD COLUMN fabric VARCHAR(100) DEFAULT NULL AFTER collection_id;
