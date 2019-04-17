
var router = require('express').Router();
var Liste = require('../models/Liste');
var Task = require('../models/Task');





router.get('listes/new', (req, res)=> {
	Task.find({}).then(tasks => {
		var liste = new Liste();
		res.render('listes/edit.html', {liste: liste , tasks: tasks, endpoint: '/'});
		})
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



router.post('/:id?', (req, res) => {
	new Promise((resolve, reject) => {
		if(req.params.id){
			Liste.findById(req.params.id).then(resolve, reject);
		}
		else{
			resolve(new Liste())
		}
	}).then(liste => {
		liste.name = req.body.name;
		liste.number = req.body.number;
		liste.description = req.body.description;
		liste.tasks = req.body.tasks;

		return liste.save();
	}).then(() => {
		res.redirect('/');
	});
});


module.exports = router;