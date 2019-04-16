var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    name: String,
    color: {
        type : String,
        default: 'red'
    },
    description: String
});

taskSchema.virtual('listes',{
    ref:'Liste',
    localField:'_id',
    foreignField: 'tasks'
});


var tasks = mongoose.model('tasks',taskSchema);

module.exports = tasks;