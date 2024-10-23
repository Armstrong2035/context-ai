document.getElementById("analyzeBtn").addEventListener("click", () => {
  // Send a message to the content script to extract page content
  console.log("This is working!");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "extractContent" },
      (response) => {
        if (response) {
          console.log("Page content:", response);
          alert("Page analyzed! Check the console for results.");
        }
      }
    );
  });
});
