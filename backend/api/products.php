<?php
/**
 * Products API
 * Handles CRUD operations for products
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

// Helper function to delete physical image file
function deleteImageFile($imageUrl) {
    if (empty($imageUrl)) return;
    
    // Convert URL to file path
    $filePath = str_replace('backend/', '../', $imageUrl);
    
    if (file_exists($filePath)) {
        unlink($filePath);
        error_log("Deleted image file: " . $filePath);
    }
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDB();
    
    switch ($method) {
        case 'GET':
            // Check if requesting single product by ID
            $productId = isset($_GET['id']) ? intval($_GET['id']) : null;
            
            if ($productId) {
                // Fetch single product
                $sql = "SELECT p.*, 
                        c.name as category_name, c.slug as category_slug,
                        col.name as collection_name, col.slug as collection_slug
                        FROM products p
                        LEFT JOIN categories c ON p.category_id = c.id
                        LEFT JOIN collections col ON p.collection_id = col.id
                        WHERE p.id = ?";
                
                $stmt = $db->prepare($sql);
                $stmt->execute([$productId]);
                $product = $stmt->fetch();
                
                if (!$product) {
                    echo json_encode([
                        'success' => false,
                        'message' => 'Product not found'
                    ]);
                    break;
                }
                
                // Get colors
                $colorStmt = $db->prepare("SELECT id, product_id, color_name as name, color_code as code, stock FROM product_colors WHERE product_id = ?");
                $colorStmt->execute([$productId]);
                $product['colors'] = $colorStmt->fetchAll();
                
                // Get images
                $imageStmt = $db->prepare("SELECT id, product_id, image_url as url, alt_text, display_order, is_primary FROM product_images WHERE product_id = ? ORDER BY display_order ASC");
                $imageStmt->execute([$productId]);
                $product['images'] = $imageStmt->fetchAll();
                
                // Convert boolean values
                $product['enabled'] = (bool)$product['enabled'];
                $product['featured'] = (bool)$product['featured'];
                
                echo json_encode([
                    'success' => true,
                    'data' => $product
                ]);
                break;
            }
            
            // Get filter parameters for listing products
            $categoryId = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;
            $collectionId = isset($_GET['collection_id']) ? intval($_GET['collection_id']) : null;
            $categoryName = isset($_GET['category']) ? $_GET['category'] : null;
            $collectionName = isset($_GET['collection']) ? $_GET['collection'] : null;
            $includeDisabled = isset($_GET['include_disabled']) && $_GET['include_disabled'] === 'true';
            
            // Build query based on filters
            $sql = "SELECT p.*, 
                    c.name as category_name, c.slug as category_slug,
                    col.name as collection_name, col.slug as collection_slug
                    FROM products p
                    LEFT JOIN categories c ON p.category_id = c.id
                    LEFT JOIN collections col ON p.collection_id = col.id";
            
            $where = [];
            $params = [];
            
            // Only filter by enabled status if not including disabled
            if (!$includeDisabled) {
                $where[] = "p.enabled = 1";
            }
            
            // Filter by category
            if ($categoryId) {
                $where[] = "p.category_id = ?";
                $params[] = $categoryId;
            } elseif ($categoryName) {
                $where[] = "c.name = ?";
                $params[] = $categoryName;
            }
            
            // Filter by collection
            if ($collectionId) {
                $where[] = "p.collection_id = ?";
                $params[] = $collectionId;
            } elseif ($collectionName) {
                $where[] = "col.name = ?";
                $params[] = $collectionName;
            }
            
            if (!empty($where)) {
                $sql .= " WHERE " . implode(" AND ", $where);
            }
            
            $sql .= " ORDER BY p.featured DESC, p.created_at DESC";
            
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $products = $stmt->fetchAll();
            
            // Fetch product colors and images for each product
            foreach ($products as &$product) {
                // Get colors - map column names to match frontend expectations
                $colorStmt = $db->prepare("SELECT id, product_id, color_name as name, color_code as code, stock FROM product_colors WHERE product_id = ?");
                $colorStmt->execute([$product['id']]);
                $product['colors'] = $colorStmt->fetchAll();
                
                // Get images - map column names to match frontend expectations
                $imageStmt = $db->prepare("SELECT id, product_id, image_url as url, alt_text, display_order, is_primary FROM product_images WHERE product_id = ? ORDER BY display_order ASC");
                $imageStmt->execute([$product['id']]);
                $product['images'] = $imageStmt->fetchAll();
                
                // Convert boolean values
                $product['enabled'] = (bool)$product['enabled'];
                $product['featured'] = (bool)$product['featured'];
            }
            
            echo json_encode([
                'success' => true,
                'data' => $products,
                'count' => count($products)
            ]);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Validate required fields
            if (empty($data['name']) || empty($data['price']) || empty($data['category_id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields: name, price, category_id']);
                exit;
            }
            
            // Start transaction
            $db->beginTransaction();
            
            try {
                // Generate slug and SKU from product name
                $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', trim($data['name'])));
                $sku = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]+/', '', $data['name']), 0, 8) . '-' . time());
                $enabled = isset($data['enabled']) ? (int)$data['enabled'] : 1;
                $featured = isset($data['featured']) ? (int)$data['featured'] : 0;
                
                // Check if fabric column exists
                $checkColumn = $db->query("SHOW COLUMNS FROM products LIKE 'fabric'");
                $hasFabricColumn = $checkColumn->rowCount() > 0;
                
                // Insert product - conditionally include fabric
                if ($hasFabricColumn) {
                    $sql = "INSERT INTO products (name, slug, sku, description, price, sale_price, stock, 
                            category_id, collection_id, fabric, enabled, featured) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    
                    $params = [
                        $data['name'],
                        $slug,
                        $sku,
                        $data['description'] ?? null,
                        $data['price'],
                        $data['sale_price'] ?? null,
                        $data['stock'] ?? 0,
                        $data['category_id'],
                        $data['collection_id'] ?? null,
                        $data['fabric'] ?? null,
                        $enabled,
                        $featured
                    ];
                } else {
                    $sql = "INSERT INTO products (name, slug, sku, description, price, sale_price, stock, 
                            category_id, collection_id, enabled, featured) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    
                    $params = [
                        $data['name'],
                        $slug,
                        $sku,
                        $data['description'] ?? null,
                        $data['price'],
                        $data['sale_price'] ?? null,
                        $data['stock'] ?? 0,
                        $data['category_id'],
                        $data['collection_id'] ?? null,
                        $enabled,
                        $featured
                    ];
                }
                
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                
                $productId = $db->lastInsertId();
                
                // Insert colors if provided
                if (!empty($data['colors']) && is_array($data['colors'])) {
                    $colorSql = "INSERT INTO product_colors (product_id, color_name, color_code) VALUES (?, ?, ?)";
                    $colorStmt = $db->prepare($colorSql);
                    
                    foreach ($data['colors'] as $color) {
                        if (!empty($color['name']) && !empty($color['code'])) {
                            $colorStmt->execute([$productId, $color['name'], $color['code']]);
                        }
                    }
                }
                
                // Insert images if provided
                if (!empty($data['images']) && is_array($data['images'])) {
                    $imageSql = "INSERT INTO product_images (product_id, image_url, alt_text, display_order) VALUES (?, ?, ?, ?)";
                    $imageStmt = $db->prepare($imageSql);
                    
                    foreach ($data['images'] as $index => $image) {
                        if (!empty($image['url'])) {
                            $imageStmt->execute([
                                $productId, 
                                $image['url'], 
                                $image['alt_text'] ?? $data['name'],
                                $index
                            ]);
                        }
                    }
                }
                
                $db->commit();
                
                // Fetch the newly created product with all details
                $stmt = $db->prepare("SELECT p.*, 
                    c.name as category_name, 
                    col.name as collection_name
                    FROM products p
                    LEFT JOIN categories c ON p.category_id = c.id
                    LEFT JOIN collections col ON p.collection_id = col.id
                    WHERE p.id = ?");
                $stmt->execute([$productId]);
                $product = $stmt->fetch();
                
                // Get colors - map column names
                $colorStmt = $db->prepare("SELECT id, product_id, color_name as name, color_code as code, stock FROM product_colors WHERE product_id = ?");
                $colorStmt->execute([$productId]);
                $product['colors'] = $colorStmt->fetchAll();
                
                // Get images - map column names
                $imageStmt = $db->prepare("SELECT id, product_id, image_url as url, alt_text, display_order, is_primary FROM product_images WHERE product_id = ? ORDER BY display_order ASC");
                $imageStmt->execute([$productId]);
                $product['images'] = $imageStmt->fetchAll();
                
                http_response_code(201);
                echo json_encode(['success' => true, 'data' => $product]);
                
            } catch (Exception $e) {
                $db->rollBack();
                throw $e;
            }
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (empty($data['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Product ID is required']);
                exit;
            }
            
            // Start transaction
            $db->beginTransaction();
            
            try {
                // Generate slug and SKU if product name changed
                $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', trim($data['name'])));
                $sku = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]+/', '', $data['name']), 0, 8) . '-' . substr($data['id'], -4));
                $enabled = isset($data['enabled']) ? (int)$data['enabled'] : 1;
                $featured = isset($data['featured']) ? (int)$data['featured'] : 0;
                
                // Check if fabric column exists
                $checkColumn = $db->query("SHOW COLUMNS FROM products LIKE 'fabric'");
                $hasFabricColumn = $checkColumn->rowCount() > 0;
                
                // Update product - conditionally include fabric
                if ($hasFabricColumn) {
                    $sql = "UPDATE products SET 
                            name = ?, slug = ?, sku = ?, description = ?, 
                            price = ?, sale_price = ?, stock = ?, 
                            category_id = ?, collection_id = ?, fabric = ?,
                            enabled = ?, featured = ?
                            WHERE id = ?";
                    
                    $params = [
                        $data['name'],
                        $slug,
                        $sku,
                        $data['description'] ?? null,
                        $data['price'],
                        $data['sale_price'] ?? null,
                        $data['stock'] ?? 0,
                        $data['category_id'],
                        $data['collection_id'] ?? null,
                        $data['fabric'] ?? null,
                        $enabled,
                        $featured,
                        $data['id']
                    ];
                } else {
                    $sql = "UPDATE products SET 
                            name = ?, slug = ?, sku = ?, description = ?, 
                            price = ?, sale_price = ?, stock = ?, 
                            category_id = ?, collection_id = ?,
                            enabled = ?, featured = ?
                            WHERE id = ?";
                    
                    $params = [
                        $data['name'],
                        $slug,
                        $sku,
                        $data['description'] ?? null,
                        $data['price'],
                        $data['sale_price'] ?? null,
                        $data['stock'] ?? 0,
                        $data['category_id'],
                        $data['collection_id'] ?? null,
                        $enabled,
                        $featured,
                        $data['id']
                    ];
                }
                
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                
                // Update images - get old images first to delete physical files
                if (isset($data['images'])) {
                    // Get existing images
                    $oldImagesStmt = $db->prepare("SELECT image_url FROM product_images WHERE product_id = ?");
                    $oldImagesStmt->execute([$data['id']]);
                    $oldImages = $oldImagesStmt->fetchAll();
                    
                    // Delete old physical files
                    foreach ($oldImages as $oldImage) {
                        deleteImageFile($oldImage['image_url']);
                    }
                    
                    // Delete old image records
                    $db->prepare("DELETE FROM product_images WHERE product_id = ?")->execute([$data['id']]);
                    
                    // Insert new images
                    if (!empty($data['images']) && is_array($data['images'])) {
                        $imageSql = "INSERT INTO product_images (product_id, image_url, alt_text, display_order) VALUES (?, ?, ?, ?)";
                        $imageStmt = $db->prepare($imageSql);
                        
                        foreach ($data['images'] as $index => $image) {
                            if (!empty($image['url'])) {
                                $imageStmt->execute([
                                    $data['id'],
                                    $image['url'],
                                    $image['alt_text'] ?? '',
                                    $index
                                ]);
                            }
                        }
                    }
                }
                
                // Update colors - delete all and re-insert
                $db->prepare("DELETE FROM product_colors WHERE product_id = ?")->execute([$data['id']]);
                
                if (!empty($data['colors']) && is_array($data['colors'])) {
                    $colorSql = "INSERT INTO product_colors (product_id, color_name, color_code) VALUES (?, ?, ?)";
                    $colorStmt = $db->prepare($colorSql);
                    
                    foreach ($data['colors'] as $color) {
                        if (!empty($color['name']) && !empty($color['code'])) {
                            $colorStmt->execute([$data['id'], $color['name'], $color['code']]);
                        }
                    }
                }
                
                $db->commit();
                
                echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
                
            } catch (Exception $e) {
                $db->rollBack();
                throw $e;
            }
            break;
            
        case 'DELETE':
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (empty($data['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Product ID is required']);
                exit;
            }
            
            // Start transaction
            $db->beginTransaction();
            
            try {
                // Get all image paths before deleting
                $imageStmt = $db->prepare("SELECT image_url FROM product_images WHERE product_id = ?");
                $imageStmt->execute([$data['id']]);
                $images = $imageStmt->fetchAll();
                
                // Delete physical image files
                foreach ($images as $image) {
                    deleteImageFile($image['image_url']);
                }
                
                // Delete colors
                $db->prepare("DELETE FROM product_colors WHERE product_id = ?")->execute([$data['id']]);
                
                // Delete images from database
                $db->prepare("DELETE FROM product_images WHERE product_id = ?")->execute([$data['id']]);
                
                // Delete product
                $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
                $stmt->execute([$data['id']]);
                
                $db->commit();
                
                echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
                
            } catch (Exception $e) {
                $db->rollBack();
                throw $e;
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }

} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Database error occurred',
        'error' => $e->getMessage() // Include error for debugging
    ]);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'An error occurred',
        'error' => $e->getMessage() // Include error for debugging
    ]);
}
?>
