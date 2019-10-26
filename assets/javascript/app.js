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


$(document).ready(function(){

    $("#start-game").on("click", function(){

        //hides prompt for user to click to start and starts game.
        if(!gameStarted){
            $(this).attr("class", "hide");
            startGame();
            getQuestion();

        }   
    });

});

function startGame (){
    
    //resets score
    gameStarted = true;
    correct = 0;
    incorrect = 0;
    $(".correct").html(correct);
    $(".incorrect").html(incorrect);

    //get question


}

function getQuestion (){
    currentQuestion = QnA[Math.floor(Math.random() * QnA.length)];
    $("#question-header").text(currentQuestion.question.q);
}

function popAnswers(){
    $("optiona").text(currentQuestion.answer.a);


}