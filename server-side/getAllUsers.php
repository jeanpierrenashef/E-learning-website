<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

// if($course_id==NULL)
// {
  $query=$connection->prepare("SELECT u.user_id, u.username, t.user_type, u.banned FROM users u JOIN user_types t ON u.user_type_id = t.user_type_id Where u.user_type_id != 1 ");
  $query->execute();

  $result=$query->get_result();

  $users=[];
  if($result->num_rows>0){

    
    while($course=$result->fetch_assoc())
    {
      $users[]=$course;

    }
    http_response_code(200);
    echo json_encode([
      "response" => $users]);
  } else {
    http_response_code(400);

    $response = [
      "message" => "Empty result"
    ];

    echo json_encode($response);
  }