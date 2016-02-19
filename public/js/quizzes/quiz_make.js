$(document).ready (function() {

  function createQuestion (e) {
    e.preventDefault();

    var newAsk = $('input.question').val();
    var newAnswer = $('input.answer').val();
    var newDummy1 = $('input.dummy1').val();
    var newDummy2 = $('input.dummy2').val();
    var newUrl = $('input.url').val();

    console.log(newAsk, newAnswer, newDummy1, newDummy2, newUrl);

    if (newQuestion == '' || newAnswer == '' || newDummy1 == '' || newDummy2 == '') {
      alert('All fields except "url" must be populated to have valid question.');
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

    var newQuiz = $('input.quiz-name').val();
    var newTopic = $('input.quiz-topic').val();
    var questionSet = [];

  }

});