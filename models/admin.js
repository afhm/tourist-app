var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create Schema 

var AdminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// module.exports = 
mongoose.model('admins', AdminSchema); 