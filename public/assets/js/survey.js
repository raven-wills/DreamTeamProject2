const questions = [
  {
    question: "Are you looking for an indoor or outdoor plant?",
    choices: ["Indoor", "Outdoor"]
  },
  {
    question: "Will your PotBuddy get a lot of sun?",
    choices: ["Yes", "No"]
  },
  {
    question: "How often can you water your PotBuddy?",
    choices: ["Once a week", "Once a month", "Once a year", "Never"]
  },
  {
    question: "How big would you like your PotBuddy?",
    choices: [
      "A foot or less",
      "A foot to three feet",
      "Three feet to six feet",
      "Very tall"
    ]
  },
  {
    question: "How long will you have your PotBuddy?",
    choices: ["Life", "Meh", "Buddy?"]
  },
  {
    question: "Will your PotBuddy freeze for more than a day?",
    choices: ["Yes", "No"]
  }
];

var currentQuestion = 0;

function showQuestions() {
  if (currentQuestion < questions.length) {
    $(".surveyQuestions").text(questions[currentQuestion].question);
    $("#ans1").text(questions[currentQuestion].choices[0]);
    $("#ans2").text(questions[currentQuestion].choices[1]);
    $("#ans3").text(questions[currentQuestion].choices[2]);
    $("#ans4").text(questions[currentQuestion].choices[3]);
  } else {
    console.log("SURE");
  }
}

function nextQuestion() {
  currentQuestion++;
  showQuestions();
}
