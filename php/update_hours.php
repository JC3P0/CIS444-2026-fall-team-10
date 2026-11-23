<?php
// Save Hours - gets the form from owner.html
require "config.php";

$weekdayOpen = $_POST["weekday_open"];
$weekdayClose = $_POST["weekday_close"];
$satOpen = $_POST["sat_open"];
$satClose = $_POST["sat_close"];

// Next phase: UPDATE business_hours SET open_time = ..., close_time = ... WHERE business_id = ...
header("Location: ../owner.html");
?>
