<?php
require_once __DIR__ . '/../config/database.php'; // Carga las variables de entorno

session_start([
    'cookie_samesite' => 'Lax', // O 'None' si frontend y backend están en dominios diferentes
    'cookie_secure' => false, // Cambiar a true si usas HTTPS
    'cookie_httponly' => true,
    'cookie_lifetime' => 86400 // Cookie válida por 1 día (ajusta según necesites)
]);

header("Access-Control-Allow-Origin: " . $_ENV['FRONTEND_URL']);
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $data = json_decode(file_get_contents('php://input'));

    $adminUser = $_ENV['ADMIN_USER'] ?? 'admin'; // Valor por defecto si no está en .env
    $adminPass = $_ENV['ADMIN_PASS'] ?? 'password'; // Valor por defecto si no está en .env

    if (isset($data->username) && isset($data->password) && $data->username === $adminUser && password_verify($data->password, password_hash($adminPass, PASSWORD_DEFAULT))) { // Usar password_verify es más seguro
        // Regenerar ID de sesión por seguridad tras login exitoso
        session_regenerate_id(true);
        $_SESSION['is_admin_logged_in'] = true;
        http_response_code(200);
        echo json_encode(['success' => true]);
    } else {
        session_unset();
        session_destroy();
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e.getMessage()]);
}