<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

//$movie_id = $_POST['movie_id'];
$query= $connection->prepare("SELECT DISTINCT user_id, username FROM users WHERE user_type_id = 3 ");
//$query->bind_param("i", $movie_id);

$query->execute();

$result= $query->get_result();

if($result->num_rows > 0)
{
    $array=[];
    while($user = $result->fetch_assoc())
    {
        $array[]=$user;

    }
    http_response_code(200);
    echo json_encode([
        "users"=> $array,
    ]);
}
else{
    http_response_code(400);
    echo json_encode([
        "message"=> "No users"
    ]);
}