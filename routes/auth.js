exports.register = function (server, options, next) {
  server.route([
    {
      method: 'GET',
      path: '/signup',
      handler: function (request, reply) {
        reply.view('auth/signup');
      }
    },
    {
      method: 'GET',
      path: '/signin',
      handler: function (request, reply) {
        reply.view('auth/signin');
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'auth-views',
  version: '0.0.1'
};