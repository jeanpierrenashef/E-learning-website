<?php
include "connection.php";

$username=$_POST['username'];
$password=$_POST['password'];
//$banned=$_POST['banned'];
//$user_type_id=$_POST['user_type_id'];


$checkUsername=$connection->prepare("SELECT * from users WHERE username=?");
$checkUsername->bind_param("s",$username);

$checkUsername->execute();

if($checkUsername->get_result()->num_rows>0)
{
echo json_encode([
    "message"=> "Name is already registered"
]);
}
else{

$hashed=password_hash($password,PASSWORD_DEFAULT);
$query=$connection->prepare("INSERT INTO users(username, password, user_type_id) VALUES (?,?,3)");
$query->bind_param("ss",$username,$hashed);

$query->execute();
$result=$query->affected_rows;

if($result!=0)
http_response_code(200);
{

    echo json_encode([
    "message"=>"Created",
    "user_id"=>  $connection->insert_id
]);
}else{
    http_response_code(404);
    echo json_encode([
    "message"=> "Could no create records",
]);
}

}

?>
