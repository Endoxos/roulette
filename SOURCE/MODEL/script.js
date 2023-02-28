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