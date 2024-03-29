const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function () {
  console.log('LocalStrategy called');
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      function (email, password, done) {
        User.authenticate(email, password, function (err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          return done(null, user);
        });
      }
    )
  );
};
