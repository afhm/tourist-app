var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create Schema 

var ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

// module.exports = 
mongoose.model('contacts', ContactSchema); 