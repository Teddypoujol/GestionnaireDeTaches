var mongoose = require('mongoose');

var listeSchema = new mongoose.Schema({
    name: String,
    description: String,
    tasks: [
        {
        champs: String
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