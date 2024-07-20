let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const lapsList = document.getElementById('laps');
const darkModeBtn = document.getElementById('darkModeBtn');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
darkModeBtn.addEventListener('click', toggleDarkMode);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        startStopBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startTime = null;
    difference = 0;
    running = false;
    startStopBtn.textContent = "Start";
    display.textContent = "00:00:00.000";
    laps = [];
    renderLaps();
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = updatedTime % 1000;

    display.textContent = 
        (hours > 9 ? hours : "0" + hours) + ":" + 
        (minutes > 9 ? minutes : "0" + minutes) + ":" + 
        (seconds > 9 ? seconds : "0" + seconds) + "." + 
        (milliseconds > 99 ? milliseconds : milliseconds > 9 ? "0" + milliseconds : "00" + milliseconds);
}

function recordLap() {
    if (running) {
        let currentTime = display.textContent;
        laps.push(currentTime);
        renderLaps();
    }
}

function renderLaps() {
    lapsList.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
