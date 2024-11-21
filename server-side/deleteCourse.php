<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$course_id = $_POST["course_id"];

$connection->begin_transaction();

$query1 = $connection->prepare("DELETE FROM ratings WHERE course_id=?");
$query1->bind_param("i", $course_id);
$query1->execute();

$query2 = $connection->prepare("DELETE FROM enroll WHERE course_id=?");
$query2->bind_param("i", $course_id);
$query2->execute();

$query3 = $connection->prepare("DELETE FROM user_activities WHERE course_id=?");
$query3->bind_param("i", $course_id);
$query3->execute();

$query4 = $connection->prepare("DELETE FROM courses WHERE course_id=?");
$query4->bind_param("i", $course_id);
$query4->execute();

$result = $query4->affected_rows;

if ($result > 0) {
    http_response_code(200);
    $connection->commit();
    echo json_encode([
        "status" => "deleted successfully",
    ]);
} else {
    http_response_code(400);
    $connection->rollback();
    echo json_encode([
        "status" => "Failed to delete"
    ]);
}
?>
