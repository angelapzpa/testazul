<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
file_put_contents('php://temp', file_get_contents('php://input'));
?>