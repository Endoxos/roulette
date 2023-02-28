<?php

$classe_value = $_POST["classe_value"];

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$result = $mysqli->query("SELECT * FROM ELEVE WHERE ID_CLASSE=".$classe_value);

foreach ($result as $valeur) {
    echo ('<h4>'.$valeur['NOM'].' '.$valeur['PRENOM'].'</h4>');
}

?>