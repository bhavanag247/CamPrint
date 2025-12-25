export function initPrintPopup() {
  const btn = document.getElementById("open-print-customize");
  const modal = document.getElementById("printCustomizeModal");
  const close = document.getElementById("closePrintModal");
  const slotSelect = document.getElementById("timeSlot");
  const priceSpan = document.getElementById("totalPrice");

  if (!btn || !modal) return;

  // Generate time slots (15 min)
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const t = new Date(now.getTime() + i * 15 * 60000);
    const opt = document.createElement("option");
    opt.value = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    opt.textContent = opt.value;
    slotSelect.appendChild(opt);
  }

  btn.onclick = () => modal.style.display = "flex";
  close.onclick = () => modal.style.display = "none";
  modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
  };

  // Simple price logic
  const updatePrice = () => {
    const copies = +document.getElementById("copies").value;
    const type = document.getElementById("printType").value;
    const size = document.getElementById("paperSize").value;

    let price = copies * (type === "color" ? 10 : 2);
    if (size === "A3") price *= 2;

    priceSpan.textContent = price;
  };

  document.querySelectorAll(
    "#paperSize,#printType,#copies"
  ).forEach(el => el.addEventListener("change", updatePrice));

  updatePrice();
}
