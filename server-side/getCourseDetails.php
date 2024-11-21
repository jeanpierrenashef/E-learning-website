    <?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include "connection.php";

    $title=$_GET['title'];

    $query=$connection->prepare("SELECT * FROM courses WHERE title=?");
    $query->bind_param("s",$title);

    $query->execute();
    $result = $query->get_result();

    if($result->num_rows>0){
    $course = $result->fetch_assoc();
    http_response_code(200);
    echo json_encode([
        //"message" => "Get course details successful",
        "response" => $course
    ]);

    }else {
        http_response_code(400);
    echo json_encode([
        "message" => "course not found"
    ]);
    }

    ?>
