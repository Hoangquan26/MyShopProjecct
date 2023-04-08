let VNDFormat = new Intl.NumberFormat("vi-VN")
let getSalesDetail = (month) => {
    let url = '/Admin/Sales/getSalesDetail?_month=' + (month??null)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.code == 500) {
                Promise.reject()
            }
            data = data.salesData

            //calculatOrer
            let allOrderCost = data.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.giaTri
            }, 0)
            let allOrderCount = data.length
            let successOrder = data.filter(order => order.trangThaiDonHang == 4)
            let realOrderCost = successOrder.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.giaTri
            }, 0)
            //displayStatistics
            document.querySelector(".allOrderCost").textContent = VNDFormat.format(allOrderCost) + "đ"
            document.querySelector(".allOrderCount").textContent = allOrderCount
            document.querySelector(".realOrderCost").textContent = VNDFormat.format(realOrderCost) + "đ"
            //createChart
            let salesChart = document.querySelector(".sales-chart")
            salesChart.innerHTML= ""
            let chart1 = document.createElement("canvas")
            chart1.id = "allOrderCost"
            let chart2 = document.createElement("canvas")
            chart2.id = "allOrderCount"
            let chart3 = document.createElement("canvas")
            chart3.id = "realOrderCost"
            salesChart.appendChild(chart1)
            salesChart.appendChild(chart2)
            salesChart.appendChild(chart3)
            let currentYear = new Date()
            let thisMonthDates = (new Date(currentYear.getFullYear(), (month ?? currentYear.getMonth() + 1), 0).getDate())
            let currentMonth = Array(thisMonthDates).fill(0)
            let orderCountData = [...currentMonth]
            let realOrderCostData = [...currentMonth]
            let clone = [...currentMonth]
            data.forEach(item => {
                let eachDate = item.ngayDat.split("/")[0]
                clone[eachDate - 1] += item.giaTri
                orderCountData[eachDate - 1]++;
                if (item.trangThaiDonHang == 4) {
                    realOrderCostData[eachDate - 1] += item.giaTri
                }
            })
            console.log(data)
            currentMonth = currentMonth.map((item, index) => index + 1)
            let allOrderCostChart = new Chart("allOrderCost", {
                type: 'line',

                data: {
                    labels: currentMonth,
                    datasets: [{
                        data: clone,
                        label: "Thu dự kiến",
                        borderColor: '#E7D1FC',
                        fill: true,
                        tension: 0.2
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true
                }
            })
            let allOrderCountChart = new Chart("allOrderCount", {
                type: 'line',
                data: {
                    labels: currentMonth,
                    datasets: [{
                        data: orderCountData,
                        label: "Tổng đơn hàng",
                        borderColor: '#4DA3FF',
                        fill: true,
                        tension: 0.2
                        }]
                    },
                options: {
                    maintainAspectRatio: false,
                    responsive: true
                }
            })
            let realOrderCostChart = new Chart("realOrderCost", {
                type: 'line',
                data: {
                    labels: currentMonth,
                    datasets: [{
                        data: realOrderCostData,
                        label: "Doanh thu thực",
                        borderColor: '#28a745',
                        fill: true,
                        tension: 0.2
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true
                }
            })
        })
}

getSalesDetail(new Date().getMonth() + 1)

let reportBtn = document.querySelector(".chart-header button")
reportBtn.addEventListener("click", (e) => {
    document.querySelector(".sales-chart").classList.toggle("open")
})

let monthWrapper = document.querySelector(".month-wrapper")
let activeMonth = (e) => {
    monthWrapper.querySelector(".active").classList.remove("active")
    e.target.classList.add("active")
}

let monthGenerate = () => {
    let currentMonth = new Date().getMonth() + 1;
    console.log(typeof currentMonth)
    let i = 1;
    do {
        console.log(currentMonth, i)
        let button = document.createElement("button")
        button.textContent = `Tháng ${currentMonth}`
        button.value = currentMonth
        button.addEventListener("click", (e) => {
            activeMonth(e)
            getSalesDetail(e.target.value)
        })
        if (i == 1) {
            button.classList.add('active')
        }
        monthWrapper.appendChild(button)
        currentMonth--
    } while (i++ < 4 && currentMonth > 0);
}
monthGenerate()
let salesChart = document.querySelector(".sales-chart")
let isGrabbing = false;
let startX;
let scrollLeft;
let moveRight;
let distance;
let autoScroll
let singlePageWidth = document.querySelector(".sales-content").clientWidth
salesChart.addEventListener("mousedown", e => {
    e.preventDefault()
    isGrabbing = true;
    startX = e.pageX - salesChart.offsetLeft
    scrollLeft = salesChart.scrollLeft
    singlePageWidth = document.getElementById("allOrderCost").clientWidth + 40
})
salesChart.addEventListener("mousemove", e => {
    e.preventDefault()
    if (isGrabbing) {
        if (!salesChart.classList.contains("isScroll")) {
            salesChart.classList.add("isScroll")
        }
        salesChart.scrollLeft = e.pageX
        let x = e.pageX - salesChart.offsetLeft
        distance = x - startX
        if (distance > 0) {
            moveRight = false
        }
        else {
            moveRight = true
        }
        salesChart.scrollLeft = scrollLeft - distance
        autoScroll = (salesChart.scrollLeft)  % singlePageWidth
        console.log(x)
    }
})
salesChart.addEventListener("mouseup", e => {
    e.preventDefault()
    salesChart.classList.remove("isScroll")
    isGrabbing = false;
    if (!moveRight) {
        salesChart.scrollLeft -= autoScroll
        moveRight = null;
    }
    else {
        salesChart.scrollLeft += (singlePageWidth - autoScroll)
        moveRight = null
    }
})
