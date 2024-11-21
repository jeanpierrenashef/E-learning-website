<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";
require "../vendor/autoload.php";

use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"), true);

$secretKey = "MyTopSecretKey";
$username = $_POST["username"] ?? null;
$password = $_POST["password"] ?? null;

// $username = $data["username"] ?? null;
// $password = $data["password"] ?? null;

if($username == null || $password == null){
  echo json_encode([
    "message" => "Credentials are required"
  ]);

  return;
}

$query = $connection->prepare("SELECT * FROM users WHERE username = ?");
$query->bind_param("s", $username);
$query->execute();

$result = $query->get_result();
if($result -> num_rows != 0){
    $user = $result->fetch_assoc(); //since 1 row
    
    //$check_pass = $password === $user["password"];
    $check_pass=password_verify($password,$user["password"]);
    if($check_pass){
        $check_ban = $user["banned"];
        if(!$check_ban){
            $payload = [
                "user_id" => $user["user_id"],
                "user_type_id" => $user["user_type_id"]
            ];
            $token = JWT::encode($payload, $secretKey, "HS256");
            http_response_code(200);
            echo json_encode([
                "status" => "Login Successful!",
                "jwt" => $token,
                "user" => $user,
            ]);
        }else{
            http_response_code(403);
            echo json_encode([
                "status" => "You are banned!",
            ]);
        };

    }else{
        http_response_code(401);
        echo json_encode([
            "status" => "Invalid Credentials!",
        ]);
    };
}else{
    echo json_encode([
        "status" => "Username doesnt exist, Please register"
    ]);
}


