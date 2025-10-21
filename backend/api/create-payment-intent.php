<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/database.php';

$frontendUrl = $_ENV['FRONTEND_URL'];

header("Access-Control-Allow-Origin:$frontendUrl"); // Cambia esto en producción
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

    // ✨ ¡AQUÍ ESTÁ EL CAMBIO! Usamos el monto que nos envía el frontend
    if (!isset($data->amount) || !is_numeric($data->amount) || $data->amount <= 0) {
        throw new Exception("Amount is missing or invalid.");
    }

    $amount_in_cents = $data->amount;

    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $amount_in_cents,
        'currency' => 'usd',
        'automatic_payment_methods' => ['enabled' => true]
    ]);

    echo json_encode(['clientSecret' => $paymentIntent->client_secret]);

} catch (\Stripe\Exception\ApiErrorException $e) {
    http_response_code($e->getHttpStatus());
    echo json_encode(['error' => 'Stripe API Error', 'message' => $e->getMessage(), 'stripe_code' => $e->getStripeCode()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Generic Error', 'message' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]);
}