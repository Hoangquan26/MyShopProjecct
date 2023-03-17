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
let loadPreviewProduct = (category, parentElement, url, number, page = 1) => {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _maTheLoai: category,
            _soLuongSanPham: number,
            _page: page
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.code == 500) {
                alert(data.errorMessage)
                return
            }
            parentElement.innerHTML = ""
            return data;
        })
        .then(data => {
            let pageCount = data.numberPage
            data = data.listProduct;
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
                    <h4 class="product-item-price danger">${VNDFormat.format(item.giaSanPham)}</h4>`
                parentElement.append(productItem)
            })
            applyEventForProduct()
            return pageCount
        })
        .then(data => {
            let page_list = document.querySelector(".page-list-wrapper .page-list")
            page_list.innerHTML = ""
            if (page_list == null)
                return;
            for (let i = 1; i <= data; i++) {
                let li = document.createElement("li")
                if (i == page)
                    li.classList.add("current-page")
                li.innerHTML = `<a>${i}</a>`;
                page_list.appendChild(li)
            }
            return {
                pages: page_list,
                numberPage: data
            }
        })
        .then(data => {
            let prev_btn = document.querySelector(".prev")
            let next_btn = document.querySelector(".next")
            let current_page = document.querySelector(".current-page").textContent
            if (current_page == 1)
                prev_btn.style.display = "none"
            else
                prev_btn.style.display = "block"
            if (current_page == data.numberPage)
                next_btn.style.display = "none"
            else
                next_btn.style.display = "block"
            let children = data.pages.children;
            for(let item of children) {
                item.addEventListener("click", e => {
                    loadPreviewProduct(category, parentElement, url, number, page = item.querySelector("a").textContent)
                })
            }
        })
}