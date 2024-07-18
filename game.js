// game.js
let canvas, ctx;
let currentColor = '#00ff00';
let isDrawing = false;
let drawHistory = [];
let undoStack = [];

function startGame() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    initCanvas();
}

function initCanvas() {
    canvas = document.getElementById('coloringCanvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    document.getElementById('colorPicker').addEventListener('input', (e) => {
        currentColor = e.target.value;
    });
    drawAnimal();
}

function drawAnimal() {
    // Placeholder for drawing an ocean animal (e.g., a dolphin)
    ctx.fillStyle = '#808080';
    ctx.fillRect(50, 100, 220, 140); // This is a placeholder shape
}

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 5;
    ctx.stroke();
    drawHistory.push({ x: e.offsetX, y: e.offsetY, color: currentColor });
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.closePath();
    undoStack = [];
}

function saveArtwork() {
    const dataURL = canvas.toDataURL('image/png');
    localStorage.setItem(`artwork_${Date.now()}`, dataURL);
    alert('Artwork saved!');
}

function undoLast() {
    if (drawHistory.length === 0) return;
    undoStack.push(drawHistory.pop());
    redrawCanvas();
}

function redoLast() {
    if (undoStack.length === 0) return;
    drawHistory.push(undoStack.pop());
    redrawCanvas();
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAnimal();
    drawHistory.forEach(point => {
        ctx.strokeStyle = point.color;
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    });
}

function goToMenu() {
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('game').style.display = 'none';
}

function viewGallery() {
    alert('Gallery feature is not implemented yet.');
}

function viewSettings() {
    alert('Settings feature is not implemented yet.');
}

function viewAbout() {
    alert('About feature is not implemented yet.');
}
