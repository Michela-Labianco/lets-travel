//back end part 

let mongoose = require('mongoose'); //to connect it to the database
let Schema = mongoose.Schema;

//then we need to create model for emails
let emailSchema = new Schema({
    id: String, 
    email: String,
    name: String,
    text: String,
    date: Date
});

//now we create a class, based on the schema
let emailRequests = mongoose.model('emailRequests', emailSchema, 'emails'); // is the name of the schema
//third argument is where all documents created by using this schema have to be stored


//to export
module.exports = {emailRequests};