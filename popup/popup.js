const STORAGE_KEY = 'subh-counter';
const counterBtn = document.getElementById("counter-btn");
const counterDisplay = document.getElementById("counter-number");
const counterBtnImg = document.getElementById("counter-btn-img");
const resetBtn = document.getElementById("reset-btn");
const resetBtnImg = document.getElementById("reset-btn-img");

let count = parseInt(localStorage.getItem(STORAGE_KEY), 10);
if (Number.isNaN(count)) count = 0;
counterDisplay.textContent = String(count).padStart(1, "0");

counterBtn.addEventListener("click", () => {
  // increment counter
  count += 1;
  counterDisplay.textContent = String(count).padStart(1, "0");
  localStorage.setItem(STORAGE_KEY, String(count));

  // animate counter button icon
  if (counterBtnImg) {
    counterBtnImg.classList.add("pressed");
    setTimeout(() => counterBtnImg.classList.remove("pressed"), 160);
  }
});

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    count = 0;
    counterDisplay.textContent = String(count).padStart(1, "0");
    localStorage.setItem(STORAGE_KEY, String(count));

    // animate reset button icon
    if (resetBtnImg) {
      resetBtnImg.classList.add("pressed");
      setTimeout(() => resetBtnImg.classList.remove("pressed"), 120);
    }
  });
}
