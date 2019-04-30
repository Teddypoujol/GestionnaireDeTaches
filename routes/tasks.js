var router = require('express').Router();


router.get('tasks/:task', (req, res) => {
    Task.findOne( {name: req.params.task}).populate("listes").then(task => {
        if(!task) return res.status(404).send("Le type n'existe pas ! attention aux majuscules")
        res.render("tasks/show.html",{
            task: task,
            listes: task.listes
        });
            

    });
});

module.exports = router;