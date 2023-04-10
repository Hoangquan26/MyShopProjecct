let addSubmit_btn = document.getElementById("add-submit")
addSubmit_btn.addEventListener("click", (e) => {
    let editor = CKEDITOR.instances.myMoTa
    let data = editor.getData()
    let array = document.querySelectorAll(".addProduct-main table tr")
    for (let i = 0; i < array.length - 1; i++) {
        let span = document.querySelector("span.add_message")
        if (i == 2) {
            if (data == "") {
                span.textContent = `Bạn chưa nhập Mô tả`
                return;
            }
        }
        if (array[i].lastElementChild.lastElementChild.value == "") {
            span.textContent = `Bạn chưa nhập ${array[i].lastElementChild.lastElementChild.name}`
            return;
        }
    }
    let listImages = document.getElementsByName("_hinhAnhSanPhamPath")
    let hinhAnhSanPham = "";
    listImages.forEach(image => {
        hinhAnhSanPham += image.value + "@@"
    })
    let myForm = new FormData();
    myForm.append("_listImagesPath", hinhAnhSanPham)
    myForm.append("_tenSanPham", document.getElementById("add_tensp").value)
    myForm.append("_moTaSanPham", data)
    myForm.append("_giaSanPham", document.getElementById("add_gia").value)
    myForm.append("_soLuongSanPham", document.getElementById("add_soluong").value)
    myForm.append("_theLoaiSanPham", document.getElementById("theLoaiSanPham").value)
    myForm.append("_hinhAnhSanPham", document.getElementById("add_hinhanh").files[0])
    myForm.append("_maHangSanXuat", document.getElementById("maHangSanXuat").value)
    let url = "/Admin/Brand/AddProduct"
    fetch(url, {
        method: "POST",
        body: myForm
    })
        .then(response => response.json())
        .then(data => {
            if (data.code == 500)
                alert("Lỗi")
            window.location.href = "/Admin/Brand"
        })
})

CKEDITOR.replace("myMoTa", {
    filebrowserBrowseUrl: "/ckfinder/ckfinder.html",
    filebrowserImageUrl: "/ckfinder/ckfinder.html?type=Images",
    filebrowserFlashUrl: "/ckfinder/ckfinder.html?type=Flash",
    filebrowserUploadUrl: "/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files",
    filebrowserImageUploadUrl: "/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images",
    filebrowserFlashUploadUrl: "/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash"
})


let loadBrand = () => {
    url = "/Admin/Brand/loadBrand"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.code == 500)
                alert(data.errorMessage)
            return data;
        })
        .then(data => {
            let categorys = data.listCategory;
            data = data.listBrand;
            let select = document.querySelector("#maHangSanXuat")
            data.forEach(brand => {
                let option = document.createElement("option")
                option.value = brand["maHangSanXuat"]
                option.textContent = brand["tenHangSanXuat"]
                select.appendChild(option)
            })
            return categorys;
        })
        .then(data => {
            if (data != null) {
                let select = document.querySelector("#theLoaiSanPham")
                data.forEach(brand => {
                    let option = document.createElement("option")
                    option.value = brand["maTheLoai"]
                    option.textContent = brand["tenTheLoai"]
                    select.appendChild(option)
                })
            }
        })
}

loadBrand();
var removeSelf = (e) => {
    e.target.removeEventListener("click",removeSelf)
    e.target.parentElement.remove()
}
let productImagesBtn = document.querySelector(".productImages")
let productImageWrapper = productImagesBtn.parentElement
productImagesBtn.addEventListener("click", (e) => {
    var myFinder = new CKFinder;
    myFinder.selectActionFunction = (fileUrl) => {
        let newImage = document.createElement("div")
        newImage.innerHTML = `<div name="hinhAnhSanPhamPath" >
                                    <img src=${fileUrl} />
                                    <input type="hidden" name="_hinhAnhSanPhamPath" value = "${fileUrl}" />
                              </div>`
        newImage.addEventListener("click", e => {
            removeSelf(e)
        })
        productImageWrapper.appendChild(newImage)
    }
    myFinder.popup();
})