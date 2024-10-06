window.onload = function () {
  document.getElementById("plausible-info").style.display = "block";
};

const isReducedMotion =
  window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
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
  if (localStorage.getItem("plausible_ignore") === "true") {
    localStorage.setItem("plausible_ignore", "false");
  } else {
    localStorage.setItem("plausible_ignore", "true");
  }
  console.log(localStorage.plausible_ignore);
  checkOpted();
}

function changingLetters() {
  const titleLetters = document.querySelectorAll(".title-letter");
  titleLetters.forEach((letter) => {
    letter.setAttribute("data-letter", letter.textContent);
  });
  titleLetters.forEach((letter) => {
    let speed = 30;
    letter.addEventListener("mouseover", function () {
      rng = setInterval(function () {
        const randomCharCode = Math.floor(Math.random() * 26) + 97;
        const randomLetter = String.fromCharCode(randomCharCode);
        letter.textContent = randomLetter;
      }, speed);
    });
    letter.addEventListener("mouseout", function () {
      clearInterval(rng);
      if (!Math.floor(Math.random() * 5)) {
        return;
      }
      setTimeout(function () {
        letter.textContent = letter.getAttribute("data-letter");
      }, speed);
    });
  });
}
