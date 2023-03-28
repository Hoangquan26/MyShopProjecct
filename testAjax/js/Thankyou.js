let loadSession = (nameuser, nameproduct) => {
    let VNDformat = Intl.NumberFormat("vi-VN")
    let thisUser = sessionStorage.getItem(nameuser)
    thisUser = JSON.parse(thisUser)
    let orderInfo = document.querySelector(".order-info1")
    let orderID = document.querySelector(".orderID")
    orderID.textContent = thisUser.maDonHang
    orderInfo.innerHTML = `<div class="up-header"><h4>Thông tin mua hàng</h4></div>
                                <p>${thisUser.hoTen}</p>
                                <p>${thisUser.email}</p>
                                <p>${thisUser.sdt}</p>
                            `;
    let orderAddress = document.querySelector(".order-info2")
    orderAddress.innerHTML = `<div class="up-header"><h4>Địa chỉ nhận hàng</h4></div>
                            <p>
                                ${thisUser.diaChi}
                            <p>`;
    document.querySelector(".emailAddress").textContent = thisUser.email
    document.querySelector(".total").textContent = VNDformat.format(thisUser.giaTri) +  "đ"
    document.querySelector(".subTotal").textContent = VNDformat.format(thisUser.giaTri + 35000) +"đ"

    let thisProduct = JSON.parse(sessionStorage.getItem(nameproduct))
    let productWrapper = document.querySelector(".product-section-wrapper .product-content")
    productWrapper.innerHTML = ""
    thisProduct.forEach(product => {
        let div = document.createElement("div")
        div.classList.add("product-item")
        div.innerHTML = `<div class="product-content-img">
                            <img src="${product.hinhAnhSanPham}" />
                            <span class="product-quantity">${product.soLuongSanPham}</span>
                        </div>
                        <div class="product-content-name">
                            <h5>${product.tenSanPham}</h5>
                        </div>
                        <div class="product-content-price">
                            <span>${VNDformat.format(product.giaSanPham)}đ</span>
                        </div>`
        productWrapper.append(div)
    })
    sessionStorage.clear()
    MyCart.get().filter(item => item.quantity > 0).forEach(p => MyCart.removeItem(p.ID))
}

loadSession( nameuser = "user-profile",nameproduct= "product-profile")