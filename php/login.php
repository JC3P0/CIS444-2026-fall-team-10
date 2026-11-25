<?php
// Log In - gets the form from login.html
require "config.php";

$email    = isset($_POST["email"])    ? trim($_POST["email"]) : "";
$password = isset($_POST["password"]) ? $_POST["password"]    : "";

$stmt = $db->prepare("SELECT user_id, role, name, password, status FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$u = $stmt->get_result()->fetch_assoc();

if (!$u || !password_verify($password, $u["password"]))
   go("../login.html?error=login");

if ($u["status"] == "suspended")
   go("../login.html?error=suspended");

session_regenerate_id(true);
$_SESSION["user_id"] = $u["user_id"];
$_SESSION["role"]    = $u["role"];
$_SESSION["name"]    = $u["name"];

go(homeFor($u["role"]));
?>
