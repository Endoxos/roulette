<?php

// variables
$FUNCTION_NAME = $_POST["FUNCTION_NAME"];
$ID_CLASSE = $_POST["ID_CLASSE"];
$ID_ELEVE = $_POST["ID_ELEVE"];
$CLASSE_VALUE = $_POST["CLASSE_VALUE"];

require_once('../CONTROLLER/configDB.php');

class Roulette {

    private function connectDB() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        return $mysqli;
    }

    public function getClasse() {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("SELECT * FROM CLASSE");

        foreach ($result as $valeur) {
            echo ('<option value="'.$valeur['ID_CLASSE'].'">'.$valeur['NOM_CLASSE'].'</option>');
        }
    }

    public function getEleve($CLASSE_VALUE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("SELECT * FROM ELEVE WHERE ID_CLASSE=".$CLASSE_VALUE);

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
    }

    public function getNote($ID_ELEVE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("SELECT * FROM NOTE WHERE ID_ELEVE=".$ID_ELEVE.";");

        foreach ($result as $valeur) {
            echo ("<p>".$valeur['NOTE']."</p>");
        }
    }
}

$roulette = new Roulette();

switch ($FUNCTION_NAME) {
    case 'getClasse':
        $roulette->getClasse();
        break;
    
    case 'getEleve':
        $roulette->getEleve($CLASSE_VALUE);
        break;

    case 'getNote':
        $roulette->getNote($ID_ELEVE);
        break;

    default:
    echo (('default'));
        break;
}
?>