<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

$course_id=$_POST['course_id'];

$query=$connection->prepare("SELECT c.user_id, u.username, c.comment, c.comment_type FROM comments c JOIN users u ON c.user_id = u.user_id WHERE c.course_id=? ");
$query->bind_param("i",$course_id);

$query->execute();
$result = $query->get_result();

$array=[];
if($result->num_rows>0){
    while($comments = $result->fetch_assoc()){
        $array[]=$comments;
    }
        http_response_code(200);

        echo json_encode([
    
    "comments" => $array
]);

}else {
    http_response_code(404);
echo json_encode([
    "message" => "comments not found"
]);
}
