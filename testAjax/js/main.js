let openWishList = document.querySelector("#loveList_btn")
openWishList.addEventListener("click", () => {
    let wishlist = document.getElementById("wishlist")
    wishlist.classList.toggle("out")
})

let closeWishList = document.querySelector(".closeWishList")
closeWishList.addEventListener("click", () => {
    let wishlist = document.getElementById("wishlist")
    wishlist.classList.toggle("out")
})

let loadWishList = () => {
    let url = "/Cart/LoadCart"
    let myWishList = MyWishList.get()
    if (myWishList != 0) {
        let wishlist_content = document.querySelector(".wishlist-content")
        let VNDformat = Intl.NumberFormat("vn-VN")
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                    id: myWishList
                }
            )
        })
            .then(data => data.json())
            .then(data => {
                if (data.code == 500)
                    Promise.reject()
                data = data.list
                wishlist_content.innerHTML =""
                data.forEach(item => {
                    let div = document.createElement("div")
                    div.classList.add("wishlist-item")
                    div.innerHTML = `<div class="wishlist-item-img">
                                        <img src="${item.hinhAnhSanPham}" />
                                        </div>
                                        <div class="wishlist-item-info">
                                            <h4>${item.tenSanPham}</h4>
                                            <span class="danger">${VNDformat.format(item.giaSanPham)}</span>
                                            <div class="wishlist-item-action">
                                                <div class="wishlist-item-quantity">
                                                    <button class="wishlist-minus-btn"><i class='bx bx-minus'></i></button>
                                                    <span>1</span>
                                                    <button class="wishlist-plus-btn"><i class='bx bx-plus'></i></button>
                                                </div>
                                                <i class='remove-item-btn bx bx-trash-alt'></i>
                                            </div>
                                            <div class="wishlist_to_cart">
                                                <span>Thêm vào giỏ</span>
                                            </div>
                                        </div>`
                    let remove_btn = div.querySelector(".remove-item-btn")
                    remove_btn.addEventListener("click", () => {
                        MyWishList.add(item.maSanPham)
                        loadWishList()
                    })
                    let addToCartBtn = div.querySelector(".wishlist_to_cart")
                    let plusBtn = div.querySelector(".wishlist-plus-btn")
                    let minusBtn = div.querySelector(".wishlist-minus-btn")
                    let quantity = div.querySelector(".wishlist-item-quantity span")
                    plusBtn.addEventListener("click", () => {
                        quantity.textContent = ++quantity.textContent
                    })
                    minusBtn.addEventListener("click", (e) => {
                        if (quantity.textContent > 1) {
                            quantity.textContent = --quantity.textContent
                        }
                        else {
                            e.preventDefault()
                        }
                    })
                    wishlist_content.append(div)
                    addToCartBtn.addEventListener("click", e => {
                        MyCart.add(item.maSanPham, parseInt(quantity.textContent))
                        LoadMyCart()
                    })
                })
            })
            .catch() 
    }
}

loadWishList()

