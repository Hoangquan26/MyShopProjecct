let LoadMyCart = () => {
    let url = '/Cart/LoadCart'
    let mycart = MyCart.get()
    let idList = mycart.map(item => item.ID)
    let cartWrapper = document.querySelector(".cart-list")
    let subToTalValue = 0
    let purchase_money = document.querySelector(".purchase-money")
    let VNDformat = Intl.NumberFormat("vn-VN")
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
                                            <button class="sub_quantity"><i class='bx bx-minus'></i></button>
                                            <span class="quantity_display">${mycart[i].quantity}</span>
                                            <button class="sum_quantity"><i class='bx bx-plus'></i></button>
                                        </div>
                                        <div class="cart-price-wrapper">
                                            <span class="cart-price cart-total danger">${VNDformat.format(mycart[i].quantity * item.giaSanPham)}đ</span>
                                        </div>`
                    subToTalValue += (mycart[i++].quantity * item.giaSanPham)
                    let deleteBtn = div.querySelector(".delete-item-btn")
                    deleteBtn.addEventListener("click", () => {
                        MyCart.removeItem(item.maSanPham)
                        LoadMyCart()
                    })
                    let plusBtn = div.querySelector(".sum_quantity")
                    let minusBtn = div.querySelector(".sub_quantity")
                    let quantity = div.querySelector(".quantity_display")
                    let total = div.querySelector(".cart-total")
                    plusBtn.addEventListener("click", () => {
                        quantity.textContent = ++quantity.textContent
                        MyCart.update(item.maSanPham, parseInt(quantity.textContent, 10))
                        LoadMyCart()
                    })
                    minusBtn.addEventListener("click", () => {
                        if (quantity.textContent > 1) {
                            quantity.textContent = --quantity.textContent
                            MyCart.update(item.maSanPham, parseInt(quantity.textContent, 10))
                            LoadMyCart()
                        }
                        else {
                            MyCart.removeItem(item.maSanPham)
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