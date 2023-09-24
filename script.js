let isRunning = false;
let startTime = 0;
let interval;
let lapCounter = 1;
let showLapTime = false;
let currentTime = 0;
let beforeLapTime = 0;

const display = document.getElementById('display');
const displayTemp = document.getElementById('displayTemp');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function formatLapTime(ms) {
    console.log(ms)
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateDisplay() {
    currentTime = isRunning ? Date.now() - startTime : startTime;
    if (showLapTime) {
        displayTemp.textContent = formatTime(currentTime);
    } else {
        display.textContent = formatTime(currentTime);
    }
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
        lapButton.textContent = 'Lap';
    } else {
        if (startTime == 0) {
            startTime = Date.now();
        } else {
            startTime = Date.now() - currentTime;
        }
        beforeLapTime = startTime;
        interval = setInterval(updateDisplay, 50);
        startStopButton.textContent = 'Stop';
        lapButton.textContent = 'Lap';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    startTime = 0;
    display.textContent = '00:00:00.000';
    startStopButton.textContent = 'Start';
    lapButton.textContent = 'Lap';
    lapsList.innerHTML = '';
    lapCounter = 1;
}

function lapTimer() {
    if (isRunning) {
        const currentTime = Date.now();
        const lapTime = currentTime - startTime;
        const lapItem = document.createElement('div');
        lapItem.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
        showLapTime = true;
        // display.textContent = formatTime(lapTime);
        display.textContent = formatLapTime(currentTime - beforeLapTime);
        beforeLapTime = currentTime;
        setTimeout(function () { showLapTime = false; displayTemp.textContent = ''; }, 5000);
    }
}

startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);

document.body.addEventListener('click', lapTimer);

// dark mode
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Toggle the text on the button
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
});

