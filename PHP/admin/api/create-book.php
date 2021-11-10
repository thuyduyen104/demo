<?php
$request = file_get_contents('php://input');
$param = json_decode($request, true);
echo var_dump($param);
?>