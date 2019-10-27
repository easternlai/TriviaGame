# TriviaGame

##Tecnologies Used

1. HTML
2. CSS
3. Github
4. visual studio code
5. Git Bash
6. JQuery
7. JavaScript 
8. Bootstrap


Code Sample

```

$(".selection").on("click", function(){
    that = this;

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
```