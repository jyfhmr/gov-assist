<?php
require_once __DIR__ . '/../config/database.php';

// --- Cabeceras CORS ---
header("Access-Control-Allow-Origin: http://localhost:3002");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // ✨ Permitir el método OPTIONS
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// ✨ --- Manejo de la solicitud de Preflight (OPTIONS) ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data);

    if (!isset($data->formData) || !isset($data->paymentIntentId)) {
        throw new Exception("Datos incompletos.");
    }

    $formDataJson = json_encode($data->formData);
    $paymentIntentId = $data->paymentIntentId;

    $pdo = getDbConnection();

    $sql = "INSERT INTO applications (form_data, payment_intent_id) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$formDataJson, $paymentIntentId]);
    
    $lastInsertId = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'status' => 'success',
        'message' => 'Aplicación guardada correctamente.',
        'application_id' => $lastInsertId
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'No se pudo guardar la aplicación: ' . $e->getMessage()
    ]);
}