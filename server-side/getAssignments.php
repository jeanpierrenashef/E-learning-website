<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include "connection.php";

//$data = json_decode(file_get_contents("php://input"), true);

$course_id = $_POST['course_id'] ?? null;

$query = $connection->prepare("SELECT assignment_id, assignment_name FROM assignments WHERE course_id = ?");
$query->bind_param("i", $course_id);
$query->execute();

$result = $query->get_result();

$assignments = [];
if ($result->num_rows > 0) {
    
    while ($assignment = $result->fetch_assoc()) {
        $assignments[] = $assignment;
    }
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "assignments" => $assignments
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        "status" => "No assignments found"
    ]);
}

?>
