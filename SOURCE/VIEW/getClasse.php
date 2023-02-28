<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$result = $mysqli->query("SELECT * FROM CLASSE");

foreach ($result as $valeur) {
    echo ('<option value="'.$valeur['ID_CLASSE'].'">'.$valeur['NOM_CLASSE'].'</option>');
}
?>