const quotes = [
    "Practice makes a person perfect",
    "Typing fast requires accuracy and focus",
    "JavaScript is fun to learn",
    "Consistency is the key to success",
    "Code every day to improve skills"
];

let timer = 0;
let interval = null;
let currentQuote = "";

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

function loadQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.innerHTML = currentQuote.split("").map(char => `<span>${char}</span>`).join("");
}

function startTimer() {
    interval = setInterval(() => {
        timer++;
        timeEl.textContent = timer;
    }, 1000);
}

inputEl.addEventListener("input", () => {
    const input = inputEl.value.split("");
    const quoteChars = quoteEl.querySelectorAll("span");

    let correct = 0;

    quoteChars.forEach((charSpan, index) => {
        const typedChar = input[index];

        if (typedChar == null) {
            charSpan.classList.remove("correct", "incorrect");
        } else if (typedChar === charSpan.innerText) {
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
            correct++;
        } else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct");
        }
    });

    // Start timer only if it's not already running and user has started typing
    if (!interval && input.length > 0) startTimer();

    // Accuracy
    const accuracy = input.length === 0 ? 0 : (correct / input.length) * 100;
    accuracyEl.textContent = accuracy.toFixed(2);

    // WPM
    const words = input.length / 5;
    // Prevent division by zero which results in Infinity WPM during the first second
    const timeInMinutes = (timer === 0 ? 1 : timer) / 60; 
    const wpm = words / timeInMinutes;
    wpmEl.textContent = Math.round(wpm);

    // Finish condition
    if (input.join("") === currentQuote) {
        clearInterval(interval);
        interval = null;
        inputEl.disabled = true;
    }
});

function resetTest() {
    clearInterval(interval);
    interval = null;
    timer = 0;
    timeEl.textContent = 0;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 0;
    inputEl.value = "";
    inputEl.disabled = false;
    loadQuote();
}

loadQuote();