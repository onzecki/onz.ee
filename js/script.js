window.onload = () => {
  document.getElementById("plausible-info").style.display = "block";
  if (
    localStorage.getItem("manually_set_tracking_preference") !== "true" &&
    localStorage.getItem("plausible_ignore") !== "true" &&
    navigator.doNotTrack === "1"
  ) {
    switchTracking();
  }
  if (localStorage.getItem("customStylesheet") !== "null" && localStorage.getItem("customStylesheet") !== null) {
    loadTheme();
  }
};

const isReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)") === true ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;
const header = document.getElementsByTagName("header")[0];

if (!isReducedMotion) {
  changingLetters();
}

checkOpted();

function checkOpted() {
  const link = document.querySelector("#plausible-info > span");
  if (localStorage.getItem("plausible_ignore") === "true") {
    link.innerHTML = "opt in to tracking!";
  } else {
    link.innerHTML = "opt out of tracking!";
  }
}

function optOut() {
  if (localStorage.getItem("manually_set_tracking_preference") !== "true") {
    localStorage.setItem("manually_set_tracking_preference", "true");
  }
  switchTracking();
}

function switchTracking() {
  if (localStorage.getItem("plausible_ignore") === "true") {
    localStorage.setItem("plausible_ignore", "false");
  } else {
    localStorage.setItem("plausible_ignore", "true");
  }
  checkOpted();
}

checkOpted();

function changingLetters() {
  const titleLetters = document.querySelectorAll(".title-letter");
  for (const letter of titleLetters) {
    letter.setAttribute("data-letter", letter.textContent);
  }
  for (const letter of titleLetters) {
    const speed = 30;
    letter.addEventListener("mouseover", () => {
      rng = setInterval(() => {
        const randomCharCode = Math.floor(Math.random() * 26) + 97;
        const randomLetter = String.fromCharCode(randomCharCode);
        letter.textContent = randomLetter;
      }, speed);
    });
    letter.addEventListener("mouseout", () => {
      clearInterval(rng);
      if (!Math.floor(Math.random() * 5)) {
        return;
      }
      setTimeout(() => {
        letter.textContent = letter.getAttribute("data-letter");
      }, speed);
    });
  }
}

function saveTheme(){
  localStorage.customStylesheet = document.querySelectorAll("#meta-box-right > style")[0].innerHTML;
  alert("Saved theme!");
}
function loadTheme(){
  document.querySelectorAll("#meta-box-right > style")[0].innerHTML = localStorage.customStylesheet;
}
function resetTheme(){
  localStorage.customStylesheet = null;
  alert("Reset theme!");
}

function insertThemeChangeButtons(){
  const styleElement = document.querySelectorAll("#meta-box-right > style")[0];
  const buttonsHTML = '<div id="theme-buttons"><button onclick="saveTheme()">Save changes!</button><button onclick="resetTheme()">Reset it!</button></div>'
  styleElement.insertAdjacentHTML('afterend', buttonsHTML);
}
insertThemeChangeButtons();
