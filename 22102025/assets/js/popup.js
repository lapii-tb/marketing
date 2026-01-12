
const popupElement = document.querySelector(".thank-you-popup");

function showPopup() {
console.log("show popup");
if (popupElement) {
    popupElement.classList.add("show");
    document.body.style.overflow = "hidden";
}
}

function hidePopup() {
if (popupElement) {
    popupElement.classList.remove("show");
    document.body.style.overflow = "";
}
}

const getStartedBtn = document.querySelector(".show-popup-btn");
getStartedBtn.addEventListener("click", showPopup);

if (popupElement) {
const closeBtn = popupElement.querySelector("#close-popup-btn");
closeBtn.addEventListener("click", hidePopup);

window.addEventListener("click", (event) => {
    if (event.target === popupElement) {
    hidePopup();
    }
});
}

const dowloadHandbookBtn = document.getElementById("download-handbook");
const langSelector =
document.querySelector("html").getAttribute("lang") || "en";
dowloadHandbookBtn.addEventListener("click", () => {
const link = document.createElement("a");
link.href = `assets/docs/${langSelector}/handbook.pdf`;
link.download = `handbook-${new Date().toISOString().split("T")[0]}.pdf`;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
});