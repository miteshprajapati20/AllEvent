<?php
include('db.php');

require_once 'vendor/autoload.php';

use Firebase\JWT\JWT;

session_start(); // Starting Session

$secretKey = "MiteshPrajapati";



if (empty($_POST['email']) || empty($_POST['password'])) {
   echo "email or Password is required";
   exit();
} else {
    // Define $username and $password
    $email = $_POST['email'];
    $password = $_POST['password'];
    // Establishing Connection with Server by passing server_name, user_id and password as a parameter
    // echo $email,"   ",$password;

    // SQL query to fetch information of registerd users and finds user match.
    $query = mysqli_query($conn, "select * from user where email='$email'");
    // print_r($query);
    $rows = mysqli_num_rows($query);
    if ($rows > 0) {
        $_SESSION['userEmail'] = $email; // Initializing Session

        $result = mysqli_fetch_assoc($query);
        $hashPassword = $result['password'];


        if (password_verify($password, $hashPassword)) {
            $userData = [
                'userEmail' => $email,
                'password' => $password,
            ];

            $expirationTime = time() + (24*60 * 60);

            // Prepare the data to be encoded in the token
            $tokenData = [
                'iat' => time(),             // Issued at: time when the token was generated
                'exp' => $expirationTime,    // Expiration time
                'data' => $userData,         // User data
            ];

            $path = '/';
            $httponly=true;
            $secure = true;
            $domain = 'http://localhost:3000/';
            // Encode the token
            $token = JWT::encode($tokenData, $secretKey, 'HS256');
            setcookie('token', $token, $expirationTime, $path, $domain, $secure, $httponly); 
            echo json_encode(['success' => true,'token'=>$token, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Incorrect password']);
        }
    } else {
        echo json_encode(['success'=> false,'message'=> 'Please Register first']);
    }
    mysqli_close($conn); // Closing Connection
}
