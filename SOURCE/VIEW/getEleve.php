<?php

$classe_value = $_POST["classe_value"];
$countNOTAB = 0;
$countAB = 0;

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "roulette", "roulette", "roulette");

$result = $mysqli->query("SELECT * FROM ELEVE WHERE ID_CLASSE=".$classe_value);

foreach ($result as $valeur) {
    if ($valeur['STATUS'] == true) {
        echo ('<p class="line" data-ID_ELEVE="'.$valeur['ID_ELEVE'].'">'.$valeur['NOM'].' '.$valeur['PRENOM'].'</p>');
    } else if ($valeur['ABSENT'] == true){
        $countAB++;
        echo ('<p class="asbent" value="AB'.$countAB.'" data-ID_ELEVE="'.$valeur['ID_ELEVE'].'">('.$valeur['NOM'].' '.$valeur['PRENOM'].')</p>');
    } else {
        $countNOTAB++;
        echo ('<p value="'.$countNOTAB.'" data-ID_ELEVE="'.$valeur['ID_ELEVE'].'">'.$valeur['NOM'].' '.$valeur['PRENOM'].'</p>');

    }
}

?>