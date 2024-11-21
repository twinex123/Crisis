//Fonctionnement de la 3D qui affiche l'iframe du site, utilisant three.js, avec CSS3DRenderer et GLTFLoader. 

let isFullscreen = false;
let isDragging = false;
let rotationSpeed = 0.002;

window.addEventListener('message', (event) => {
    if (event.data === 'toggleFullScreen') {
        console.log("auto toggle fullscreen");
        toggleFullscreen();
    } 
});

//FULLLSCREEN TOGGLE

localStorage.setItem("toggle_fs", 0);

function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    
    if (isFullscreen) {
        crt_iframe.style.width = '100vw';
        crt_iframe.style.height = '100vh';
        cssObject.position.set(0, 1, -1.9);
        cssObject.scale.set(.005, .005, .005); 
        
        camera.position.set(0, 1, 1.6);
        camera.lookAt(0, 1, 0);
        
        isDragging = false;
        window.removeEventListener('mousedown', enableDragging);
        window.removeEventListener('mousemove', handleMouseMove);
    } else {
        crt_iframe.style.width = '955px';
        crt_iframe.style.height = '500px';
        cssObject.position.set(0.1, 1, -1.9);
        cssObject.scale.set(.005, .005, .005);
        
        camera.position.set(0, 1, 1.6);
        camera.lookAt(0, 1, 0);
        
        window.addEventListener('mousedown', enableDragging);
        window.addEventListener('mousemove', handleMouseMove);
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
cssRenderer.domElement.style.left = '0';
document.body.appendChild(cssRenderer.domElement); 

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const deskGeometry = new THREE.BoxGeometry(4, 0.1, 2); 
const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x090909 }); 
const desk = new THREE.Mesh(deskGeometry, deskMaterial);
desk.position.set(0, 0, 0);
scene.add(desk);

var crt_iframe = document.createElement('iframe');
crt_iframe.src = 'crt.html'; 
crt_iframe.style.width = '955px'; 
crt_iframe.style.height = '500px';
crt_iframe.style.border = '0px';
crt_iframe.style.position = 'absolute';
crt_iframe.style.zIndex = '999';

var cssObject = new THREE.CSS3DObject(crt_iframe);
cssObject.position.set(0.1, 1, -1.9); 
cssObject.scale.set(.005, .005, .005);

scene.add(cssObject);

const notesLoader = new THREE.GLTFLoader();
notesLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/notes.glb', function (gltf) {
    const notesModel = gltf.scene;

    notesModel.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour notes:', child.material.map);
            }
        }
    });

    scene.add(notesModel);
    notesModel.position.set(-1, .3, .5);
    notesModel.scale.set(1.8, 1.8, 1.8); 
    
});

const keyboardLoader = new THREE.GLTFLoader();
keyboardLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/keyboard.glb', function (gltf) {
    const keyboardModel = gltf.scene;

    keyboardModel.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour keyboard:', child.material.map);
            }
        }
    });

    scene.add(keyboardModel);
    keyboardModel.position.set(0, .2, .8);
    keyboardModel.scale.set(4, 4, 4); 
    
});

const wallLoader = new THREE.GLTFLoader();
wallLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/wall.glb', function (gltf) {
    const wallModel = gltf.scene;

    wallModel.traverse((child) => {
        if (child.isMesh) {
            // Créer un nouveau matériau plus sombre
            const darkMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333, // Couleur sombre
                roughness: 0.7,
                metalness: 0.2
            });

            if (child.material.map) {
                console.log('Texture chargée pour wall:', child.material.map);
                darkMaterial.map = child.material.map;
                darkMaterial.map.encoding = THREE.sRGBEncoding;
            }

            // Appliquer le nouveau matériau
            child.material = darkMaterial;
        }
    });

    scene.add(wallModel);
    wallModel.position.set(0, 0, -0.5);
    wallModel.scale.set(1, 1, 1); 
});

const wallLoader2 = new THREE.GLTFLoader();
wallLoader2.load('https://raw.githubusercontent.com/twinex123/NSI/main/wall.glb', function (gltf) {
    const wallModel2 = gltf.scene;

    wallModel2.traverse((child) => {
        if (child.isMesh) {
            const darkMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333, 
                roughness: 0.7,
                metalness: 0.2
            });

            if (child.material.map) {
                console.log('Texture chargée pour wall2:', child.material.map);
                darkMaterial.map = child.material.map;
                darkMaterial.map.encoding = THREE.sRGBEncoding;
            }

            child.material = darkMaterial;
        }
    });

    scene.add(wallModel2);
    wallModel2.position.set(-3, 0, -0.5);
    wallModel2.scale.set(1, 1, 1); 
    wallModel2.rotation.y = Math.PI / 2;
});
const wallLoader3 = new THREE.GLTFLoader();
wallLoader3.load('https://raw.githubusercontent.com/twinex123/NSI/main/wall.glb', function (gltf) {
    const wallModel3 = gltf.scene;

    wallModel3.traverse((child) => {
        if (child.isMesh) {
            const darkMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333, 
                roughness: 0.7,
                metalness: 0.2
            });

            if (child.material.map) {
                console.log('Texture chargée pour wall3:', child.material.map);
                darkMaterial.map = child.material.map;
                darkMaterial.map.encoding = THREE.sRGBEncoding;
            }

            child.material = darkMaterial;
        }
    });

    scene.add(wallModel3);
    wallModel3.position.set(3, 0, -0.5);
    wallModel3.scale.set(1, 1, 1); 
    wallModel3.rotation.y = Math.PI + Math.PI / 2;
});

const loader = new THREE.GLTFLoader();
loader.load('https://raw.githubusercontent.com/twinex123/NSI/main/pc_monitor.glb', function (gltf) {
    const model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour pc_monitor:', child.material.map);
            }
        }
    });

    scene.add(model);
    model.position.set(0, 0, 0); 
    model.scale.set(0.5, 0.5, 0.5); 
});

const fanLoader = new THREE.GLTFLoader();
fanLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/fan.glb', function (gltf) {
    const model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour fan:', child.material.map);
            }
        }
    });

    //scene.add(model);
    model.position.set(0, 0, 0); 
    model.scale.set(1.5, 1.5, 1.5); 
});

let initialCameraRotationX = 0;
let initialCameraRotationY = 0;
const maxRotationY = Math.PI / 2; 
const maxRotationX = Math.PI / 4;
const minRotationX = -Math.PI / 6;

function handleMouseMove(event) {
    if (isDragging) {

        crt_iframe.style.pointerEvents = "none";

        const deltaMove = {
            x: event.movementX,
            y: event.movementY
        };

        const newRotationY = camera.rotation.y - deltaMove.x * rotationSpeed;
        const deltaRotationY = newRotationY - initialCameraRotationY;

        if (Math.abs(deltaRotationY) <= maxRotationY) {
            camera.rotation.y = newRotationY;
        } else {
            camera.rotation.y = initialCameraRotationY + Math.sign(deltaRotationY) * maxRotationY;
        }

        const newRotationX = camera.rotation.x - deltaMove.y * rotationSpeed;
        const isFacingComputer = Math.abs(camera.rotation.y) < Math.PI / 6;

        if (isFacingComputer) {
            camera.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, newRotationX));
        } else {
            const limitedMaxRotationX = 0; 
            const limitedMinRotationX = 0; 
            camera.rotation.x = Math.max(limitedMinRotationX, Math.min(limitedMaxRotationX, newRotationX));
        }
    }else {
        crt_iframe.style.pointerEvents = "auto";
    }
}

function resetInitialRotation() {
    initialCameraRotationX = camera.rotation.x;
    initialCameraRotationY = camera.rotation.y;
}

window.addEventListener('mousedown', () => {
    isDragging = true;
    resetInitialRotation();
});
window.addEventListener('mouseup', () => { 
    isDragging = false; 
});
window.addEventListener('mousemove', handleMouseMove);

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera); 
};
animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    cssRenderer.setSize(width, height); 
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

camera.position.set(0, 1, 1.6);
camera.lookAt(0, 1, 0);

const loaderOverlay = document.createElement('div');
loaderOverlay.style.position = "absolute";
loaderOverlay.style.width = "100vw";
loaderOverlay.style.height = "100vh";
loaderOverlay.style.backgroundColor = "black";
loaderOverlay.style.zIndex = "1000";

const loaderContainer = document.createElement('div');
loaderContainer.style.position = 'fixed';
loaderContainer.style.top = '0';
loaderContainer.style.left = '0';
loaderContainer.style.width = '100%';
loaderContainer.style.height = '100%';
loaderContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
loaderContainer.style.display = 'flex';
loaderContainer.style.justifyContent = 'center';
loaderContainer.style.alignItems = 'center';
loaderContainer.style.zIndex = '1000';

const loaderSpinner = document.createElement('div');
loaderSpinner.style.border = '5px solid grey';
loaderSpinner.style.borderTop = '5px solid white';
loaderSpinner.style.borderRadius = '50%';
loaderSpinner.style.width = '50px';
loaderSpinner.style.height = '50px';
loaderSpinner.style.animation = 'spin 1s linear infinite';

loaderContainer.appendChild(loaderSpinner);

document.body.appendChild(loaderContainer);

const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

let loadedModels = 0;
const totalModels = 6;

function checkAllModelsLoaded() {
    loadedModels++;
    if (loadedModels === totalModels) {
        loaderContainer.style.display = 'none';
    }
}

notesLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/notes.glb', function (gltf) {
    const notesModel = gltf.scene;

    notesModel.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour notes:', child.material.map);
            }
        }
    });

    scene.add(notesModel);
    notesModel.position.set(-1, .3, .5);
    notesModel.scale.set(1.8, 1.8, 1.8); 
    
    checkAllModelsLoaded();
});

const lightSwitchLoader = new THREE.GLTFLoader();
lightSwitchLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/light_switch.glb', function (gltf) {
    const lightSwitchLoader = gltf.scene;

    lightSwitchLoader.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour lightSwitch:', child.material.map);
            }
        }
    });

    scene.add(lightSwitchLoader);
    lightSwitchLoader.position.set(-1.2, 1, .1);
    lightSwitchLoader.scale.set(1.8, 1.8, 1.8); 

    lightSwitchLoader.rotation.y = Math.PI + Math.PI / 2;
    
    checkAllModelsLoaded();
});

wallLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/wall.glb', function (gltf) {
    const wallModel = gltf.scene;

    wallModel.traverse((child) => {
        if (child.isMesh) {
            const darkMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333, 
                roughness: 0.7,
                metalness: 0.2
            });

            if (child.material.map) {
                console.log('Texture chargée pour wall:', child.material.map);
                darkMaterial.map = child.material.map;
                darkMaterial.map.encoding = THREE.sRGBEncoding;
            }

            child.material = darkMaterial;
        }
    });

    scene.add(wallModel);
    wallModel.position.set(0, 0, -0.5);
    wallModel.scale.set(1, 1, 1); 

    checkAllModelsLoaded();
});

wallLoader2.load('https://raw.githubusercontent.com/twinex123/NSI/main/wall.glb', function (gltf) {
    const wallModel2 = gltf.scene;

    wallModel2.traverse((child) => {
        if (child.isMesh) {
            const darkMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333, 
                roughness: 0.7,
                metalness: 0.2
            });

            if (child.material.map) {
                console.log('Texture chargée pour wall2:', child.material.map);
                darkMaterial.map = child.material.map;
                darkMaterial.map.encoding = THREE.sRGBEncoding;
            }

            child.material = darkMaterial;
        }
    });

    scene.add(wallModel2);
    wallModel2.position.set(-3, 0, -0.5);
    wallModel2.scale.set(1, 1, 1); 
    wallModel2.rotation.y = Math.PI / 2;

    checkAllModelsLoaded();
});

wallLoader3.load('https://raw.githubusercontent.com/twinex123/NSI/main/wall.glb', function (gltf) {
    const wallModel3 = gltf.scene;

    wallModel3.traverse((child) => {
        if (child.isMesh) {
            const darkMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333, 
                roughness: 0.7,
                metalness: 0.2
            });

            if (child.material.map) {
                console.log('Texture chargée pour wall3:', child.material.map);
                darkMaterial.map = child.material.map;
                darkMaterial.map.encoding = THREE.sRGBEncoding;
            }

            child.material = darkMaterial;
        }
    });

    scene.add(wallModel3);
    wallModel3.position.set(3, 0, -0.5);
    wallModel3.scale.set(1, 1, 1); 
    wallModel3.rotation.y = Math.PI + Math.PI / 2;

    checkAllModelsLoaded();
});

loader.load('https://raw.githubusercontent.com/twinex123/NSI/main/pc_monitor.glb', function (gltf) {
    const model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour pc_monitor:', child.material.map);
            }
        }
    });

    scene.add(model);
    model.position.set(0, 0, 0); 
    model.scale.set(0.5, 0.5, 0.5); 

    checkAllModelsLoaded();
});

fanLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/fan.glb', function (gltf) {
    const model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour fan:', child.material.map);
            }
        }
    });

    //scene.add(model);
    model.position.set(0, 0, 0); 
    model.scale.set(1.5, 1.5, 1.5); 

    checkAllModelsLoaded();
});

const mugLoader = new THREE.GLTFLoader();
mugLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/aluminum_mug.glb', function (gltf) {
    const model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour mug:', child.material.map);
            }
        }
    });

    model.position.set(.6, -2.6, .6); 
    model.scale.set(3.5, 3.5, 3.5); 

    scene.add(model);

    checkAllModelsLoaded();
});

const doorLoader = new THREE.GLTFLoader();
doorLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/door.glb', function (gltf) {
    const model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour mug:', child.material.map);
            }
        }
    });

    model.position.set(-2.85, 1.9, 2); 
    model.scale.set(.009, .009, .009); 

    model.rotation.y = Math.PI / 2;
    scene.add(model);

    checkAllModelsLoaded();
});

//TELEPHONE + IFRAME

const phoneLoader = new THREE.GLTFLoader();
phoneLoader.load('https://raw.githubusercontent.com/twinex123/NSI/main/phone.glb', function (gltf) {
    const model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material.map) {
                console.log('Texture chargée pour phone:', child.material.map);
            }
        }
    });

    model.position.set(-.15, .9, 1.5); 
    model.scale.set(.0001, .0001, .0001); 

    model.rotation.y = Math.PI / 2 + Math.PI;
    scene.add(model);

    checkAllModelsLoaded();
});

var phone_iframe = document.createElement('iframe');
phone_iframe.src = 'apps/phone.html';
phone_iframe.style.width = '150px';
phone_iframe.style.height = '250px';
phone_iframe.style.border = '0px';

var phone_cssObject = new THREE.CSS3DObject(phone_iframe);
phone_cssObject.position.set(-0.15, 0.9, 1.497);
phone_cssObject.scale.set(0.00012, 0.00012, 0.00012);

phone_cssObject.rotation.x = -Math.PI / 2; 

scene.add(phone_cssObject);

function updatePhoneScreen() {
    const phoneModel = scene.getObjectByName('phone');
    if (phoneModel) {
        const box = new THREE.Box3().setFromObject(phoneModel);
        const size = box.getSize(new THREE.Vector3());
        
        phone_cssObject.position.copy(phoneModel.position);
        phone_cssObject.rotation.set(phoneModel.rotation.x - Math.PI / 2, phoneModel.rotation.y, phoneModel.rotation.z); // Mises à jour pour correspondre aux rotations du modèle 3D
        phone_cssObject.scale.set(size.y, size.x, 1);  
    }
}

updatePhoneScreen();



//CLICK EVENTS + LIGHT

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onMouseClick, false);

let lightOn = false;

var warmLight = new THREE.PointLight(0xffaa66, 2, 10);
warmLight.position.set(0, 2, 0);

const light_on_effect = new Audio("assets/sounds/effects/light_on.mp3");
const light_off_effect = new Audio("assets/sounds/effects/light_off.mp3");
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        console.log('clicked on :', intersectedObject.name);
        

        if(intersectedObject.name === "Switch001_lightswitch_0"){
            console.log("Light switch clicked");

            if(!lightOn){
                console.log("Light on");
                light_on_effect.play();

                scene.add(warmLight);
                lightOn = true;
            }else{
                console.log("Light off");
                light_off_effect.play();

                scene.remove(warmLight);
                lightOn = false;
            }
        }
        else if(intersectedObject.name === "Object_2"){
            openPhone();
        }
    }
}

//PHONE MANAGEMENT

phone_iframe.addEventListener('click', openPhone);

let debug_phone_value = 0;

localStorage.setItem("can_open_phone", 1);

let can_open_phone = false;

setInterval(() => {
    if (localStorage.getItem("can_open_phone") === "1") {
        can_open_phone = true;
    }
}, 1000);

function openPhone(){
    if(!can_open_phone){
        var cant_open_audio = new Audio("assets/sounds/tutorial/tuto_voice6.mp3");
        cant_open_audio.play();
    }else{
        //PHONE OPEN

        document.querySelector(".phone_open").style.display = "block";
        phone_iframe.src = "apps/fullphone.html";
    }
}

window.addEventListener('message', (event) => {
    if (event.data === 'closePhone') {
        document.querySelector(".phone_open").style.display = "none";
        phone_iframe.src = "apps/phone.html";
    }
});