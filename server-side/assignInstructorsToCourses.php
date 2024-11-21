<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$user_id = $_POST["user_id"];
$course_id = $_POST["course_id"];


$checkQuery = $connection->prepare(" SELECT u.user_type_id  FROM bookmarks b JOIN users u ON b.user_id = u.user_id WHERE b.course_id = ?
");
$checkQuery->bind_param("i", $course_id);
$checkQuery->execute();
$checkResult = $checkQuery->get_result();

$isInstructorAssigned = false;
while ($row = $checkResult->fetch_assoc()) {
    if ($row['user_type_id'] == 3) {
        $isInstructorAssigned = true;
    }
}

if ($isInstructorAssigned) {
    $updateQuery = $connection->prepare("UPDATE bookmarks SET user_id = ? WHERE course_id = ? AND user_id IN (SELECT user_id FROM users WHERE user_type_id = 3)");
    $updateQuery->bind_param("ii", $user_id, $course_id);
    $updateQuery->execute();

    if ($updateQuery->affected_rows > 0) {
        http_response_code(200);
        echo json_encode([
            "status" => "Instructor updated successfully",
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "status" => "Failed",
        ]);
    }
} else {
    
    $insertQuery = $connection->prepare("INSERT INTO bookmarks (user_id, course_id) VALUES (?, ?)");
    $insertQuery->bind_param("ii", $user_id, $course_id);
    $insertQuery->execute();

    if ($insertQuery->affected_rows > 0) {
        http_response_code(200);
        echo json_encode([
            "status" => "Instructor assigned successfully",
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "status" => "Failed to assign",
        ]);
    }
}
?>
