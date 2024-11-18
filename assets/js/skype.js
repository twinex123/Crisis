
var audio_skype = new Audio('assets/sounds/call.mp3');
var app_skype = document.getElementById("app_skype");

function skypeCall() {
    audio_skype.play(); 
    app_skype.classList.toggle("hidden");
}

let secondsElapsed = 0;
let timer;

function startChrono() {
    timer = setInterval(() => {
        secondsElapsed++;
        updateDisplay();
    }, 1000);
}

function updateDisplay() {
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    const timecode = document.querySelector('.timecode p');
    
    timecode.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function acceptCall() {
    if (audio_skype) {
        audio_skype.pause(); 
        console.log("Audio Skype mis en pause.");
    } else {
        console.error("audio_skype n'est pas disponible.");
    }

    var loyd_voice = new Audio("../assets/sounds/mrloyd_1.mp3");
    loyd_voice.play().catch(function (error) {
        console.error("Erreur lors de la lecture de l'audio de Mr. Loyd :", error);
    });

    document.querySelector(".call_content").style.display = "none";
    document.querySelector(".current_call").style.display = "block";

    startChrono();

    setTimeout(() => {
        loyd_voice.pause();
        app_skype.classList.toggle("hidden");
    }, 28000);  // 28 secondes
}
