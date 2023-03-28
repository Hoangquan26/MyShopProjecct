let currentStatus = 0;

let orderHeaders = document.querySelectorAll(".order-header-item")
orderHeaders.forEach(header => {
    header.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active")
        header.classList.add("active")
    })
})
//getOrderStatusList
let orderStatuss = () => {
    let url = '/Admin/Order/GetDeliveryCode'
    fetch(url) 
}

function convertDateTime(dateString) {
    var date = new Date(Date.parse(dateString));
    var day = date.getDate(); 
    var month = date.getMonth() + 1; 
    var year = date.getFullYear(); 
    return `${day}/${month}/${year}`
}

function simpleTemplating(data) {
    var html = '<ul>';
    $.each(data, function (index, item) {
        html += '<li>' + item + '</li>';
    });
    html += '</ul>';
}
let updateOrderStatus = (_ID, _updateID) => {
    let url = "/Admin/Order/UpdateStatus"
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: _ID,
            _updateId: _updateID
        })
    })
        .then(data => data.json())
    .then(data => console.log(data.code))
}

let VNDformat = Intl.NumberFormat("vi-VN")
let orderList = document.querySelector(".order-list")
let getOrder = (pageSize, page, orderStatus = 0) => {
    orderList.innerHTML = ''
    let url = "/Admin/Order/GetOrder?_page=" + page +"&_orderStatus=" + orderStatus 
    fetch(url)
        .then(data => data.json())
        .then(response => {
            response.data.forEach(order => {
                let item = document.createElement("div")
                item.classList.add("order-item")
                item.innerHTML = `<div>#${order.maDonHang}</div>
                                <div>${convertDateTime(order.ngayDat)}</div>
                                <div>${order.payment}</div>
                                <div class="product-list">
                                </div>
                                <div>${VNDformat.format(order.giaTri)}đ</div>
                                <div class="order-status">
                                    <div class="confirm-order">
                                        <div class="accept-order"><i class='bx bx-check'></i><span>Xác nhận</span></div>
                                        <div class="reject-order"><i class='bx bx-x'></i><span>Từ chối</span></div>
                                    </div>
                                    <div class="delivery-status">
                                        <select class="delivery-select">
                                            <option value="2">Chuẩn bị hàng</option>
                                            <option value="3">Đang vận chuyển</option>
                                            <option value="4">Đa giao hàng</option>
                                            <option value="5">Hủy đơn</option>
                                        </select>
                                    </div>
                                </div>`
                let delivarySetup = item.querySelector(".delivery-select")
                delivarySetup.value = order.trangThaiDonHang
                let loadOrderStatus = () => {
                    if (order.trangThaiDonHang == 1) {
                        if (item.querySelector(".confirm-order").classList.contains("noneDisplay"))
                            item.querySelector(".confirm-order").classList.remove("noneDisplay")
                        item.querySelector(".delivery-status").classList.add("noneDisplay")
                    }
                    else {
                        if (item.querySelector(".delivery-status").classList.contains("noneDisplay"))
                            item.querySelector(".delivery-status").classList.remove("noneDisplay")
                        item.querySelector(".confirm-order").classList.add("noneDisplay")
                    }
                }
                let pList = item.querySelector(".product-list")
                pList.innerHTML = ''
                order.productsList.forEach(p => {
                    let text = document.createElement("p")
                    text.innerHTML = `${p.tenSanPham} (${p.soLuongSanPham})`
                    pList.append(text)
                })
                loadOrderStatus()
                let acceptBtn = item.querySelector('.accept-order');
                let rejectBtn = item.querySelector('.reject-order');
                acceptBtn.addEventListener("click", () => {
                    console.log("test")
                    updateOrderStatus(order.maDonHang, 2)
                    loadOrderStatus()
                    getOrder(0, page, currentStatus)
                })
                rejectBtn.addEventListener("click", () => {
                    updateOrderStatus(order.maDonHang, 5)
                    getOrder(0, page, currentStatus)
                })
                delivarySetup.addEventListener("change", () => {
                    updateOrderStatus(order.maDonHang, delivarySetup.value)
                    getOrder(0, page, currentStatus)
                })
                orderList.append(item)
            })
        })  
}
function getPagination(currentStatus) {
    $('#pagination').pagination({
        dataSource: "/Admin/Order/GetOrder?_page=" + 1 + "&_orderStatus=" + currentStatus,
        locator: 'data',
        totalNumberLocator: function (response) {
            return response.total
        },
        pageSize: 6,
        autoHidePrevious: true,
        autoHideNext: true,
        afterPageOnClick: function (event, pageNumber) {
            getOrder(0, pageNumber, currentStatus)
        },
        afterNextOnClick: function (event, pageNumber) {
            getOrder(0, pageNumber, currentStatus)
        },
        afterPreviousOnClick: function (event, pageNumber) {
            getOrder(0, pageNumber, currentStatus)
        }
    })
}
getPagination(currentStatus)
getOrder(0, 1, currentStatus)

let headerLists = document.querySelectorAll(".order-header div")
headerLists.forEach(header => {
    header.addEventListener("click", () => {
        currentStatus = parseInt(header.getAttribute("data-status"), 10)
        getOrder(0, 1, currentStatus)
        getPagination(currentStatus)
    })
})