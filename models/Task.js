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


var Task = mongoose.model('Task',taskSchema);

module.exports = Task;