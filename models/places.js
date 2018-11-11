var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create Schema 

var PlaceSchema = new Schema({
    imagePath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// module.exports = 
mongoose.model('places', PlaceSchema);