
$(document).ready(function(){

  // Global Variables
  var currentQ = 0;
  var subject = '';
  var level = '';
  var answerChoice = '';
  var rightAnswers = 0;
  var questionsAsked = 0;
  var questionsTried = 0;
  var questionsSkipped = 0;
  var scoreXer;
  var timer;
  var timeLeft = 60;
  var choices = [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]];
  var answerSelected = false;
  var playerStat = ""

  // Part 1

// Keep track of Time Limit

  function decreaseTime() {
    timeLeft--;
    $('#timeLeft').text(': ' + timeLeft + ' secs left');
    if (timeLeft < 1) {
      clearInterval(timer);
    }
  }

  // Part 2
  var loadQuestion= function() {
    var question = questions[currentQ];
    var choice = choices[Math.floor(Math.random() * 6)];
    $('#question').text(question.ask);
    $('#pick'+choice[0]).text(question.dummy1);
    $('#pick'+choice[1]).text(question.dummy2);
    $('#pick'+choice[2]).text(question.answer);
    $('#qpic').attr('src', question.image);
  }

// Take in answer choice
  $('.answers').on('click', function(){
    answerChoice = $(this).text();
    if (!answerSelected){
      questionsAsked ++;
      questionsTried ++;
      answerSelected = true;
      $('#answer-button').removeAttr("disabled");
    }
  });

// Skipping
  $('#skip').on('click', function(){
    questionsSkipped ++;
    questionsAsked ++;
    currentQ++;
    if (currentQ == questions.length || timeLeft<1) {
      $('#tally').show();
      $('#game').hide();
      chkStat();
      tallyScore();
      clearInterval(timer);
    } else {
      loadQuestion();
    }
    answerSelected = false;
    $('#answer-button').attr("disabled", true);
  });

// Check to see if answer is right or wrong
  $('#answer-button').on('click',function(){
    var question = questions[currentQ];
    if (answerChoice == question.answer) {
      rightAnswers ++;
      $('#scoreTot').text(' ' +rightAnswers);
    }
    currentQ++;
    if (currentQ == questions.length || timeLeft<1) {
      $('#tally').show();
      $('#game').hide();
      chkStat();
      tallyScore();
      clearInterval(timer);
    } else {
      loadQuestion();
    }
    answerSelected = false;
    $('#answer-button').attr("disabled", true);
  });

// Part 3

  var chkStat = function () {
    var pctTot = (rightAnswers/questionsAsked);
    if (pctTot < 0.2) {
        playerStat = "Dohh!";
        $('#statPic').attr("src","images/dohh.gif");
    } else if (pctTot >= 0.2 && pctTot < 0.5) {
        playerStat = "Slacker";
        $('#statPic').attr("src","images/slacker.gif");
    } else if (pctTot  >= 0.5 && pctTot < 0.7) {
        playerStat = "Average Joe";
        $('#statPic').attr("src","images/averagejoe.gif");
    } else if (pctTot >= 0.7 && pctTot < 0.9) {
        playerStat = "Egg Head";
        $('#statPic').attr("src","images/egghead.gif");
    } else if (pctTot >= 0.9) {
        playerStat = "Rock Star";
        $('#statPic').attr("src","images/rockstar.gif")
    }
  }

  var tallyScore = function () {
    $('#catLevel').text(subject+' ('+level+')');
    $('#qstTry').text(questionsTried);
    $('#qstSkp').text(questionsSkipped);
    $('#ansRgt').text(rightAnswers);
    $('#pctTry').text(((rightAnswers/questionsTried)*100).toFixed(1));
    $('.pctTot').each(function(index, elem) {
      $(elem).text(((rightAnswers/questionsAsked)*100).toFixed(1));
    });
    $('#totPts').text(rightAnswers*scoreXer);
    $('#chkStat').text(playerStat);
  }

// All global variables must be reset and the html cleared before next round starts

  $('#restart-button').on('click', function() {
    $('#timeLeft').text('');
    $('#scoreTot').text('');
    subject = '';
    level = '';
    currentQ = 0;
    answerChoice = '';
    rightAnswers = 0;
    questionsAsked = 0;
    questionsSkipped = 0;
    questionsTried = 0;
    $('#start').show();
    $('#tally').hide();
    timeLeft = 60;
    $('#timeLeft').text(': ' + timeLeft + ' secs left');
    loadQuestion();
    playerStat = "";
    $('#start-button').attr("disabled", true)
  });

});