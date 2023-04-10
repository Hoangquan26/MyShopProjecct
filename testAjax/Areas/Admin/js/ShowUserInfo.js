function getUserData(id) {
    let url = "/Admin/Admin/getUserInfomation";
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: id })
    })
        .then(response => response.json())
        .then(data => {
            if (data.code == 500) {
                alert(data.errorMessage)
                return
            }
            return data;
        })
        .then(data => {
            let numberOrder = data.numberOrder
            let priority = data.priority;
            data = data.userInfo
            document.querySelector(".card").classList.add("flex-visible")
            let avatar = document.querySelector(".banner img")
            avatar.dataset.userid = data[0].id
            if (data[0].avatarPath.length > 0)
                avatar.src = data[0].avatarPath;
            else {
                avatar.src = "/images/avatars/UnknownAvatar.png";
            }
            let dateStr = data[0].ngayTaoTaiKhoan;
            let parts = dateStr.split('/'); // tách chuỗi thành các phần tử dựa trên dấu '/'
            let dateObj = new Date(parts[2], parts[1] - 1, parts[0]); 
            let diffTime = Math.abs(Date.now() - dateObj); // lấy giá trị tuyệt đối của hiệu thời gian giữa 2 đối tượng Date (được tính bằng milisecond)
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let mainUser = document.querySelector(".main-user")
/*            inputPID.dataset.user_ID = data.id.toString()*/
            mainUser.querySelector(".name").textContent = data[0].UserName
            mainUser.querySelector(".title").textContent = data[0].isAdmin ? "Quản trị viên" : "Khách"
            mainUser.querySelector(".follow-info h2:first-child span").textContent = diffDays
            mainUser.querySelector(".follow-info h2:last-child span").textContent = numberOrder
            let powerPass = document.querySelector(".card .power-pass")
            let powerInput = powerPass.querySelectorAll("input[name='power']")
            if (data[0].isAdmin == true) {
                powerInput[0].checked = true;
            }
            else {
                powerInput[1].checked = true;
            }
            return priority;
        })
        .then(data => {
            /*if (data != null) {
                let deleteCheck = document.querySelectorAll(".checkbox")
                deleteCheck.forEach(item => {
                    item.checked = false;
                })
                data.forEach(item => {
                    if (item != null) {
                        document.querySelector(`#${item["MaChucNang"]}`).checked = true;
                    }
                })
            }*/
        })
}
