// =========================================
// variables
// =========================================

// questions //
var questions = [
   { question:"In full stack development, what does JS stand for? ",
   options: ["Java Script ","John Stockton ","Jazz Sax "],
   answer:"Java Script " },

   { question: "Which is the correct way to write a variable? ",
   options:[ "let = x+1 ","var i = 15 ", '"ho,ho,ho" '],
   answer:  "var i = 15 " },

   { question:"how do you log something on the console? ",
   options:["console.frog ","console.log ","log.console "],
   answer: "console.log "},

   {question:"Whis is a correct way to create a pop up window ",
   options:['alert ("hello"); ',"window(hello); ", "howdy (popup) "],
   answer:'alert ("hello"); '},

   {question: "The function math.floor... ",
   options:["explodes something far away ","rounds up ","Rounds down "],
   answer: "Rounds down "}
];

// trivia variables //

var index = 0;
var name;
// =========================================
// functions
// =========================================

// log name //
$("#button1").on("click", function startQuiz(){

var name = $("#enterName").val();
localStorage.setItem("name", name);


// start timer //
setTime();

function nextQuestion() {
   // clear card and produce questions //
 
  clear();

   $("#question").append(questions[index].question);

   for (i = 0; i < questions[index].options.length; i++) {
      
      $("#button"+(i+2)).attr("data", questions[index].options[i]).text(questions[index].options[i]);
   };
};

function compareAnswer(choice){

    // if no more questions, end quiz
   if(questions[index] == questions[4]) {
      endQuiz();
   }
   // if no time left, end quiz
   else if (secondsLeft<=0){
      endQuiz();
   }
   // if answer is correct, move on to next question
   else if (choice == questions[index].answer) {
      index++;
      nextQuestion();     
   }
   // else subtract 10 seconds and move to next question //
   else{
      index++;
      subtractTime(); 
      nextQuestion();
       
   };
}
// selects choice based on button clicked
$('.btn').on("click",function() {
      
   var choice = $(this).attr("data");

   compareAnswer(choice);
});

nextQuestion();
});
// 2 clear functions to set up next question/ end screen
function clear() {
   $("#main").empty();
   $("#question").empty();
   $(".btn").empty();
   $("#results").empty();
   $('#button1').addClass("hide")
   $('#button2, #button3, #button4').removeClass("hide", "clear");
}
function endClear(){
   $("#main").empty();
   $("#question").empty();
   $(".btn").empty();
   $('#button3, #button4, #button1, #button2').addClass("hide");
   $('#restart').append("Restart Quiz").removeClass("hide");
   $('#clear').append("Clear Scores").removeClass("hide");
}

function subtractTime(){
   secondsLeft -= 10;
}
// finish game a log score //

function endQuiz() {
   $(".time").remove();
   endClear();
   $("#results").append("HIGH SCORES");
  
   var scores = JSON.parse(window.localStorage.getItem("scores")) || [];
   var newScore = {
   score: secondsLeft,
   name: localStorage.name
 };
   scores.push(newScore);
   window.localStorage.setItem("scores", JSON.stringify(scores));
   
   var scores = JSON.parse(window.localStorage.getItem("scores")) || [];

   scores.sort(function(a,b) { return (b.score - a.score ) });

   scores.forEach(function(score) {
   
     var liTag = document.createElement("li");
     liTag.textContent = score.name + " - " + score.score;

     var olEl = document.getElementById("results");
     olEl.appendChild(liTag);
      });
   };
// clear and restart button functionality
$("#clear").on("click", function() {
   localStorage.clear();
   $("#results").empty();
});

$("#restart").on("click", function() {
   location.reload();
});
 
