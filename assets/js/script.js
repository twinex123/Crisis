// Menu Démarrer : affichage/masquage
var startButton = document.getElementById("start-button");
var startMenu = document.getElementById("start-menu");

startButton.addEventListener("click", () => {
    startMenu.classList.toggle("hidden");
});



// Fermeture des fenêtres
const closeButtons = document.querySelectorAll(".close-btn");

closeButtons.forEach(button => {
    button.addEventListener("click", (event) => {

        let window = event.target.closest(".wrapper");
        window.classList.toggle("hidden");

        if(window.id === "app_notepad") {
            let taskbarApp = document.querySelector(".taskbar-notepad");
            
            if(taskbarApp) {
                taskbarApps.removeChild(taskbarApp);
            }
        }
        if(window.id === "app_iexplorer") {
            let taskbarApp = document.querySelector(".taskbar-iexplorer");
            
            if(taskbarApp) {
                taskbarApps.removeChild(taskbarApp);
            }
        }
        if(window.id === "app_powershell") {
            let taskbarApp = document.querySelector(".taskbar-powershell");
            
            if(taskbarApp) {
                taskbarApps.removeChild(taskbarApp);
            }
        }

    });
});



var taskbarApps = document.getElementById("taskbar-apps");

function closeVideo(){
    document.getElementById("app_video").style.display = "none";
    
    var video = document.getElementById("video_presentation")

    taskbarApps.removeChild(document.querySelector(".taskbar-video"));
    
    video.pause();
    video.currentTime = 0
}

function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = `${hours}:${minutes} ${ampm}`;
    timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

//Récupération username

function loginComputer(){
    var username = document.getElementById("username").value
    localStorage.setItem("username", username);

    window.location.href="index.html";
}

var username = localStorage.getItem("username") || "Utilisateur"; 
const typingSpeed = 100;
let index = 0;

function typeText(text) {
    if (index < text.length) {
        document.getElementById("typed-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(function() {
            typeText(text);
        }, typingSpeed);
    }
}

window.onload = function() {
    const message = "Bonjour " + username + ". Nous avons urgemment besoin de vous. Veuillez ouvrir le menu de votre ordinateur et lancer l'application Video.";
    typeText(message);

    setTimeout(() => {
        document.getElementById("cctv").style.display = "none";
    }, 5000);
};

document.getElementById("menu_username").innerText = username;

document.getElementById("video_li").addEventListener("click", () => {
    const presentation_audio = new Audio("assets/sounds/presentation.mp3");
    presentation_audio.play();
    setTimeout(() => {
        index = 0; 
        document.getElementById("typed-text").innerHTML = "";
        typeText("Vous trouverez tous les renseignements nécessaires dans l'application Bloc-notes.");
    }, 25000);
});

function netstatMessage() {
    console.log("Executing netstatMessage");
    index = 0; 
    document.getElementById("typed-text").innerHTML = "";
    typeText("Où en êtes-vous? Avez-vous remarqué une adresse ip suspecte? Si oui, suivez les instructions du bloc-notes et entrez-la sur internet explorer. ");
}

function ipFailMessage(){
    index = 0; 
    document.getElementById("typed-text").innerHTML = "";
    typeText("Hum bizarre... La localisation de l'adresse se trouve à paris. Il utilise sans doute un VPN. Essayez de trouver un autre moyen...");

    setTimeout(() => {
        localStorage.setItem("show_epilepsy_warning", 1);
    }, 10000);
    setTimeout(launchVirus, 20000);
    
}

window.addEventListener('message', (event) => {
    if (event.data.type === 'netstatMessage') {
        setTimeout(netstatMessage(), 3000);
    }
    else if (event.data.type === 'failMessage') {
        ipFailMessage()
    }
    else if (event.data.type === 'hideSkype') {
        document.getElementById("app_skype").style.display = "none";
    }
    else if (event.data.type === 'shutdownServer') {
        setTimeout(shutdownAll, 5000)
    }
    else if (event.data.type === 'repairPhone') {
        repairPhone();
    }
});


function launchVirus() {
    console.log("virus started");
    let audio_hacker = new Audio('assets/sounds/hacker_voice1.mp3'); 
    audio_hacker.play();

    strobe_video = document.getElementById("videoContainer");

    setTimeout(() => {

        localStorage.setItem("toggle_fs", 1);

        var audio_bass = new Audio('assets/sounds/bass.mp3');
        audio_bass.play();
        strobe_video.style.display = "block";

        setTimeout(()=> {
            strobe_video.style.display = "none";
            document.getElementById("video").style.display = "none";
            audio_bass.pause();

            audio_hacker = new Audio('assets/sounds/hacker_voice2.mp3');
            audio_hacker.play();

            setTimeout(skypeCall, 10000)
        }, 15000)
    }, 15000)
}

var app_skype = document.getElementById("app_skype"); 
let audio_skype = new Audio('assets/sounds/call.mp3'); 

function skypeCall() {
    console.log("Appel Skype lancé.");
    console.log("Audio Skype avant play :", audio_skype);

    if (audio_skype) {
        audio_skype.play(); 
        app_skype.classList.toggle("hidden");
    } else {
        console.error("L'audio Skype n'est pas disponible.");
    }
}

function shutdownAll() {

    console.log("Shutting down");

    localStorage.setItem("toggle_fs", 1);

    var shutdown_container = document.getElementById("shutdown");
    var shutdown_video = document.getElementById("shutdownVideo");

    shutdown_container.style.display = "block";
    shutdown_video.play();

    setTimeout(()=>{
        shutdown_container.style.display = "none";
        shutdown_video.pause();

        document.getElementById("blackScreen").style.display = "block";

        var hacker_voice3 = new Audio("assets/sounds/hacker_voice3.mp3");
        hacker_voice3.play();

        setTimeout(() => {
            document.querySelector(".dos").style.display = "block";

            startDos();
        }, 5000)
    }, 5000)
}

let dosLine = `C:\\Users\\${username}\\>`;
let rebootCommand = "reboot";

function simulateTyping(text, elementId, callback, delay = 100) {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            document.getElementById(elementId).innerHTML += text[index];
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, delay); 
}

function generateRandomNumbers() {
    const randomOutput = document.getElementById('randomOutput');

    function createRandomLine() {
        const lineWidth = Math.floor(window.innerWidth / 10);
        let line = '';
        for (let i = 0; i < lineWidth; i++) {
            line += Math.floor(Math.random() * 10);
        }
        return line;
    }

    const interval = setInterval(() => {
        const line = createRandomLine();
        randomOutput.innerHTML += line + '\n'; 
        randomOutput.scrollTop = randomOutput.scrollHeight;
    }, 100);

    setTimeout(() => {
        rebootComputer();
    }, 5000);
}
function startDos(){
    document.getElementById('dos_line').innerHTML = dosLine;

    simulateTyping(rebootCommand, 'command', () => {
        setTimeout(() => {
            generateRandomNumbers();
        }, 500);
    });
};

function rebootComputer(){
    document.getElementById('blackScreen').style.display = 'none';
    document.getElementById('desktop').style.display = 'block';

    var startup_sound = new Audio("assets/sounds/startup.mp3");
    startup_sound.play();

    problemMessage()
}

function problemMessage(){
    index = 0; 
    document.getElementById("typed-text").innerHTML = "";
    typeText("Oula... ça prend des proportions inquiétantes. Je vais éxécuter un antivirus sur cette machine pour vous aider, ne touchez à rien!");

    terminalWindow.classList.toggle("hidden");

    setTimeout(() => {
        document.getElementById("app_antivirus").classList.toggle("hidden");
        const iframe = document.getElementById('antivirus_iframe');
        if (!iframe.src) {
            iframe.src = iframe.getAttribute('data-src');
            setTimeout(() => {
                fileFound();
            }, 15000);
        }
    }, 25000)
}

document.getElementById('app_antivirus').addEventListener('DOMNodeInserted', function(event) {
    if (this.style.display === 'block') {
        const iframe = document.getElementById('antivirus_iframe');
        if (!iframe.src) {
            iframe.src = iframe.getAttribute('data-src');
            setTimeout(() => {
                fileFound();
            }, 15000);
        }
    }
});

function fileFound(){
    console.log("File found");

    const fileFoundAudio = new Audio("assets/sounds/file_found.mp3");
    fileFoundAudio.play();

    setTimeout(() => {
        document.getElementById("app_antivirus").classList.toggle("hidden");

        document.getElementById("app_filefound").classList.toggle("hidden");

        localStorage.setItem("can_open_phone", 1);

        var video = document.getElementById("video_presentation");
        var video_element = document.getElementById("app_video");

        video_element.classList.toggle("hidden");
        video.currentTime = 0;
        video.play();

        setTimeout(() => {
            const loyd_problem_audio = new Audio("assets/sounds/loyd_problem.mp3");
            loyd_problem_audio.play();
        }, 2000);

        setTimeout(() => {

            video_element.classList.toggle("hidden");

            const takePhoneAudio = new Audio("assets/sounds/tutorial/tuto_voice8.mp3");
            takePhoneAudio.play();
        }, 10000)
    }, 8000)
}


//DEBUG CODES

function glitchCode(glitch){
    if(glitch == 1){
        //moment fbi
        var app_fbi = document.getElementById("fbi-icon");
        app_fbi.style.display = "block";
    }
    else if (glitch == 2){
        //moment antivirus
        document.getElementById("app_antivirus").classList.toggle("hidden");
        const iframe = document.getElementById('antivirus_iframe');
        if (!iframe.src) {
            iframe.src = iframe.getAttribute('data-src');
            setTimeout(() => {
                fileFound();
            }, 15000);
        }
    }
}
