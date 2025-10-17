<?php
// ✨ 1. FORZAR LA VISUALIZACIÓN DE ERRORES (SOLO PARA DESARROLLO)
// Coloca esto al principio de tus scripts para ver los errores detallados.
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/database.php';

// --- Cabeceras CORS ---
header("Access-Control-Allow-Origin: http://localhost:3002");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    \Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data);

    $amount_in_cents = 1500;

    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $amount_in_cents,
        'currency' => 'usd',
        'automatic_payment_methods' => ['enabled' => true]
    ]);

    echo json_encode(['clientSecret' => $paymentIntent->client_secret]);

} 
// ✨ 2. CAPTURA DE ERRORES ESPECÍFICOS DE STRIPE
catch (\Stripe\Exception\ApiErrorException $e) {
    // Esto captura errores de la API de Stripe (ej: clave inválida, monto incorrecto, etc.)
    http_response_code($e->getHttpStatus());
    echo json_encode([
        'error' => 'Stripe API Error',
        'message' => $e->getMessage(),
        'stripe_code' => $e->getStripeCode()
    ]);
} catch (Exception $e) {
    // Captura cualquier otro error general
    http_response_code(500);
    echo json_encode([
        'error' => 'Generic Error',
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
}