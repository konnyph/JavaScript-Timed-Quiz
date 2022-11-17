var quizBody = document.getElementById("quiz");

var resultsEl = document.getElementById("result");

var finalScoreEl = document.getElementById("finalScore");

var gameoverDiv = document.getElementById("gameover");

var questionsEl = document.getElementById("questions");

var quizTimer = document.getElementById("timer");

var startQuizButton = document.getElementById("startbtn");

var startQuizDiv = document.getElementById("startpage");

var highscoreContainer = document.getElementById("highscoreContainer");

var highscoreDiv = document.getElementById("high-scorePage");

var highscoreInputName = document.getElementById("initials");

var highscoreDisplayName = document.getElementById("highscore-initials");

var endGameBtns = document.getElementById("endGameBtns");

var submitScoreBtn = document.getElementById("submitScore");

var highscoreDisplayScore = document.getElementById("highscore-score");

var buttonA = document.getElementById("a");

var buttonB = document.getElementById("b");

var buttonC = document.getElementById("c");

var buttonD = document.getElementById("d");


var quizQuestions = [{

question: "How many elements can you apply an 'ID' attribute to?",

choiceA: "As many as you want",

choiceB: "3",

choiceC: "1",

choiceD: "128",

correctAnswer: "c"},

{

question: "What does DOM stand for?",

choiceA: "Document Object Model",

choiceB: "Display Object Management",

choiceC: "Digital Ordinance Model",

choiceD: "Desktop Oriented Mode",

correctAnswer: "a"},

{

question: "What is used primarily to add styling to a web page?",

choiceA: "HTML",

choiceB: "CSS",

choiceC: "Python",

choiceD: "React.js",

correctAnswer: "b"},

{

question: "What HTML tags are JavaScript code wrapped in?",

choiceA: "&lt;div&gt;",

choiceB: "&lt;link&gt;",

choiceC: "&lt;head&gt;",

choiceD: "&lt;script&gt;",

correctAnswer: "d"},

{

question: "When is localStorage data cleared?",

choiceA: "No expiration time",

choiceB: "On page reload",

choiceC: "On browser close",

choiceD: "On computer restart",

correctAnswer: "a"},

{

question: "What does WWW stand for?",

choiceA: "Web World Workings",

choiceB: "Weak Winter Wind",

choiceC: "World Wide Web",

choiceD: "Wendy Wants Waffles",

correctAnswer: "c"},

{

question: "What HTML attribute references an external JavaScript file?",

choiceA: "href",

choiceB: "src",

choiceC: "class",

choiceD: "index",

correctAnswer: "b"},

];


var finalQuestionIndex = quizQuestions.length;

var currentQuestionIndex = 0;

var timeLeft = 76;

var timerInterval;

var score = 0;

var correct;

function generateQuizQuestion(){

gameoverDiv.style.display = "none";

if (currentQuestionIndex === finalQuestionIndex){

return showScore();

}

var currentQuestion = quizQuestions[currentQuestionIndex];

questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";

buttonA.innerHTML = currentQuestion.choiceA;

buttonB.innerHTML = currentQuestion.choiceB;

buttonC.innerHTML = currentQuestion.choiceC;

buttonD.innerHTML = currentQuestion.choiceD;

};

function startQuiz(){

gameoverDiv.style.display = "none";

startQuizDiv.style.display = "none";

generateQuizQuestion();

//Timer

timerInterval = setInterval(function() {

timeLeft--;

quizTimer.textContent = "Time left: " + timeLeft;

if(timeLeft === 0) {

clearInterval(timerInterval);

showScore();

}

}, 1000);

quizBody.style.display = "block";

}


function showScore(){

quizBody.style.display = "none"

gameoverDiv.style.display = "flex";

clearInterval(timerInterval);

highscoreInputName.value = "";

finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";

}


submitScoreBtn.addEventListener("click", function highscore(){

if(highscoreInputName.value === "") {

alert("Initials cannot be blank");

return false;

}else{

var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

var currentUser = highscoreInputName.value.trim();

var currentHighscore = {

name : currentUser,

score : score

};

gameoverDiv.style.display = "none";

highscoreContainer.style.display = "flex";

highscoreDiv.style.display = "block";

endGameBtns.style.display = "flex";

savedHighscores.push(currentHighscore);

localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));

generateHighscores();

}

});

function generateHighscores(){

highscoreDisplayName.innerHTML = "";

highscoreDisplayScore.innerHTML = "";

var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

for (i=0; i<highscores.length; i++){

var newNameSpan = document.createElement("li");

var newScoreSpan = document.createElement("li");

newNameSpan.textContent = highscores[i].name;

newScoreSpan.textContent = highscores[i].score;

highscoreDisplayName.appendChild(newNameSpan);

highscoreDisplayScore.appendChild(newScoreSpan);

}

}

function showHighscore(){

startQuizDiv.style.display = "none"

gameoverDiv.style.display = "none";

highscoreContainer.style.display = "flex";

highscoreDiv.style.display = "block";

endGameBtns.style.display = "flex";

generateHighscores();

}

function clearScore(){

window.localStorage.clear();

highscoreDisplayName.textContent = "";

highscoreDisplayScore.textContent = "";

}

function replayQuiz(){

highscoreContainer.style.display = "none";

gameoverDiv.style.display = "none";

startQuizDiv.style.display = "flex";

timeLeft = 76;

score = 0;

currentQuestionIndex = 0;

}

function checkAnswer(answer){

correct = quizQuestions[currentQuestionIndex].correctAnswer;

if (answer === correct && currentQuestionIndex !== finalQuestionIndex){

score++;

alert("That Is Correct!");

currentQuestionIndex++;

generateQuizQuestion();

//display in the results div that the answer is correct.

}else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){

alert("That Is Incorrect.")

currentQuestionIndex++;

generateQuizQuestion();

//display in the results div that the answer is wrong.

}else{

showScore();

}

}

startQuizButton.addEventListener("click",startQuiz);

