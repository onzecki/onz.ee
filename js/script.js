window.onload = () => {
  document.getElementById("plausible-info").style.display = "block";
  if ((localStorage.getItem("manually_set_tracking_preference") !== "true") && (localStorage.getItem("plausible_ignore") !== "true") && (Navigator.doNotTrack === 1)) {
    switchTracking();
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
  console.log(localStorage.plausible_ignore);
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
