<?php
require __DIR__ . '/../vendor/autoload.php';

use Cloudinary\Configuration\Configuration;

Configuration::instance([
    'cloud' => [
        'cloud_name' => 'Cloud_Name',
        'api_key' => 'API_KEY',
        'api_secret' => 'API_SECRET'
    ],
    'url' => [
        'secure' => true
    ]
]);
