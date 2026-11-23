<?php
// Add Service - gets the form from owner.html
require "config.php";

$name = $_POST["name"];
$minutes = $_POST["minutes"];
$price = $_POST["price"];

// Next phase: INSERT INTO services (business_id, name, minutes, price) VALUES (...)
header("Location: ../owner.html");
?>
