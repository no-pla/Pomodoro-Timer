const timer = document.querySelector(".time");
const status = document.querySelector(".study-status");
const startPomoBtn = document.querySelector(".start-pomo");
const startBreakBtn = document.querySelector(".start-break");
const pomoCount = document.querySelector(".pomo");
const hiddenBtn = document.querySelector(".hidden-btn");
const mainPomo = document.querySelector(".container");
const container = document.querySelector(".clock-container");

let $time;
let rest;

let startInterval;
let startBreakInterval;

startPomoBtn.addEventListener("click", startPomo);
startBreakBtn.addEventListener("click", breakPomo);

function hiddenDesc() {
  const desc = document.querySelector(".description-container");
  desc.classList.add("hidden");
  mainPomo.classList.remove("hidden");
}

function startPomo() {
  $time = 5;
  container.classList.add("animated");

  if (pomoCount.innerText.length / 2 === 4) {
    pomoCount.innerHTML = "";
  }
  startInterval = setInterval(startStudy, 1000);
}

function startStudy() {
  status.innerText = "공부 시간! 📚";
  startPomoBtn.disabled = true;

  if ($time <= 0) {
    container.style.backgroundColor = "#006400";
    startPomoBtn.classList.add("hidden");
    startBreakBtn.classList.remove("hidden");
    startPomoBtn.disabled = false;
    clearInterval(startInterval);

    if (pomoCount.innerText.length / 2 !== 3) {
      timer.innerHTML = "05:00";
    } else {
      timer.innerHTML = "30:00";
    }
  } else {
    $time--;

    let minutes = parseInt($time / 60);
    let seconds = parseInt($time % 60);

    let stringMinutes = JSON.stringify(minutes).padStart(2, "0");
    let stringSeconds = JSON.stringify(seconds).padStart(2, "0");
    timer.innerHTML = `${stringMinutes}:${stringSeconds}`;
    document.title = "Pomodoro Timer | " + timer.textContent;
  }
}

function breakPomo() {
  status.innerText = "휴식 시간!!! ☕";
  container.classList.add("animated");

  pomoCount.innerHTML += "🍅";

  if (pomoCount.innerText.length / 2 !== 4) {
    rest = 3;
    startBreakInterval = setInterval(startBreak, 1000);
  } else {
    rest = 18;
    startBreakInterval = setInterval(startBreak, 1000);
  }
}

function startBreak() {
  startBreakBtn.disabled = true;
  if (rest >= 0) {
    let minutes = parseInt(rest / 60);
    let seconds = parseInt(rest % 60);

    let stringMinutes = JSON.stringify(minutes).padStart(2, "0");
    let stringSeconds = JSON.stringify(seconds).padStart(2, "0");
    timer.innerHTML = `${stringMinutes}:${stringSeconds}`;
    document.title = "Pomodoro Timer | " + timer.textContent;

    rest--;
  } else {
    clearInterval(startBreakInterval);
    container.style.backgroundColor = "tomato";
    startPomoBtn.classList.remove("hidden");
    startBreakBtn.classList.add("hidden");
    startBreakBtn.disabled = false;
    //    container.style.backgroundColor = "tomato";
    timer.innerHTML = "25:00";
    status.innerText = "공부 시간! 📚";
  }
}

function init() {
  timer.innerHTML = "25:00";
  status.innerText = "POMODORO TIMER";
  startBreakBtn.classList.add("hidden");

  hiddenBtn.addEventListener("click", hiddenDesc);
  mainPomo.classList.add("hidden");
}
init();
