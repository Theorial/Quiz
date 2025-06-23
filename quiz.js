const questions = [
  { question: "What is the capital of France?", answers: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
  { question: "What is 5 + 7?", answers: ["10", "11", "12", "13"], correct: 2 },
  { question: "Which is a JavaScript framework?", answers: ["Laravel", "React", "Django", "Rails"], correct: 1 },
  { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 },
  { question: "Who wrote 'Hamlet'?", answers: ["Shakespeare", "Hemingway", "Fitzgerald", "Orwell"], correct: 0 },
  { question: "Which gas do plants absorb?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
  { question: "What is the boiling point of water?", answers: ["100°C", "90°C", "80°C", "70°C"], correct: 0 },
  { question: "What is the capital of Japan?", answers: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"], correct: 1 },
  { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: 2 },
  { question: "Which is not a primary color?", answers: ["Red", "Blue", "Green", "Yellow"], correct: 2 },
  { question: "What is the currency of USA?", answers: ["Euro", "Dollar", "Pound", "Peso"], correct: 1 },
  { question: "Which animal is known as King of the Jungle?", answers: ["Tiger", "Lion", "Elephant", "Bear"], correct: 1 },
  { question: "What’s the largest ocean?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
  { question: "Which language has the most native speakers?", answers: ["English", "Mandarin", "Spanish", "Hindi"], correct: 1 },
  { question: "Which organ pumps blood?", answers: ["Liver", "Lung", "Heart", "Brain"], correct: 2 },
  { question: "Who painted the Mona Lisa?", answers: ["Van Gogh", "Michelangelo", "Da Vinci", "Picasso"], correct: 2 },
  { question: "Which is the smallest prime number?", answers: ["0", "1", "2", "3"], correct: 2 },
  { question: "Which browser is developed by Google?", answers: ["Safari", "Edge", "Firefox", "Chrome"], correct: 3 },
  { question: "In which year did WW2 end?", answers: ["1945", "1944", "1946", "1939"], correct: 0 },
  { question: "Which element has the symbol O?", answers: ["Gold", "Oxygen", "Silver", "Iron"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next-btn");

function showQuestion() {
  let q = questions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
  answerBtns.forEach((btn, i) => {
    btn.textContent = q.answers[i];
    btn.onclick = () => selectAnswer(i);
  });
  nextBtn.style.display = "none";
}

function selectAnswer(index) {
  let correct = questions[currentQuestion].correct;
  if (index === correct) score++;

  answerBtns.forEach((btn, i) => {
    btn.style.backgroundColor = i === correct ? "green" : i === index ? "red" : "#333";
    btn.disabled = true;
  });
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    resetState();
    showQuestion();
  } else {
    showResult();
  }
});

function resetState() {
  answerBtns.forEach((btn) => {
    btn.disabled = false;
    btn.style.backgroundColor = "#333";
  });
  nextBtn.style.display = "none";
}

function showResult() {
  questionEl.textContent = `Quiz finished! Your score is ${score} out of ${questions.length}.`;
  answerBtns.forEach(btn => btn.style.display = "none");
  nextBtn.style.display = "none";
}

showQuestion();
