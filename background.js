const TARGET_URL = "https://www.instagram.com/video/unified_cvc/";
let requestCount = 0;
let threshold = 5; 

chrome.storage.sync.get(['threshold'], (result) => {
  if (result.threshold) {
    threshold = result.threshold;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url === TARGET_URL) {
      requestCount++;
      console.log(`Request count: ${requestCount}`);

      if (requestCount > threshold) {
        chrome.tabs.create({ url: chrome.runtime.getURL('quiz.html') });
        requestCount = 0; 
      }
    }
  },
  { urls: ["<all_urls>"] } 
);
