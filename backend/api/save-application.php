<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/database.php';

$frontendUrl = $_ENV['FRONTEND_URl'];

// --- Cabeceras CORS ---
header("Access-Control-Allow-Origin:$frontendUrl"); // Cambia esto en producción
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");

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

    // --- ✨ LECTURA DE LOS NUEVOS DATOS DE PAGO ---
    $formData = $data->formData;
    $paymentIntentId = $data->paymentIntentId;

    // Extraemos los detalles del pago del objeto formData
    $amountPaid = $formData->paymentDetails->total ?? 0.00;
    $expediteOption = $formData->paymentDetails->expediteOption ?? 'N/A';
    $refusalGuarantee = $formData->paymentDetails->refusalGuarantee ?? false;

    // Convertimos el objeto formData completo a una cadena JSON para guardarlo
    $formDataJson = json_encode($formData);
    
    $pdo = getDbConnection();

    // --- ✨ ACTUALIZAMOS LA CONSULTA SQL ---
    $sql = "INSERT INTO applications (
                form_data, 
                payment_intent_id, 
                amount_paid, 
                expedite_option, 
                refusal_guarantee
            ) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);

    // --- ✨ EJECUTAMOS CON LOS NUEVOS PARÁMETROS ---
    $stmt->execute([
        $formDataJson, 
        $paymentIntentId, 
        $amountPaid, 
        $expediteOption, 
        $refusalGuarantee
    ]);
    
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