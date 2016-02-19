var Authenticated = require("./modules/Authenticated.js");

exports.register = function (server, options, next) {
  server.route([
    {
      method: "GET",
      path: '/quiz_make',
      handler: function (request, reply) {
        Authenticated(request, function(result){
          if (result.authenticated) {
            reply.view('quizzes/quiz_make.html', result);
          } else {
            reply.redirect('/signin');
          }
        });
      }
    },
    {
      method: "GET",
      path: '/quiz_take',
      handler: function (request, reply) {
        Authenticated(request, function(result){
          if (result.authenticated) {
            reply.view('quizzes/quiz_take.html', result);
          } else {
            reply.redirect('/signin');
          }
        });
      }
    }

  ]);

  next();
};

exports.register.attributes = {
  name: 'quizzes-views',
  version: '0.0.1'
};
