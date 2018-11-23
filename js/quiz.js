/*global $:false */
var counter = 0;
var id;
$(function(){
  
    $.ajax({
        method: "GET",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        success: function(data) {
            //var questions = data;
            var IDs = data.questions;
            var ids = new Array;
            //for (var i=0;i< IDs.length; i++){
            //    id = data.questions[i];   
            //    ids[i] = data.questions[i];
            //}
            data.questions.forEach(function(e){
                id = data.questions[i];   
                ids[i] = data.questions[i]
                console.log(e);
            })
            
            fillOut();
            //var selected = $('input:checked').val();
            $("#quiz").submit(function(e) {
                checkAnswer();
                e.preventDefault();
                nextQuestions();
                if (counter >= ids.length){
                    $("#quiz_question").html("");
                    results();
                }else{
                    id = ids[counter];
                    fillOut();    
                }
            })
        }
    })
}) 

function nextQuestions() {  
    counter++;
}

function fillOut() {
    $.ajax({
                method: "POST", url:"http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
                dataType: "json",
                data: {q: id},
                success: function(data) {
                   
                    //console.log(data); // logs question/answers
                    var question = data.text;
                    var questionA = data.choices.A;
                    var questionB = data.choices.B;
                    var questionC = data.choices.C;
                    var questionD = data.choices.D;
                    $('#quiz_question').html("");
                    $('#quiz_question').html(question);
                    $("label[for='answer_a']").html(questionA);
                    $("label[for='answer_b']").html(questionB);
                    $("label[for='answer_c']").html(questionC);
                    $("label[for='answer_d']").html(questionD);
                    
                }
    })
}

function checkAnswer() {
           $.ajax({
                method: "POST",
                url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
                dataType: "json",
                data: {q: id, a: $('input:checked').val()},
                success: function(response){
                    //console.log(response);
                    if (response.correct == true){
                        correct();
                        attempted();   
                        //console.log(response.correct)                           
                    }else {
                        incorrect();
                        attempted();           
                    }                
                }
            })
}

var numCorrect = 0;
var numIncorrect = 0;
var numAttempted = 0;

function correct(){
    numCorrect++;
    $('#correct').html("Correct: " + numCorrect);
}

function incorrect() {
    numIncorrect++;
    $('#incorrect').html("Incorrect: " + numIncorrect);
}

function attempted(){
    numAttempted++;
    $('#attempted').html("Attempted: " + numAttempted);
    
}

function results(){  
    var finalNum = numAttempted+1;
    $('.button').addClass("hidden");
    $('#answers').html("Your final score is " + numCorrect + " out of " + finalNum);
}
                        

