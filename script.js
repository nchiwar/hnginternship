function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  timeElement.textContent = Date.now();
}

// Update time on load
updateTime();

// Update time every second (optional, for real-time effect)
setInterval(updateTime, 1000);