<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

$db = getDB();

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // Get reviews for a specific product
            if (isset($_GET['product_id'])) {
                $productId = intval($_GET['product_id']);
                
                $query = "SELECT r.*, 
                         (SELECT AVG(rating) FROM reviews WHERE product_id = ?) as avg_rating,
                         (SELECT COUNT(*) FROM reviews WHERE product_id = ?) as review_count
                         FROM reviews r 
                         WHERE r.product_id = ? 
                         ORDER BY r.created_at DESC";
                
                $stmt = $db->prepare($query);
                $stmt->execute([$productId, $productId, $productId]);
                
                $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Calculate avg_rating and review_count
                $avgRating = 0;
                $reviewCount = count($reviews);
                
                // Format dates and rating
                foreach ($reviews as &$review) {
                    $review['rating'] = floatval($review['rating']);
                    if (isset($review['avg_rating'])) {
                        $avgRating = $review['avg_rating'] ? round(floatval($review['avg_rating']), 1) : 0;
                    }
                    if (isset($review['review_count'])) {
                        $reviewCount = intval($review['review_count']);
                    }
                    $review['created_at'] = date('F j, Y', strtotime($review['created_at']));
                    // Remove these from individual reviews to avoid confusion
                    unset($review['avg_rating']);
                    unset($review['review_count']);
                }
                
                echo json_encode([
                    'success' => true,
                    'reviews' => $reviews,
                    'avg_rating' => $avgRating,
                    'review_count' => $reviewCount
                ]);
                
            } else if (isset($_GET['id'])) {
                // Get single review by ID
                $reviewId = intval($_GET['id']);
                
                $query = "SELECT * FROM reviews WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':id', $reviewId);
                $stmt->execute();
                
                $review = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($review) {
                    $review['rating'] = floatval($review['rating']);
                    echo json_encode(['success' => true, 'review' => $review]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Review not found']);
                }
                
            } else {
                // Get all reviews (for admin)
                $query = "SELECT r.*, p.name as product_name 
                         FROM reviews r 
                         LEFT JOIN products p ON r.product_id = p.id 
                         ORDER BY r.created_at DESC";
                
                $stmt = $db->query($query);
                $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                foreach ($reviews as &$review) {
                    $review['rating'] = floatval($review['rating']);
                }
                
                echo json_encode(['success' => true, 'reviews' => $reviews]);
            }
            break;
            
        case 'POST':
            // Create new review
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!isset($data['product_id']) || !isset($data['reviewer_name']) || 
                !isset($data['rating']) || !isset($data['comment'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                break;
            }
            
            $productId = intval($data['product_id']);
            $reviewerName = trim($data['reviewer_name']);
            $rating = floatval($data['rating']);
            $comment = trim($data['comment']);
            
            // Validate rating
            if ($rating < 1 || $rating > 5) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Rating must be between 1 and 5']);
                break;
            }
            
            // Validate required fields
            if (empty($reviewerName) || empty($comment)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Reviewer name and comment are required']);
                break;
            }
            
            $query = "INSERT INTO reviews (product_id, reviewer_name, rating, comment) 
                     VALUES (:product_id, :reviewer_name, :rating, :comment)";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':product_id', $productId);
            $stmt->bindParam(':reviewer_name', $reviewerName);
            $stmt->bindParam(':rating', $rating);
            $stmt->bindParam(':comment', $comment);
            
            if ($stmt->execute()) {
                $reviewId = $db->lastInsertId();
                
                // Fetch the created review
                $query = "SELECT * FROM reviews WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':id', $reviewId);
                $stmt->execute();
                $review = $stmt->fetch(PDO::FETCH_ASSOC);
                
                echo json_encode([
                    'success' => true, 
                    'message' => 'Review created successfully',
                    'review' => $review
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to create review']);
            }
            break;
            
        case 'PUT':
            // Update review (admin only)
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!isset($data['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Review ID is required']);
                break;
            }
            
            $reviewId = intval($data['id']);
            
            // Build update query dynamically based on provided fields
            $updateFields = [];
            $params = [':id' => $reviewId];
            
            if (isset($data['reviewer_name'])) {
                $updateFields[] = "reviewer_name = :reviewer_name";
                $params[':reviewer_name'] = trim($data['reviewer_name']);
            }
            
            if (isset($data['rating'])) {
                $rating = floatval($data['rating']);
                if ($rating < 1 || $rating > 5) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'Rating must be between 1 and 5']);
                    break;
                }
                $updateFields[] = "rating = :rating";
                $params[':rating'] = $rating;
            }
            
            if (isset($data['comment'])) {
                $updateFields[] = "comment = :comment";
                $params[':comment'] = trim($data['comment']);
            }
            
            if (empty($updateFields)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'No fields to update']);
                break;
            }
            
            $query = "UPDATE reviews SET " . implode(', ', $updateFields) . " WHERE id = :id";
            
            $stmt = $db->prepare($query);
            
            if ($stmt->execute($params)) {
                // Fetch updated review
                $query = "SELECT * FROM reviews WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':id', $reviewId);
                $stmt->execute();
                $review = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($review) {
                    echo json_encode([
                        'success' => true, 
                        'message' => 'Review updated successfully',
                        'review' => $review
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Review not found']);
                }
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to update review']);
            }
            break;
            
        case 'DELETE':
            // Delete review (admin only)
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!isset($data['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Review ID is required']);
                break;
            }
            
            $reviewId = intval($data['id']);
            
            $query = "DELETE FROM reviews WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $reviewId);
            
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    echo json_encode([
                        'success' => true, 
                        'message' => 'Review deleted successfully'
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Review not found']);
                }
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to delete review']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
