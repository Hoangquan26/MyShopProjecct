let listWrapper = document.querySelector(".listproducts-wrapper")
loadPreviewProduct(null, listWrapper, "/Home/loadPreviewProduct", 12)

let filter_items = document.querySelectorAll(".filter-items")
filter_items.forEach(item => {
    item.addEventListener("click", e => {
        item.classList.toggle("filter-toogle")
    })
})

let filter_btn = document.querySelector(".filter-btn")
filter_btn.addEventListener("click", () => {
    let product_filter_wrapper = document.querySelector(".products-wrapper") 
    product_filter_wrapper.classList.toggle("filter-on")
})