<?php

include "connection.php"; 

$course_id = $_POST['course_id'];
$assignment_name = $_POST['assignment_name'];


if (empty($course_id) || empty($assignment_name)) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "Course ID and assignment details are required.",
    ]);
}

$query = $connection->prepare("INSERT INTO assignments (course_id, assignment_name VALUES (?, ?)");
$query->bind_param("is", $course_id, $assignment_name);

if ($query->execute()) {
    http_response_code(200);
    echo json_encode([
        "message" => "Assignment added successfully.",
    ]);
} else {
    http_response_code(403);
    echo json_encode([
        "message" => "Failed to add assignment.",
    ]);
}

