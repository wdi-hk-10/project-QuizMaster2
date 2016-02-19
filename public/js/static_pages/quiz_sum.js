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
    $('#subject1').prop("checked",false);
    $('#subject2').prop("checked",false);
    $('#subject3').prop("checked",false);
    $('#level1').prop("checked",false);
    $('#level2').prop("checked",false);
    $('#level3').prop("checked",false);
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