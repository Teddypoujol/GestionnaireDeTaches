var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://teddy:1234@cluster0-yvmym.mongodb.net/PolyTask', {useNewUrlParser: true } );

var ListModel = require('../models/Liste');
var TaskModel = require('../models/Task');
var UserModel = require('../models/User');


var query  = UserModel.where({ username: 'teddy' });
var listTeddy = [];
query.findOne(function (err, user) {
  if (err) return handleError(err);
  console.log("In findOne" + user);
  console.log("Bonjour je m'appelle : " + user.username);
  console.log("User listes : ");
  console.log(user.listes)

  console.log("User multiple  : ");
  var listTeddy = [];
  for (var list1 of user.listes) {
      console.log(list1)
    ListModel.findById(list1, function(err, liste){
        if (err) return handleError(err);
        console.log(liste);

      });
  };
  
  
});

