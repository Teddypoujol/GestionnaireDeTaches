var router = require('express').Router();
var User = require('./../models/User');
var Liste = require('../models/Liste');
var Task = require('../models/Task');

router.get('/',(req,res) => {
  User.find({}).populate('users').then(users => {
    res.render('users/index.html', {users: users}) ;
  });
});

router.post('/new', (req, res)=> {
  data = req.body;
	User.find({}).then(users => {
    var newUser = new User({
      username: data.username,
      password: data.password,
      liste: data.liste
      });
    
      // save user to database
      newUser.save({}, function(err) {
        if (err)
          cb(err);
        cb();
      });
		res.render('authentification/create.html', {user: user, users: users, endpoint: '/'});
		})
});


router.get('/connect', (req, res)=> {
    // attempt to authenticate user
    User.getAuthenticated(data.username, data.password,  function(err, user, reason) {
    if (err)
      cb(null, err);
    // login was successful if we have a user
    if (user) {
      // handle login success
      cb(user, null);
      return;
    }
    // otherwise we can determine why we failed
    var reasons = User.failedLogin;
    switch (reason) {
      case reasons.NOT_FOUND:
        cb(null, 'Utilisateur non trouvé ou mot de passe incorrect');
        return;
      case reasons.PASSWORD_INCORRECT:
        cb(null, 'Utilisateur non trouvé ou mot de passe incorrect');
        return;
          // note: these cases are usually treated the same - don't tell
          // the user why the login failed, only that it did
          //break;
      case reasons.MAX_ATTEMPTS:
        cb(null, "Tu as atteints la limite d'essais de connexion");
        return;
          // send email or otherwise notify user that account is
          // temporarily locked
          //break;
    }
  });
  res.redirect('/layout.html');
		});


module.exports = router;