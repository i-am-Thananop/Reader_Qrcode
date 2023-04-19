const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInput = form.querySelector("input"),
infoText = form.querySelector("p"),
copyBtn = wrapper.querySelector(".copy"),
closeBtn = wrapper.querySelector(".close");

function fetchRequest(formData, file){
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code To Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    });
}

fileInput.addEventListener("change", e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append("file",file);
    fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click",()=> fileInput.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));