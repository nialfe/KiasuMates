var tempExplain = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupta"
var questionSet = [
  {
    "question": "63.42 * 10 is the same as _________.",
    "complete": false,
    "correctAnswer": 4,
    "answers": [".6342", "6.342", "63.42", "634.2"]
  },
  {
    "question": "Find the value of 5 * 20 - (2 + 8) / 2.",
    "complete": false,
    "correctAnswer": 4,
    "answers": ["25", "45", "75", "95"]
  }, 
  {
    "question": "Express $40 as a percentage of $160.",
    "complete": false,
    "correctAnswer": 3,
    "answers": ["0.25%", "2.5%", "25%", "250%"]
  },
  {
    "question": "Find the quotient when 7.8 is divided by 100",
    "complete": false,
    "correctAnswer": 2,
    "answers": [".0078", ".078", ".78", "7.8"]
  },  
  {
    "question": "What is the value of digit '7' in 10.706?",
    "complete": false,
    "correctAnswer": 3,
    "answers": ["7 x 100", "7 x 10", "7 x 0.1", "7 x 0.01"]
  },
  {
    "question": "How many eights are there in 2.25?",
    "complete": false,
    "correctAnswer": 1,
    "answers": ["9", "10", "14", "18"]
  },
  {
    "question": "Simplify 18 - 12 / 3 * 2.",
    "complete": false,
    "correctAnswer": 2,
    "answers": ["1", "10", "28", "4"]
  },
  {
    "question": "When a number is rounded off to the nearest tenth, the answer is 8.7.  Which of the following could be the number?",
    "complete": false,
    "correctAnswer": 4,
    "answers": ["8.64", "8.75", "8.649", "8.651"]
  },
  {
    "question": "I spent 20% of my money. I had $20 left.  How much did I have at first?",
    "complete": false,
    "correctAnswer": 2,
    "answers": ["$16", "$25", "$40", "$100"]
  },
  {
    "question": "What percentage of 4 m is 30 cm?",
    "complete": false,
    "correctAnswer": 3,
    "answers": ["2.5%", "25%", "7.5%", "75%"]
  }
];

const TOTAL_QUESTIONS = 10;
var incorrectQuestions = 0;
var curQuestion = 0;
var questionNum = 1;

function main() {
  $("button[name='nextQ']").hide();
  $("#explain").hide();
  clearButtons();
  var index = pickQuestion();
  if (index == -1) {
    return;
  }
  populateHtml(index);
}

function clearButtons(){
  $('input[name="choice"]').prop('checked', false);
}

function pickQuestion() {
  var counter = 0
  do {
    index = Math.random();
    index = Math.floor(index * 10);
    console.log("random generator ", index);
    counter++;
  } while (questionSet[index].complete && counter < 10)
  if (counter == 10) {
    console.log("DONE!");
    $("#query").hide();
    finish();
    return -1;
  }
  console.log("Question: ", questionSet[index].question);
  console.log("complete: ", questionSet[index].complete);
  console.log("correctAnswer: ", questionSet[index].correctAnswer);
  console.log("answers: ", questionSet[index].answers);
  questionSet[index].complete = true;
  curQuestion = index;
  return index; 
  // clear canvas?
}

function populateHtml(index) {
  console.log("populating HTML");
  $("#question").text(questionSet[index].question);
  $("#innerAnswerHeader").text("Question: " + questionNum);
  questionNum++;
  $("label[for=q1a]").text('  ' + questionSet[index].answers[0]);
  $("label[for=q1b]").text('  ' + questionSet[index].answers[1]);
  $("label[for=q1c]").text('  ' + questionSet[index].answers[2]);
  $("label[for=q1d]").text('  ' + questionSet[index].answers[3]);
}

function checkAnswer() {
  var answersIndex = parseInt($("input[name='choice']:checked").val());
  console.log(answersIndex);
  if (answersIndex == questionSet[curQuestion].correctAnswer){
    console.log("RIGHT ANSWER");
    //highlightGreen();
  } else{
    console.log("WRONG ANSWER");
    incorrectQuestions++;
    highlightRed(answersIndex);
    showExplanation();
  }
  showNextButton();
  // if incorrect answer highlightGreen
  // else highlightRed
  //  show correctanswer explanation
  // show next button
}

/*
function highlightGreen() {

}*/

function highlightRed(answersIndex) {
  answersIndex = parseInt(answersIndex);
  console.log("ANSWERS index " + answersIndex);
  $("#label" + answersIndex).attr("color", "#E74C3C");
}

function showExplanation() {
  $("#explain").text(tempExplain);
  $("#explain").show();
}

function showNextButton() {
  $("button[name='nextQ']").show();
}

function finish() {
  var correct= (TOTAL_QUESTIONS - incorrectQuestions);
  console.log("Correct " + correct);
  $("#score").text(correct + ' / ' + TOTAL_QUESTIONS);
  var comment;
  if (correct >= 7) {
    if (correct > 8) {
      comment = "Congrats! You passed! You should study some more for fun.";
    } else {
      comment = "Congrats! You passed! You should strengthen your weak areas now.";
    }
  } else {
    comment = "You make your own luck.  Keep at it!";
  }
  $("#comment").text(comment);
  $("#scoreboard").attr("style", "");

}

/*function timer() {

}
*/
