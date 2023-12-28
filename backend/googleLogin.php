<?php

include('db.php');

require_once 'vendor/autoload.php';

$secretKey = "MiteshPrajapati";

use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));
if (isset($data->email) && isset($data->name) && !empty(trim($data->email)) && !empty(trim($data->name))) {

    $email = mysqli_real_escape_string($conn, trim($data->email));
    $name = mysqli_real_escape_string($conn, trim($data->name));

    $login = mysqli_query($conn, "SELECT * FROM user WHERE email='$email'");
    if (mysqli_num_rows($login) == 0) {
        echo json_encode(['success'=>false, 'message'=>"User is Not Registered"]);
    }
    else if (mysqli_num_rows($login) > 0) {

        $row = mysqli_fetch_assoc($login);
        // print_r($row);

        $userData = [
            'userEmail' => $row['email'],
            'password' => $row['password'],
        ];

        $expirationTime = time() + (24 * 60 * 60);

        // Prepare the data to be encoded in the token
        $tokenData = [
            'iat' => time(),             // Issued at: time when the token was generated
            'exp' => $expirationTime,    // Expiration time
            'data' => $userData,         // User data
        ];

        $path = '/';
        $httponly = true;
        $secure = true;
        $domain = 'http://localhost:3000/';
        // Encode the token
        $token = JWT::encode($tokenData, $secretKey, 'HS256');
        setcookie('token', $token, $expirationTime, $path, $domain, $secure, $httponly);

        echo json_encode(['success' => true, 'token' => $token, 'message' => 'Login successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect password']);
    }
}


?>