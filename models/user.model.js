let mongoose = require('mongoose'); //to connect it to the database
let Schema = mongoose.Schema;

//then we need to create model for emails
let userSchema = new Schema({
    email: String,
    password: String
});
//Now we work with the front end part so we can delete the field id because we don't need it in this case.

//now we create a class (also called model), based on the schema
let User = mongoose.model('User', userSchema, 'users'); // is the name of the schema
//third argument is where all documents created by using this schema have to be stored


//to export the module and use it in other files of our project
module.exports = {User};