<?php
/**
 * One-time setup script to create reviews table
 * Access this file once via browser: https://your-domain.com/backend/setup_reviews.php
 */

require_once 'config/database.php';

header('Content-Type: text/html; charset=utf-8');

try {
    $db = getDB();
    
    echo "<!DOCTYPE html><html><head><title>Setup Reviews Table</title>";
    echo "<style>body{font-family:Arial,sans-serif;max-width:800px;margin:50px auto;padding:20px;}";
    echo ".success{color:green;}.error{color:red;}.info{color:blue;}</style></head><body>";
    echo "<h1>Reviews Table Setup</h1>";
    
    // Check if table already exists
    $checkTable = $db->query("SHOW TABLES LIKE 'reviews'");
    if ($checkTable->rowCount() > 0) {
        echo "<p class='info'>✓ Reviews table already exists!</p>";
        echo "<p>You can now use the review system. You may delete this setup file for security.</p>";
    } else {
        // Create the reviews table
        $sql = "CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            reviewer_name VARCHAR(255) NOT NULL,
            rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
            comment TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            INDEX idx_product_id (product_id),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
        
        $db->exec($sql);
        
        echo "<p class='success'>✓ Reviews table created successfully!</p>";
        echo "<p>The review system is now ready to use.</p>";
        echo "<p class='info'><strong>Important:</strong> For security, please delete this file (setup_reviews.php) after running it.</p>";
    }
    
    // Show table structure
    echo "<h2>Table Structure:</h2>";
    echo "<pre>";
    $columns = $db->query("DESCRIBE reviews");
    echo str_pad("Field", 20) . str_pad("Type", 20) . str_pad("Null", 8) . "Key\n";
    echo str_repeat("-", 60) . "\n";
    foreach ($columns as $column) {
        echo str_pad($column['Field'], 20) . 
             str_pad($column['Type'], 20) . 
             str_pad($column['Null'], 8) . 
             $column['Key'] . "\n";
    }
    echo "</pre>";
    
    echo "</body></html>";
    
} catch (PDOException $e) {
    echo "<p class='error'>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p>Please check your database configuration and try again.</p>";
    echo "</body></html>";
}
?>
