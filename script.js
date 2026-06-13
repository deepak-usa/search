const webview = document.getElementById("webview");
const addressBar = document.getElementById("addressBar");
const favoritesMenu = document.getElementById("favorites");
let historyStack = [];
let currentIndex = -1;

function navigate() {
  let url = addressBar.value;
  if (!url.startsWith("http")) {
    url = "https://www.bing.com/search?q=" + encodeURIComponent(url);
  }
  webview.src = url;
  historyStack.push(url);
  currentIndex = historyStack.length - 1;
}

function goBack() {
  if (currentIndex > 0) {
    currentIndex--;
    webview.src = historyStack[currentIndex];
  }
}

function goForward() {
  if (currentIndex < historyStack.length - 1) {
    currentIndex++;
    webview.src = historyStack[currentIndex];
  }
}

function reloadPage() {
  if (currentIndex >= 0) {
    webview.src = historyStack[currentIndex];
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function addFavorite() {
  if (currentIndex >= 0) {
    const url = historyStack[currentIndex];
    const option = document.createElement("option");
    option.value = url;
    option.textContent = url;
    favoritesMenu.appendChild(option);
  }
}

function loadFavorite() {
  const url = favoritesMenu.value;
  if (url) {
    webview.src = url;
    historyStack.push(url);
    currentIndex = historyStack.length - 1;
  }
}
