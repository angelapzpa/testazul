<?php
@ini_set('zlib.output_compression', 'Off');
@ini_set('output_buffering', 'Off');
@ini_set('output_handler', '');

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename=random.dat');

if (isset($_GET['cors'])) {
    header('Access-Control-Allow-Origin: *');
}

$size = isset($_GET['ckSize']) ? min((int)$_GET['ckSize'], 1024) : 4;
$data = openssl_random_pseudo_bytes(1048576);

for ($i = 0; $i < $size; $i++) {
    echo $data;
    flush();
}
?>