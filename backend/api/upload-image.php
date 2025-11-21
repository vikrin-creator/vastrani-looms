<?php
/**
 * Image Upload API
 * Handles product image uploads to server
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Check if file was uploaded
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No image file provided']);
        exit();
    }
    
    $file = $_FILES['image'];
    
    // Validate file upload
    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'File upload error: ' . $file['error']]);
        exit();
    }
    
    // Validate file type
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    $fileType = mime_content_type($file['tmp_name']);
    
    if (!in_array($fileType, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG, GIF, and WebP allowed']);
        exit();
    }
    
    // Validate file size (max 5MB)
    $maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'File too large. Maximum size is 5MB']);
        exit();
    }
    
    // Create upload directory if it doesn't exist
    $uploadDir = '../uploads/products/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'product-' . uniqid() . '-' . time() . '.' . $extension;
    $uploadPath = $uploadDir . $filename;
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        // Return the relative path for database storage
        $relativePath = 'backend/uploads/products/' . $filename;
        
        echo json_encode([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'data' => [
                'url' => $relativePath,
                'filename' => $filename
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to save uploaded file']);
    }
    
} catch (Exception $e) {
    error_log("Image Upload Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred during upload']);
}
?>
