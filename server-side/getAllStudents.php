<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$course_id = $_POST['course_id'];
$query= $connection->prepare("SELECT u.user_id, u.username, 
        CASE 
            WHEN b.course_id IS NOT NULL THEN 'Enrolled' 
            ELSE 'Not Enrolled' 
        END AS enrollment_status FROM users u LEFT JOIN enroll b ON u.user_id = b.user_id AND b.course_id = ? WHERE u.user_type_id = 2");
$query->bind_param("i", $course_id);

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