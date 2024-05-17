const canvas = document.getElementById("canvas");
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchstart", startDrawingTouch);
canvas.addEventListener("touchmove", drawTouch);
canvas.addEventListener("touchend", stopDrawing);
const btnClear = document.querySelector(".canvas__btn");
btnClear.addEventListener('click', clearDraw);

const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let d = 30;

let color = "pink";
let colorPal = document.getElementById("color");

colorPal.addEventListener("change", function (e) {
    color = e.target.value;
})


function startDrawing(e) {
    isDrawing = true;
    setLastCoords(e);
}

function draw(e) {
    if (!isDrawing) return;
    const {offsetX, offsetY} = e;
    drawCircle(lastX, lastY, offsetX, offsetY, d, e);
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
    // drawLine(lastX, lastY, offsetX, offsetY);
    drawCircle(lastX, lastY, offsetX, offsetY, d, e);
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
    ctx.strokeStyle = color;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function drawCircle(startX, startY, endX, endY, d, e) {
    ctx.beginPath()
    ctx.moveTo(startX, startY);
    setLastCoords(e);
    ctx.arc(startX, startY, d, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
}

function clearDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const canvasTwo = document.getElementById("canvas2");
const ctx2 = canvasTwo.getContext("2d");
let width = canvasTwo.width / 2;
let height = canvasTwo.height / 2;
const ball = 30;
let x = 1;
let y = 1;

function drawBall() {
    ctx2.beginPath();
    ctx2.arc(width, height, ball, 0, Math.PI * 2);
    ctx2.fillStyle = "#000";
    ctx2.fill();
    ctx2.closePath();
    ctx2.beginPath();
    ctx2.arc(70, height, ball, 0, Math.PI * 2);
    ctx2.fillStyle = "#000";
    ctx2.fill();
    ctx2.closePath();

}

function animation() {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    // ctx2.translate(450, -0);
    // ctx2.rotate(90);
    // ctx2.strokeRect(60, 60, 250, 250);
    // ctx2.strokeStyle = "#000";
    drawBall()
    if (width > canvasTwo.width - ball || width < ball) {
        x *= -1;
    }
    if (height > canvasTwo.width - ball || height < ball) {
        y *= -1;
    }

    width += x;
    height += y;

}


setInterval(animation, 10);