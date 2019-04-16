var mongoose = require('mongoose');

var listeSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    tasks: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
    ]

});

listeSchema.virtual('users',{
    ref:'User',
    localField:'_id',
    foreignField: 'listes'
});




var Liste = mongoose.model('Liste',listeSchema);

module.exports = Liste;