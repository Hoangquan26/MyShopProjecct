let getPageStatus = () => {
    let darkModeCheck = localStorage.getItem('body');
    let navMode = localStorage.getItem('nav');
    if (darkModeCheck != null)
        document.body.classList.add(darkModeCheck)
    if (navMode != null) {
        document.querySelector('nav').classList.add(navMode)
        document.querySelector('#sidebar').classList.add(navMode)
        document.querySelector('#body').classList.add(navMode)
    }
}
getPageStatus();
toogleNav_btn = document.querySelector(".toogle-nav")
toogleNav_btn.addEventListener("click", e => {
    let sidenav = toogleNav_btn.parentElement.parentElement;
    let nav = document.querySelector("nav")
    let myBody = document.getElementById("body");
    sidenav.classList.toggle("closeNav")
    nav.classList.toggle("closeNav")
    myBody.classList.toggle("closeNav")
    if (localStorage.getItem('nav') == null)
        localStorage.setItem('nav', 'closeNav')
    else
        localStorage.removeItem('nav')
})
let night_mode = document.querySelector(".night-mode")
night_mode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (localStorage.getItem('body') == null)
        localStorage.setItem('body', 'dark')
    else {
        localStorage.removeItem('body')
    }
})