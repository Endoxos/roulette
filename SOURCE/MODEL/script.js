// variables
let chosen_eleve_id;



// récupère les classes
var xhr_classe = new XMLHttpRequest();
xhr_classe.open("POST", "SOURCE/VIEW/getClasse.php");
xhr_classe.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr_classe.onload = function () {
    $('#select_classe').append(this.responseText); // utilise jquery pour tranformer la requete en code html
};
xhr_classe.send();

// lorsque une classe est selectionnée, la liste des élèves est récupérée
const select_classe = document.getElementById("select_classe");
select_classe.addEventListener("change", () => {
    getEleve(); // actualisation de la liste des élèves
});

// fonction pour actualiser la liste des élèves
function getEleve() {
    const classe_value = select_classe.value;

    var xhr_eleve = new XMLHttpRequest();
    xhr_eleve.open("POST", "SOURCE/VIEW/getEleve.php");
    xhr_eleve.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_eleve.onload = function () {
        // vide la div pour remplacer par la requete reçu
        eleve.replaceChildren('');
        $('#eleve').append(this.responseText); // utilise jquery pour tranformer la requete en code html
    };

    xhr_eleve.send("classe_value=" + classe_value);
}

// lorsque le button est appuyé, un élève est tiré au sort
const button_get_eleve = document.getElementById("button_get_eleve");
button_get_eleve.addEventListener("click", () => {

    var xhr_numberEleve = new XMLHttpRequest();
    xhr_numberEleve.open("POST", "SOURCE/CONTROLLER/getNumberEleve.php");
    xhr_numberEleve.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_numberEleve.onload = function () {
        var numberEleve = this.responseText;

        // appel d'une fonction pour poursuivre le traitement (pour garder la valeur de numberEleve parce que la requête est asynchrone)
        processNumberEleve(numberEleve);
    };

    xhr_numberEleve.send("ID_CLASSE=" + select_classe.value);
});

// fonction pour gérer l'élève choisi
function processNumberEleve(numberEleve) {

    // choisi un élève au hasard, l'affiche et le barre en rouge
    var eleveAleatoire = Math.floor(Math.random() * (numberEleve - 1 + 1)) + 1;
    var eleveChoisi = document.querySelector('#eleve p[value="' + eleveAleatoire + '"]')
    selected_eleve.replaceChildren(eleveChoisi.textContent);

    // lance la requette php pour mettre à jour la bdd
    var xhr_statusEleve = new XMLHttpRequest();
    xhr_statusEleve.open("POST", "SOURCE/CONTROLLER/setStatusEleve.php");
    xhr_statusEleve.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_statusEleve.onload = function () {
        getEleve(); // actualisation de la liste des élèves
    };

    chosen_eleve_id = document.querySelector('#eleve p[value="' + eleveAleatoire + '"]').getAttribute('data-id_eleve');
    xhr_statusEleve.send("ID_ELEVE=" + chosen_eleve_id);
}

// fonction pour réinitialiser la liste des élèves déjà tirés au sort et absents
const button_reset_classe = document.getElementById("button_reset_classe");
button_reset_classe.addEventListener("click", () => {

    var xhr_resetClasse = new XMLHttpRequest();
    xhr_resetClasse.open("POST", "SOURCE/CONTROLLER/resetClasse.php");
    xhr_resetClasse.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_resetClasse.onload = function () {
        getEleve(); // actualisation de la liste des élèves
    };

    xhr_resetClasse.send("ID_CLASSE=" + select_classe.value);
    
});

// fonction pour réinitialiser les notes des élèves de la classe sélectionné
const button_reset_note = document.getElementById("button_reset_note");
button_reset_note.addEventListener("click", () => {

    var xhr_resetNote = new XMLHttpRequest();
    xhr_resetNote.open("POST", "SOURCE/CONTROLLER/resetNote.php");
    xhr_resetNote.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_resetNote.onload = function () {
        actual_note.replaceChildren('');
        old_note.replaceChildren('');
    };

    xhr_resetNote.send("ID_CLASSE=" + select_classe.value);

});

// fonction pour mettre un élève absent
const button_absent = document.getElementById("button_absent");
button_absent.addEventListener("click", () => {

    var xhr_setEleveAsbent = new XMLHttpRequest();
    xhr_setEleveAsbent.open("POST", "SOURCE/CONTROLLER/setAbsentEleve.php");
    xhr_setEleveAsbent.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_setEleveAsbent.onload = function () {
        getEleve(); // actualisation de la liste des élèves
    };

    xhr_setEleveAsbent.send("ID_ELEVE=" + chosen_eleve_id);
    
});

// lorsque le button est appuyé, un élève qui était absent est tiré au sort
const button_get_eleve_absent = document.getElementById("button_get_eleve_absent");
button_get_eleve_absent.addEventListener("click", () => {

    var xhr_numberEleveAbsent = new XMLHttpRequest();
    xhr_numberEleveAbsent.open("POST", "SOURCE/CONTROLLER/getNumberEleveAbsent.php");
    xhr_numberEleveAbsent.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_numberEleveAbsent.onload = function () {
        var numberEleve = this.responseText;

        // appel d'une fonction pour poursuivre le traitement (pour garder la valeur de numberEleve parce que la requête est asynchrone)
        processNumberEleveAbsent(numberEleve);
    };

    xhr_numberEleveAbsent.send("ID_CLASSE=" + select_classe.value);
});

// fonction pour tirer au sort un élève
function processNumberEleveAbsent(numberEleve) {

    // choisi un élève au hasard, l'affiche et le barre en rouge
    var eleveAleatoire = Math.floor(Math.random() * (numberEleve - 1 + 1)) + 1;
    var eleveChoisi = document.querySelector('#eleve p[value="AB' + eleveAleatoire + '"]')
    selected_eleve.replaceChildren(eleveChoisi.textContent);

    // lance la requette php pour mettre à jour la bdd
    var xhr_statusEleve = new XMLHttpRequest();
    xhr_statusEleve.open("POST", "SOURCE/CONTROLLER/setStatusEleve.php");
    xhr_statusEleve.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_statusEleve.onload = function () {
        getEleve(); // actualisation de la liste des élèves
    };
    
    chosen_eleve_id = document.querySelector('#eleve p[value="AB' + eleveAleatoire + '"]').getAttribute('data-id_eleve');
    xhr_statusEleve.send("ID_ELEVE=" + chosen_eleve_id);

}

// lorsque le button est appuyé, l'élève choisi est noté
const button_send_note = document.getElementById("button_send_note");
button_send_note.addEventListener("click", () => {

    var xhr_sendNoteEleve = new XMLHttpRequest();
    xhr_sendNoteEleve.open("POST", "SOURCE/CONTROLLER/setNoteEleve.php");
    xhr_sendNoteEleve.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_sendNoteEleve.onload = function () {
        actual_note.replaceChildren('');
        $('#actual_note').append("Moyenne actuelle : " + this.responseText); // utilise jquery pour tranformer la requete en code html
        getNote();
        };

    const note = document.getElementById("input_note");
    xhr_sendNoteEleve.send("ID_ELEVE=" + chosen_eleve_id + "&NOTE=" + note.value);

});

// fonction pour récupérer les notes d'un élève
function getNote() {

    var xhr_getNotes = new XMLHttpRequest();
    xhr_getNotes.open("POST", "SOURCE/VIEW/getNote.php");
    xhr_getNotes.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_getNotes.onload = function () {
        // vide la div pour remplacer par la requete reçu
        old_note.replaceChildren('');
        $('#old_note').append("<p> Ancienne note : </p>"); // utilise jquery pour tranformer la requete en code html
        $('#old_note').append(this.responseText); // utilise jquery pour tranformer la requete en code html
    };

    xhr_getNotes.send("ID_ELEVE=" + chosen_eleve_id);
}