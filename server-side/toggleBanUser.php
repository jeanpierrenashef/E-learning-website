<?php 

include "connection.php";

$user_id= $_POST["user_id"];
$banned = $_POST["isBanned"];

$query = $connection->prepare("UPDATE users SET banned=? WHERE user_id = ?;");

$query->bind_param("ii",$banned,$user_id);

$query->execute();

if($query->affected_rows !=0)
{
    http_response_code(200);
    echo json_encode([
        "message"=> "User banned updated"
    ]);
}
else{
    http_response_code(400);
    echo json_encode([
        "message"=> "error updating banned in user"
    ]);
}


    