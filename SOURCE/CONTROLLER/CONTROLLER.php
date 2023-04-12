<?php

// variables
$FUNCTION_NAME = $_POST["FUNCTION_NAME"];
$ID_CLASSE = $_POST["ID_CLASSE"];
$ID_ELEVE = $_POST["ID_ELEVE"];
$NOTE = $_POST["NOTE"];

require_once('configDB.php');

class Roulette {

    private function connectDB() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        return $mysqli;
    }

    public function resetNote($ID_CLASSE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("DELETE FROM NOTE WHERE ID_ELEVE IN (SELECT ID_ELEVE FROM ELEVE WHERE ID_CLASSE=".$ID_CLASSE.")");
    }

    public function getNumberEleve($ID_CLASSE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("SELECT COUNT(*) FROM ELEVE WHERE ID_CLASSE=".$ID_CLASSE." AND STATUS=false AND ABSENT=false;");

        foreach ($result as $valeur) {
            echo ($valeur['COUNT(*)']);
        }
    }

    public function getNumberEleveAbsent($ID_CLASSE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("SELECT COUNT(*) FROM ELEVE WHERE ID_CLASSE=".$ID_CLASSE." AND STATUS=false AND ABSENT=true;");

        foreach ($result as $valeur) {
            echo ($valeur['COUNT(*)']);
        }
    }

    public function resetClasse($ID_CLASSE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("UPDATE ELEVE SET STATUS=false, ABSENT=false WHERE ID_CLASSE=".$ID_CLASSE);
    }

    public function setAbsentEleve($ID_ELEVE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("UPDATE ELEVE SET STATUS=false, ABSENT=true WHERE ID_ELEVE=".$ID_ELEVE);
    }

    public function setStatusEleve($ID_ELEVE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("UPDATE ELEVE SET STATUS=true, ABSENT=false WHERE ID_ELEVE=".$ID_ELEVE);
    }

    public function setNoteEleve($ID_ELEVE, $NOTE) {

        $mysqli = $this->connectDB();

        $mysqli->query("INSERT INTO NOTE (ID_ELEVE, NOTE) VALUES ('".$ID_ELEVE."', ".$NOTE.");");
        $result = $mysqli->query("SELECT AVG(NOTE) AS MOYENNE FROM NOTE WHERE ID_ELEVE=".$ID_ELEVE.";");

        foreach ($result as $valeur) {
            echo ($valeur['MOYENNE']);
        }
    } 
}

$roulette = new Roulette();

switch ($FUNCTION_NAME) {
    case 'resetNote':
        $roulette->resetNote($ID_CLASSE);
        break;
    
    case 'getNumberEleve':
        $roulette->getNumberEleve($ID_CLASSE);
        break;

    case 'getNumberEleveAbsent':
        $roulette->getNumberEleveAbsent($ID_CLASSE);
        break;

    case 'resetClasse':
        $roulette->resetClasse($ID_CLASSE);
        break;

    case 'setAbsentEleve':
        $roulette->setAbsentEleve($ID_ELEVE);
        break;

    case 'setStatusEleve':
        $roulette->setStatusEleve($ID_ELEVE);
        break;

    case 'setNoteEleve':
        $roulette->setNoteEleve($ID_ELEVE, $NOTE);
        break;

    default:
    echo (('default'));
        break;
}
?>