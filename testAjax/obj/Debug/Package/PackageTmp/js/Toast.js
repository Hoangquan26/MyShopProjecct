function callToast(message, status) {
    let toast = document.querySelector(".toast-section")
    let div = document.createElement("div")
    div.classList.add("toast-wrapper", status)
    div.innerHTML = `<div class="toast-header">
                        <div class="header-alert">
                            <i class="fa-solid ${(status == 'success' ? 'fa-circle-check' : (status == 'failed' ? 'fa-circle-xmark' : 'fa-triangle-exclamation'))}"></i>
                            <h4>${(status == 'success' ? 'Thành công' : (status == 'failed' ? 'Thất bại' : 'Cảnh báo'))}</h4>
                        </div>
                        <div class="closeBtn">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        </div>
                        <div class="toast-content">
                            <span class="toast-context">
                                ${message}
                            </span>
                     </div>`
    div.querySelector(".closeBtn").addEventListener("click", () => {
        div.style.animation = "fadeOut 1s ease"
        setTimeout(() => {
            div.remove();
        }, 1000);
    })
    setTimeout(() => {
        div.style.animation = "fadeOut 1s ease"
    }, 2500);
    setTimeout(() => {
        div.remove();
    }, 3500);
    toast.appendChild(div)
}
