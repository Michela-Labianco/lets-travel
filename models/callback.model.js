//back end part 

let mongoose = require('mongoose'); //to connect it to the database
let Schema = mongoose.Schema;

//then we need to create model for callback requests
let callbackRequestsSchema = new Schema({
    id: String, 
    phoneNumber: Number,
    date: Date
});

//now we create a class, based on the schema
let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestsSchema, 'callback-requests'); //callbackRequests is the name of the schema
//third argument is where all documents created by using this schema have to be stored


//to export
module.exports = {CallbackRequest};
