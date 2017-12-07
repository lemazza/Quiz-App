const actualQuiz = [{
  questionText : "What year did Settlers of Catan come out?",
  answerOptions : ["1988", "1990", "1995", "1997"],
  correctAnswer : "1995"
},{
  questionText : "Who designed Settlers of Catan?",
  answerOptions : ["Reiner Knizia", "Klaus Teuber", "Uwe Rosenberg", "Vlaada Chvatil"],
  correctAnswer : "Klaus Teuber"
},{
  questionText : "According to the rules, what are the names of the 5 resources?",
  answerOptions : ["Ore, Brick, Grain, Wool, Lumber", "Stone, Clay, Wheat, Sheep, Wood", "Rock, Brick, Hay, Pasture, Trees", "Iron, Clay, Farm, Lambs, Timber"],
  correctAnswer : "Ore, Brick, Grain, Wool, Lumber"
},{
  questionText : "What top prize in board gaming did Settlers of Catan win?",
  answerOptions : ["Palme d'Cardboard", "The Iron Meeple", "The Gamey", "Spiel des Jahres"],
  correctAnswer : "Spiel des Jahres"
},{
  questionText : "For what other games has the designer won board gaming's top prize?",
  answerOptions : ["Auf Achse, Heimlich & Co., El Grande", "Wacky Wacky West, Hoity Toity, Barbarossa", "Galopp, Lowenherz, Domaine", "Keltis, Modern Art, Ingenious"],
  correctAnswer : "Wacky Wacky West, Hoity Toity, Barbarossa"
},{
  questionText : "What piece may be moved if a 7 is rolled?",
  answerOptions : ["The Robber", "The Thief", "The Burglar", "The Stealer"],
  correctAnswer : "The Robber"
},{
  questionText : "Any settlement or city has to be at least this many spaces away from any other settlement or city:",
  answerOptions : ["2", "3", "4", "5"],
  correctAnswer : "2"
},{
  questionText : "In 2015 Settlers of Catan was rebranded for a global audience.  What is it now called?",
  answerOptions : ["Settlers", "Catan", "The game with the hexes", "Ticket to Ride"],
  correctAnswer : "Catan"
},{
  questionText : "Which of these is not an official expansion map or scenario?",
  answerOptions : ["Catan: Indiana and Ohio", "Catan Scenarios: Santa Claus", "Catan: Mariana Trench", "Catan Scenarios: Catanimals"],
  correctAnswer : "Catan: Mariana Trench"
}];


let userQuizLog = {
  currentScore : 0,
  responseArray : []
};

let qTracker = 1; 

function listFinalResults(questionArray, userArray) {
  console.log('displayFinalResults ran');
  //take the array of user responses compiled over the quiz and display them with the questions asked during the quiz
  for (i=0; i< questionArray.length; i++) {
    $('.quiz-results').append(`<li class="question">Question ${i+1}: ${questionArray[i].questionText}</li>`);
    if(userArray[i] === questionArray[i].correctAnswer) {
      $('.quiz-results').append(`<li class="user-answer right-answer">You chose: ${userArray[i]}.  <span class="feedback">That's Correct!</span></li>`);
  } else {
      $('.quiz-results').append(`<li class="user-answer wrong-answer">You chose: ${userArray[i]}.  <span class="feedback">That's Wrong</span></li>
                                  <li class="right-answer">The Correct Answer: ${questionArray[i].correctAnswer}</li>`);
    }
  }
}

function restartQuiz () {
  console.log("restartQuiz ran")
  $('.quiz-restarter').on('click', function(event) {
    console.log("restart button was clicked");
    location.reload();
  })
}


function displayFinalPage () {
  console.log('displayFinalPage ran');
    console.log('final results button was pushed');
    //reveal last page with results from the quiz, come up with flavor text for the score, list results
    $('.quiz-page').addClass('hidden');
    $('.results-page').removeClass('hidden');
    let flavorText = function() {
      switch (Math.floor(10*userQuizLog.currentScore/userQuizLog["responseArray"].length)) {
      case 10:
      return "Congratulations, you are a Lord of Catan!";
      break;
      case 9:
      return "Congratulations, you are a Knight of Catan!";
      break;
      case 8:
      return "Not too shabby, you are a Mayor of Catan!";
      break;
      case 6:
      case 7:
      return "You are a officially a Settler of Catan!"
      break;
      case 5:
      case 4:
      case 3:
      case 2:
      return "You are the Robber! Go live in the desert, Robber!";
      break;
      case 1:
      case 0:
      return "You are a sheep  of Catan.  Go forth and graze"
      break;
    };
  };
    console.log("flavor text is " + flavorText);
    $('.score-text').text(flavorText);

    listFinalResults(actualQuiz, userQuizLog.responseArray);
    restartQuiz();
}


function displayQuestion (array) {
  console.log('displayQuestion ran');
  //update question number, list possible answers, update question tracker and ready final result button if its the last question
  $(".question-text").text(array[qTracker-1].questionText);
  $('.js-question-number').text(`${qTracker}`);
  for (i = 0; i < array[qTracker-1].answerOptions.length; i++) {
    $('.question-options').append(
      `<input type="radio" id="Answer${i}" name="question" value="${array[qTracker-1].answerOptions[i]}"><label for="Answer${i}">${array[qTracker-1].answerOptions[i]}</label><br>`);
  }
  qTracker ++;
  if(qTracker > actualQuiz.length) {
    $('.next-question').text('View Final Results');
  };
  console.log("next question will be #" + qTracker);
}


function respondToUserSelection () {
  console.log('respondToUserSelection ran');
  // on click: if user right: display correct, update user score
  // on click: if user wrong: display correct and display wrong, update user score
  // either way reveal next question button, hide submit button
  $('#question-form').submit( function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("user submitted an answer")
    let userResponse = $('input[name="question"]:checked').val();
    let currentAnswer = actualQuiz[qTracker-2].correctAnswer;
    console.log('user selected: ' + userResponse);
    userQuizLog.responseArray.push(userResponse);
    console.log(userQuizLog.responseArray);
    $('input[type="submit"]').addClass('hidden');
    $('.next-question').removeClass('hidden');

      if(userResponse === currentAnswer) {
        console.log('correct choice');
        userQuizLog.currentScore ++;
        console.log("Current user score is " + userQuizLog.currentScore);
        $('.js-current-score').text(`${userQuizLog.currentScore}/${qTracker-1}`);
        $(`label:contains(${userResponse})`).addClass("right-answer").append('<span class="feedback">  Correct Answer!</span>');
      } else {
        console.log('wrong choice')
        console.log("Current user score is " + userQuizLog.currentScore);
        $('.js-current-score').text(`${userQuizLog.currentScore}/${qTracker-1}`);
        $(`label:contains(${userResponse})`).addClass("wrong-answer").append('<span class="feedback">  Wrong Answer!</span>');
        $(`label:contains("${currentAnswer}")`).addClass("right-answer").append('<span class="feedback">  This is the right one</span>');

      }
  })
}


function nextQuestion () {
  console.log('nextQuestion ran');
  // on next question button press: retrieve and display question and related answer options, update current question number, hide next question button
  $('.next-question').on('click', function(event) {
    console.log('next question button was pressed')
      $('.question-options').html("<legend class='question-text'></legend>");
      $('.next-question').addClass("hidden");
      if(qTracker <= actualQuiz.length) {
      displayQuestion(actualQuiz);
      $('input[type="submit"]').removeClass('hidden'); 
    } else {
      displayFinalPage();
    }
  })

}




function startQuiz () {
  console.log('startQuiz ran');
  // on start button press: hide start page, reveal quiz, assemble random quizlist, empty user record, nextQuestion
  $('#quiz-starter').on('click', function(event) {
    console.log('quiz-starter was clicked');
    $('.js-total-questions').text(actualQuiz.length);
    $('.first-page').addClass('hidden');
    $('.quiz-page').removeClass('hidden');
    displayQuestion(actualQuiz);
  })
}


function handleAllQuiz () {
  console.log('handleAllQuiz ran');
  startQuiz();
  nextQuestion();
  respondToUserSelection();
}

$(handleAllQuiz());