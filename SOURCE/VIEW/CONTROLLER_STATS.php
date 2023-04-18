<?php

require_once('SOURCE/CONTROLLER/configDB.php');

class Roulette {

    private function connectDB() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        return $mysqli;
    }

    public function getMoyenneClasse($ID_CLASSE) {

        $mysqli = $this->connectDB();

        $result = $mysqli->query("SELECT ELEVE.NOM, ELEVE.PRENOM, AVG(NOTE.NOTE) AS MOYENNE FROM ELEVE INNER JOIN NOTE ON ELEVE.ID_ELEVE = NOTE.ID_ELEVE WHERE ELEVE.ID_CLASSE =".$ID_CLASSE." GROUP BY ELEVE.ID_ELEVE");

        $data_array = array(
            array('NOM', 'MOYENNE')
        );

        foreach ($result as $valeur) {
            $data_array[] = array($valeur['NOM']." ".$valeur['PRENOM'], $valeur['MOYENNE']);
        }

        return $data_array;
    }
}
?>