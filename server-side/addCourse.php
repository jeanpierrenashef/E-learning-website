<?php

include "connection.php";

$title = $_POST["title"];


$query = $connection->prepare("INSERT INTO courses(title) VALUES (?)");
$query->bind_param("s", $title);
$query->execute();

$result = $query->affected_rows;

if($result != 0){
    http_response_code(200);
    echo json_encode([
        "status" => "course added successfully",
    ]);
}else{
    http_response_code(404);
    echo json_encode([
        "status" => "Failed to add course"
    ]);
}