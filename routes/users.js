var router = require('express').Router();
var User = require('../models/User');
var Liste = require('../models/Liste');
var Task = require('../models/Task');

router.get('/',(req,res) => {
  User.find({}).populate('users').then(users => {
    res.render('users/index.html', {users: users}) ;
  });
});




