const wordEl = document.querySelector(".word");
const hintEl = document.querySelector(".hint");
const attemptsLeftEl = document.querySelector(".attempts-left");
const wrongLettersEl = document.querySelector(".wrong-letters");
const resetBtnEl = document.querySelector(".reset-btn");
const keyboardContainer = document.querySelector(".keyboard");

const lettersKeyboard = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

const words = [
  { word: "banana", hint: "fruit" },
  { word: "guitar", hint: "musical instrument" },
  { word: "mountain", hint: "landscape feature" },
  { word: "python", hint: "programming language" },
  { word: "elephant", hint: "largest land animal" },
];

lettersKeyboard.forEach((letter) => {
  const button = document.createElement("button");
  button.textContent = letter;
  button.classList.add("key");
  keyboardContainer.appendChild(button);

  button.addEventListener("click", () => {
    checkLetter(letter, button);
  });
});

let currentWord = "";
let hint = "";
let wrongLetters = [];
let attemptsLeft = 6;
let displayWord = [];

const generateRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  currentWord = randomWord.word.toLowerCase();
  hint = randomWord.hint;
  displayWord = Array(currentWord.length).fill("_");
  displayRandomWord();
};

const displayRandomWord = () => {
  wordEl.textContent = displayWord.join(" ");
  hintEl.textContent = `Hint: ${hint}`;
  attemptsLeftEl.textContent = `Attempts left: ${attemptsLeft}`;
  wrongLettersEl.textContent = `Wrong letters: ${wrongLetters.join(", ")}`;
};

const checkLetter = (letter, button) => {
  button.disabled = true;

  if (currentWord.includes(letter)) {
    currentWord.split("").forEach((char, index) => {
      if (char === letter) {
        displayWord[index] = letter;
      }
    });
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      attemptsLeft--;
    }
  }

  displayRandomWord();

  checkGameOver();
};

const checkGameOver = () => {
  if (displayWord.join("") === currentWord) {
    setTimeout(() => alert("Congratulations! You guessed the word!"), 100);
  } else if (attemptsLeft === 0) {
    setTimeout(() => alert(`Game over! The word was "${currentWord}".`), 100);
  }
};

resetBtnEl.addEventListener("click", () => {
  wrongLetters = [];
  attemptsLeft = 6;
  generateRandomWord();
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => (key.disabled = false));
});

generateRandomWord();
