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

let loadWishLishNotify = () => {
    let cart_notify = document.querySelector("#loveList_btn .notify")
    let array = MyWishList.get();
    if (array.length == 0) {
        if (!cart_notify.classList.contains("invisible"))
            cart_notify.classList.add("invisible")
    }
    else {
        if (cart_notify.classList.contains("invisible"))
            cart_notify.classList.remove("invisible")
        cart_notify.textContent = array.length;
    }
}

let loadWishList = () => {
    loadWishLishNotify()
    let url = "/Cart/LoadCart"
    let myWishList = MyWishList.get()
    let wishlist_content = document.querySelector(".wishlist-content")
    if (myWishList.length != 0) {
        let VNDformat = Intl.NumberFormat("vn-VN")
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                wishlist_content.innerHTML = ""
                data.forEach(item => {
                    let div = document.createElement("div")
                    div.classList.add("wishlist-item")
                    div.innerHTML = `<div class="wishlist-item-img">
                                        <a href = "/hquan261203${item.maSanPham}">
                                            <img src="${item.hinhAnhSanPham}" />
                                        </a>
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
                        console.log(remove_btn)
                        loadWishList()
                        loadWishLishNotify()
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
                        loadCartNotify()
                    })
                })
            })
            .catch(() => { })
    }
    else {
        wishlist_content.innerHTML = ""
        let div = document.createElement("span")
        div.innerHTML = `Bạn chưa có sản phẩm yêu thích nào `
        wishlist_content.append(div)
    }
}

loadWishList()

let wishlist_content = document.querySelector(".wishlist-content")
let isDrag = false;
let startX;
let scrollLeft;
var wishlistWidth = 180 + 40
let wishListDirection;
let distance
console.log(wishlistWidth)
wishlist_content.addEventListener("mousedown", e => {
    e.preventDefault()
    isDrag = true;
    startX = e.pageX - wishlist_content.offsetLeft
    scrollLeft = wishlist_content.scrollLeft
    wishlist_content.classList.add("active")
})

wishlist_content.addEventListener("mousemove", e => {
    if (!isDrag) return;
    e.preventDefault();
    if (!wishlist_content.classList.contains("active"))
        wishlist_content.classList.add("active")
    let x = e.pageX - wishlist_content.offsetLeft
    let walk = x - startX
    wishlist_content.scrollLeft = scrollLeft - walk;
        if (walk < 0)
            wishListDirection = -1
        else if(walk > 0)
            wishListDirection = 1
        else
            wishListDirection = null
    distance = wishlist_content.scrollLeft % wishlistWidth
    console.log(walk)
    console.log(wishlist_content.scrollLeft)
})

wishlist_content.addEventListener("mouseup", e => {
    e.preventDefault()
    isDrag = false
    wishlist_content.classList.remove("active")
    console.log(wishListDirection)
    if (wishListDirection == null)
        return
    if (wishListDirection == -1) {
        wishlist_content.scrollLeft += (wishlistWidth - distance)
        wishListDirection = null
    }
    else if (wishListDirection == 1){
        wishlist_content.scrollLeft -= distance
        wishListDirection = null
    }
})

