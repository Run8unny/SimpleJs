const canvas = document.getElementById("canvas");
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchstart", startDrawingTouch);
canvas.addEventListener("touchmove", drawTouch);
canvas.addEventListener("touchend", stopDrawing);

const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
    isDrawing = true;
    setLastCoords(e);
}

function draw(e) {
    if (!isDrawing) return;
    const {offsetX, offsetY} = e;
    drawLine(lastX, lastY, offsetX, offsetY);
    setLastCoords(e);
}

function stopDrawing() {
    isDrawing = false;
}

function startDrawingTouch(e) {
    isDrawing = true;
    setLastCoordsTouch(e);
}

function drawTouch(e) {
    if (!isDrawing) return;
    const touch = e.touches[0];
    const {clientX, clientY} = touch;
    const {left, top} = canvas.getBoundingClientRect();
    const offsetX = clientX - left;
    const offsetY = clientY - top;
    drawLine(lastX, lastY, offsetX, offsetY);
    setLastCoordsTouch(touch);
}

function setLastCoords(e) {
    lastX = e.offsetX;
    lastY = e.offsetY;
}

function setLastCoordsTouch(touch) {
    const {clientX, clientY} = touch;
    const {left, top} = canvas.getBoundingClientRect();
    lastX = clientX - left;
    lastY = clientY - top;
}

function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#6A00FF';
    ctx.lineWidth = 2;
    ctx.stroke();
}