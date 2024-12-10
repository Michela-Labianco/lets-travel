//In the folder models, we will store the data on adding information to the database

let mongoose = require('mongoose'); //to connect it to the database
let Schema = mongoose.Schema;

//create a schema that will be used for every post (that's why we connected mongoose)
let postSchema = new Schema({
    id: String, //create another id so we can delete, update a post and so on
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String
});


//convert the schema into a class and then later on, based on this class, we're going to create documents.
let Post = mongoose.model('Post', postSchema, 'posts'); //postSchema is the name of the schema

//in node js has every file creates a module, and everything written inside of the module is only visible inside of it
//So if we want to use some variables or functions of this module outside of it we need to export them.
/* --> */ module.exports = {Post} //in the {} we add the javascript object, 
//the key name and the value name are the same so we just write it one time instead of Post : Post
//by writing Post we exported -> mongoose.model('Post', postSchema);
