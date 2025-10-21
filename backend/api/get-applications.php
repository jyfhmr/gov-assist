<?php
require_once __DIR__ . '/../config/database.php';

session_start([
    'cookie_samesite' => 'Lax',
    'cookie_secure' => false, // Cambiar a true si usas HTTPS
    'cookie_httponly' => true
]);

header("Access-Control-Allow-Origin: " . $_ENV['FRONTEND_URL']);
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS"); // Permitir GET
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✨ --- PROTECCIÓN DEL ENDPOINT --- ✨
if (!isset($_SESSION['is_admin_logged_in']) || $_SESSION['is_admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit();
}

try {
    $pdo = getDbConnection();
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = 10; // O el número que prefieras por página
    $offset = ($page - 1) * $limit;

    $totalResult = $pdo->query("SELECT COUNT(*) FROM applications");
    $totalRecords = (int)$totalResult->fetchColumn();
    $totalPages = ceil($totalRecords / $limit);

    // ✨ --- Seleccionamos también payment_intent_id --- ✨
    $stmt = $pdo->prepare("SELECT id, form_data, created_at, payment_intent_id FROM applications ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $applications = $stmt->fetchAll();

    foreach ($applications as &$app) {
        $app['form_data'] = json_decode($app['form_data']); // Decodificamos el JSON
    }

    echo json_encode([
        'applications' => $applications,
        'pagination' => [
            'currentPage' => $page,
            'totalPages' => $totalPages,
            'totalRecords' => $totalRecords,
            'limit' => $limit
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener las aplicaciones: ' . $e->getMessage()]);
}