let isRunning = false;
let startTime = 0;
let interval;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    const currentTime = isRunning ? Date.now() - startTime : startTime;
    display.textContent = formatTime(currentTime);
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
        lapButton.textContent = 'Lap';
    } else {
        startTime = Date.now() - (startTime - Date.now());
        interval = setInterval(updateDisplay, 1000);
        startStopButton.textContent = 'Stop';
        lapButton.textContent = 'Lap';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    startTime = 0;
    display.textContent = '00:00:00';
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
    }
}

startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
