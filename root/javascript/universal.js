const hamburgerMenu = document.querySelector("#hamburger");
const navItems = document.querySelector(".nav-items");
const header = document.querySelector("header");
let menuClosed = true;

hamburgerMenu.addEventListener("click",function(){
    if(menuClosed){
        hamburgerMenu.classList.add("open"); 
        navItems.classList.remove("hidden");
        header.classList.add("expand");
        menuClosed = false;
    }
    else {
        hamburgerMenu.classList.remove("open"); 
        navItems.classList.add("hidden");
        header.classList.remove("expand");
        menuClosed = true;
    } 
})