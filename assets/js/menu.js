//MENU, CREDITS MANAGEMENT

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║  NSI 2024 - CRISIS                                                           ║
║  Bon jeu !                                                                   ║
║  Si vous êtes assez curieux pour lire ce message, tapez glitch(14235) dans   ║
║  la console de votre navigateur.                                             ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

const credits = document.querySelector(".credits");
const card = document.querySelector(".card_hero");
const splash_screen = document.querySelector(".splash_screen");
const splash_menu = document.querySelector(".splash_menu");
const splash_shadow = document.querySelector(".splash_shadow");
localStorage.removeItem("start");

let debug_credits_value = 1;

function creditsStart() {

    start_fullscreen = true;

    if(debug_credits_value == 1){
        splash_screen.style.display = "none";
        splash_shadow.style.display = "none";
        splash_menu.style.display = "none";
        credits.style.display = "block";

        const credits_audio = new Audio('assets/sounds/soundtrack.mp3');
        credits_audio.loop = true;

        credits_audio.play();

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .catch(err => {
                    console.log(`Erreur lors de la tentative de passage en plein écran: ${err.message}`);
                });
        }

        showNextCredit(credits_audio);
    }else {
        splash_screen.style.display = "none";
        splash_shadow.style.display = "none";
        splash_menu.style.display = "none";
    }
}

const creditsTexts = [
    "Développé par Florestan",
    "Soundtrack: du jeu 'Twelve Minutes' ",
    "Technologies utilisées: Three.js, HTML, CSS (SCSS), JavaScript",
    "",
    "Vous travaillez en tant qu'ingénieur de sécurité informatique pour la NSA",
    "Vos missions sont multiples, vous devez déjouer les plans de l'ennemi",
    "Et suivre les instructions qui vous mèneront au hacker...",
    "Votre mission est cruciale pour la sécurité nationale",
    "",
    "<span style='font-family: Henny Penny; font-size: 3.5em;'>CRISIS</span>"
];

let currentTextIndex = 0;
const creditsElement = document.querySelector('.credits_text');

function showNextCredit(audio) {
    creditsElement.style.opacity = 0; 

    setTimeout(() => {
        creditsElement.innerHTML = creditsTexts[currentTextIndex];
        creditsElement.style.opacity = 1; 

        currentTextIndex++;

        if (currentTextIndex < creditsTexts.length) {
            setTimeout(() => showNextCredit(audio), 4500);
        } else {
            fadeOutAudioAndText(audio);
        }
    }, 1000); 
}

function fadeOutAudioAndText(audio) {
    const fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.05) {
            audio.volume -= 0.05;
            creditsElement.style.opacity -= 0.05; 
        } else {
            audio.volume = 0;
            audio.pause();
            creditsElement.style.opacity = 0; 
            clearInterval(fadeOutInterval);

            const ambient_audio = new Audio('assets/sounds/ambiance.mp3');
            ambient_audio.loop = true;
            ambient_audio.volume = 0.2;
            ambient_audio.play();

            const ringing_audio = new Audio('assets/sounds/effects/ringing.mp3');
            ringing_audio.play();

            setTimeout(() => {
                launchScene(); 
            }, 5000);
        }
    }, 250); 
}

function launchScene() {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.05;
            credits.style.opacity = opacity;
        } else {
            clearInterval(fadeOutInterval);
            credits.style.display = "none";
        }
    }, 100);

    let tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice1.mp3');
    tuto_voice.play();

    setTimeout(() => {
        tuto_voice.pause();
        tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice2.mp3');
        tuto_voice.play();

        setTimeout(() => {
            tuto_voice.pause();
            tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice3.mp3');
            tuto_voice.play();

            setTimeout(() => {
                tuto_voice.pause();
                tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice4.mp3');
                tuto_voice.play();

                setTimeout(() => {
                    tuto_voice.pause();
                    tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice5.mp3');
                    tuto_voice.play();
                }, 15000);
            }, 18000);
        }, 10000);
    }, 6000);

}

//FULL CREDITS

const credits_screen = document.querySelector(".full_credits");
const fullcredits_audio = new Audio("assets/sounds/credits.mp3");

function openFullCredits(){

    credits_screen.style.display = "flex";
    fullcredits_audio.play();

    createRandomHalo();

    setInterval(createRandomHalo, 3000);

    setInterval(() => {
        for (let halo_time = 0; halo_time < 10; halo_time++) {
            createRandomHalo()
        }
    }, 10000);

}

function closeFullCredits(){

    fullcredits_audio.pause();
    fullcredits_audio.currentTime = 0;
    credits_screen.style.display = "none";

}

function createRandomHalo() {
    const halo = document.createElement("div");
    halo.classList.add("halo");

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    halo.style.left = `${x}px`;
    halo.style.top = `${y}px`;

    credits_screen.appendChild(halo);

    halo.addEventListener("animationend", () => {
        halo.remove();
    });
}

const menu = document.querySelector(".menu");
const close_menu = document.querySelector(".close_menu");
let menu_opened = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Control') { 

        event.preventDefault();

        if(menu_opened === 1){menu.style.display = "none"; menu_opened = 0;}
        else {menu.style.display = "block"; menu_opened = 1;}
    }
});

close_menu.addEventListener('click', () => {
    menu.style.display = "none";
    menu_opened = 0;
});

function toggleMenuCtrl(){
    if(menu_opened === 1){menu.style.display = "none"; menu_opened = 0;}
    else {menu.style.display = "block"; menu_opened = 1;} 
}

//MESSAGES FROM OTHER WINDOWS

window.addEventListener('message', (event) => {
    if (event.data.type === 'toggleMenuCtrl') {
        toggleMenuCtrl()
    } 
});

//EPILEPSY WARNING

localStorage.setItem("show_epilepsy_warning", 0);

setInterval(() => {
    if(localStorage.getItem("show_epilepsy_warning") == 1){
        showEpilepsyWarning();
        localStorage.setItem("show_epilepsy_warning", 0);
    }
}, 1000)

function showEpilepsyWarning(){
    var epilepsy_warning = document.createElement("div");
    epilepsy_warning.classList.add("epilepsy_warning");
    epilepsy_warning.innerHTML = "<strong>Avertissement épilepsie</strong><br>Des flashs lumineux vont apparaître.";
    document.body.appendChild(epilepsy_warning);

    setTimeout(() => {
        document.body.removeChild(epilepsy_warning);
    }, 10000);
}

//TIME SPENT

function formatTemps(secondes) {
    const heures = Math.floor(secondes / 3600);
    const minutes = Math.floor((secondes % 3600) / 60);
    return `${heures} heure${heures > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
}

let timeSpent = parseInt(localStorage.getItem('timeSpent')) || 0;

setInterval(() => {
    timeSpent++;
    localStorage.setItem('timeSpent', timeSpent);
    
    const timeFormat = formatTemps(timeSpent);
    
    document.getElementById('timeSpent').textContent = `${timeFormat}`;

}, 1000);


//MAIN ARROWS

const menuButtons = document.querySelectorAll('.options button');
let currentButtonIndex = 0;

menuButtons[currentButtonIndex].style.backgroundColor = 'white';
menuButtons[currentButtonIndex].style.color = 'black';

document.addEventListener('keydown', (event) => {
    menuButtons[currentButtonIndex].style.backgroundColor = 'transparent';
    menuButtons[currentButtonIndex].style.color = 'white';
    
    if (event.key === 'ArrowUp') {
        currentButtonIndex = (currentButtonIndex - 1 + menuButtons.length) % menuButtons.length;
    } else if (event.key === 'ArrowDown') {
        currentButtonIndex = (currentButtonIndex + 1) % menuButtons.length;
    } else if (event.key === 'Enter') {
        switch(currentButtonIndex) {
            case 0: 
                creditsStart();
                break;
            case 1:
                console.log("Options clicked");
                break;
            case 2:
                openFullCredits()
                break;
        }
    }
    
    menuButtons[currentButtonIndex].style.backgroundColor = 'white';
    menuButtons[currentButtonIndex].style.color = 'black';
});
