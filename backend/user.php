<?php
    include('db.php');
  

    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];


    if($password != $confirmPassword){
        echo "Password Does not Match";
        exit();
    }
    

    // check email is already present in db or not
     $result = mysqli_query($conn,"SELECT * FROM user WHERE email = '$email' ");

     if(mysqli_num_rows($result)>0){
        echo 'user already register';
        exit();
     }
    //if email is not present then hash password

    $hashPassword = password_hash($password,PASSWORD_BCRYPT);

    //enter into db
    $query = "INSERT INTO user (name, email, password) VALUES ('$name','$email','$hashPassword')";

    $data = mysqli_query($conn, $query);

    echo json_encode(['success'=>true, 'data'=>$data]);
    $conn->close();


?>