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
            "Accept": "application/json"
        }
    }
    ).then(res => res.json()
    ).then(json => {
        let htmlResult = "";

        json.personnes.forEach(element => {
            htmlResult += "<li>" + element + "</li>";
        });
        document.getElementById("userlist").innerHTML = htmlResult;

        if (json.personnes.length != nbUsers) {
            nbUsers = json.personnes.length;
            vibrate();
        }
    });
}

/********************/
// DEVICE APIs
/********************/

// Vibration
function vibrate() {
    navigator.vibrate([500, 300, 200]);
}

// Device Orientation
function handleOrientation(event) {
    console.log("COUCOU");
    if(window.DeviceOrientationEvent) {
        console.log("DeviceOrientation supported");
    } else {
        console.log("DeviceOrientation NOT supported");
    }

    const ball = document.querySelector('.ball');
    const garden = document.querySelector('.garden');
    const output = document.querySelector('.output');

    const maxX = garden.clientWidth - ball.clientWidth;
    const maxY = garden.clientHeight - ball.clientHeight;

    var x = event.beta;  // In degree in the range [-180,180)
    var y = event.gamma; // In degree in the range [-90,90)

    output.textContent = `beta : ${x}\n`;
    output.textContent += `gamma: ${y}\n`;

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x > 90) { x = 90 };
    if (x < -90) { x = -90 };

    // To make computation easier we shift the range of
    // x and y to [0,180]
    x += 90;
    y += 90;

    // 10 is half the size of the ball
    // It center the positioning point to the center of the ball
    ball.style.top = (maxY * y / 180 - 10) + "px";
    ball.style.left = (maxX * x / 180 - 10) + "px";
}

// Device Motion
function deviceMotionHandler(eventData) {

    // Grab the acceleration including gravity from the results
    var acceleration = eventData.accelerationIncludingGravity;

    // Display the raw acceleration data
    var rawAcceleration = "[" + Math.round(acceleration.x) + ", " +
        Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]";

    // Z is the acceleration in the Z axis, and if the device is facing up or down
    var facingUp = -1;
    if (acceleration.z > 0) {
        facingUp = +1;
    }

    // Convert the value from acceleration to degrees acceleration.x|y is the
    // acceleration according to gravity, we'll assume we're on Earth and divide
    // by 9.81 (earth gravity) to get a percentage value, and then multiply that
    // by 90 to convert to degrees.
    var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
    var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);

    // Display the acceleration and calculated values
    document.getElementById("moAccel").innerHTML = rawAcceleration;
    document.getElementById("moCalcTiltLR").innerHTML = tiltLR;
    document.getElementById("moCalcTiltFB").innerHTML = tiltFB;

    // Apply the 2D rotation and 3D rotation to the image
    var rotation = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB) + "deg)";
    document.getElementById("imgLogo").style.transform = rotation;
}
