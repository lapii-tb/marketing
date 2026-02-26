
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

// Scroll Trigger Logic with 15-minute cooldown
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;
  const COOLDOWN_MS = 15 * 60 * 1000;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Navbar scroll effect
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Popup trigger logic
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / scrollHeight) * 100;

    if (scrollPercentage > 50) {
      const isScrollingDown = currentScrollY > lastScrollY;

      // Check cooldown
      const lastShown = localStorage.getItem("blueprint_popup_last_shown");
      const now = Date.now();
      const isCooldownOver = !lastShown || (now - parseInt(lastShown) > COOLDOWN_MS);

      if (isScrollingDown && isCooldownOver) {
        showPopup();
        localStorage.setItem("blueprint_popup_last_shown", now.toString());
      }
    }
    lastScrollY = currentScrollY;
  });

const dowloadHandbookBtn = document.getElementById("download-handbook");
const langSelector = document.querySelector("html").getAttribute("lang") || "en";
const fileLanguage = (value) => {
  if (value === 'zh-CN') {
    return 'cn';
  }
  return 'en';
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