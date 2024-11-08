const files = [
    "C:\\WINDOWS\\system32\\kernel32.dll",
    "C:\\Program Files\\Internet Explorer\\iexplore.exe", 
    "C:\\WINDOWS\\system32\\ntdll.dll",
    "C:\\WINDOWS\\system32\\user32.dll",
    "C:\\Documents and Settings\\user\\Desktop\\documents.txt",
    "C:\\Program Files\\Common Files\\system.dll",
    "C:\\WINDOWS\\system32\\shell32.dll",
    "C:\\WINDOWS\\system32\\wininet.dll",
    "C:\\Program Files\\Messenger\\msmsgs.exe",
    "C:\\WINDOWS\\system32\\winsock.dll",
    "C:\\Program Files\\Windows Media Player\\wmplayer.exe",
    "C:\\WINDOWS\\system32\\drivers\\etc\\hosts",
    "C:\\Program Files\\Common Files\\Microsoft Shared\\MSInfo\\msinfo32.exe",
    "C:\\WINDOWS\\system32\\mspaint.exe",
    "C:\\Program Files\\Internet Explorer\\SIGNUP\\install.ins",
    "C:\\WINDOWS\\system32\\notepad.exe",
    "C:\\Program Files\\Outlook Express\\msimn.exe",
    "C:\\WINDOWS\\system32\\calc.exe",
    "C:\\WINDOWS\\system32\\cmd.exe",
    "C:\\Program Files\\Windows NT\\Accessories\\wordpad.exe",
    "C:\\WINDOWS\\system32\\drivers\\tcpip.sys",
    "C:\\Program Files\\Common Files\\Microsoft Shared\\Web Folders\\MSOWS409.DLL",
    "C:\\WINDOWS\\system32\\comctl32.dll",
    "C:\\WINDOWS\\system32\\ole32.dll",
    "C:\\Program Files\\MSN\\msnmsgr.exe",
    "C:\\WINDOWS\\system32\\gdi32.dll",
    "C:\\Program Files\\Windows Media Player\\wmplayer.log",
    "C:\\WINDOWS\\system32\\advapi32.dll",
    "C:\\Documents and Settings\\user\\My Documents\\notes.txt",
    "C:\\Program Files\\Common Files\\system\\OLEAUT32.DLL",
    "C:\\WINDOWS\\system32\\rpcrt4.dll",
    "C:\\Program Files\\Internet Explorer\\iexplore.dat",
    "C:\\WINDOWS\\system32\\msvcrt.dll",
    "C:\\Program Files\\Windows NT\\Pinball\\PINBALL.EXE",
    "C:\\WINDOWS\\system32\\ws2_32.dll",
    "C:\\Program Files\\Common Files\\Microsoft Shared\\DAO\\dao360.dll",
    "C:\\WINDOWS\\system32\\comdlg32.dll",
    "C:\\Documents and Settings\\user\\Desktop\\backup.zip",
    "C:\\Program Files\\MSN Gaming Zone\\Windows\\zone.exe",
    "C:\\WINDOWS\\system32\\winmm.dll",
    "C:\\Users\\user\\a_lire_en_cas_de_probleme.txt"
];

let progress = 0;
let fileIndex = 0;
const statusBox = document.getElementById('status-box');
const progressBar = document.getElementById('progress');
const filesCount = document.getElementById('files-count');

function addFile() {
    if (fileIndex < files.length) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file-name';
        fileDiv.textContent = `Analyse: ${files[fileIndex]}`;
        statusBox.appendChild(fileDiv);
        statusBox.scrollTop = statusBox.scrollHeight;

        if(files[fileIndex].includes("a_lire_en_cas_de_probleme.txt")) {
            const popup = document.createElement('div');
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #C0C0C0;
                border: 2px outset #fff;
                padding: 15px;
                box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
                z-index: 9999;
                font-family: 'Tahoma', sans-serif;
                min-width: 250px;
                color: black;
            `;
            
            popup.innerHTML = `
                <div style="background: #000080; color: white; padding: 3px; margin: -15px -15px 10px -15px;">
                    <span style="padding-left: 5px;">Alerte Antivirus</span>
                </div>
                <div style="display: flex; align-items: center; margin: 15px 0;">
                    <img src="../assets/images/icons/warning.png" style="width: 32px; height: 32px; margin-right: 10px;">
                    <span>Un fichier important a été trouvé!</span>
                </div>
                <div style="text-align: center; margin-top: 15px;">
                    <button onclick="this.parentElement.parentElement.remove()" style="padding: 3px 15px; background: #C0C0C0; border: 2px outset #fff;">OK</button>
                </div>
            `;
            
            document.body.appendChild(popup);
            window.parent.postMessage('antivirusAlert', '*');
        }

        fileIndex++;
        filesCount.textContent = fileIndex;
    }
}

function updateProgress() {
    if (progress < 100) {
        progress += Math.random() * 2;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress === 100) {
            document.getElementById('scan-status').textContent = 'Terminé';
            return;
        }
        
        addFile();
        setTimeout(updateProgress, Math.random() * 500 + 100);
    }
}

updateProgress();