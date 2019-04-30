var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

mongoose.connect('mongodb+srv://teddy:1234@cluster0-yvmym.mongodb.net/PolyTask', {useNewUrlParser: true } );

require('./models/User');
require('./models/Liste');

var app = express();


app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

app.use(express.static(__dirname + '/public'));
app.use('/users',require('./routes/users'));
app.use('/listes',require('./routes/listes'));


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});