<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

require "../vendor/autoload.php";
include "connection.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$headers = getallheaders();
$jwt = $headers["Authorization"];
$key = new Key("MyTopSecretKey", "HS256");
$payload = JWT::decode($jwt, $key);

$user_id = $payload->user_id;

$course_id = $_POST["course_id"];
$comment = $_POST["comment"];

$query = $connection->prepare("INSERT INTO comments(user_id, course_id, comment, comment_type) VALUES (?,?,?,1)");
$query->bind_param("iis", $user_id,$course_id,$comment);
$query->execute();

$result = $query->affected_rows;

if($result != 0){
    http_response_code(200);
    echo json_encode([
        "status" => "comment public successfully",
        "message" => "$result added to bookmarks table"
    ]);
}else{
    http_response_code(404);
    echo json_encode([
        "status" => "Failed to comment publicly"
    ]);
}
