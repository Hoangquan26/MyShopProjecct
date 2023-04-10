let importSession = document.querySelector(".importSection")
function loadProduct(Param) {
    let products = document.querySelector(".product-session")
    let url = "/Admin/Brand/loadProduct"
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
                myParam : Param
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.code == 500)
                alert(data.errorMessage)
            let table = document.querySelectorAll(".p_rows")
            for (let i = 1; i < table.length; i++)
                table[i].remove();
            return data.listProduct;
        })
        .then(data => {
            data.forEach(product => { 
                let row = document.createElement("div")
                row.classList.add("p_rows")
                for (let key in product) {
                    if (key == "maSanPham")
                        continue
                    let column = document.createElement("div")
                    column.classList.add("p_columns")
                    if (key == 'hinhAnhSanPham' && product[key] != null) {
                        let img = document.createElement("img")
                        img.src = product[key]
                        column.appendChild(img)
                        row.appendChild(column)
                        continue;
                    }
                    let span = document.createElement("span")
                    span.textContent = product[key]
                    column.appendChild(span)
                    row.appendChild(column)
                }
                let div = document.createElement("div")
                div.classList.add("p_columns")
                div.innerHTML = `<i class='bx bx-dots-vertical-rounded'></i>
                                <div class="product-option">
                                    <div class="editBtn"><span>Sửa</span></div>
                                    <div class="deleteBtn"><span>Xóa</span></div>
                                    <div class="importBtn"><span>Nhập hàng</span></div>
                                </div>`
                let i = div.querySelector("i")
                let option = div.querySelector(".product-option")
                i.addEventListener("click", () => {
                    option.classList.toggle("onOption")
                })
                option.addEventListener("click", () => {
                    option.classList.toggle("onOption")
                })
                let deleteBtn = div.querySelector(".deleteBtn")
                let importBtn = div.querySelector(".importBtn")
                importBtn.addEventListener("click", e => {
                    importSession.classList.remove("invisible")
                    importSession.classList.add("flex-visible")
                    importSession.querySelector("input[name='maSanPham']").value = product.maSanPham
                    importSession.querySelector(".import-price input[type='number']").value = product.giaSanPham
                })
                deleteBtn.addEventListener("click", () => {
                    row.remove();
                    fetch("/Admin/Brand/DeleteProduct", {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify({
                            id : product.maSanPham
                            })
                    })
                })
                row.appendChild(div)
                products.appendChild(row)
            })
        })
    /*url = "/Admin/Brand/loadBrand"
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
        })*/
}
loadProduct()

//OptionBtnAnimate
let option_product_btn = document.querySelector(".content-session .product-option i")
option_product_btn.addEventListener("click", (e) => {
    let option_product_header = document.querySelector(".content-session .product-option h2")
    let options_product = document.querySelector(".product-options")
    option_product_header.classList.toggle("slideOut")
    options_product.classList.toggle("slideOut")
    if (option_product_header.style.display != "none")
        setTimeout(() => {
            options_product.classList.add("flex-visible")
            options_product.classList.remove("invisible")
            option_product_header.style.display = "none"
        }, 500)
    else {
        setTimeout(() => {
            options_product.classList.add("invisible")
            option_product_header.style.display = "block"
            options_product.classList.remove("flex-visible")
        }, 500)
    }
})
//brand_categorys session
let getBrands = () => {
    let url = '/Admin/Brand/getBrandsData'
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.code == 500) {
                alert(data.errorMessage)
                return;
            }
            return data.brandsData;
        })
        .then(data => {
            let xValues = []
            let yValues = []
            let color = []
            data.forEach(item => {
                xValues.push(item["soLuongSanPham"])
                yValues.push(item["tenHangSanXuat"])
                color.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`)
            })
            new Chart("brands_graph", {
                type: 'doughnut',
                data: {
                    labels: yValues,
                    datasets: [{
                        label: yValues,
                        backgroundColor: color,
                        data: xValues
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Sản Phẩm Theo Thương Hiệu",
                        color: '#fff'
                    },
                    maintainAspectRatio: false,
                    responsive: false
                }
            })
        })
}

let getCategorysCount = () => {
    let url = '/Admin/Brand/getCategoryData'
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.code == 500) {
                alert("Lỗi")
                return;
            }
            return data.brandsData
        })
        .then(data => {
            let xValues = []
            let yValues = []
            let color = []
            data.forEach(item => {
                xValues.push(item["soLuongSanPham"])
                yValues.push(item["tenTheLoai"])
                color.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
            })
            new Chart("cate_graph", {
                type: 'doughnut',
                data: {
                    labels: yValues,
                    datasets: [{
                        data: xValues,
                        label: yValues,
                        backgroundColor: color 
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: false,
                    title: {
                        display: true,
                        text: "Sản Phẩm Theo Thể Loại",
                        color: '#fff'
                        }
                    }
                })
        })
}
getCategorysCount();
getBrands();
//ckEditorSetup
/*CKEDITOR.replace("myMoTa", {
    filebrowserBrowseUrl : "/ckfinder/ckfinder.html",
    filebrowserImageUrl : "/ckfinder/ckfinder.html?type=Images",
    filebrowserFlashUrl : "/ckfinder/ckfinder.html?type=Flash",
    filebrowserUploadUrl : "/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files",
    filebrowserImageUploadUrl : "/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images",
   filebrowserFlashUploadUrl : "/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash"
})*/
//addProductAjax
/*var addProductVisible = () => {
    let addSession = document.getElementById("addProduct-session")
    addSession.classList.remove("flex-visible")
    addSession.classList.add("invisible")
}
var addProductInvisible = () => {
    let addSession = document.getElementById("addProduct-session")
    addSession.classList.add("flex-visible")
    addSession.classList.remove("invisible")
    document.querySelector("span.add_message").textContent = ""
}*/

let addProductBtn = document.querySelector(".add-product-option")
addProductBtn.addEventListener("click", () => {
    window.location.href = "/Admin/Order/addProductView"
})

let addProduct_background = document.querySelector("#addProduct-session .session-background")
addProduct_background.addEventListener("click", () => {
    addProductVisible()
})

let addSubmit_btn = document.getElementById("add-submit")
addSubmit_btn.addEventListener("click", () => {
    let editor = CKEDITOR.instances.myMoTa
    let data = editor.getData()
    let array = document.querySelectorAll(".addProduct-main table tr")
    for (let i = 0; i < array.length - 1; i++)
    {
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
    const myForm = new FormData();
    myForm.append("_maSanPham", document.getElementById("add_masp").value);
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
        body : myForm
    })
        .then(response => response.json())
        .then(data => {
            if (data.code == 500)
                alert("Lỗi")
            else {
                addProductInvisible();
                getCategorysCount();
                loadProduct("");
                getBrands();
            }
            loadProduct()
        })
})
//searchProduct
let product_search = document.querySelector(".product-search")
let product_search_input = document.getElementById("search-product-input")
product_search.addEventListener("submit", e => {
    e.preventDefault()
    let myParam = product_search_input.value
    loadProduct(myParam)
})
let product_search_btn = document.querySelector(".product-search i")
product_search_input.addEventListener("input", (e) => {
    if (e.target.value != "") {
        product_search_btn.classList.remove("bx-search-alt")
        product_search_btn.classList.add("bx-reset")
    }
    else {
        product_search_btn.classList.add("bx-search-alt")
        product_search_btn.classList.remove("bx-reset")
    }
})

product_search.querySelector("i").addEventListener("click", e => {
    if (product_search_input.value != "") {
        product_search_btn.classList.add("bx-search-alt")
        product_search_btn.classList.remove("bx-reset")
    }
    product_search_input.value = "";
    loadProduct()
})

//optionMenu

let closeImportBtn = importSession.querySelector(".bx.bx-x")
let submitImportBtn = importSession.querySelector(".import-submit button")
closeImportBtn.addEventListener("click", e => {
    importSession.classList.remove("flex-visible")
    importSession.classList.add("invisible")
    importSession.querySelector("input[name='maSanPham']").value = ''
})
submitImportBtn.addEventListener("click", e => {
    let _id = importSession.querySelector(".import-submit input[name='maSanPham']").value
    let _quantity = parseInt(importSession.querySelector(".import-quantity input[type='number']").value, 10)
    let _price = parseInt(importSession.querySelector(".import-price input[type='number']").value, 10)
    fetch("/Admin/Brand/ImportProduct", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            id: _id,
            quantity: _quantity,
            price: _price
            })
        })
        .then(response => response.json())
        .then(data => {
            importSession.classList.remove("flex-visible")
            importSession.classList.add("invisible")
            importSession.querySelector("input[name='maSanPham']").value = ''
            loadProduct();
        })
})
