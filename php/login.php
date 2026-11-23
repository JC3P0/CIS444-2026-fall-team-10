<?php
// Log In - gets the form from login.html
require "config.php";

$email = $_POST["email"];
$password = $_POST["password"];

// Next phase: SELECT role, password FROM users WHERE email = '$email'
// then send the user to the page for their role.
header("Location: ../my_bookings.html");
?>
