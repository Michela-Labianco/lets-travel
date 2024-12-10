//In this file, we're going to store all routes to work with Posts

let uniqid = require('uniqid');

//to make the routes work, we need to paste here these lines in which we connected the packages
let Post = require('../models/post.model').Post; //third step is to specify the correct path 
// .. because we need to go out of the folder routes and find the folder models


//the server runs the only file, which is the app.js file, so how to make it so that when the user makes the get request
//for example, on the route path /Post/post, the post or posts.route.js file is opened and this route is executed:
let express = require('express'); //first step we connect express 
let router = express.Router(); //second step is to create a variable and assign express.Router to it. Express has a special object called Router()
//So by writing this, we assign this special object Router to the variable router 
//with the help of this object we can redirect requests from one file to another
//we need to change the word app to router


//middleware function
let authMiddleware = require('../middleware/auth');


//!*! And that's why here we need to delete, /posts and leave only slash
router.get('/', async(request, response) => { //async before the function
    //we need to create two commands: The first is to receive post and the second is to send these posts to the client.
    let posts = await Post.find();  //to get the posts --> the process of finding all post is an asynchronous process (so we use async await)
    //Post that we imported  --> let Post = require('./models/post.model').Post;
    response.send(posts); //sending the posts to the client
}); //done with the back end part here, 
//--> for the front end part check main.js in the admin folder


//check update-post.js
router.get('/:id', async(request, response) => {
    let id = request.params.id; //to read this id number
    let post = await Post.findOne({id:id}); //function findOne because we have only one post for each ID number 
    //in the ({}) we add that the criterion for the search
    response.send(post); //Then we return this post
}); //next we call the fetch() -> update-post.js

//create-post.js
//to add/ create another post
//we create another route for the post request --> the request is done on a root path /posts
router.post('/', authMiddleware, async(request, response) => { //data is sent to json format so we convert it to the json format ***
    let requestBody = request.body; //here we take information from the body of the Post's request
    let imgPath; //created a variable
    if(requestBody.imageURL){
        imgPath = requestBody.imageURL; // if it is not empty, we have to set request body.imageURL
    } else {
        //Otherwise, we need to set the path to the file just uploaded to the folder images.
        imgPath = request.file.path.substring(request.file.path.indexOf('/'), request.file.path.length);  //***********
        //Started from a request.file.path.indexof and up to the length of a row, including
    }
    let newPost = new Post({ 
        id: uniqid(),
        title: requestBody.title,
        date: new Date(), // generated automatically
        description: requestBody.description,
        text: requestBody.text,
        country: requestBody.country,
        imageURL: imgPath //imgPath instead of requestBody.imageURL because we created a variable above
    })
    //when you inspect it in HTML code you get <img src="client-side/images/1 Berat.jpg">
    //that's why in the folder the server tries to find another folder called client-side, and only then the folder images and so on.
    //So for src, we should leave / images / name of file --> check if statement ***********
    await newPost.save(); //this is an asynchronous process --> so we use async await
    //console.log(request.file); //Because the file which we send to the server is not stored in request.body, but in request.file
    //That's why, instead of newPost, we need to write requests.file
    response.send('created!');
})

//we add a route for the delete request with the id of the post we want to delete
router.delete('/:id', authMiddleware, async (request, response) => { //And then the end of the route path, which is /:id, will be added from this line of code ***!
    let id = request.params.id; //to take the id of the post
    await Post.deleteOne({id: id}) // to delete the post by its id
    //And in the ({}) we add the id of the post = that the post with this ID will be deleted --> This is an asynchronous process
    response.send('Deleted..'); //when the post has been deleted, the message deleted gets displayed in the console
})
//back end part of deleting posts


//second route for getting data from the database
router.put('/:id', authMiddleware, async (request, response) => { // '/:id' means that we make to put request on the post with this ID number
    let id = request.params.id; //to read the id of the post
    await Post.updateOne({id: id}, request.body); //now we need to update the post ({2 arguments}) the id of the post and what we want to update (stored in request.body)
    response.send('Updated..');
}) //done with the back end part


//when the user makes a request to the root path /posts, the user has to be redirected to this route
//So to make this work, we have to connect this router to the app.js file and export router here and import it in the app.js file
module.exports = router; 


//authMiddleware FUNCTION
//All posts are displayed on the main page of the website, 
//so all users should have access to the posts and they should have rights to get posts by their ID, 
//but only admins are authorized to add, delete and update posts.