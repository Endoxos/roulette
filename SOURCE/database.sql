CREATE TABLE CLASSE(
    ID_CLASSE INTEGER NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (ID_CLASSE),

    NOM_CLASSE VARCHAR(50)
);

CREATE TABLE ELEVE(
    ID_ELEVE INTEGER NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (ID_ELEVE),

    ID_CLASSE INTEGER,
    FOREIGN KEY (ID_CLASSE) REFERENCES CLASSE (ID_CLASSE),
    
    NOM VARCHAR(50),
    PRENOM VARCHAR(50),
    ABSENT BOOL,
    STATUS BOOL
);

INSERT INTO ELEVE (ID_CLASSE, NOM, PRENOM, ABSENT, STATUS) VALUES 
('1', 'Cosse', 'Antonin', false, false),
('1', 'Bonotti', 'Luca', false, false),
('1', 'Eleve', 'Jean', false, false),
('1', 'Eleve', 'Marc', false, false);

INSERT INTO ELEVE (ID_CLASSE, NOM, PRENOM, ABSENT, STATUS) VALUES 
('2', 'ELEVE', 'Robin', false, false),
('2', 'ELEVE', 'Julie', false, false),
('2', 'ELEVE', 'Dylan', false, false),
('2', 'ELEVE', 'Guillaume', false, false);

INSERT INTO CLASSE (NOM_CLASSE) VALUES 
('Classe TEST');
