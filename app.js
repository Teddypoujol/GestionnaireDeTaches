var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyparser = require('body-parser');
var multer = require('multer');

var upload = multer({
  dest: __dirname  + '/uploads'
});

/*
const http = require('http');
const port=process.env.PORT || 3000
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');
});
*/





mongoose.connect('mongodb+srv://teddy:1234@cluster0-yvmym.mongodb.net/PolyTask', {useNewUrlParser: true } );

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://teddy:1234@cluster0-yvmym.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("SuperHerosApp").collection("SuperHeros");
  // perform actions on the collection object
  client.close();
});
*/
require('./models/User');
require('./models/Liste');
require('./models/Task');

var app = express();


app.use(bodyparser.urlencoded());
app.use(upload.single('file'));
app.use('/images', express.static(__dirname + '/images'));

app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/tasks',require('./routes/tasks'));
app.use('/',require('./routes/listes'));


app.use('/uploads', express.static(__dirname + '/uploads'));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});