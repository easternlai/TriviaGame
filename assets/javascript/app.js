var QnA = [
    {
        question: {q:"How Many sisters does Joey have?"},
        answer: {a: "Five", b: "Six", c: "Seven", d:"Eight", answer: "Seven"}
    }, 
    {
        question: {q:"The role of Monica Geller was originally offered to this actress?"},
        answer: {a: "Demi Moore", b: "Sarah Jessica Parkere", c: "Brooke Shields", d:"Molly Ringwald",answer: "Molly Ringwald"}
    }, 
    {
        question: {q:"What was the name of the self help book that the girls loved?"},
        answer: {a: "Be Your Own Cleansing Pool", b: "Be Your Own Person", c: "Be Your Own Lightning Bearer", d:"Be Your Own Windkeeper", answer: "Be Your Own Windkeeper"}
    }, 
    {
        question: {q:"Which character was the oldest?"},
        answer: {a: "Pheobe", b: "Joey", c: "Chandler", d:"Ross", answer: "Ross"}
    }, 
    {
        question: {q:"What is Chandler's job?"},
        answer: {a: "IT Procurement Manager", b: "Financial Systems Analyst", c: "Financial Planner", d:"Payroll Accountant", answer: "IT Procurement Manager"}
    }, 
    {
        question: {q:"Which friends cast member also starred in the film The Leprechaun?"},
        answer: {a: "Matt Leblanc", b: "Mathew Perry", c: "Jennifer Aniston", d:"Lisa Kudrow", answer: "Jennifer Aniston"}
    }, 
];

//tracks if game has been started.
var gameStarted = false;

//tracks users correct and incorrect guesses.
var correct;
var incorrect;

//points to one object in the array of questions (QnA).
var currentQuestion;

//used to reset if time is up for user's guess.
var timesUp;

//tracks if the user timed out on previous turn.
var userTimedOut = false;

//Used to hold "this"
var that;

//used to track if users click occurs during or not during a period where they should select an answer.
var answerInterval = true;

$(document).ready(function(){

    //starts game
    $("#start-game").on("click", function(){
        that = this;

        //hides prompt for user to click to start and starts game.
        if(!gameStarted){
            startGame();
            newQuestion();
        }   
    });

    //registers click of user selection
    $(".selection").on("click", function(){
        that = this;

        //prevents user from enter selection multiple times
        if(answerInterval === true){
            answerInterval = false;
            resetTimeout();
            if ($(this).text() === currentQuestion.answer.answer){
                userCorrect();
            }else{
                userIncorrect();
            }

            //fixed bug of user score not registering immediately after selection.
            updateScore();

            //fixed bug of user having to wait post answer timeout period.
            checkGameEnd();

            //calls new question and binds it to timeout period.
            setTimeout(newQuestion,5000);
        }
    });
});

//starts game and hides "Start Game" text after selecteed.  Only run once in program.
function startGame (){
    gameStarted = true;
    correct = 0;
    incorrect = 0;
    updateScore();
    $(that).attr("class", "hide");
}

//gets question and splices question out of array to prevent same question being asked twice.
function getQuestion (){
    var index = Math.floor(Math.random() * QnA.length);
    currentQuestion = QnA[index];
    $("#question-header").text(currentQuestion.question.q);
    QnA.splice(index, 1);
}

//populates answer selections.
function popAnswers(){
    $(".optiona").text(currentQuestion.answer.a);
    $(".optionb").text(currentQuestion.answer.b);
    $(".optionc").text(currentQuestion.answer.c);
    $(".optiond").text(currentQuestion.answer.d);
}

//updates scoreboard
function updateScore(){
    $(".correct").html(correct);
    $(".incorrect").html(incorrect);
}


//Checks if game is over
function checkGameEnd (){
    if(correct+incorrect === 5){
        if(correct > incorrect){
            $("#question-header").text("You Win!");
        }else{
            $("#question-header").text("You Lose!");
        }
        resetTimeout();
        $(".optiona").text("");
        $(".optionb").text("");
        $(".optionc").text("");
        $(".optiond").text("");
       }
}

//called when user is timed out of an answer. increments number of incorrect responses, updates the score, displays timeout message, and calls a new question with a new timeout.
function timedOut () {
    answerInterval= false;
    incorrect ++;
    updateScore();
    $("#question-header").text("Time's up! the correct answer is: " + currentQuestion.answer.answer);

    //fixed bug of timeout not working before making first selection.
    setTimeout(newQuestion,5000);
}

//used to put timer on each question.
function startTimer (){
    timesUp = setTimeout(timedOut, 5000);
}

//used to reset timeout and toggle userTimedout to false.
function resetTimeout (){
    clearTimeout(timesUp);
    userTimedout = false;
}

//triggers new question
function newQuestion(){

    //changes color of user selection to green or red based or correct and incorrect response.
    $(that).removeClass("selection-correct");
    $(that).removeClass("selection-incorrect");
    updateScore();
    getQuestion();
    popAnswers();
    startTimer ();
    checkGameEnd();

    //fixed bug of user being able to make multiple selections during same question.  
    answerInterval=true;
}

//used when user answers correctly
function userCorrect(){
    correct++;
    $("#question-header").text("You are correct!");
    $(that).addClass("selection-correct");
}

//used when user answers incorrectly
function userIncorrect(){
    incorrect++;
    $("#question-header").text("Wrong! the correct answer is: " + currentQuestion.answer.answer);
    $(that).addClass("selection-incorrect");
}

