const questions = [
  {
    question: "Quel geste simple aide à réduire la pollution numérique ?",
    answers: [
      { text: "Laisser tous ses mails stockés indéfiniment", correct: false },
      { text: "Supprimer les anciens mails et pièces jointes inutiles", correct: true },
      { text: "Augmenter la taille de ses fichiers", correct: false }
    ]
  },
  {
    question: "Quelle activité numérique consomme le plus d'énergie ?",
    answers: [
      { text: "Lire un article de blog", correct: false },
      { text: "Envoyer un SMS", correct: false },
      { text: "Regarder une vidéo en streaming en 4K", correct: true }
    ]
  },
  {
    question: "Quelle bonne pratique permet d’économiser de l’énergie sur son ordinateur ?",
    answers: [
      { text: "Fermer les onglets inutiles", correct: true },
      { text: "Mettre des vidéos en fond en boucle", correct: false },
      { text: "Utiliser un économiseur d’écran animé", correct: false }
    ]
  },
  {
    question: "Quel moteur de recherche plante des arbres pour chaque recherche effectuée ?",
    answers: [
      { text: "Qwant", correct: false },
      { text: "Ecosia", correct: true },
      { text: "Bing", correct: false }
    ]
  },
  {
    question: "Quel appareil numérique a l’empreinte carbone la plus élevée à la fabrication ?",
    answers: [
      { text: "Une souris", correct: false },
      { text: "Un smartphone", correct: false },
      { text: "Un ordinateur portable", correct: true }
    ]
  },
  {
    question: "Quelle est la meilleure façon de stocker ses fichiers de manière écologique ?",
    answers: [
      { text: "Les dupliquer dans plusieurs clouds", correct: false },
      { text: "Les archiver localement et trier régulièrement", correct: true },
      { text: "Ne jamais rien supprimer", correct: false }
    ]
  },
  {
    question: "Quelle est la conséquence écologique des data centers ?",
    answers: [
      { text: "Ils émettent du CO₂ à cause de leur refroidissement", correct: true },
      { text: "Ils produisent de l’eau potable", correct: false },
      { text: "Ils absorbent les ondes solaires", correct: false }
    ]
  },
  {
    question: "Comment réduire l’impact de l’envoi d’un e-mail ?",
    answers: [
      { text: "Envoyer les mails à plusieurs destinataires à chaque fois", correct: false },
      { text: "Joindre systématiquement des pièces jointes lourdes", correct: false },
      { text: "Éviter les pièces jointes inutiles et alléger le contenu", correct: true }
    ]
  },
  {
    question: "Quel comportement est le plus respectueux de l’environnement numérique ?",
    answers: [
      { text: "Garder son appareil plusieurs années", correct: true },
      { text: "Acheter le dernier modèle tous les ans", correct: false },
      { text: "Avoir un appareil pour chaque tâche", correct: false }
    ]
  },
  {
    question: "Quelle IA a le plus d’impact écologique ?",
    answers: [
      { text: "Une IA utilisée sur un téléphone", correct: false },
      { text: "Une IA nécessitant un entraînement massif sur des serveurs", correct: true },
      { text: "Une IA de reconnaissance vocale hors ligne", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreSpan = document.getElementById("score");

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
}

function resetState() {
  nextButton.classList.add("hidden");
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";
  if (correct) score++;
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#66bb6a";
    } else {
      button.style.backgroundColor = "#ef5350";
    }
    button.disabled = true;
  });
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
  scoreSpan.innerText = score;
}

startQuiz();
