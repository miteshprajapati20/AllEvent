<?php

//start session on web page
session_start();

//config.php

//Include Google Client Library for PHP autoload file
require_once 'vendor/autoload.php';

//Make object of Google API Client for call Google API
$google_client = new Google_Client();

//Set the OAuth 2.0 Client ID
$google_client->setClientId('641120120235-n2ho20hf47toan61ql24ml07jokhi6ln.apps.googleusercontent.com');

//Set the OAuth 2.0 Client Secret key
$google_client->setClientSecret('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');

//Set the OAuth 2.0 Redirect URI
$google_client->setRedirectUri('http://localhost:3000/');

// to get the email and profile 
$google_client->addScope('email');

$google_client->addScope('profile');

?>