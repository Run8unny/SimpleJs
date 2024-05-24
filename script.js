const addTodo = document.querySelector(".add");
const todoList = document.querySelector(".todos");
const search = document.querySelector(".search input");
const waterBox = document.querySelector(".water__box");
const moodBox = document.querySelector(".mood__box");
const mouse = document.querySelector('#circle__mouse');
const mouseTwo = document.querySelector('#other__mouse');


const moveCursor = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    mouse.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    mouseTwo.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

}

window.addEventListener('mousemove', moveCursor)

const generateTemplate = todo => {
    const html =
        ` <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <div class="tools">
                <button class="complete"><i class="fa-solid fa-circle-check complete"></i></button>
                <button class="delete"> <i class="fa-solid fa-trash delete"></i></button>
            </div>
        </li>`
    todoList.innerHTML += html;
}

const handleSubmit = event => {
    event.preventDefault();
    const todo = addTodo.add.value.trim();
    if (todo.length) {
        generateTemplate(todo);
        addTodo.reset();
    }
}

const filterTodo = term => {

    Array.from(todoList.children)
        .filter(li => !li.textContent.toLowerCase().includes(term))
        .forEach(noTerm => noTerm.classList.add('filtered'));


    Array.from(todoList.children)
        .filter(li => li.textContent.toLowerCase().includes(term))
        .forEach(noTerm => noTerm.classList.remove('filtered'));
}

const searchTodo = event => {
    const term = search.value.trim().toLowerCase();
    filterTodo(term);
}

const handleClick = e => {
    if (e.target.matches('.complete')) {
        e.target.closest("li").firstElementChild.classList.toggle('completed');
        e.target.classList.toggle('completed');
    } else if (e.target.matches('.delete')) {
        e.target.closest("li").remove();
    }
}

const getWater = e => {
    if (e.target.matches(".need_water")) {
        e.target.closest("li").classList.toggle(".get_water");
        e.target.classList.toggle("get_water");
    }
}

const getFace = e => {
    if (e.target.matches(".have_face")) {
        e.target.closest("li").classList.toggle(".get_face");
        e.target.classList.toggle("get_face");
    }
}

moodBox.addEventListener("click", getFace);
waterBox.addEventListener("click", getWater);
search.addEventListener("keyup", searchTodo);
todoList.addEventListener("click", handleClick);
addTodo.addEventListener("submit", handleSubmit);
