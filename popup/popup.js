const COUNTERS_STORAGE_KEY = 'subh-counters';
const THEME_STORAGE_KEY = 'subh-theme';
const counterBtn = document.getElementById("counter-btn");
const counterDisplay = document.getElementById("counter-number");
const counterBtnImg = document.getElementById("counter-btn-img");
const resetBtn = document.getElementById("reset-btn");
const resetBtnImg = document.getElementById("reset-btn-img");
const lightModeBtn = document.getElementById("light-mode-btn");
const dhikrText = document.getElementById("dhikr-text");

// Load all counters from storage or initialize empty object
let counters = JSON.parse(localStorage.getItem(COUNTERS_STORAGE_KEY)) || {};
let currentZekr = localStorage.getItem('subh-selected-zekr') || dhikrText.textContent.trim();

// Restore selected zekr in the UI if it's different from default
if (currentZekr !== dhikrText.textContent.trim()) {
  dhikrText.textContent = currentZekr;
}

// Initialize counter display for current zekr
function updateCounterDisplay() {
  const count = counters[currentZekr] || 0;
  counterDisplay.textContent = String(count).padStart(1, "0");
}

updateCounterDisplay();

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
  // increment counter for current zekr
  if (!counters[currentZekr]) counters[currentZekr] = 0;
  counters[currentZekr] += 1;
  counterDisplay.textContent = String(counters[currentZekr]).padStart(1, "0");
  localStorage.setItem(COUNTERS_STORAGE_KEY, JSON.stringify(counters));

  // animate counter button icon
  if (counterBtnImg) {
    counterBtnImg.classList.add("pressed");
    setTimeout(() => counterBtnImg.classList.remove("pressed"), 160);
  }
});

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    // reset counter for current zekr
    counters[currentZekr] = 0;
    counterDisplay.textContent = String(0).padStart(1, "0");
    localStorage.setItem(COUNTERS_STORAGE_KEY, JSON.stringify(counters));

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
const SELECTED_ZEKR_KEY = 'subh-selected-zekr';

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
    
    // Update current zekr and display
    const selectedZekr = item.getAttribute("data-zekr");
    currentZekr = selectedZekr;
    dhikrText.textContent = selectedZekr;
    localStorage.setItem(SELECTED_ZEKR_KEY, selectedZekr);
    
    // Update counter display for the selected zekr
    updateCounterDisplay();
    
    // Close menu
    menuOverlay.classList.remove("active");
  });
});

// Set initial active menu item to match current dhikr text
menuItems.forEach((item) => {
  if (item.getAttribute("data-zekr") === currentZekr) {
    item.classList.add("active");
  }
});

// Mouse wheel scrolling for menu
menuOverlay.addEventListener('wheel', (e) => {
  if (menuOverlay.classList.contains('active')) {
    menuContainer = document.querySelector('.menu-container');
    menuContainer.scrollTop += e.deltaY;
    e.preventDefault();
  }
}, { passive: false });
