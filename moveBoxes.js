const firstDiv = document.querySelector('.dragInto');
const secondDiv = document.querySelector('.boxes__toPlay');
const boxes = document.querySelectorAll('.box');

let itemHolder;

boxes.forEach(box => {
    box.addEventListener("dragstart", (e) => {
        itemHolder = e.target;
    });
});

firstDiv.addEventListener("dragover", (e) => {
    e.preventDefault()
});

firstDiv.addEventListener("drop", (e) => {
    firstDiv.prepend(itemHolder);
});

secondDiv.addEventListener("dragover", (e) => {
    e.preventDefault()
});

secondDiv.addEventListener("drop", (e) => {
    secondDiv.prepend(itemHolder);
});