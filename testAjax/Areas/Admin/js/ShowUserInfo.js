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
            let priority = data.priority;
            data = data.userInfo
            document.getElementById("user-info").classList.add("flex-visible")
            let user_content = document.querySelectorAll(".user-infomation-item")
            let avatar = document.querySelector(".user-avatar img")
            if (data[0].avatarPath.length > 0)
                avatar.src = data[0].avatarPath;
            else {
                avatar.src = "/images/avatars/UnknownAvatar.png";
            }
            data.splice(data.length - 2, data.length - 1)
            let span = document.querySelectorAll(".user-detail")
            let i = 0;
            for (var item in data[0]) {
                if (item == "id")
                    span[i].id = "idUser"
                if (item == "isAdmin") {
                    let context = (data[0][item] == true) ? "Admin" : "Khách";
                    span[i].textContent = context
                    break;
                }
                span[i].textContent = data[0][item]
                i++;
            }
            return priority;
        })
        .then(data => {
            if (data != null) {
                let deleteCheck = document.querySelectorAll(".checkbox")
                deleteCheck.forEach(item => {
                    item.checked = false;
                })
                data.forEach(item => {
                    document.querySelector(`#${item["MaChucNang"]}`).checked = true;
                })
            }
        })
}
