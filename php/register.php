<?php
// Sign Up - gets the form from login.html
require "config.php";

$role     = isset($_POST["role"])     ? $_POST["role"]          : "";
$name     = isset($_POST["name"])     ? trim($_POST["name"])    : "";
$email    = isset($_POST["email"])    ? trim($_POST["email"])   : "";
$password = isset($_POST["password"]) ? $_POST["password"]      : "";

if ($role != "customer" && $role != "owner")
   $role = "customer";
if ($name == "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8)
   go("../login.html?error=signup");

$stmt = $db->prepare("SELECT user_id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
if ($stmt->get_result()->num_rows > 0)
   go("../login.html?error=exists");

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $db->prepare("INSERT INTO users (role, name, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $role, $name, $email, $hash);
$stmt->execute();

session_regenerate_id(true);
$_SESSION["user_id"] = $db->insert_id;
$_SESSION["role"]    = $role;
$_SESSION["name"]    = $name;

go(homeFor($role));
?>
