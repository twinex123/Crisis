//GESTION TELEPHONE

const hourDetail = document.querySelectorAll('#hour_detail');
setInterval(() => {
    const date = new Date();
    hourDetail.forEach(hour => {
        hour.textContent = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    });
}, 1000);

document.querySelector('.close-button').addEventListener('click', () => {
    window.parent.postMessage('closePhone', '*');
});

function showErrorMessage() {
    document.querySelector(".error-message").style.display = "block";
}
function closeErrorMessage() {
    document.querySelector(".error-message").style.display = "none";
}

function openPhoneApp() {
    document.querySelector('.phone-app').style.display = 'block';
    document.querySelector('.apps-grid').style.display = 'none';
    document.querySelector('.dock-container').style.display = 'none';
    
    let phoneNumber = '';
    const display = document.querySelector('.phone-number');
    
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            if (key.classList.contains('call-button')) {
                console.log('Appel du numéro:', phoneNumber);
                return;
            }
    
            if (key.classList.contains('delete-button')) {
                phoneNumber = phoneNumber.slice(0, -1);
                display.textContent = phoneNumber ? formatPhoneNumber(phoneNumber) : '';
                return;
            }
    
            const digit = key.firstChild.nodeValue.trim();
            if (phoneNumber.length < 10) {
                phoneNumber += digit;
                display.textContent = formatPhoneNumber(phoneNumber);
            }
        });
    });
}


function closePhoneApp(){
    document.querySelector('.phone-app').style.display = 'none';
    document.querySelector('.apps-grid').style.display = 'grid';
    document.querySelector('.dock-container').style.display = 'block';
}

function formatPhoneNumber(number) {
    if (number.length <= 3) return number;
    if (number.length <= 6) return `${number.slice(0, 3)} ${number.slice(3)}`;
    if (number.length <= 9) return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9)}`;
}

function callNumber() {
    var number = document.querySelector(".phone-number").textContent;
    if(number === "311") {
        callFBI();
    } else {
        console.log("fake number: ", number);

        const not_attributed_audio = new Audio("../assets/sounds/effects/not_attributed.mp3");
        not_attributed_audio.play();

        document.querySelector(".phone-number").textContent = "";
    }
}

document.querySelectorAll('.app-icon').forEach(appIcon => {
    const img = appIcon.querySelector('img');
    
    if (img.alt === 'Phone') {
        return;
    }
    
    appIcon.addEventListener('click', showErrorMessage);
});

let calling_fbi = false;

function callFBI(){

    console.log("FBI CALL");

    const fbi_audio = new Audio("../assets/sounds/phone.mp3");

    if(calling_fbi == false){
        
        fbi_audio.play();
        calling_fbi = true;
    }else{
        console.log("already calling fbi");
    }

    setTimeout(() => {
        fbi_audio.pause();

    }, 9000);
    
    document.querySelector(".phone-number").innerText = "Appel en cours";
    
    document.querySelector(".row3").style.display = "none";
    document.querySelector(".row4").style.display = "none";

    document.querySelector("#hangUp").style.backgroundColor = "red";
    document.querySelector("#hangUp").innerHTML = "<i class='fas fa-phone' id='phoneIcon'></i>"
    document.querySelector("#phoneIcon").style.rotate = "135deg";

    document.querySelector("#actionsRow").style.display = "none";

    document.querySelector(".phone-keypad").style.marginTop = "50vh";

    //icons

    var hangup_1 = document.querySelector("#hangup_1");
    var hangup_2 = document.querySelector("#hangup_2");
    var hangup_3 = document.querySelector("#hangup_3");
    var hangup_4 = document.querySelector("#hangup_4");
    var hangup_6 = document.querySelector("#hangup_6");

    const original_hangup1 = hangup_1.innerHTML
    const original_hangup2 = hangup_2.innerHTML
    const original_hangup3 = hangup_3.innerHTML
    const original_hangup4 = hangup_4.innerHTML
    const original_hangup6 = hangup_6.innerHTML

    hangup_1.innerHTML = "<i class='fa-solid fa-volume-high'></i>";
    hangup_2.innerHTML = "<i class='fa-solid fa-video'></i>";
    hangup_3.innerHTML = "<i class='fa-solid fa-microphone-slash'></i>";
    hangup_4.innerHTML = "<i class='fa-solid fa-address-book'></i>";
    hangup_6.innerHTML = "<i class='fa-solid fa-bars'></i>";

    setTimeout(() => {
        startChrono();
    }, 9000)

    
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
        const timecode = document.querySelector('.phone-number');
        
        timecode.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    document.querySelector("#hangUp").addEventListener("click", () => {

        clearInterval(timer);

        document.querySelector(".phone-number").innerText = "";
    
        document.querySelector(".row3").style.display = "flex";
        document.querySelector(".row4").style.display = "flex";

        document.querySelector("#hangUp").style.backgroundColor = "#333";
        document.querySelector("#hangUp").innerHTML = "5<span class='subtext' id='hangUpSub'>JKL</span>"

        document.querySelector("#actionsRow").style.display = "flex";

        document.querySelector(".phone-keypad").style.marginTop = "0vh";

        hangup_1.innerHTML = original_hangup1;
        hangup_2.innerHTML = original_hangup2;
        hangup_3.innerHTML = original_hangup3;
        hangup_4.innerHTML = original_hangup4;
        hangup_6.innerHTML = original_hangup6;
    })
}
