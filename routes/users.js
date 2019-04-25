var router = require('express').Router();
var User = require('./../models/User');
var Liste = require('../models/Liste');
var Task = require('../models/Task');

router.get('/',(req,res) => {
  User.find({}).populate('users').then(users => {
    res.render('users/index.html', {users: users}) ;
  });
});



router.get('/newuser',(req,res) => {
  res.render('users/create.html') ;
});

router.post('/newUser', (req, res)=> {
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
          res.send(err);
        res.send();
      });
		
		})
});


router.post('/connect', function(req, res)  {
    // attempt to authenticate user
    
    data = req.body;
    
    
    User.getAuthenticated(data.username, data.password,  function(err, user, reason) {
    if (err)
      res.send(err);
    // login was successful if we have a user
    if (user) {
      // handle login success
      res.send(user);
      return;
    }
    // otherwise we can determine why we failed
    var reasons = User.failedLogin;
    switch (reason) {
      case reasons.NOT_FOUND:
        res.send('Utilisateur non trouvé ou mot de passe incorrect');
        return;
      case reasons.PASSWORD_INCORRECT:
        res.send('Utilisateur non trouvé ou mot de passe incorrect');
        return;
          // note: these cases are usually treated the same - don't tell
          // the user why the login failed, only that it did
          //break;
      case reasons.MAX_ATTEMPTS:
        res.send("Tu as atteints la limite d'essais de connexion");
        return;
          // send email or otherwise notify user that account is
          // temporarily locked
          //break;
    }
  });
});

router.get('/espace',(req,res) => {
    res.render('listes/index.html') ;

});

router.get('/confirmation',(req,res) => {
  res.render('users/index.html') ;

});
module.exports = router;