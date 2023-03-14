let Turnbackbtn = document.querySelector(".Turnback-btn")
let RegisterBtn = document.querySelector(".Register-btn")
let RegisterMain = document.querySelector(".RegisterForm")
let LoginMain = document.querySelector(".LoginForm")
//animation
let swipeToRight = () => {
    LoginMain.style.transform = "translateX(-130%)"
    LoginMain.style.paddingTop = "82px"
    setTimeout(() => {
        LoginMain.style.display = "none"
        RegisterMain.style.display = "flex"
        setTimeout(() => {
            RegisterMain.style.transform = "translateX(0)"
        }, 300)
    }, 300)
}
let swipeToLeft = () => {
    RegisterMain.style.transform = "translateX(130%)"
    setTimeout(() => {
        RegisterMain.style.display = "none"
        LoginMain.style.display = "flex"
        setTimeout(() => {
            LoginMain.style.transform = "translateX(0)"
            LoginMain.style.paddingTop = "0"
        }, 300)
    }, 300)
}
let RegisterRequest = () => {
    let url = "/Account/SignUpAjax"
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.querySelector(".new-Username").value,
            password: document.querySelector(".new-Password").value
        })
    })
        .then(response => response.json())
        .then(data => {
            let notify = document.querySelector("#notify")
            notify.textContent = data.message
            notify.classList.remove("error")
            notify.classList.remove("success")
            notify.classList.add(data.type)
        })
}
let confirmPassword = (first, second) => {
    let firstvalue = document.querySelector(first).value
    let secondvalue = document.querySelector(second).value
    if (firstvalue != secondvalue)
        return false;
    return true;
}

RegisterBtn.addEventListener("click", e => {
    swipeToRight();
})
Turnbackbtn.addEventListener("click", e => {
    swipeToLeft();
})
//Đăng ký ajax
let submitRegister = document.querySelector(".submitRegister-btn")
submitRegister.addEventListener("click", e => {
    e.preventDefault();
    if (confirmPassword(".new-Password", ".checkPass") == true)
        RegisterRequest();
    else {
        document.getElementById("notify").classList.add("error")
        document.getElementById("notify").textContent = "Mật khẩu không trùng nhau"
    }
    swipeToLeft();
})
