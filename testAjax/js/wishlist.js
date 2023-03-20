class MyWishList {
    static add = (_maSanPham) => {
        let name = "wishList"
        let wishLists = []
        if (localStorage.getItem(name) != null)
            wishLists = JSON.parse(localStorage.getItem(name))
        let getIndex = wishLists.indexOf(_maSanPham)
        if (getIndex != -1)
            wishLists.splice(getIndex, 1)
        else
            wishLists.push(_maSanPham)
        localStorage.setItem(name, JSON.stringify(wishLists))
    }
    static get = () => {
        let name = "wishList"
        let wishLists = []
        if (localStorage.getItem(name) != null)
            wishLists = JSON.parse(localStorage.getItem(name))
        return wishLists
    }
}