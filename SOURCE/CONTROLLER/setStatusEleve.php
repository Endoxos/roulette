<?php

$ID_ELEVE = $_POST["ID_ELEVE"];

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$result = $mysqli->query("UPDATE ELEVE SET STATUS=true, ABSENT=false WHERE ID_ELEVE=".$ID_ELEVE);


?>