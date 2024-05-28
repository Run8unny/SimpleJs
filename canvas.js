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
    ctx.lineWidth = 5;
    ctx.stroke();
}

function clearDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const canvasTwo = document.getElementById("canvas2");
const ctx2 = canvasTwo.getContext("2d");
const balls = [];

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xVel = (Math.random() - 0.5) * 10;
        this.yVel = (Math.random() - 0.5) * 10;
        this.size = Math.random() * 30 + 10;
        this.color = Ball.getRandomColor();
    }

    static getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        return `rgb(${r}, ${b},${g})`;
    }

    draw() {
        ctx2.beginPath();
        ctx2.fillStyle = this.color;
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx2.fill();
    }

    update() {
        //   Check if it's about to hit the canvas boundary
        if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
            this.xVel = -this.xVel;
        }
        if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
            this.yVel = -this.yVel;
        }
        this.x += this.xVel;
        this.y += this.yVel;

        // if (this.y + this.size < canvas.height) {
        //     this.yVel += 0.3;
        // }
    }
}

function loop() {
    ctx2.fillStyle = "white";
    ctx2.fillRect(0, 0, canvas.width, canvas.height);
    for (let ball of balls) {
        ball.update();
        ball.draw();
    }
    requestAnimationFrame(loop);
}

loop();
canvasTwo.addEventListener("click", (e) => {
    const ball = new Ball(e.clientX, e.clientY);
    balls.push(ball);
});

