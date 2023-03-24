let inputs = document.querySelectorAll(".input-wrapper input")
inputs.forEach(input => {
    input.addEventListener("input", e => {
        let parent = input.parentElement
        if (input.value.trim().length > 0)
            parent.classList.add("active")
        else
            parent.classList.remove("active")
    })
})
let districtsContraint = () => {
    let tinh = document.querySelector("#tinh")
    let quanHuyen = document.querySelector("#quanHuyen")
    let phuongXa = document.querySelector("#phuongXa")
    if (tinh.value == -1) {
        quanHuyen.disabled = true;
        quanHuyen.classList.add("disabled")
        quanHuyen.value = -1;
        phuongXa.disabled = true;
        phuongXa.classList.add("disabled")
        phuongXa.value = -1;
        return false
    }
    else {
        quanHuyen.disabled = false;
        quanHuyen.classList.remove("disabled")
        return true
    }
}

let wardContraint = () => {
    let quanHuyen = document.querySelector("#quanHuyen")
    let phuongXa = document.querySelector("#phuongXa")
    if (quanHuyen.value == -1) {
        phuongXa.disabled = true;
        phuongXa.classList.add("disabled")
        phuongXa.value = -1
        return false
    }
    else {
        phuongXa.disabled = false;
        phuongXa.classList.remove("disabled")
        return true
    }
}
let getDistricts = () => {
    fetch("/js/local.json")
        .then(data => data.json())
        .then(data => {
            let tinh = document.querySelector("#tinh")
            data.forEach(item => {
                let option = document.createElement("option")
                option.value = item.id
                option.dataset.index = item.name
                option.textContent = item.name
                tinh.append(option)
            })
            tinh.addEventListener("change", e => {
                if (districtsContraint() == true) {
                    let currentProvince = data[tinh.value - 1]
                    let quanHuyen = document.querySelector("#quanHuyen")
                    let phuongXa = document.querySelector("#phuongXa")
                    quanHuyen.innerHTML = `<option selected value="-1">---</option>`
                    phuongXa.innerHTML = `<option selected value="-1">---</option>`
                    let i = 1;
                    currentProvince.districts.forEach(district => {
                        let doption = document.createElement("option")
                        doption.value = i++
                        doption.dataset.params = district.id
                        doption.textContent = district.name
                        quanHuyen.append(doption)
                    })
                    quanHuyen.addEventListener("change", () => {
                        if (!wardContraint())
                            return
                        let currentDistrict = currentProvince.districts[quanHuyen.value - 1]
                        phuongXa.innerHTML = `<option selected value="-1">---</option>`
                        console.log(currentDistrict)
                        currentDistrict.wards.forEach(ward => {
                            let px = document.createElement("option")
                            px.value = ward.id
                            px.textContent = `${ward.prefix} ${ward.name}`
                            phuongXa.append(px)
                        })
                    })
                }
            })
        })
}
getDistricts()

let paymentBtn = document.querySelectorAll(".section:last-child .radio-wrapper input")
paymentBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let btnParent = btn.parentElement.parentElement.parentElement
        let sibling = (btnParent.nextElementSibling == null ? btnParent.previousElementSibling : btnParent.nextElementSibling)
        console.log(sibling)
        if (btn.checked == true) {
            btnParent.classList.add("check")
            sibling.classList.remove("check")
        }

    })
})

let loadProduct = () => {
    let url = '/Cart/LoadCart'
    let mycart = MyCart.get()
    let idList = mycart.map(item => item.ID)
    let subToTalValue = 0
    let VNDformat = Intl.NumberFormat("vn-VN")
    let priceTotal = document.querySelector("#price")
    let finalCost = document.querySelector("#finalcost")
    let wrapper = document.querySelector(".product-wrapper .product-main")
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
                wrapper.innerHTML = ""
                data.forEach(item => {
                    let div = document.createElement("div")
                    div.classList.add("product-item")
                    div.innerHTML = `<div class="product-item">
                                        <div class="product-img">
                                            <img src="${item.hinhAnhSanPham}" />
                                            <span class="product-quantity">${mycart[i].quantity}</span>
                                        </div>
                                        <div class="product-name">
                                            <h4>${item.tenSanPham}</h4>
                                        </div>
                                        <div class="product-price">
                                            <span>${VNDformat.format(item.giaSanPham)}đ</span>
                                        </div>
                                    </div>`
                    subToTalValue += (mycart[i++].quantity * item.giaSanPham)
                    wrapper.append(div)
                })
                priceTotal.textContent = `${VNDformat.format(subToTalValue)}đ`
                finalCost.textContent = `${VNDformat.format(subToTalValue + 35000)}đ`
                return data
            })
            .catch(() => { })
    }
    else {

    }
}

loadProduct()


let buyBtn = document.getElementById("buyBtn")
buyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let userPofile = new FormData(document.getElementById("user-table"))
    let object = {
        maDonHang: null,
        maKhachHang: null,
        giaTri: null,
        ngayDat: null,
        trangThaiDonHang: null,
        hoTen: userPofile.get("hoTen"),
        email: userPofile.get("email"),
        sdt: userPofile.get('sdt'),
        diaChi: `${userPofile.get('diaChi')}, ${userPofile.get('tinhThanh')}, ${userPofile.get('quanHuyen')}, ${userPofile.get('phuongXa')}`,
        ghiChu: userPofile.get('ghiChu')
    }

/*    let url = "/Product/Buy"
    let _body = {
        user: object,
        products: MyCart.get()
    }
    console.log(_body)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body)
    })
        .then(data => data.json())
        .then(data => {
            if (data.code == 500)
                alert("Lỗi")
            else
                localStorage.setItem("myLocalCart", "")
        })
*/
})