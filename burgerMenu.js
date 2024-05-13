const menuBurger = () => {
    const btnNav = document.querySelector(".burger__menu");
    const body = document.querySelector("body");

    btnNav.addEventListener("click", () => body.classList.toggle("show-menu"))
}

menuBurger();