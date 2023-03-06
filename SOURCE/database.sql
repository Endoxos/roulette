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

CREATE TABLE NOTE(
    ID INTEGER NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (ID),

    ID_ELEVE INTEGER,
    FOREIGN KEY (ID_ELEVE) REFERENCES ELEVE (ID_ELEVE),

    NOTE FLOAT
);

INSERT INTO CLASSE (NOM_CLASSE) VALUES
('Classe TEST'),
('Classe TEST 2');

INSERT INTO ELEVE (ID_CLASSE, NOM, PRENOM, ABSENT, STATUS) VALUES 
('1', 'Cosse', 'Antonin', false, false),
('1', 'Bonotti', 'Luca', false, false),
('1', 'Eleve', 'Jean', false, false),
('1', 'Eleve', 'Marc', false, false);

INSERT INTO ELEVE (ID_CLASSE, NOM, PRENOM, ABSENT, STATUS) VALUES 
('2', 'Smith', 'Sophia', false, false),
('2', 'Brown', 'Ethan', false, false),
('2', 'Garcia', 'Nora', false, false),
('2', 'Davis', 'Max', false, false),
('2', 'Miller', 'Ella', false, false),
('2', 'Gonzalez', 'Lucas', false, false),
('2', 'Taylor', 'Avery', false, false),
('2', 'Anderson', 'Leo', false, false);

INSERT INTO NOTE (ID_ELEVE, NOTE) VALUES 
('2', 18);