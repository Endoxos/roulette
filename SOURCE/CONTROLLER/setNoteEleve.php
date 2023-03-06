<?php

$ID_ELEVE = $_POST["ID_ELEVE"];
$NOTE = $_POST["NOTE"];

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$mysqli->query("INSERT INTO NOTE (ID_ELEVE, NOTE) VALUES ('".$ID_ELEVE."', ".$NOTE.");");
$result = $mysqli->query("SELECT AVG(NOTE) AS MOYENNE FROM NOTE WHERE ID_ELEVE=".$ID_ELEVE.";");

echo ($result);

?>