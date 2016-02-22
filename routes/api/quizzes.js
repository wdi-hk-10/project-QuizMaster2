var Joi    = require('joi');
var Bcrypt = require('bcrypt');
var Authenticated = require('../modules/authenticated');

exports.register = function(server, options, next) {
  server.route([
    { // Create a new quiz
      method: 'POST',
      path: '/api/quizzes',
      config: {
        handler: function(request, reply) {
          Authenticated(request, function (result) {
            if (result.authenticated) {
              var db = request.server.plugins['hapi-mongodb'].db;
              var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
              var newQuiz = request.payload;
              var quizLength = newQuiz.quizLength;
              var quizInfo = {
                'user_id': ObjectID(result.user_id),
                'name': newQuiz.quizName,
                'topic': newQuiz.quizTopic
              };

              db.collection('quizzes').insert(quizInfo, function(err, createdQuiz){
                if (err) { return reply('Internal MongoDB error', err).code(400); }

                var quiz = createdQuiz.ops[0];
                var questionSet = [];
                for (i=0; i < quizLength; i++) {
                  var obj = {};
                  obj.question = newQuiz['questionSet[' + i + '][question]'];
                  obj.answer = newQuiz['questionSet[' + i + '][answer]'];
                  obj.dummy1 = newQuiz['questionSet[' + i + '][dummy1]'];
                  obj.dummy2 = newQuiz['questionSet[' + i + '][dummy2]'];
                  obj.url = newQuiz['questionSet[' + i + '][url]'];
                  obj.quiz_id = ObjectID(quiz._id);
                  questionSet.push(obj);
                }

                console.log(questionSet);
                db.collection('questions').insert(questionSet, function(err, set){
                  if (err) { return reply('Internal MongoDB error', err).code(400); }

                  console.log(set);
                  quiz['questionSet'] = set.ops;
                  reply(set).code(200);
                });
              });
            } else {
              return reply(result).code(400);
            }
          })
        }
      }
    }

    // {
    //   method: 'DELETE',
    //   path: '/api/quizzes',
    //   handler: function(request, reply) {
    //     var db = request.server.plugins['hapi-mongodb'].db;
    //     var session = request.yar.get('hapi_qm2_session'); // CHANGE-ME

    //     if (!session) {
    //       return reply({ "message": "Already logged out" }).code(400);
    //     }

    //     db.collection('sessions').remove({ "session_id": session.session_id }, function(err, doc) {
    //       if (err) { return reply('Internal MongoDB error', err).code(400); }

    //       reply(doc).code(200);
    //     });
    //   }
    // }
  ]);

  next();
};

exports.register.attributes = {
  name: 'quizzes-api',
  version: '0.0.1'
};