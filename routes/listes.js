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

				User.findOne({username: cookies.username}, function(err, response){
					if(err) return handleError(err);

					User.updateOne({username: cookies.username}, {$addToSet : {listes: liste._id}}, function(err){
						if(err) return handleError(err);
						res.status(200).send({Error: "Ajoutée"})
					});
				});
			});		

		}
		

});

router.post('/addTask', (req, res)=> {
	if(req.headers.cookie === undefined){
		res.status(500).send({error : "Merci de vous connecter."});
	} else {
		
		
		var cookies = req.headers.cookie;
		cookies = cookie.parse(cookies);
		cookies = JSON.parse(cookies.cookies);
		console.log(cookies);

		liste._id = req.body._id;
		tasks = req.body.tasks;
	
		liste.save(function(err){
			if(err) return handleError(err);

			User.findOne({list: cookies.list}, function(err, response){
				if(err) return handleError(err);

				User.updateOne({username: cookies.username}, {$addToSet : {listes: liste._id}}, function(err){
					if(err) return handleError(err);
					res.status(200).send({Error: "Ajoutée"})
				});
			});
		});		

	}
	

});





router.get('/get', (req, res)=> {
	if(req.headers.cookie === undefined){
		res.status(500).send({error : "Merci de vous connecter."});
	} else {			
		var cookies = req.headers.cookie;
		cookies = cookie.parse(cookies);
		cookies = JSON.parse(cookies.cookies);

		User.findOne({username: cookies.username}, function(err, response){
			console.log(response);
			if(err) return handleError(err);
			if(response){
				var query = {_id : {$in: response.listes}};
				Liste.find(query, function(err, liste){
					if(err) throw err;
					if(!liste){
						res.status(200).send({});
					} else {
						res.status(200).send(liste);
					}
				});
			} else {
				res.status(200).send({});
			}
	}
		)}
});


router.get('/getTask', (req, res)=> {
	if(req.headers.cookie === undefined){
		res.status(500).send({error : "Merci de vous connecter."});
	} else {			
		var cookies = req.headers.cookie;
		cookies = cookie.parse(cookies);
		cookies = JSON.parse(cookies.cookies);

		User.findOne({username: cookies.username}, function(err, response){
			console.log(response);
			if(err) return handleError(err);
			if(response){
				var query = {_id : {$in: response.listes}};
				Liste.find(query, function(err, liste){
					if(err) throw err;
					if(!liste){
						res.status(200).send({});
					} else {
						res.status(200).send(liste.tasks);
					}
				});
			} else {
				res.status(200).send({});
			}
	}
		)}
});

router.delete('/delete/:id', (req , res) => {
	if(req.headers.cookie === undefined){
		res.status(500).send({error : "Merci de vous connecter."});
	} else {			
		var cookies = req.headers.cookie;
		cookies = cookie.parse(cookies);
		cookies = JSON.parse(cookies.cookies);

		Liste.findOneAndRemove({_id:req.params.id}, function(err, response){
			if(err) return handleError(err);
			var change = {$pull: {listes: {$in: req.params.id}}};
			User.updateOne({username: cookies.username}, change, function(err,result){
				if(err) return handleError(err);
				res.status(200).send({Error : "Supprimée"});
			});
		});
	}
});

router.get('listes/:id', (req, res)=> {
	Liste.findById(req.params.id).populate('tasks').then(liste => {
		res.render('listes/show.html', {liste: liste});
	},
	err => res.status(500).send(err));
});



	





module.exports = router;