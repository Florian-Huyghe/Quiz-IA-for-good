const questions = [
  {
    question: "Quelle proportion de la nourriture produite dans le monde est gaspillée chaque année ?",
    answers: [
      { text: "5 %", correct: false },
      { text: "17 %", correct: false },
      { text: "33 %", correct: true }
    ]
  },
  {
    question: "Quel est le poste le plus concerné par le gaspillage alimentaire dans les pays développés ?",
    answers: [
      { text: "Les supermarchés", correct: false },
      { text: "Les restaurants", correct: false },
      { text: "Les foyers", correct: true }
    ]
  },
  {
    question: "Quelle est la différence entre la date de péremption et la date de durabilité minimale (DDM) ?",
    answers: [
      { text: "Aucune, elles signifient la même chose", correct: false },
      { text: "La DDM signifie que le produit est toujours consommable après la date", correct: true },
      { text: "La date de péremption est moins importante que la DDM", correct: false }
    ]
  },
  {
    question: "Quel aliment est souvent gaspillé à tort, bien qu'encore consommable après sa DDM ?",
    answers: [
      { text: "Le yaourt", correct: true },
      { text: "Le poisson", correct: false },
      { text: "La viande hachée", correct: false }
    ]
  },
  {
    question: "Que faire avec des fruits trop mûrs ?",
    answers: [
      { text: "Les jeter", correct: false },
      { text: "Les transformer en compote ou smoothie", correct: true },
      { text: "Les congeler directement sans traitement", correct: false }
    ]
  },
  {
    question: "Quelle astuce permet de réduire le gaspillage alimentaire ?",
    answers: [
      { text: "Acheter en vrac", correct: false },
      { text: "Planifier ses repas", correct: true },
      { text: "Aller faire ses courses sans liste", correct: false }
    ]
  },
  {
    question: "Quelle appli permet de sauver des invendus alimentaires près de chez soi ?",
    answers: [
      { text: "Too Good To Go", correct: true },
      { text: "Clean My Fridge", correct: false },
      { text: "Eat Later", correct: false }
    ]
  },
  {
    question: "Quelle action n’aide pas à limiter le gaspillage ?",
    answers: [
      { text: "Vérifier son frigo avant d’acheter", correct: false },
      { text: "Acheter en gros même sans besoin", correct: true },
      { text: "Conserver les restes pour le lendemain", correct: false }
    ]
  },
  {
    question: "En moyenne, combien de kilos de nourriture jette un Français chaque année ?",
    answers: [
      { text: "5 kg", correct: false },
      { text: "29 kg", correct: true },
      { text: "52 kg", correct: false }
    ]
  },
  {
    question: "Lequel de ces gestes est le plus efficace pour moins jeter ?",
    answers: [
      { text: "Trier les déchets", correct: false },
      { text: "Mieux conserver les aliments", correct: true },
      { text: "Utiliser des sacs en tissu", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreSpan = document.getElementById("score");
const questionImage = document.getElementById("question-image");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Suivant";
  scoreContainer.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionElement = document.createElement("h2");
  questionElement.innerText = currentQuestion.question;
  questionContainer.innerHTML = "";
  questionContainer.appendChild(questionElement);

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });

  const imageIndex = (currentQuestionIndex + 1).toString().padStart(2, '0');
  questionImage.src = `images/image${imageIndex}.jpg`;
  questionImage.classList.remove("hidden");
}

function resetState() {
  nextButton.classList.add("hidden");
  answerButtons.innerHTML = "";

  // Masquer l'image
  const feedbackImg = document.getElementById("feedback-image");
  feedbackImg.classList.add("hidden");
}


function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";
  if (correct) score++;

  // Affichage des couleurs
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#66bb6a";
    } else {
      button.style.backgroundColor = "#ef5350";
    }
    button.disabled = true;
  });

  // Affiche l'image
  const feedbackImg = document.getElementById("feedback-image");
  feedbackImg.classList.remove("hidden");

  nextButton.classList.remove("hidden");
}


nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionContainer.innerHTML = "";
  answerButtons.innerHTML = "";
  nextButton.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreSpan.innerText = `${score} / 10`;
}

startQuiz();
