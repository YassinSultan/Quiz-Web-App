const quizData = [
  {
    question: "What does CSS stand for?",
    a: "Colorful Style Sheets",
    b: "Cascading Style Sheets",
    c: "Computer Style Sheets",
    d: "Creative Style Sheets",
    correct: "b",
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    a: "<heading>",
    b: "<h6>",
    c: "<h1>",
    d: "<head>",
    correct: "c",
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    a: "style",
    b: "class",
    c: "font",
    d: "id",
    correct: "a",
  },
  {
    question:
      "What is the correct JavaScript syntax for changing the content of an HTML element?",
    a: "document.getElementByName('p').innerHTML = 'New content'",
    b: "document.getElementById('p').innerHTML = 'New content'",
    c: "document.getElement('p').innerHTML = 'New content'",
    d: "document.getElementsByTagName('p')[0].innerHTML = 'New content'",
    correct: "b",
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    a: "color",
    b: "background-color",
    c: "text-color",
    d: "font-color",
    correct: "a",
  },
];

let questionNum = 0;
let score = 0;
let answer;
const question = document.getElementById("question");
const answerBoxs = document.querySelectorAll(".answer-button");
const submitButton = document.getElementById("submit-button");
const reloadButton = document.getElementById("reload-button");
const scoreContainer = document.querySelector(".score");
const scoreText = scoreContainer.querySelector("h2");
const scoreImg = scoreContainer.querySelector("img");

// select answer
answerBoxs.forEach((box) => {
  box.addEventListener("click", () => {
    box.querySelector("input").checked = true;
  });
});

function loadQuestion() {
  answer = null;
  question.innerHTML = quizData[questionNum].question;
  answerBoxs.forEach((box) => {
    box.classList.remove("correct");
    box.classList.remove("incorrect");
    let option = quizData[questionNum][box.querySelector("input").value];
    box.querySelector("label").textContent = option;
    box.querySelector("input[type=radio]").checked = false;
  });
}
function checkAnswer() {
  answerBoxs.forEach((box) => {
    selectedAnswer = box.querySelector("input:checked");
    if (selectedAnswer) {
      const answer = selectedAnswer.value;
      if (answer == quizData[questionNum].correct) {
        score++;
        box.classList.add("correct");
      } else {
        box.classList.add("incorrect");
        const correctAnswerBox = box.parentNode.querySelector(
          `input[value='${quizData[questionNum].correct}']`
        ).parentNode;
        correctAnswerBox.classList.add("correct");
      }
    }
  });
}
function resetQuiz() {
  questionNum = 0;
  score = 0;
  answer = null;
  loadQuestion();
  reloadButton.style.display = "none";
  submitButton.style.display = "block";
  question.style.display = "block";
  scoreContainer.style.display = "none";
  answerBoxs.forEach((box) => {
    box.style.display = "flex";
    box.classList.remove("correct");
    box.classList.remove("incorrect");
  });
}
function showScore() {
  question.style.display = "none";
  submitButton.style.display = "none";
  reloadButton.style.display = "block";
  answerBoxs.forEach((box) => {
    box.style.display = "none";
  });
  scoreContainer.style.display = "block";
  if (score > quizData.length / 2) {
    scoreText.innerHTML = `Congratulation <br> Your score is ${score} / ${quizData.length}`;
    scoreText.style.color = "var(--dark-green)";
    scoreImg.src = "images/winner.gif";
    scoreImg.alt = "winner";
  } else {
    scoreText.innerHTML = `Try again <br> Your score is ${score} / ${quizData.length}`;
    scoreText.style.color = "var(--dark-red)";
    scoreImg.src = "images/game over.gif";
    scoreImg.alt = "Game Over";
  }
}
// submit button
submitButton.addEventListener("click", () => {
  answerBoxs.forEach((box) => {
    box.style.pointerEvents = "none";
  });
  checkAnswer();
  setTimeout(() => {
    answerBoxs.forEach((box) => {
      box.style.pointerEvents = "auto";
    });
    if (questionNum < quizData.length - 1) {
      questionNum++;
      loadQuestion();
    } else {
      showScore();
    }
  }, 600);
});
//reload quiz
reloadButton.addEventListener("click", () => {
  resetQuiz();
});

loadQuestion();
