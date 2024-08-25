document.addEventListener('DOMContentLoaded', () => {
    const thresholdInput = document.getElementById('threshold');
    const saveButton = document.getElementById('save');
    const status = document.getElementById('status');
  
    chrome.storage.sync.get(['threshold'], (result) => {
      if (result.threshold) {
        thresholdInput.value = result.threshold;
      }
    });
  
    saveButton.addEventListener('click', () => {
      const threshold = parseInt(thresholdInput.value, 10);
  
      if (isNaN(threshold) || threshold < 1) {
        status.textContent = 'Please enter a valid number greater than 0.';
        return;
      }
  
      chrome.storage.sync.set({ threshold: threshold }, () => {
        status.textContent = 'Threshold saved!';
      });
    });
  });
  