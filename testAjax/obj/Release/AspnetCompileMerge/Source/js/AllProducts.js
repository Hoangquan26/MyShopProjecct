//loadProduct
let filter_input = document.querySelector(".filter-input input")
let listWrapper = document.querySelector(".listproducts-wrapper")


let categoriesID = []
if (listWrapper.getAttribute("data-category") != "")
    categoriesID.push(parseInt(listWrapper.getAttribute("data-category")), 10)
loadPreviewProduct(categoriesID, listWrapper, "/Home/loadPreviewProduct", 12)
//FilterProductAdvance
let brandsID = []
let filter_items = document.querySelectorAll(".filter-items")
let filterInputValue = filter_input.value.trim()
let sortIndex = -1;
filter_items.forEach(item => {
    item.addEventListener("click", e => {
        let filterInputValue = filter_input.value.trim()
        item.classList.toggle("filter-toogle")
        if (item.hasAttribute("data-categoryID")) {
            if (item.classList.contains("filter-toogle")) {
                categoriesID.push(item.getAttribute("data-categoryID"))
            }
            else {
                categoriesID.splice(categoriesID.indexOf(item.getAttribute("data-categoryID")), 1)
                console.log(item.getAttribute("data-categoryID"))
            }
        }
        if (item.hasAttribute("data-brandID")) {
            if (item.classList.contains("filter-toogle")) {
                brandsID.push(item.getAttribute("data-brandID"))
            }
            else {
                brandsID.splice(brandsID.indexOf(item.getAttribute("data-brandID")), 1)
            }
        }
        loadPreviewProduct(categoriesID, listWrapper, "/Home/loadPreviewProduct", 12, 1, brandsID, filterInputValue, sortIndex)
    })
})


//toogleFilterAdvance
let filter_btn = document.querySelector(".filter-btn")
filter_btn.addEventListener("click", () => {
    let product_filter_wrapper = document.querySelector(".products-wrapper") 
    product_filter_wrapper.classList.toggle("filter-on")
})

let closeFilterBtn = document.querySelector(".product-filter-content-header div:last-child i")
closeFilterBtn.addEventListener("click", () => {
    let product_filter_wrapper = document.querySelector(".products-wrapper")
    product_filter_wrapper.classList.remove("filter-on")
})
//searchProductitem
filter_input.addEventListener("input", () => {
    filterInputValue = filter_input.value.trim()
    loadPreviewProduct(categoriesID, listWrapper, "/Home/loadPreviewProduct", 12, 1, brandsID, filterInputValue, sortIndex)
})

//toggleSortSession
let sort_session = document.querySelector(".sort-session")
sort_session.addEventListener("click", e => {
    sort_session.classList.toggle("active")
})

let sort_option = document.querySelectorAll(".sort-session .sort-option>span")
sort_option.forEach(item => {
    item.addEventListener("click", e => {
        if (!item.classList.contains("activeOption")) {
            sortIndex = parseInt(item.getAttribute("data-sortOrder"))
            loadPreviewProduct(categoriesID, listWrapper, "/Home/loadPreviewProduct", 12, 1, brandsID, filterInputValue, sortIndex)
        }
        document.querySelector(".activeOption")?.classList.remove("activeOption")
        item.classList.toggle("activeOption")
    })
})