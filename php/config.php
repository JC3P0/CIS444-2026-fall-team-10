<?php
// QUEUE - database settings (MAMP defaults) + shared helpers.
$host   = "localhost";
$user   = "root";
$pass   = "root";
$dbname = "queue_db";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$db = new mysqli($host, $user, $pass, $dbname);
$db->set_charset("utf8mb4");

session_start();

function go($page)
{
   header("Location: " . $page);
   exit;
}

function homeFor($role)
{
   if ($role == "owner") return "../owner.html";
   if ($role == "admin") return "../admin.html";
   return "../my_bookings.html";
}

function requireRole($roles)
{
   if (!isset($_SESSION["user_id"]) || !in_array($_SESSION["role"], $roles))
      go("../login.html?error=login");
}
?>
