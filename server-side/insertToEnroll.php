<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,  Authorization");

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

$course_id = $_POST["course_id"] ?? null;
if (!$course_id) {
    http_response_code(400);
    echo json_encode(["status" => "course ID is required"]);
}

$query = $connection->prepare("INSERT INTO enroll(user_id, course_id) VALUES (?,?)");
$query->bind_param("ii", $user_id,$course_id);
$query->execute();

$result = $query->affected_rows;

if($result != 0){
    http_response_code(200);
    echo json_encode([
        "status" => "enrolled successfully",
        "message" => "$result added to enroll table"
    ]);
}else{
    http_response_code(404);
    echo json_encode([
        "status" => "Failed to enroll"
    ]);
}
