const paragraphs = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet, making it perfect for practicing typing skills. Whether you're new to typing or looking to improve your speed, repetition is key. Consistent practice helps improve muscle memory, allowing you to type faster and with more accuracy. Focus on form and posture as well to avoid fatigue and strain during long typing sessions.",
  "Typing is an essential skill in today's world, whether for work, communication, or creativity. Mastering touch typing can greatly increase productivity and efficiency. The goal is to type without looking at the keyboard, which allows the mind to focus entirely on the task at hand. With regular practice, speed and accuracy improve over time, and typing becomes second nature.",
  "Technology has revolutionized the way we live, work, and communicate. Computers, smartphones, and tablets have become an integral part of our daily routines. Understanding how to use these devices effectively can open up countless opportunities. From sending emails to creating complex documents, digital literacy is an invaluable skill in the modern age.",
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector("wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer;
let maxTime = 100;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 100));
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 100));
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
