const words = [
    { word: "apple", imgSrc: "apple.jpg" },
    { word: "banana", imgSrc: "banana.jpg" },
    { word: "orange", imgSrc: "orange.jpg" },
    { word: "grape", imgSrc: "grape.jpg" },
    { word: "strawberry", imgSrc: "strawberry.jpg" },
    { word: "blueberry", imgSrc: "blueberry.jpg" }
];

const wordContainer = document.getElementById("word-container");
const wordImg = document.getElementById("word-img");
const word = document.getElementById("word");
const userInput = document.getElementById("userInput");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");

let currentWordIndex = 0;

function generateWord() {
    const currentWord = words[currentWordIndex];
    word.textContent = currentWord.word;
    wordImg.src = currentWord.imgSrc;
    wordImg.style.display = "block";
}

function checkSpelling() {
    const inputText = userInput.value.trim().toLowerCase();
    const currentWord = words[currentWordIndex];

    if (inputText === currentWord.word) {
        result.textContent = "Correct!";
        result.classList.remove("incorrect");
        result.classList.add("correct");
    } else {
        result.textContent = "Incorrect. Try again.";
        result.classList.remove("correct");
        result.classList.add("incorrect");
    }

    userInput.value = "";
    setTimeout(nextWord, 1000);
}

function nextWord() {
    currentWordIndex++;
    if (currentWordIndex >= words.length) {
        currentWordIndex = 0; // Start over if all words have been shown
    }
    generateWord();
    result.textContent = "";
    result.classList.remove("correct", "incorrect");
}

window.addEventListener("load", () => {
    generateWord();
    checkBtn.addEventListener("click", checkSpelling);
    userInput.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            checkSpelling();
        }
    });
});
