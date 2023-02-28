<?php

$ID_ELEVE = $_POST["ID_ELEVE"];
$STATUS = $_POST["STATUS"];

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$result = $mysqli->query("UPDATE ELEVE SET STATUS=".$STATUS." WHERE ID_ELEVE=".$ID_ELEVE);


?>