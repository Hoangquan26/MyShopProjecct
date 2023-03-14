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
let applyEventForProduct = () => {
    let productItems = document.querySelectorAll(".product-item")
    productItems.forEach(item => {
        let productOption = item.querySelector(".product-item-option")
        item.addEventListener("mouseenter", () => {
            productOption.classList.remove("disappear")
            productOption.classList.add("appear")
        })
        item.addEventListener("mouseleave", () => {
            productOption.classList.remove("appear")
            productOption.classList.add("disappear")
        })
    })
}

//loadKeyboard 
let kb_wrapper = document.querySelector("#keyboard-sesion .kb-wrapper")
let loadPreviewProduct = (category, parentElement, url) => {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            _maTheLoai : category
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.code == 500) {
                alert(data.errorMessage)
                return
            }
            return data.listProduct
        })
        .then(data => {
            let VNDFormat = new Intl.NumberFormat("vn", {
                style: "currency",
                currency: "VND"
            })
            data.forEach(item => {
                let productItem = document.createElement("div")
                productItem.classList.add("product-item", "col4")
                productItem.innerHTML =
                    `<div class="product-item-thumbnail">
                        <div class="product-item-option disappear">
                            <a class="favorite-product"><i class='bx bx-heart'></i></a>
                            <a class="addProductToCart"><i class='bx bx-cart-alt'></i></a>
                        </div>
                        <a href = "/hquan261203${item.maSanPham}">
                        <img src="${item.hinhAnhSanPham}" />
                        </a>
                    </div>
                    <h5 class="product-item-title">${item.tenSanPham} </h5>
                    <h4 class="product-item-price danger">${VNDFormat.format(item.giaSanPham) }</h4>`
                parentElement.append(productItem)
            })
            applyEventForProduct()
        })
}
let mouse_wrapper = document.querySelector("#keyboard-sesion .mouse-wrapper")
let hp_wrapper = document.querySelector("#keyboard-sesion .hp-wrapper")
loadPreviewProduct(1, kb_wrapper, "/Home/loadPreviewProduct")
loadPreviewProduct(2, mouse_wrapper, "/Home/loadPreviewProduct")
loadPreviewProduct(5, hp_wrapper, "/Home/loadPreviewProduct")