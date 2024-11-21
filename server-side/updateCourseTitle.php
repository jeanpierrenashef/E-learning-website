<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$title = $_POST['title'];  
$course_id = $_POST['course_id'];  

$query = $connection->prepare("UPDATE courses SET title = ? WHERE course_id = ?");
$query->bind_param("si", $title, $course_id);

$query->execute();

$result = $query->affected_rows;

if ($result != 0) {
    http_response_code(200);
    echo json_encode([
        "status" => "Updated successfully",
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "Failed to change title",
    ]);
}
?>
