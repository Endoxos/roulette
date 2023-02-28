<?php

$ID_CLASSE = $_POST["ID_CLASSE"];
$count = 0;

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$result = $mysqli->query('SELECT * FROM ELEVE WHERE ID_CLASSE="'.$ID_CLASSE.'" AND STATUS=false');

foreach ($result as $valeur) {
    $count++;
}

?>