<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


include "connection.php";

require "../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "MyTopSecretKey";
$headers = getallheaders();
$jwt = $headers["Authorization"];

$key = new Key($secretKey, "HS256");
$payload = JWT::decode($jwt, $key);

if($payload->user_type_id != 2) {
    http_response_code(401);
    echo json_encode([
    "message"=> "Unauthorized"
    ]);
    return;
}
$user_id = $payload->user_id;

$query = $connection->prepare("SELECT * FROM enroll WHERE user_id=?");
$query->bind_param("i", $user_id);
$query->execute();

$result = $query->get_result();

if($result->num_rows > 0){
    $array=[];
    while($user=$result->fetch_assoc()){
        $array[]=$user;
    }
    http_response_code(200);
    echo json_encode([
        "users" => $array,
    ]);
}else{
    http_response_code(404);
    echo json_encode([
        "status" => false
    ]);
}
