<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $conn = mysqli_connect("localhost:3307","root","mitesh@2003","eventdb");

    if(!$conn){
        die(mysqli_connect_error());
    }

?>