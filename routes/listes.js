var User = require('./../models/User');
var router = require('express').Router();
var Liste = require('../models/Liste');
var cookie = require('cookie');



router.get('/',(req,res) => {
	res.render('listes/index.html');
});
  
 router.get('/#?list=:id', function(req, res) {
    res.render('listes/index.html');
});


router.post('/new', (req, res)=> {
		if(req.headers.cookie === undefined){
			res.status(500).send({error : "Merci de vous connecter."});
		} else {
			var liste = new Liste();
			
			var cookies = req.headers.cookie;
			cookies = cookie.parse(cookies);
			cookies = JSON.parse(cookies.cookies);
			console.log(cookies);

			liste.name = req.body.name;
			liste.description = req.body.description;
			liste.tasks = req.body.tasks;
		
			liste.save(function(err){
				if(err) return handleError(err);

				User.findOne({username: cookies.username}, function(err, res){
					if(err) return handleError(err);

					User.updateOne({username: cookies.username}, {$addToSet : {listes: liste._id}}, function(err){
						if(err) return handleError(err);
					});
				});
			});		

		}
		

});

router.get('listes/edit/:id', (req, res)=> {
	Task.find({}).then(tasks => {
		Liste.findById(req.params.id).then( liste => {
			res.render('listes/edit.html', {liste: liste, tasks: tasks, endpoint: '/' + liste._id.toString() });
		});
	});
});

router.get('listes/delete/:id', (req , res) => {
	Liste.findOneAndRemove({_id:req.params.id}).then(() => {
		 res.redirect('/');
	});
});

router.get('listes/:id', (req, res)=> {
	Liste.findById(req.params.id).populate('tasks').then(liste => {
		res.render('listes/show.html', {liste: liste});
	},
	err => res.status(500).send(err));
});





module.exports = router;