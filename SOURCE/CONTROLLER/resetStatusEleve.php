<?php

$ID_CLASSE = $_POST["ID_CLASSE"];

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$result = $mysqli->query("UPDATE ELEVE SET STATUS=false WHERE ID_CLASSE=".$ID_CLASSE);

?>