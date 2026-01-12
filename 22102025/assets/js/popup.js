
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
dowloadHandbookBtn.addEventListener("click", async () => {
  const pdfUrl = `assets/docs/${langSelector}/handbook.pdf`;
  const fileName = `handbook-${new Date().toISOString().split("T")[0]}.pdf`;

  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    window.open(pdfUrl, "_blank");
  }
});