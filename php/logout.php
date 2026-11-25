<?php
// Log Out
require "config.php";
session_destroy();
go("../index.html");
?>
