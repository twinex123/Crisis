const connectorsLeft = document.querySelectorAll('#left-column .connector');
const connectorsRight = document.querySelectorAll('#right-column .connector');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDragging = false;
let startX, startY, currentDraggingElement, targetId;
let lines = []; // Pour stocker les lignes tracées
let connections = {}; // Pour stocker les connexions

// Adapter la taille du canvas à la fenêtre
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Fonction pour commencer le drag
function handleDragStart(event) {
    isDragging = true;
    currentDraggingElement = event.target;
    startX = event.target.getBoundingClientRect().left + event.target.offsetWidth / 2;
    startY = event.target.getBoundingClientRect().top + event.target.offsetHeight / 2;
    targetId = event.target.id;
}

// Fonction pour dessiner les lignes pendant le drag
function handleDrag(event) {
    if (isDragging) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawExistingLines(); // Redessiner les lignes déjà tracées
        let endX = event.clientX;
        let endY = event.clientY;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = currentDraggingElement.style.backgroundColor;
        ctx.lineWidth = 5;
        ctx.stroke();
    }
}

// Fonction pour terminer le drag
function handleDrop(event) {
    isDragging = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawExistingLines(); // Redessiner les lignes déjà tracées

    let endElement = event.target;
    if (endElement && targetId.startsWith('left') && endElement.id.startsWith('right')) {
        if (!connections[targetId] && !connections[endElement.id]) { // Vérifier si la connexion n'a pas déjà été faite
            drawPermanentLine(currentDraggingElement, endElement);
            connections[targetId] = endElement.id;
            connections[endElement.id] = targetId;
            checkConnections();
        }
    }
}

// Dessiner la ligne permanente après avoir connecté les câbles
function drawPermanentLine(startElement, endElement) {
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const startX = startRect.left + startElement.offsetWidth / 2;
    const startY = startRect.top + startElement.offsetHeight / 2;
    const endX = endRect.left + endElement.offsetWidth / 2;
    const endY = endRect.top + endElement.offsetHeight / 2;

    lines.push({
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        color: startElement.style.backgroundColor
    });

    drawExistingLines(); // Redessiner les lignes avec la nouvelle connexion
}

// Fonction pour dessiner toutes les lignes tracées
function drawExistingLines() {
    lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 5;
        ctx.stroke();
    });
}

// Vérifier si toutes les connexions sont correctes
function checkConnections() {
    let correctConnections = 0;
    connectorsLeft.forEach(leftConnector => {
        const rightId = connections[leftConnector.id];
        if (rightId && rightId.split('-')[1] === leftConnector.id.split('-')[1]) {
            correctConnections++;
        }
    });

    if (correctConnections === connectorsLeft.length) {
        alert("Toutes les connexions sont correctes !");
    }
}

// Ajouter des écouteurs d'événements pour drag-and-drop
connectorsLeft.forEach(connector => {
    connector.addEventListener('dragstart', handleDragStart);
});

document.addEventListener('dragover', handleDrag);
connectorsRight.forEach(connector => {
    connector.addEventListener('drop', handleDrop);
});
