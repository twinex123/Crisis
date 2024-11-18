//GESTION 'SERVEUR'

document.addEventListener("DOMContentLoaded", () => {
    console.log("Verifying cookies...");

    const currentPage = window.location.pathname;

    if (!localStorage.getItem("start") && !currentPage.includes("tutorial.html")) {
        window.location.href = "tutorial.html"; 
    } else {
        console.log("OK game started");
    }
});


function startGame(){
    console.log("Game starting.")
    localStorage.setItem("start", 1)
    window.location.href = "login.html"
}

function shutdownGame(){
    localStorage.removeItem("start")
    window.location.href = "tutorial.html"
}

//AUDIO CONTROL

document.getElementById("soundOverlay").addEventListener("click", () => {
    const audio = new Audio('assets/sounds/startup.mp3'); 
    audio.play();
});

//DRAGGABLE WINDOWS

const wrappers = document.querySelectorAll(".wrapper");

wrappers.forEach(wrapper => {
    const header = wrapper.querySelector("header");
    let isDragging = false;

    function onDrag(e) {
        if (!isDragging) return;
        
        let getStyle = window.getComputedStyle(wrapper);
        let leftVal = parseInt(getStyle.left);
        let topVal = parseInt(getStyle.top);
        wrapper.style.left = `${leftVal + e.movementX}px`;
        wrapper.style.top = `${topVal + e.movementY}px`;
    }

    header.addEventListener("mousedown", () => {
        isDragging = true;
        header.classList.add("active");
        wrapper.style.zIndex = "1000";
        
        wrappers.forEach(w => {
            if (w !== wrapper) {
                w.style.zIndex = "10";
            }
        });
        
        document.addEventListener("mousemove", onDrag);
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        header.classList.remove("active");
        document.removeEventListener("mousemove", onDrag);
    });

    wrapper.addEventListener("mousedown", () => {
        wrapper.style.zIndex = "1000";
        wrappers.forEach(w => {
            if (w !== wrapper) {
                w.style.zIndex = "10";
            }
        });
    });
});


//Launch apps

var taskbarApps = document.getElementById("taskbar-apps");

// vidéo
document.getElementById("video_li").addEventListener("click", () => {

    startMenu.classList.toggle("hidden");

    var video_element = document.getElementById("app_video");
    video_element.classList.toggle("hidden");


    var existingTaskbarApp = document.querySelector(".taskbar-video");
    var video = document.getElementById("video_presentation")

    if (existingTaskbarApp) {
        taskbarApps.removeChild(existingTaskbarApp);
        
        video.pause();
        video.currentTime = 0

    } else {
        
        video.play();

        var taskbarApp = document.createElement("div");
        taskbarApp.classList = "taskbar-app taskbar-video active";
        taskbarApp.innerHTML = "Video";
        
        taskbarApp.onclick = () => {
            video_element.classList.toggle("hidden");
        };

        taskbarApps.appendChild(taskbarApp);

        taskbarApp.addEventListener("click", () => {
            taskbarApp.classList.toggle("active");
        });

        setTimeout(() => {
            video_element.classList.add("hidden");
            taskbarApps.removeChild(taskbarApp);
        }, 24000);
    }

});

//GESTION OUVERTURES AUTRES APPS


// var explorerIcon = document.getElementById("explorer-icon");
// var explorerWindow = document.getElementById("explorer-window");

// explorerIcon.addEventListener("click", () => {
//     explorerWindow.classList.remove("hidden");
    
//     var taskbarApp = document.createElement("div");
//     taskbarApp.classList.add("taskbar-app");
//     taskbarApp.innerHTML = "Explorateur";
//     taskbarApp.onclick = () => {
//         explorerWindow.classList.toggle("hidden");
//     };
//     taskbarApps.appendChild(taskbarApp);
// });

var notepadIcon = document.getElementById("notepad-icon");
var notepadWindow = document.getElementById("app_notepad");

notepadIcon.addEventListener("click", () => {
    notepadWindow.classList.toggle("hidden");
    
    var existingTaskbarApp = document.querySelector(".taskbar-video");
    
    if(existingTaskbarApp){
        taskbarApps.removeChild(existingTaskbarApp);
    }else{
        var taskbarApp = document.createElement("div");
        taskbarApp.classList = "taskbar-app taskbar-notepad active";
        taskbarApp.innerHTML = "Bloc-notes";

        taskbarApp.onclick = () => {
            notepadWindow.classList.toggle("hidden");
        };
        taskbarApps.appendChild(taskbarApp);

        taskbarApp.addEventListener("click", () => {
            taskbarApp.classList.toggle("active");
        });
    }

    
});

var terminalIcon = document.getElementById("terminal-icon");
var terminalWindow = document.getElementById("app_powershell");

terminalIcon.addEventListener("click", () => {
    terminalWindow.classList.toggle("hidden");
    
    var existingTaskbarApp = document.querySelector(".taskbar-powershell");
    
    if(existingTaskbarApp){
        taskbarApps.removeChild(existingTaskbarApp);
    }else{
        var taskbarApp = document.createElement("div");
        taskbarApp.classList = "taskbar-app taskbar-powershell active";
        taskbarApp.innerHTML = "Powershell";

        taskbarApp.onclick = () => {
            terminalWindow.classList.toggle("hidden");
        };
        taskbarApps.appendChild(taskbarApp);

        taskbarApp.addEventListener("click", () => {
            taskbarApp.classList.toggle("active");
        });
    }

    
});

var iexplorerIcon = document.getElementById("iexplorer-icon");
var iexplorerWindow = document.getElementById("app_iexplorer");

iexplorerIcon.addEventListener("click", () => {
    iexplorerWindow.classList.toggle("hidden");
    
    var existingTaskbarApp = document.querySelector(".taskbar-iexplorer");
    
    if(existingTaskbarApp){
        taskbarApps.removeChild(existingTaskbarApp);
    }else{
        var taskbarApp = document.createElement("div");
        taskbarApp.classList = "taskbar-app taskbar-iexplorer active";
        taskbarApp.innerHTML = "Internet Explorer";

        taskbarApp.onclick = () => {
            iexplorerWindow.classList.toggle("hidden");
        };
        taskbarApps.appendChild(taskbarApp);

        taskbarApp.addEventListener("click", () => {
            taskbarApp.classList.toggle("active");
        });
    }

    notepadWindow.classList.add("hidden");
    terminalWindow.classList.add("hidden");
});

var fbiIcon = document.getElementById("fbi-icon");
var fbiWindow = document.getElementById("app_fbi");

fbiIcon.addEventListener("click", () => {
    fbiWindow.classList.toggle("hidden");
    
    var existingTaskbarApp = document.querySelector(".taskbar-fbi");
    
    if(existingTaskbarApp){
        taskbarApps.removeChild(existingTaskbarApp);
    }else{
        var taskbarApp = document.createElement("div");
        taskbarApp.classList = "taskbar-app taskbar-fbi active";
        taskbarApp.innerHTML = "FBI";

        taskbarApp.onclick = () => {
            fbiWindow.classList.toggle("hidden");
        };
        taskbarApps.appendChild(taskbarApp);

        taskbarApp.addEventListener("click", () => {
            taskbarApp.classList.toggle("active");
        });
    }

    
});
var snakeIcon = document.getElementById("snake-icon");
var snakeWindow = document.getElementById("app_snake");

snakeIcon.addEventListener("click", () => {
    snakeWindow.classList.toggle("hidden");
});