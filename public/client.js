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
let nbUsers = 0;

function obtenirUser() {
    fetch('/users', {
        method: "GET",
        headers: {
            "Accept":"application/json"
        }
    }
    ).then(res => res.json()
    ).then(json => {
        let htmlResult = "";
        
        json.personnes.forEach(element => {
            htmlResult += "<li>" + element + "</li>";
        });
        document.getElementById("userlist").innerHTML = htmlResult;
       
        if(json.personnes.length != nbUsers) {
            nbUsers = json.personnes.length;
            vibrate();
        }
    });
}

/********************/
// DEVICE APIs
/********************/

function vibrate() {
    navigator.vibrate([500, 300, 200]);
}