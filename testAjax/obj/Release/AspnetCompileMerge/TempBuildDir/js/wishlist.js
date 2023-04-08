class MyWishList {
    static add = (_maSanPham) => {
        let name = "wishList"
        let wishLists = []
        if (localStorage.getItem(name) != null)
            wishLists = JSON.parse(localStorage.getItem(name))
        let getIndex = wishLists.indexOf(_maSanPham)
        if (getIndex != -1) {
            wishLists.splice(getIndex, 1)
            callToast("Đã xóa sản phẩm vào danh sách yêu thích", "warning")
        }
        else {
            wishLists.push(_maSanPham)
            callToast("Đã thêm sản phẩm vào danh sách yêu thích", "success")
        }
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