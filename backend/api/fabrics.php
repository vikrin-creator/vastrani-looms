<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Return list of available fabrics
$fabrics = [
    'Pure Silk',
    'Art Silk',
    'Soft Silk',
    'Tussar Silk',
    'Cotton',
    'Cotton Silk',
    'Organza',
    'Chiffon',
    'Georgette',
    'Banarasi Silk',
    'Kanchipuram Silk',
    'Mysore Silk',
    'Chanderi',
    'Linen',
    'Tissue',
    'Crepe',
    'Satin',
    'Net',
    'Velvet',
    'Kota Doria'
];

// Sort alphabetically
sort($fabrics);

echo json_encode([
    'success' => true,
    'data' => $fabrics
]);
