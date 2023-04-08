let VNDformat = Intl.NumberFormat("vn-VN")
let loadSubTotal = () => {

}

let convertDateTime = (datestring) => {
    let _date = new Date(Date.parse(datestring))
    return `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`
}
let LoadMyCart = () => {
    let url = '/Cart/LoadCart'
    let mycart = MyCart.get()
    let idList = mycart.map(item => item.ID)
    let cartWrapper = document.querySelector(".cart-list")
    let subToTalValue = 0
    let purchase_money = document.querySelector(".purchase-money")
    if (cartWrapper == null)
        return
    if (idList.length > 0) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idList
            })
        })
            .then(data => data.json())
            .then(data => {
                if (data.code == 500) {
                    Promise.resolve();
                }
                data = data.list;
                let i = 0;
                cartWrapper.innerHTML = ""
                data.forEach(item => {
                    let div = document.createElement("div")
                    div.classList.add("cart-item")
                    div.innerHTML = `<div class="cart-item-product">
                                        <div class="cart-item-img">
                                            <img src="${item.hinhAnhSanPham}" />
                                        </div>
                                        <div class="cart-item-name">
                                            <p>${item.tenSanPham}</p>
                                            <span class="danger delete-item-btn">Xóa</span>
                                        </div>
                                        </div>
                                        <div class="cart-price-wrapper">
                                            <span class="cart-price danger">${VNDformat.format(item.giaSanPham)}đ</span>
                                        </div>
                                        <div class="cart-quantity-wrapper">
                                            <div class = "quantity-wrapper">
                                                <button class="sub_quantity"><i class='bx bx-minus'></i></button>
                                                <span class="quantity_display">${mycart[i].quantity}</span>
                                                <button class="sum_quantity"><i class='bx bx-plus'></i></button>
                                            </div>
                                            <div><p class = "product-left">Còn lại <span>${item.soLuongSanPham}</span> sản phấm</p></div>
                                        </div>
                                        <div class="cart-price-wrapper">
                                            <span class="cart-price cart-total danger">${VNDformat.format(mycart[i].quantity * item.giaSanPham)}đ</span>
                                        </div>`
                    let plusBtn = div.querySelector(".sum_quantity")
                    let minusBtn = div.querySelector(".sub_quantity")
                    let quantity = div.querySelector(".quantity_display")
                    let total = div.querySelector(".cart-total")
                    if (item.soLuongSanPham == 0) {
                        div.classList.add("OutOfStock")
                        quantity.textContent = 0;
                        MyCart.update(item.maSanPham, 0)
                    }
                    subToTalValue += (mycart[i++].quantity * item.giaSanPham)
                    let deleteBtn = div.querySelector(".delete-item-btn")
                    deleteBtn.addEventListener("click", () => {
                        MyCart.removeItem(item.maSanPham)
                        callToast('Đã xóa sản phẩm thành công', 'success')
                        LoadMyCart()
                    })
                    plusBtn.addEventListener("click", () => {
                        if (quantity.textContent < item.soLuongSanPham) {
                            quantity.textContent = ++quantity.textContent
                            MyCart.update(item.maSanPham, parseInt(quantity.textContent, 10))
                            LoadMyCart()
                        }
                        else {
                            callToast('Không thể chọn quá số lượng còn lại', 'warning')
                        }
/*                        total.textContent = VNDformat.format(quantity.textContent * item.giaSanPham) + "đ"
                        total.databag.a = quantity.textContent * item.giaSanPham*/
                    })
                    minusBtn.addEventListener("click", () => {
                        if (quantity.textContent > 1) {
                            quantity.textContent = --quantity.textContent
                            MyCart.update(item.maSanPham, parseInt(quantity.textContent, 10))
                            LoadMyCart()
/*                            total.textContent = VNDformat.format(quantity.textContent * item.giaSanPham) + "đ"
                            total.databag.a = quantity.textContent * item.giaSanPham*/
                        }
                        else {
                            MyCart.removeItem(item.maSanPham)
                            callToast('Đã xóa sản phẩm thành công', 'success')
                            LoadMyCart()
                        }
                    })
                    cartWrapper.appendChild(div)
                })
                purchase_money.textContent = `${VNDformat.format(subToTalValue)}đ`
            })

    }
    else {
        cartWrapper.innerHTML = ""
        let div = document.createElement("div")
        div.innerHTML = "<span>Không có sản phẩm nào trong giỏ hàng</span>"
        cartWrapper.appendChild(div)
    }
}
LoadMyCart()
let purchaseBtn = document.querySelector(".purchase-btn")
purchaseBtn.addEventListener("click", e => {
    if (MyCart.get().filter(p => p.quantity > 0).length == 0) {
        callToast('Không có sản phẩm nào đủ điều kiện để mua', 'warning')
        e.preventDefault()
    }
})

let switchBtn = document.querySelectorAll(".cart-ui-wrapper button")

switchBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("button.active").classList.remove("active")
        btn.classList.add("active")
        if (btn.classList.contains("cart-Btn")) {
            document.querySelector(".cart-session").style.display = "flex"
            document.querySelector(".order-session").style.display = "none"
        }
        else {
            document.querySelector(".cart-session").style.display = "none"
            document.querySelector(".order-session").style.display = "flex"
        }
    })
})

let loadOrder = () => {
    let url = "/Cart/LoadOrder"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let list = document.querySelector(".order-session .cart-list")
            let orders = data.orders
            let orderInfo = data.orderInfo
            console.log(data)
            if (orders.length > 0) {
                orders.forEach(order => {
                    order.orderInfo = orderInfo.filter(item => item.maDonHang == order.maDonHang)
                    let div = document.createElement("div")
                    div.classList.add("cart-item")
                    div.innerHTML = `<div class="cart-item-product">
                                    <span class="order-id">
                                        #${order.maDonHang}
                                    </span>
                                    </div>
                                    <div class="cart-price-wrapper">
                                        <span class="order-text">${convertDateTime(order.ngayDat)}</span>
                                    </div>
                                    <div class="cart-price-wrapper order-nameProduct">
                                    </div>
                                    <div class="cart-price-wrapper">
                                        <span class="order-text">${VNDformat.format(order.giaTri)}đ</span>
                                    </div>
                                    <div class="cart-price-wrapper">
                                        <span class="order-text">${order.status}</span>
                                </div>`
                    let infoContext = div.querySelector(".order-nameProduct")
                    order.orderInfo.forEach(item => {
                        let p = document.createElement("span")
                        p.classList.add("order-text")
                        p.textContent = `${item.tenSanPham} (${item.soLuong})`
                        infoContext.appendChild(p)
                    })
                    list.appendChild(div)
                })
            }
            else {
                list.innerHTML = "Bạn không có đơn hàng nào" 
            }
        })
        .catch(() => {console.log("fail")})
}
loadOrder()