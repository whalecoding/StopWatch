let isRunning = false;
let startTime = 0;
let interval: NodeJS.Timeout;

const display = document.getElementById('display') as HTMLDivElement;
const startStopButton = document.getElementById('startStop') as HTMLButtonElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;

function formatTime(ms: number): string {
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
    } else {
        startTime = Date.now() - (startTime - Date.now());
        interval = setInterval(updateDisplay, 1000);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    startTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
}

startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
