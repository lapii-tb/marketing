
const popupElement = document.querySelector(".thank-you-popup");

function showPopup() {
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

// Keep button click support if any element still has show-popup-btn
const showPopupBtns = document.querySelectorAll(".show-popup-btn");
showPopupBtns.forEach(btn => btn.addEventListener("click", showPopup));

if (popupElement) {
  const closeBtn = popupElement.querySelector("#close-popup-btn");
  if (closeBtn) closeBtn.addEventListener("click", hidePopup);

  window.addEventListener("click", (event) => {
    if (event.target === popupElement) {
      hidePopup();
    }
  });
}

// Scroll Trigger Logic
document.addEventListener("DOMContentLoaded", () => {
  const riskMarginSection = document.getElementById("risk-margin");

  if (riskMarginSection) {
    const observerOptions = {
      threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showPopup();
          // We don't unobserve so it can trigger again if the user leaves and returns
        }
      });
    }, observerOptions);

    observer.observe(riskMarginSection);
  }
});

const dowloadHandbookBtn = document.getElementById("download-handbook");
const langSelector = document.querySelector("html").getAttribute("lang") || "en";
const fileLanguage = (value) => {
  let __extension = 'en';
  if (value === 'zh-CN') {
    __extension = 'cn';
  }
}
dowloadHandbookBtn.addEventListener("click", async () => {
  const __date = `${new Date().getDate()}${new Date().getMonth() + 1}${new Date().getFullYear()}`;
  const pdfUrl = `assets/docs/${langSelector === 'zh-CN' ? 'zh-CN' : 'en'}/handbook.pdf`;
  const fileName = `${__date} 585win handbook-${fileLanguage(langSelector)}.pdf`;

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
    hidePopup();
  } catch (error) {
    console.error("Download failed:", error);
    window.open(pdfUrl, "_blank");
  }
});