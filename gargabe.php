<?php
$size = min((int)($_GET['ckSize'] ?? 10), 100); // 10MB por defecto
header('Access-Control-Allow-Origin: *');
header('Content-Length: '.($size * 1024 * 1024));
echo openssl_random_pseudo_bytes($size * 1024 * 1024);
?>