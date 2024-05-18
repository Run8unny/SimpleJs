const firstDiv = document.querySelector('.dragInto');
const secondDiv = document.querySelector('.boxes__toPlay');

let itemHolder;
const colors = [
    'red', 'pink', 'black', 'olivedrab', 'white', 'lightgray', 'indigo', 'violet', 'teal', 'lightgray', 'pink',
    'red', 'pink', 'black', 'olivedrab', 'white', 'lightgray', 'indigo', 'violet', 'teal', 'black',
];

for (let color of colors) {
    const div = document.createElement('div');
    div.classList.add('box');
    div.style.backgroundColor = color;
    div.setAttribute('draggable', 'true');
    secondDiv.appendChild(div);
}

const boxes = document.querySelectorAll('.box');

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