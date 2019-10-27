var QnA = [
    {
        question: {q:"This character was an only child."},
        answer: {a: "Rachel", b: "Joey", c: "Chandler", d:"Pheobe", answer: "Chandler"}
    }, 
    {
        question: {q:"Molly Ringwald was originally offered the role of this character."},
        answer: {a: "Monica", b: "Pheobe", c: "Rachel", d:"Janice", answer: "Monica"}
    }, 
    {
        question: {q:"This Character was last to join the group."},
        answer: {a: "Rachel", b: "Joey", c: "Chandler", d:"Pheobe", answer: "Joey"}
    }, 
    {
        question: {q:"This is the oldest character."},
        answer: {a: "Pheobe", b: "Joey", c: "Chandler", d:"Ross", answer: "Pheobe"}
    }, 
    {
        question: {q:"This character was the first to ever live in Monica's apartment."},
        answer: {a: "Joey", b: "Monica", c: "Ross", d:"Pheobe", answer: "Ross"}
    }, 
    {
        question: {q:"This friends cast member also starred in the film The Leprechaun."},
        answer: {a: "Joey", b: "Rachel", c: "Ross", d:"Pheobe", answer: "Rachel"}
    }, 

];

var gameStarted = false;
var correct;
var incorrect;
var currentQuestion;
var timesUp;
var userTimedOut = false;
var that;
var answerInterval = true;


$(document).ready(function(){

    $("#start-game").on("click", function(){
        that = this;

        //hides prompt for user to click to start and starts game.
        if(!gameStarted){
            startGame();
            newQuestion();
        }   
    });

    $(".selection").on("click", function(){
        if(answerInterval === true){
            answerInterval = false;
            resetTimeout();
            if ($(this).text() === currentQuestion.answer.answer){
                userCorrect();
            }else{
                userIncorrect();
            }
            updateScore();
            checkGameEnd();
            setTimeout(newQuestion,5000);
        }
    });


});

function startGame (){
    
    //resets score
    gameStarted = true;
    correct = 0;
    incorrect = 0;
    updateScore();
    $(that).attr("class", "hide");


}

function getQuestion (){
    var index = Math.floor(Math.random() * QnA.length);
    currentQuestion = QnA[index];
    $("#question-header").text(currentQuestion.question.q);
    QnA.splice(index, 1);

}

function popAnswers(){
    $(".optiona").text(currentQuestion.answer.a);
    $(".optionb").text(currentQuestion.answer.b);
    $(".optionc").text(currentQuestion.answer.c);
    $(".optiond").text(currentQuestion.answer.d);
    

}

function updateScore(){
    $(".correct").html(correct);
    $(".incorrect").html(incorrect);
}

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

function timedOut () {
    answerInterval= false;
    incorrect ++;
    updateScore();
    $("#question-header").text("Time's up! the correct answer is: " + currentQuestion.answer.answer);
    setTimeout(newQuestion,5000);

}

function startTimer (){
    timesUp = setTimeout(timedOut, 5000);

}

function resetTimeout (){
    clearTimeout(timesUp);
    userTimedout = false;
}

function newQuestion(){
    updateScore();
    getQuestion();
    popAnswers();
    startTimer ();
    checkGameEnd();
    answerInterval=true;
}

function userCorrect(){
    correct++;
    $("#question-header").text("You are correct!");

}

function userIncorrect(){
    incorrect++;
    $("#question-header").text("Wrong! the correct answer is: " + currentQuestion.answer.answer);

}

