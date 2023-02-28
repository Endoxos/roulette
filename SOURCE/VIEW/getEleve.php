<?php

$classe_value = $_POST["classe_value"];
$count = 0;

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$result = $mysqli->query("SELECT * FROM ELEVE WHERE ID_CLASSE=".$classe_value);

foreach ($result as $valeur) {
    if ($valeur['STATUS'] == true) {
        echo ('<p class="line" data-ID_ELEVE="'.$valeur['ID_ELEVE'].'">'.$valeur['NOM'].' '.$valeur['PRENOM'].'</p>');
    } else {
        $count++;
        echo ('<p value="'.$count.'" data-ID_ELEVE="'.$valeur['ID_ELEVE'].'">'.$valeur['NOM'].' '.$valeur['PRENOM'].'</p>');
    }
}

?>