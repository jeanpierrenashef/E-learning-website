<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

require "../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "MyTopSecretKey";
$headers = getallheaders();
$jwt = $headers["Authorization"];

$key = new Key($secretKey, "HS256");
$payload = JWT::decode($jwt, $key);

$user_id = $payload->user_id;
$course_id = $_POST["course_id"];

$query = $connection->prepare("SELECT * FROM enroll WHERE user_id=? AND course_id=?");
$query->bind_param("ii", $user_id,$course_id);
$query->execute();

$result = $query->get_result();

if($result->num_rows > 0){
    http_response_code(200);
    echo json_encode([
        "status" => true,
        "message" => "exists/already enrolled"
    ]);
}else{
    http_response_code(404);
    echo json_encode([
        "status" => false
    ]);
}
