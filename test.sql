SELECT ELEVE.NOM, ELEVE.PRENOM, AVG(NOTE.NOTE) AS MOYENNE
FROM ELEVE
INNER JOIN NOTE ON ELEVE.ID_ELEVE = NOTE.ID_ELEVE
WHERE ELEVE.ID_CLASSE =".$ID_CLASSE."
GROUP BY ELEVE.ID_ELEVE