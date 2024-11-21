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
    

$query=$connection->prepare("SELECT * FROM courses m JOIN enroll b ON m.course_id = b.course_id WHERE b.user_id=?" );
$query->bind_param("i",$user_id);

$query->execute();
$result = $query->get_result();

$array=[];
if($result->num_rows>0){
    while($course = $result->fetch_assoc()){
        $array[]=$course;
    }
    http_response_code(200);  
    echo json_encode([
        //"message" => "Get course details successful",
        "response" => $array
    ]);

}else {
    http_response_code(401);
    echo json_encode([
        "message" => "course not found"
    ]);
    }

?>
