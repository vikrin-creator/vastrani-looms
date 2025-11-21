<?php
/**
 * Collections API
 * Handles CRUD operations for product collections
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

// Get request method and ID
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

try {
    $db = getDB();

    switch ($method) {
        case 'GET':
            if ($id) {
                // Get single collection
                $stmt = $db->prepare("SELECT * FROM collections WHERE id = ?");
                $stmt->execute([$id]);
                $collection = $stmt->fetch();
                
                if ($collection) {
                    // Convert boolean values
                    $collection['enabled'] = (bool)$collection['enabled'];
                    echo json_encode(['success' => true, 'data' => $collection]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Collection not found']);
                }
            } else {
                // Get all collections
                $stmt = $db->query("SELECT * FROM collections ORDER BY display_order ASC");
                $collections = $stmt->fetchAll();
                
                // Convert boolean values
                foreach ($collections as &$collection) {
                    $collection['enabled'] = (bool)$collection['enabled'];
                }
                
                echo json_encode(['success' => true, 'data' => $collections]);
            }
            break;

        case 'POST':
            // Create new collection
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['name']) || empty($data['name'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Collection name is required']);
                exit();
            }
            
            $name = trim($data['name']);
            $slug = strtolower(str_replace(' ', '-', $name));
            $enabled = isset($data['enabled']) ? (bool)$data['enabled'] : true;
            
            // Get next display order
            $stmt = $db->query("SELECT MAX(display_order) as max_order FROM collections");
            $result = $stmt->fetch();
            $displayOrder = ($result['max_order'] ?? 0) + 1;
            
            $stmt = $db->prepare("
                INSERT INTO collections (name, slug, enabled, display_order) 
                VALUES (?, ?, ?, ?)
            ");
            
            $stmt->execute([$name, $slug, $enabled, $displayOrder]);
            $newId = $db->lastInsertId();
            
            // Fetch the newly created collection
            $stmt = $db->prepare("SELECT * FROM collections WHERE id = ?");
            $stmt->execute([$newId]);
            $collection = $stmt->fetch();
            $collection['enabled'] = (bool)$collection['enabled'];
            
            http_response_code(201);
            echo json_encode(['success' => true, 'data' => $collection, 'message' => 'Collection created successfully']);
            break;

        case 'PUT':
            // Update collection
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Collection ID is required']);
                exit();
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Build update query dynamically based on provided fields
            $updateFields = [];
            $params = [];
            
            if (isset($data['name'])) {
                $updateFields[] = "name = ?";
                $params[] = trim($data['name']);
                
                // Update slug if name is updated
                $updateFields[] = "slug = ?";
                $params[] = strtolower(str_replace(' ', '-', trim($data['name'])));
            }
            
            if (isset($data['enabled'])) {
                $updateFields[] = "enabled = ?";
                $params[] = (bool)$data['enabled'];
            }
            
            if (isset($data['display_order'])) {
                $updateFields[] = "display_order = ?";
                $params[] = intval($data['display_order']);
            }
            
            if (empty($updateFields)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'No fields to update']);
                exit();
            }
            
            $params[] = $id;
            $sql = "UPDATE collections SET " . implode(', ', $updateFields) . " WHERE id = ?";
            
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            
            // Fetch updated collection
            $stmt = $db->prepare("SELECT * FROM collections WHERE id = ?");
            $stmt->execute([$id]);
            $collection = $stmt->fetch();
            
            if ($collection) {
                $collection['enabled'] = (bool)$collection['enabled'];
                echo json_encode(['success' => true, 'data' => $collection, 'message' => 'Collection updated successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Collection not found']);
            }
            break;

        case 'DELETE':
            // Delete collection
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Collection ID is required']);
                exit();
            }
            
            $stmt = $db->prepare("DELETE FROM collections WHERE id = ?");
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Collection deleted successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Collection not found']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }

} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error occurred']);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred']);
}
?>
