$(document).ready (function() {

  function createQuestion (e) {
    e.preventDefault();

    var newAsk = $('input.question').val();
    var newAnswer = $('input.answer').val();
    var newDummy1 = $('input.dummy1').val();
    var newDummy2 = $('input.dummy2').val();
    var newUrl = $('input.url').val();

    console.log(newAsk, newAnswer, newDummy1, newDummy2, newUrl);

    if (newAsk == '' || newAnswer == '' || newDummy1 == '' || newDummy2 == '') {
      alert('All fields except "url" must be populated to make valid question.');
      return;
    }


    var newQuestion = ''+
      '<li>' +
        '<input name="question" type="text" value="' + newAsk + '">' +
        '<input name="answer" type="text" value="' + newAnswer + '">' +
        '<input name="dummy1" type="text" value="' + newDummy1 + '">' +
        '<input name="dummy2" type="text" value="' + newDummy2 + '">' +
        '<input name="url" type="text" value="' + newUrl + '">' +
        '<button class="delete-btn btn btn-danger">Delete</button>' +
      '</li>';

    this.reset();
    $('#question-list').prepend(newQuestion);

    $('.delete-btn').on('click', function () {
      $(this).parent().remove();
    });
  }

  $('#question-form').on('submit', createQuestion);

  function createQuiz (e) {
    e.preventDefault();

    var questionSet = [];
    var newQuiz = {
      'quizName':$('input.quiz-name').val(),
      'quizTopic':$('input.quiz-topic').val(),
      'questionSet':questionSet
    };
    var question = {};

    $('#question-list li').each(function (index, li) {
      //put each item into an object and append to questionSet array
      question = {'question':($(li).find('input:eq(0)').val()),
        'answer':($(li).find('input:eq(1)').val()),
        'dummy1':($(li).find('input:eq(2)').val()),
        'dummy2':($(li).find('input:eq(3)').val()),
        'url':($(li).find('input:eq(4)').val())
      }
      questionSet.push(question);
    });
    console.log(newQuiz);
  }

  $('#create-quiz').on('click', createQuiz);


});