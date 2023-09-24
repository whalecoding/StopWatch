let isRunning = false;
let startTime = 0;
let interval;
let lapCounter = 1;
let showLapTime = false;
let currentTimeDiff = 0;
let startTimeDiff = 0;
let labTimeDiff = 0;
let beforeLapTime = 0;

const display = document.getElementById('display');
const displayTemp = document.getElementById('displayTemp');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
// const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const copyLapsButton = document.getElementById('copyLaps');

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function formatLapTime(ms) {
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateDisplay() {
    // currentTimeDiff = Date.now() - startTime;
    currentTimeDiff = Date.now() - beforeLapTime;
    startTimeDiff = Date.now() - startTime;
    if (showLapTime) {
        displayTemp.textContent = formatTime(currentTimeDiff);
    } else {
        display.textContent = formatTime(currentTimeDiff);
    }
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
        display.textContent = formatTime(Date.now() - startTime);
        // lapButton.textContent = 'Lap';
    } else {
        if (startTime == 0) {
            startTime = Date.now();
            beforeLapTime = startTime;
        } else {
            startTime = Date.now() - startTimeDiff;
            beforeLapTime = startTime + labTimeDiff;
        }
        interval = setInterval(updateDisplay, 50);
        startStopButton.textContent = 'Stop';
        // lapButton.textContent = 'Lap';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    startTime = 0;
    display.textContent = '00:00:00.000';
    startStopButton.textContent = 'Start';
    // lapButton.textContent = 'Lap';
    lapsList.innerHTML = '';
    lapCounter = 1;
}

function lapTimer() {
    if (isRunning && !showLapTime) {
        onFullScreen();
        const currentTime = Date.now();
        const lapTime = currentTime - startTime;
        // startTime = currentTime;
        const lapItem = document.createElement('div');
        lapItem.textContent = `#${lapCounter}: ${formatLapTime(currentTime - beforeLapTime)} (${formatTime(lapTime)})\n`;
        // lapItem.textContent = `#${lapCounter}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
        showLapTime = true;
        // display.textContent = formatTime(lapTime);
        display.textContent = formatLapTime(currentTime - beforeLapTime);
        beforeLapTime = currentTime;
        labTimeDiff = lapTime;
        setTimeout(function () { showLapTime = false; displayTemp.textContent = ''; offFullScreen(); }, 5000);
    }
}

function onFullScreen() {
    display.classList.add('full-screen');
    document.documentElement.style.overflow = 'hidden'; // Hide scrollbar
}

function offFullScreen() {
    display.classList.remove('full-screen');
    document.documentElement.style.overflow = ''; // Restore scrollbar
}

startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
// lapButton.addEventListener('click', lapTimer);

// dark mode

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    display.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
});

copyLapsButton.addEventListener('click', () => {
    const lapsText = lapsList.textContent;

    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = lapsText;

    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');

    document.body.removeChild(tempTextArea);

    alert('Lap times copied to clipboard!');
});

document.body.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement !== startStopButton && clickedElement !== resetButton && clickedElement !== themeToggle && clickedElement !== copyLapsButton) {
        lapTimer();
    }
});
