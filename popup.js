document.addEventListener("DOMContentLoaded", () => {

  const customizeBtn = document.querySelector(
    ".dashboard-grid .dash-card:nth-child(2) .btn-primary"
  );

  const popupModal = document.getElementById("SelCertPopupModal");
  const popupCloseBtn = document.getElementById("SelCertCloseBtn");

  if (!customizeBtn || !popupModal || !popupCloseBtn) return;

  customizeBtn.addEventListener("click", () => {
    popupModal.style.display = "flex";
  });

  popupCloseBtn.addEventListener("click", () => {
    popupModal.style.display = "none";
  });

  popupModal.addEventListener("click", (e) => {
    if (e.target === popupModal) {
      popupModal.style.display = "none";
    }
  });

});
