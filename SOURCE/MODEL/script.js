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

function processNumberEleve(numberEleve) {

    // choisi un élève au hasard, l'affiche et le barre en rouge
    var eleveAleatoire = Math.floor(Math.random() * (numberEleve - 1 + 1)) + 1;
    var eleveChoisi = document.querySelector('#eleve p[value="' + eleveAleatoire + '"]')
    selected_eleve.replaceChildren(eleveChoisi.textContent);

    // lance la requette php pour mettre à jour la bdd
    var xhr_statusEleve = new XMLHttpRequest();
    xhr_statusEleve.open("POST", "SOURCE/CONTROLLER/setStatusEleve.php");
    xhr_statusEleve.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var ID_ELEVE = document.querySelector('#eleve p[value="' + eleveAleatoire + '"]').getAttribute('data-id_eleve');
    xhr_statusEleve.send("ID_ELEVE=" + ID_ELEVE + "&STATUS=true");

    getEleve(); // actualisation de la liste des élèves
}

const button_reset_classe = document.getElementById("button_reset_classe");
button_reset_classe.addEventListener("click", () => {

    var xhr_resetClasse = new XMLHttpRequest();
    xhr_resetClasse.open("POST", "SOURCE/CONTROLLER/resetStatusEleve.php");
    xhr_resetClasse.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_resetClasse.send("ID_CLASSE=" + select_classe.value);
    
    getEleve(); // actualisation de la liste des élèves
});


