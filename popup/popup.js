const STORAGE_KEY = 'subh-counter';
const THEME_STORAGE_KEY = 'subh-theme';
const counterBtn = document.getElementById("counter-btn");
const counterDisplay = document.getElementById("counter-number");
const counterBtnImg = document.getElementById("counter-btn-img");
const resetBtn = document.getElementById("reset-btn");
const resetBtnImg = document.getElementById("reset-btn-img");
const lightModeBtn = document.getElementById("light-mode-btn");

let count = parseInt(localStorage.getItem(STORAGE_KEY), 10);
if (Number.isNaN(count)) count = 0;
counterDisplay.textContent = String(count).padStart(1, "0");

// Initialize dark mode from localStorage or default to light
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Toggle dark mode on button click
if (lightModeBtn) {
  lightModeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  });
}

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

// Menu functionality
const menuBtn = document.getElementById("menu-btn");
const menuOverlay = document.getElementById("menu-overlay");
const menuCloseBtn = document.getElementById("menu-close-btn");
const menuItems = document.querySelectorAll(".menu-item");
const dhikrText = document.getElementById("dhikr-text");

if (menuBtn) {
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menuOverlay.classList.add("active");
  });
}

if (menuCloseBtn) {
  menuCloseBtn.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
  });
}

// Close menu when clicking outside (on the overlay)
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) {
    menuOverlay.classList.remove("active");
  }
});

// Handle menu item selection
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all items
    menuItems.forEach((i) => i.classList.remove("active"));
    
    // Add active class to clicked item
    item.classList.add("active");
    
    // Update dhikr text
    const selectedZekr = item.getAttribute("data-zekr");
    dhikrText.textContent = selectedZekr;
    
    // Close menu
    menuOverlay.classList.remove("active");
  });
})
