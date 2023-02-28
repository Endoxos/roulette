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
});

// lorsque le button est appuyé, un élève est tiré au sort
const button_get_eleve = document.getElementById("button_get_eleve");
button_get_eleve.addEventListener("click", () => {

    var eleve_number = this.responseText;

    var xhr_statusEleve = new XMLHttpRequest();
    xhr_statusEleve.open("POST", "SOURCE/CONTROLLER/getNumberEleve.php");
    xhr_statusEleve.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr_statusEleve.onload = function () {
        eleve_number = this.responseText;
    };

    // récupère le nombre d'élèves non choisi

    // choisi un élève au hasard, l'affiche et le barre en rouge
    var eleveAleatoire = Math.floor(Math.random() * (eleve_number - 1 + 1)) + 1;
    var eleveChoisi = document.querySelector('#eleve p[value="' + eleveAleatoire + '"]')
    eleveChoisi.classList.add('line');
    selected_eleve.replaceChildren(eleveChoisi.textContent);

    // lance la requette php pour mettre à jour la bdd
    var xhr_statusEleve = new XMLHttpRequest();
    xhr_statusEleve.open("POST", "SOURCE/CONTROLLER/setStatusEleve.php");
    xhr_statusEleve.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var ID_ELEVE = document.querySelector('#eleve p[value="' + eleveAleatoire + '"]').getAttribute('data-id_eleve');
    xhr_statusEleve.send("ID_ELEVE=" + ID_ELEVE + "&STATUS=true");

    select_classe.setAttribute("value", "none");
});

