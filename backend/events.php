<?php
use Firebase\JWT\JWT;
include('db.php');
include('./utils/cloudinaryConfig.php');
require_once 'vendor/autoload.php';

use Cloudinary\Api\Upload\UploadApi;


$secretKey = "MiteshPrajapati";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // Create a new event
        $data = $_POST; // Other form data
        $bannerImage = $_FILES['bannerImage'];

        if (empty($data['name']) || empty($data['startTime']) || empty($data['endTime']) || empty($data['location']) || empty($data['description']) || empty($data['category'])) {
            echo json_encode(['error' => 'All fields are required']);
            exit();
        }

        // Validate and process the image file
        $uploadPath = 'uploads/'; 

        // Check if the file was uploaded without errors
        if ($bannerImage['error'] === UPLOAD_ERR_OK) {
            // Move the uploaded file to the designated folder
            $fileName = basename($bannerImage['name']);
            $time = time();
            
            $uploadFilePath = $uploadPath . $time . $fileName;
            //move the upload folder for the temprory time so that img will not be lost till cloudinary upload
            if (move_uploaded_file($bannerImage['tmp_name'], $uploadFilePath)) {
                // Sanitize and prepare other form data
                $eventName = $conn->real_escape_string($data['name']);
                $startTime = $conn->real_escape_string($data['startTime']);
                $endTime = $conn->real_escape_string($data['endTime']);
                $location = $conn->real_escape_string($data['location']);
                $description = $conn->real_escape_string($data['description']);
                $category = $conn->real_escape_string($data['category']);
                $userEmail = $conn->real_escape_string($data['email']);

                //upload Image to cloudinary
               $localURL =  (__DIR__. "/" . $uploadFilePath);
               $response =  (new UploadApi())->upload($localURL);
               $imgPath = $response['secure_url'];


               //delete image file from the upload folder
               unlink($localURL);
                // Insert the new event into the database
                $sql = "INSERT INTO events (ename, startTime, endTime, location, description, category, bannerImage,userEmail) VALUES ('$eventName', '$startTime', '$endTime', '$location', '$description', '$category', '$imgPath','$userEmail')";

                if ($conn->query($sql) === TRUE) {
                    // Database insertion successful

                    // Close the database connection
                    $conn->close();

                    echo json_encode(['message' => 'Event created successfully']);
                } else {
                    // Error moving the file
                    echo json_encode(['error' => 'Error moving the file']);
                }
            } else {
                // Error uploading the file
                echo json_encode(['error' => 'Error uploading the file']);
            }
        }
        // $conn->close();
        break;

    case 'GET':
        // Fetch all events from the database

        $sql = "SELECT * FROM events ";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $events = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $events[] = [
                    'id' => $row['ID'],
                    'name' => $row['ename'],
                    'startTime' => $row['startTime'],
                    'endTime' => $row['endTime'],
                    'location' => $row['location'],
                    'description' => $row['description'],
                    'category' => $row['category'],
                    'bannerImage' => $row['bannerImage'],
                ];
            }

            // Return the fetched events as JSON
            echo json_encode(['events' => $events]);
        } else {
            // No events found
            echo json_encode(['events' => []]);
        }
        // $conn->close();
        break;

    default:
        // Invalid method
        echo json_encode(['error' => 'Invalid method']);
        $conn->close();
        break;
    }



    ?>
