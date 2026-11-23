<?php
// Sign Up - gets the form from login.html
require "config.php";

$role = $_POST["role"];        // customer or owner
$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];

// Next phase: INSERT INTO users (role, name, email, password) VALUES (...)
if ($role == "owner")
   header("Location: ../owner.html");
else
   header("Location: ../index.html");
?>
