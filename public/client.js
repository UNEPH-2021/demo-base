/********************/
// GESTION DE LA SPA
/********************/

/**
 * Fonction qui affiche une nouvelle vue sur le client
 * @param {*} hash correspondant à l'id de l'élément à afficher
 */
function show(hash) {
    $('.active').removeClass('active').addClass('inactive');
    $(hash).removeClass('inactive').addClass('active');
}

// Abonnement à l'événement de changement de hash
window.addEventListener('hashchange', () => show(window.location.hash));

/********************/
// AJAX
/********************/

function appelleDisBonjour() {
    fetch('/disbonjour-json', {
        method: "POST",
        body: '{"prenom": "' + document.getElementById("prenom").value + '"}',
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then(res => res.json()).then(json => {
        document.getElementById("prenom-placeholder").innerHTML = json.message;
        window.location.hash = "#bonjour-view";
    });
}