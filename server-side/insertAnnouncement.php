<?php

include "connection.php"; 

$course_id = $_POST['course_id'];
$announcement = $_POST['announcement'];


if (empty($course_id) || empty($announcement)) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "Course ID and announcement details are required.",
    ]);
}

$query = $connection->prepare("INSERT INTO announcements (course_id, announcement VALUES (?, ?)");
$query->bind_param("is", $course_id, $announcement);

if ($query->execute()) {
    http_response_code(200);
    echo json_encode([
        "message" => "announcement added successfully.",
    ]);
} else {
    http_response_code(403);
    echo json_encode([
        "message" => "Failed to add announcement.",
    ]);
}

