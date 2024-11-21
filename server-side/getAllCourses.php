<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connection.php";

// if($course_id==NULL)
// {
  $query=$connection->prepare("SELECT course_id, title,genre, avg_rating, release_year,details FROM courses Where course_id BETWEEN 5 and 13;");
  $query->execute();

  $result=$query->get_result();

  $courses=[];
  if($result->num_rows>0){

    
    while($course=$result->fetch_assoc())
    {
      $courses[]=$course;

    }
    http_response_code(200);
    echo json_encode([
      "courses" => $courses]);
  } else {
    http_response_code(400);

    $response = [
      "message" => "Empty result"
    ];

    echo json_encode($response);
  }

// else {
//   $query = $connection->prepare("SELECT * FROM courses WHERE course_id = ?");
//   $query->bind_param("i",$course_id);

//   $query->execute();

//   $result = $query->get_result();

//   if($result->num_rows > 0) {
//     $user = $result->fetch_assoc();

//     echo json_encode($user);
//   } else {
//     echo json_encode([
//       "message" => "Not Found"
//     ]);
//   }
// }



// ?>
