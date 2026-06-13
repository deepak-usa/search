let historyStack = [];
let currentIndex = -1;

function search() {
  const query = document.getElementById("searchBox").value;
  if (!query) return;

  historyStack.push(query);
  currentIndex = historyStack.length - 1;

  fetchResults(query);
}

function fetchResults(query) {
  const apiKey = "YOUR_BING_API_KEY"; // Replace with your Bing Search API key
  const endpoint = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`;

  fetch(endpoint, {
    headers: { "Ocp-Apim-Subscription-Key": apiKey }
  })
  .then(res => res.json())
  .then(data => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    if (data.webPages) {
      data.webPages.value.forEach(item => {
        resultsDiv.innerHTML += `
          <div class="result">
            <a href="${item.url}" target="_blank">${item.name}</a>
            <p>${item.snippet}</p>
          </div>`;
      });
    }
  });
}

function goBack() {
  if (currentIndex > 0) {
    currentIndex--;
    fetchResults(historyStack[currentIndex]);
  }
}

function goForward() {
  if (currentIndex < historyStack.length - 1) {
    currentIndex++;
    fetchResults(historyStack[currentIndex]);
  }
}

function reloadPage() {
  if (currentIndex >= 0) {
    fetchResults(historyStack[currentIndex]);
  }
}
