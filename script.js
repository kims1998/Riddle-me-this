var startBtn = document.querySelector("#start");
//This event listener allows the user to press the start button to initiate the quiz.
startBtn.addEventListener("click", startGame);
var restartBtn = document.querySelector("#restart");
var timeArea = document.querySelector("#time");
var view = document.querySelector("#view");

var timer = 0;
var stopTimer = false;
let finalScore = 0;
var questionQueue = [];
var currentQuestion = {};
//the question bank is a "const" in order for the array to not be easily manipulated
const questionBank = [
  {
    questionNumber: 0,
    question: "Which anime has an entertainment district?",
    answers: ["Jujistu Kaisen", "Demon Slayer", "One Piece", "Soul Eater"],
    correctAns: "Demon Slayer"
    },
  {
    questionNumber: 1,
    question: "Where does the term 'Devil Fruit' originate from?",
    answers: [
        "Food Wars",
        "Cowboy BeBop",
        "Chainsaw Man",
        "One Piece"],
    correctAns: "One Piece"
    },
  {
    questionNumber: 2,
    question: "Which anime is Hestia, the Greek Goddess of the hearth, come from?",
    answers: [
        "Is It wrong to Try to Pick Up girls in a Dungeon?",
        "Redo of Healer",
        "Bleach",
        "Naruto"],
    correctAns: "Is It wrong to Try to Pick Up girls in a Dungeon?"
    },
  {
    questionNumber: 3,
    question: "Where does the popular phrase, 'Nice Pitch..' come from?",
    answers: [
        "HunterXHunter",
        "Attack on Titan",
        "Jujistu Kaisen",
        "Case Closed"],
    correctAns: "Jujistu Kaisen",
    },
  {
    questionNumber: 4,
    question: "Finish the sentence: ____ __ _______ __ ____, Eyes of heaven.",
    answers: [
        "Gojo No Gamberu Ta Keyori",
        "Yowaiymo ara baka ara eiye",
        "Jojo No Kimeyou Na Bouken",
        "Omae wa Mo Shinderu, NANI!"],
    correctAns: "Jojo No Kimeyou Na Bouken",
  }]

  //This function allows the questions to appear after the start button is clicked.
function initiateGameBoard() {
  //pull from questions array - display questions
  //pull answers from the same array + append each answer.
  let theAnswer = currentQuestion.answers;
  theAnswer = shuffleAnswers(theAnswer);

  let htmlTemplate = `
  <h2> ${currentQuestion.question}</h2>
  
    <button data-content = "${theAnswer[0]}" class="answerButton">A. ${theAnswer[0]}</button>
    <button data-content = "${theAnswer[1]}" class="answerButton">B. ${theAnswer[1]}</button>
    <button data-content = "${theAnswer[2]}" class="answerButton">C. ${theAnswer[2]}</button>
    <button data-content = "${theAnswer[3]}" class="answerButton">D. ${theAnswer[3]}</button>

  `;
  view.innerHTML = htmlTemplate
    ;
}

 //In the event that the user has the order of the questions and answers, this function swaps the order of everything.
 function shuffleAnswers(anArray) {
  for (let i = anArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    //swap array i and array j
    [anArray[i], anArray[j]] = [anArray[j], anArray[i]];
  }
  return anArray
    ;
}

//Once the user presses the start button, we want to remove the buttons from the screen, start the timer, and display the questions.
function startGame() {
stopTimer = false;
finalScore = 0;
timer = 0;
questionQueue = [];
currentQuestion = {};
hideBtn();
setGameTimer();
  for (let question of questionBank) {
    questionQueue.push(question)
  ;}  
  currentQuestion = questionQueue[0];
  initiateGameBoard();
  
}

//This sets the timer, along with lets the user know when time is up.
function setGameTimer() {
  timer = 60;
  let everySecond = setInterval(function () {
    timer--;
    timeArea.textContent = timer + ' seconds remaining!';
    if (timer <= 0 || stopTimer == true) {
      clearInterval(everySecond);
      timeArea.textContent = "Time's Up!";
      console.log(0);
      stopTimer = true;
      console.log("GAME OVER");
      finalScore = timer;
      view.innerHTML = `<h1>You're Done! Your score is: ${finalScore}</h1> Enter your name
      <label for="fname"></label><br>
      <input type="text" id="fname" name="fname"><br>
      <button class="submitName" type="Submit">Submit</button>
`;
    }
    //counts down by 1 sec which is 1000millisecond
  }, 1000)
    ;
}


//As the user clicks an answer, this event listener will let the user know in the console if they were right or wrong.
view.addEventListener("click", function (event) {
  let element = event.target;
  if (element.matches(".answerButton")) {
    console.log(element.dataset.content);
    //console.log(checkAnswer(element.dataset.content))
    //check if user enter is correct/incorrect
    //if user corrects the right answer:
    if (checkAnswer(element.dataset.content)) {
      //logic for the right answer
      console.log("CORRECT!")
    } else {
      console.log("WRONG!")
      //as the user get an answer incorrect, the time will reduce by 10.
      timer = timer - 10;
    }
    showNextQuestion();
  }

  //As the user continues through the questions, this function allows the user to see the next question.
  function showNextQuestion() {
    if (questionQueue.length > 1) {
      //remove the first question from questionQueue
      questionQueue.shift();
      //pass first element in line to the first question making it array[0].
      currentQuestion = questionQueue[0];
      initiateGameBoard();
    } else {
      stopTimer = true;
      console.log("GAME OVER");
      finalScore = timer;
      view.innerHTML = `<h3>You're Done! Your score is: ${finalScore}</h3> Enter your name
      <label for="fname"></label><br>
      <input type="text" id="fname" name="fname"><br>
      <button class="submitName" type="Submit">Submit</button>
`;
    }
  }

  //This function acts as the teacher and ensures the answer to the question is correct.
  function checkAnswer(userInput) {
    if (userInput == currentQuestion.correctAns) {
      return true;
    } else {
      return false;
    }
  }

  //This portion allows the user to input their name, this will display their name and final score.
  if (element.matches(".submitName")) {
    var userID = document.querySelector("#fname").value;
    console.log(userID);
    //userRecord is the array that will display the userID & finalScore.
    let userRecord = [userID, finalScore];
    // Checks if there is a "key"/data of "Records" then it will return that data
    // If NOT, it will return an empty array
    // "Records" is a key value, the array is the value, this displays in the application section of the inspect element.
    let localRecords = JSON.parse(localStorage.getItem("Records")) || [];
    // Push the new player into the local Records array
    localRecords.push(userRecord);
    // Store it back into local storage
    localStorage.setItem("Records", JSON.stringify(localRecords));
    displayScores()
      ;
  }

  //This portion will help reset all the questions, variables, and queue.
if (element.matches(".goBackButton")) {
  view.innerHTML = "";
  unHideBtn();
  refresh()
    ;
}
});


  //After the game is over, everything needs to be reset in order for everything to start from the beginning
  function refresh() {
    stopTimer = false;
    finalScore = 0;
    timer = 0;
    questionQueue = [];
    currentQuestion = {}
      ;
  }

  //This displays the High Scores, if user checks the application in the inspect element, they will be able to see the key and value
  function displayScores() {
    let getHighScoresBack = JSON.parse(localStorage.getItem("Records")) || [];
    //compare the scores, score is the 2nd value of user array and
    //structure returned is an array within an array.
    getHighScoresBack.sort(function (a, b) {
      return b[1] - a[1]
        ;
    })

    //gets array back
    console.log(getHighScoresBack);
    let htmlTemplate = "<h1>High Scores</h1>";
    for (let player of getHighScoresBack) {
      htmlTemplate += `<p>${player[0]} Score ${player[1]}</p>`
        ;
    }

    htmlTemplate += `<button class="goBackButton">Go Back</button>`;
    view.innerHTML = htmlTemplate
      ;
  }

  //This function hides the buttons when the function is called.
  function hideBtn() {
    restartBtn.style.display = "none";
    startBtn.style.display = "none";
}

  //this is the actual function that will display the start/restart/high score buttons.
  function unHideBtn() {
    startBtn.style.display = "block";
    restartBtn.style.display = "block";
      ;
  }