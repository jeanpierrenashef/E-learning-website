<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode([
        "status" => "File upload failed."
    ]);
}

$file = $_FILES['file'];
$targetDir = "uploads/";
$fileName = uniqid() . "_" . basename($file["name"]);
$targetFilePath = $targetDir . $fileName;

if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
    $course_id = $_POST["course_id"];
    $assignment_id = $_POST["assignment_id"];

    $query = $connection->prepare("INSERT INTO submissions (user_id, assignment_id, course_id, file_path) VALUES (?, ?, ?, ?)");
    $query->bind_param("iiis", $user_id, $assignment_id, $course_id, $targetFilePath);

    if ($query->execute()) {
        http_response_code(200);
        echo json_encode([
            "status" => "File uploaded and submission saved successfully."
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "Database error. Submission failed."
        ]);
    }
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "File upload failed."
    ]);
}
?>
