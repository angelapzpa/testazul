<?php
header('Content-Type: application/json');
if (isset($_GET['cors'])) {
    header('Access-Control-Allow-Origin: *');
}

$ip = $_SERVER['REMOTE_ADDR'];
echo json_encode([
    'processedString' => $ip,
    'rawIspInfo' => ['ip' => $ip]
]);
?>