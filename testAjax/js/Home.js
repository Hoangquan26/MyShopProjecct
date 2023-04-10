let slider = document.querySelector(".wrapper")
let isDragging = false, Dragging = false, prevX, prevLocation, difference
let nextbtn = document.querySelector(".next-btn")
let prevbtn = document.querySelector(".prev-btn")
let sliderList = document.querySelectorAll(".slider-item")
let img_width = sliderList[0].clientWidth
let scrollWidth = slider.scrollWidth - slider.clientWidth
nextbtn.addEventListener("click", e => {
    img_width = sliderList[0].clientWidth
    slider.scrollLeft += img_width;
})
prevbtn.addEventListener("click", e => {
    let img_width = sliderList[0].clientWidth
    slider.scrollLeft -= img_width;
})
const hideBtn = () => {
    prevbtn.style.display = slider.scrollLeft == 0 ? "none" : "block"
    nextbtn.style.display = (slider.scrollLeft == scrollWidth ? "none" : "block")
}
const autoSlide = () => {
    let changeValue = img_width - Math.abs(difference)
    if (difference < 0)
        slider.scrollLeft += changeValue
    else
        slider.scrollLeft -= changeValue
}
const dragStart = (e) => {
    img_width = sliderList[0].clientWidth
    isDragging = true;
    prevX = e.pageX || e.touches[0].pageX
    prevLocation = slider.scrollLeft
    slider.classList.remove("grabbing")
}
const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    Dragging = true;
    difference = (e.pageX || e.touches[0].pageX) - prevX
    slider.scrollLeft = prevLocation - difference
    hideBtn();
}
const dragEnd = (e) => {
    isDragging = false;
    slider.classList.add("grabbing")
    if (!Dragging) return;
    Dragging = false;
    autoSlide()
}
slider.addEventListener("mousemove", dragging)
slider.addEventListener("mousedown", dragStart)
slider.addEventListener("mouseup", dragEnd)
slider.addEventListener("touchmove", dragging)
slider.addEventListener("touchstart", dragStart)
slider.addEventListener("mouseleave", dragEnd)
slider.addEventListener("touchend", dragEnd)

//animateProduct

//loadKeyboard 
let kb_wrapper = document.querySelector("#keyboard-sesion .kb-wrapper")
let mouse_wrapper = document.querySelector("#keyboard-sesion .mouse-wrapper")
let hp_wrapper = document.querySelector("#keyboard-sesion .hp-wrapper")
loadPreviewProduct(1, kb_wrapper, "/Home/loadPreviewProduct", 8)
loadPreviewProduct(2, mouse_wrapper, "/Home/loadPreviewProduct", 8)
loadPreviewProduct(5, hp_wrapper, "/Home/loadPreviewProduct", 8)

let leftDrcBtn = document.querySelector(".left-direction")
let rightDrcBtn = document.querySelector(".right-direction")
let ctgSession = document.querySelector(".category-wrapper")
let ctgItem = document.querySelector(".category-item")
leftDrcBtn.addEventListener("click", (e) => {
    console.log(ctgSession.scrollLeft)
    if (ctgSession.scrollLeft == 0) 
        return;
    ctgSession.scrollLeft -= (ctgSession.scrollLeft % ctgItem.clientWidth + 100 || ctgItem.clientWidth * 2) 
})

rightDrcBtn.addEventListener("click", (e) => {
    if (ctgSession.scrollLeft == (scrollWidth - ctgSession.clientWidth)) {
        return;
    }
    ctgSession.scrollLeft += (ctgSession.scrollLeft % ctgItem.clientWidth + 100 || ctgItem.clientWidth * 2)
})

ctgSession.addEventListener("scroll", e => {
    if (!leftDrcBtn.classList.contains("unactive") && ctgSession.scrollLeft == 0) {
        leftDrcBtn.classList.add("unactive")
    }
    else {
        leftDrcBtn.classList.remove("unactive")
    }
    if (!rightDrcBtn.classList.contains("unactive") && ctgSession.scrollLeft == ctgSession.scrollWidth - ctgSession.clientWidth) {
        rightDrcBtn.classList.add("unactive")
    }
    else 
        rightDrcBtn.classList.remove("unactive")
})