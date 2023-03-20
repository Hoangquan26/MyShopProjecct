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



let loadPreviewProduct = (category, parentElement, url, number, page = 1, brands, searchValue, sortIndex) => {
    function getOut() { }
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _maTheLoai: category,
            _soLuongSanPham: number,
            _page: page,
            _maHangSanXuat: brands,
            _tenSanPham: searchValue,
            _sortOrdered: sortIndex
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.code == 500) {
                alert(data.errorMessage)
                return Promis.reject()
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
                            <a data-productID = ${item.maSanPham} class="addProductToCart"><i class='bx bx-cart-alt'></i></a>
                        </div>
                        <a href = "/hquan261203${item.maSanPham}">
                        <img src="${item.hinhAnhSanPham}" />
                        </a>
                    </div>
                    <h5 class="product-item-title">${item.tenSanPham} </h5>
                    <h4 class="product-item-price danger">${VNDFormat.format(item.giaSanPham)}</h4>`
                    let btn = productItem.querySelector(".addProductToCart")
                    btn.addEventListener("click", e => {
                        MyCart.add(btn.getAttribute("data-productID"), 1)
                    })
                let wishBtn = productItem.querySelector(".favorite-product")
                wishBtn.addEventListener("click", () => {
                    MyWishList.add(item.maSanPham)
                    loadWishList()
                })
                parentElement.append(productItem)
            })
            applyEventForProduct()
            return pageCount
        })
        .then(data => {
            let page_list = document.querySelector(".page-list-wrapper .page-list")
            page_list.innerHTML = ""
            if (page_list == null)
                Promise.reject()
            let prev = document.createElement("li")
            prev.innerHTML = "<i class='bx bx-chevron-left'></i>"
            prev.classList.add("prev")
            page_list.appendChild(prev)
            for (let i = 1; i <= data; i++) {
                let li = document.createElement("li")
                if (i == page)
                    li.classList.add("current-page")
                li.innerHTML = `<a>${i}</a>`;
                page_list.appendChild(li)
            }
            let next = document.createElement("li")
            next.innerHTML = "<i class='bx bx-chevron-right'></i>"
            next.classList.add("next")
            page_list.appendChild(next)
            return {
                pages: page_list,
                numberPage: data
            }
        })
        .then(data => {
            let prev_btn = document.querySelector(".prev")
            let next_btn = document.querySelector(".next")
            let current_page = parseInt(document.querySelector(".current-page a").textContent, 10)
            if (current_page == 1)
                prev_btn.style.display = "none"
            else
                prev_btn.style.display = "flex"
            if (current_page == data.numberPage)
                next_btn.style.display = "none"
            else
                next_btn.style.display = "flex"
            var nextPage = () => {
                loadPreviewProduct(category, parentElement, url, number, current_page + 1, brands, searchValue, sortIndex)
            }
            var prevPage = () => {
                loadPreviewProduct(category, parentElement, url, number, current_page - 1, brands, searchValue, sortIndex)
            }
            next_btn.addEventListener("click", nextPage)
            prev_btn.addEventListener("click", prevPage)
            let children = data.pages.children;
            for (let i = 1; i < children.length - 1; i++) {
                children[i].addEventListener("click", e => {
                    loadPreviewProduct(category, parentElement, url, number, page = children[i].querySelector("a").textContent, brands, searchValue, sortIndex)
                })
            }
        })
        .catch(() => { })
}