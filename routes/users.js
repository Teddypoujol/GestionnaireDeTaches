var router = require('express').Router();
var User = require('./../models/User');
var Liste = require('../models/Liste');



router.post('/register', function(req, res) {
  data = req.body;
  User.findOne({username: data.username},function(err, response){
    if(err) throw err;

    if(!response){
      var newUser = new User({
        username: data.username,
        password: data.password,
        listes : []
      });
      console.log(newUser);

      User.create(newUser,function(err){
        if (err) res.status(500).send(err);

        res.status(200).send({error: "Ajoutée"});

      });
    } else if (response.username == data.username) {
      res.status(500).send({error : "Un utilisateur avec ce pseudonyme existe déjà"});
    }
  });
});


router.post('/connect', function(req, res)  {
    // attempt to authenticate user
    data = req.body;
    
    User.getAuthenticated(data.username, data.password,  function(err, user, reason) {
    if (err)
      res.send(err);
    // login was successful if we have a    user
    if (user) {
      // handle login success
      res.send(user);
      return;
    }
    // otherwise we can determine why we failed
    var reasons = User.failedLogin;
    switch (reason) {
      case reasons.NOT_FOUND:
        res.status(404).send({error: 'Utilisateur non trouvé ou mot de passe incorrect'});
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

module.exports = router;