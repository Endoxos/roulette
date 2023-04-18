// variables
let chosen_eleve_id;
var xhr_controller = new XMLHttpRequest();
var xhr_view = new XMLHttpRequest();

// récupère les classes
xhr_view.open("POST", "SOURCE/VIEW/CONTROLLER.php");
xhr_view.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr_view.onload = function () {
    $('#select_classe').append(this.responseText); // utilise jquery pour tranformer la requete en code html
};
xhr_view.send("FUNCTION_NAME=getClasse");

// lorsque une classe est selectionnée, la liste des élèves est récupérée
const select_classe = document.getElementById("select_classe");
select_classe.addEventListener("change", () => {
    getEleve(); // actualisation de la liste des élèves
});

// fonction pour actualiser la liste des élèves
function getEleve() {
    const classe_value = select_classe.value;

    xhr_view.open("POST", "SOURCE/VIEW/CONTROLLER.php");
    xhr_view.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_view.onload = function () {
        // vide la div pour remplacer par la requete reçu
        eleve.replaceChildren('');
        $('#eleve').append(this.responseText); // utilise jquery pour tranformer la requete en code html
    };
    xhr_view.send("CLASSE_VALUE=" + classe_value + "&FUNCTION_NAME=getEleve");

    // actualise la value pour le button statistiques
    document.getElementById("value_classe_stats").value = classe_value;
}

// lorsque le button est appuyé, un élève est tiré au sort
const button_get_eleve = document.getElementById("button_get_eleve");
button_get_eleve.addEventListener("click", () => {

    xhr_controller.open("POST", "SOURCE/CONTROLLER/CONTROLLER.php");
    xhr_controller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_controller.onload = function () {
        var numberEleve = this.responseText;

        // appel d'une fonction pour poursuivre le traitement (pour garder la valeur de numberEleve parce que la requête est asynchrone)
        processNumberEleve(numberEleve);
    };

    xhr_controller.send("ID_CLASSE=" + select_classe.value + "&FUNCTION_NAME=getNumberEleve");
});

// fonction pour gérer l'élève choisi
function processNumberEleve(numberEleve) {

    // choisi un élève au hasard, l'affiche et le barre en rouge
    var eleveAleatoire = Math.floor(Math.random() * (numberEleve - 1 + 1)) + 1;
    var eleveChoisi = document.querySelector('#eleve p[value="' + eleveAleatoire + '"]')
    selected_eleve.replaceChildren(eleveChoisi.textContent);

    // lance la requette php pour mettre à jour la bdd
    xhr_controller.open("POST", "SOURCE/CONTROLLER/CONTROLLER.php");
    xhr_controller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_controller.onload = function () {
        getEleve(); // actualisation de la liste des élèves
    };

    chosen_eleve_id = document.querySelector('#eleve p[value="' + eleveAleatoire + '"]').getAttribute('data-id_eleve');
    xhr_controller.send("ID_ELEVE=" + chosen_eleve_id + "&FUNCTION_NAME=setStatusEleve");
}

// fonction pour réinitialiser la liste des élèves déjà tirés au sort et absents
const button_reset_classe = document.getElementById("button_reset_classe");
button_reset_classe.addEventListener("click", () => {

    xhr_controller.open("POST", "SOURCE/CONTROLLER/CONTROLLER.php");
    xhr_controller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_controller.onload = function () {
        getEleve(); // actualisation de la liste des élèves
    };

    xhr_controller.send("ID_CLASSE=" + select_classe.value + "&FUNCTION_NAME=resetClasse");
    
});

// // fonction pour réinitialiser les notes des élèves de la classe sélectionné
// const button_reset_note = document.getElementById("button_reset_note");
// button_reset_note.addEventListener("click", () => {

//     var xhr_resetNote = new XMLHttpRequest();
//     xhr_resetNote.open("POST", "SOURCE/CONTROLLER/resetNote.php");
//     xhr_resetNote.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//     xhr_resetNote.onload = function () {
//         actual_note.replaceChildren('');
//         old_note.replaceChildren('');
//     };

//     xhr_resetNote.send("ID_CLASSE=" + select_classe.value);

// });

// fonction pour réinitialiser les notes des élèves de la classe sélectionné
const button_reset_note = document.getElementById("button_reset_note");
button_reset_note.addEventListener("click", () => {

    xhr_controller.open("POST", "SOURCE/CONTROLLER/CONTROLLER.php");
    xhr_controller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_controller.onload = function () {
        console.log(this.responseText);
        actual_note.replaceChildren('');
        old_note.replaceChildren('');
    };

    xhr_controller.send("ID_CLASSE=" + select_classe.value + "&FUNCTION_NAME=resetNote");

});

// fonction pour mettre un élève absent
const button_absent = document.getElementById("button_absent");
button_absent.addEventListener("click", () => {

    xhr_controller.open("POST", "SOURCE/CONTROLLER/CONTROLLER.php");
    xhr_controller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_controller.onload = function () {
        getEleve(); // actualisation de la liste des élèves
    };

    xhr_controller.send("ID_ELEVE=" + chosen_eleve_id + "&FUNCTION_NAME=setAbsentEleve");
    
});

// lorsque le button est appuyé, un élève qui était absent est tiré au sort
const button_get_eleve_absent = document.getElementById("button_get_eleve_absent");
button_get_eleve_absent.addEventListener("click", () => {

    xhr_controller.open("POST", "SOURCE/CONTROLLER/CONTROLLER.php");
    xhr_controller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_controller.onload = function () {
        var numberEleve = this.responseText;

        // appel d'une fonction pour poursuivre le traitement (pour garder la valeur de numberEleve parce que la requête est asynchrone)
        processNumberEleveAbsent(numberEleve);
    };

    xhr_controller.send("ID_CLASSE=" + select_classe.value + "&FUNCTION_NAME=getNumberEleveAbsent");
});

// fonction pour tirer au sort un élève
function processNumberEleveAbsent(numberEleve) {

    // choisi un élève au hasard, l'affiche et le barre en rouge
    var eleveAleatoire = Math.floor(Math.random() * (numberEleve - 1 + 1)) + 1;
    var eleveChoisi = document.querySelector('#eleve p[value="AB' + eleveAleatoire + '"]')
    selected_eleve.replaceChildren(eleveChoisi.textContent);

    // lance la requette php pour mettre à jour la bdd
    xhr_controller.open("POST", "SOURCE/CONTROLLER/CONTROLLER.php");
    xhr_controller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_controller.onload = function () {
        getEleve(); // actualisation de la liste des élèves
    };
    
    chosen_eleve_id = document.querySelector('#eleve p[value="AB' + eleveAleatoire + '"]').getAttribute('data-id_eleve');
    xhr_controller.send("ID_ELEVE=" + chosen_eleve_id + "&FUNCTION_NAME=setStatusEleve");

}

// lorsque le button est appuyé, l'élève choisi est noté
const button_send_note = document.getElementById("button_send_note");
button_send_note.addEventListener("click", () => {

    xhr_controller.open("POST", "SOURCE/CONTROLLER/CONTROLLER.php");
    xhr_controller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_controller.onload = function () {
        actual_note.replaceChildren('');
        $('#actual_note').append("Moyenne actuelle : " + this.responseText); // utilise jquery pour tranformer la requete en code html
        getNote();
        };

    const note = document.getElementById("input_note");
    xhr_controller.send("ID_ELEVE=" + chosen_eleve_id + "&NOTE=" + note.value + "&FUNCTION_NAME=setNoteEleve");

});

// fonction pour récupérer les notes d'un élève
function getNote() {

    xhr_view.open("POST", "SOURCE/VIEW/CONTROLLER.php");
    xhr_view.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_view.onload = function () {
        // vide la div pour remplacer par la requete reçu
        console.log(this.responseText);
        old_note.replaceChildren('');
        $('#old_note').append("<p> Ancienne note : </p>"); // utilise jquery pour tranformer la requete en code html
        $('#old_note').append(this.responseText); // utilise jquery pour tranformer la requete en code html
    };

    xhr_view.send("ID_ELEVE=" + chosen_eleve_id + "&FUNCTION_NAME=getNote");
}