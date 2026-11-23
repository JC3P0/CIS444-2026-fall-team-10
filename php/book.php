<?php
// Book - gets the form from book.html
require "config.php";

$business = $_POST["business_id"];
$service = $_POST["service_id"];
$date = $_POST["date"];
$time = $_POST["time"];
$notes = $_POST["notes"];

// Next phase: INSERT INTO appointments
//   (customer_id, business_id, service_id, date, time, notes, status)
//   VALUES (..., 'pending')
header("Location: ../my_bookings.html");
?>
