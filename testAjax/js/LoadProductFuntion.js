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
let loadPreviewProduct = (category, parentElement, url, number, page = null) => {
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
                    <h4 class="product-item-price danger">${VNDFormat.format(item.giaSanPham)}</h4>`
                parentElement.append(productItem)
            })
            applyEventForProduct()
        })
}