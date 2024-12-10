//check posts.route.js

let express = require('express');
let app = express();
let mongoose = require('mongoose'); //to connect it to mongoose in the app.js file

// let Post = require('./models/post.model').Post; //to import what we exported in the post.model.js
//in () we specify the file path: The folder called models is next to the app.js file.
//So we had ./ which means the current folder /models /the name of the file
//We don't need to add .js at the end of the file name because the function called require() has the file extension automatically.
//we have imported the object, and that's why we want to use the class Post which is inside of this object.
// require('./models/post.model') we add . and the key name which is Post

let multer = require('multer'); //(to connect the package) --> to read the binary data, we need to use a package called multer

//to connect cookie-parses to the file
let cookieParser = require('cookie-parser');

let postsRouter = require('./routes/posts.route'); 
//here we imported router   !!!


//to connect routes
let callbackRequestsRouter = require('./routes/callback.route');

//to connect routes
let emailsRouter = require('./routes/emails.route');

let usersRouter = require('./routes/users.route');


//to connect Post from post.models.js
let Post = require('./models/post.model').Post;

//to check whether the token is the correct one or not, we need to call the function check token.
//so we connect the file
let auth = require('./controllers/auth');



//specified that we are going to use ejs
app.set('view engine', 'ejs'); //first argument -> we specify that we use the tool template engine


//to ensure that every post has a unique ID number, we're going to use a package called Unique ID
//let uniqid = require('uniqid');
//to use this package, we need to call the function uniqueID:
//console.log(uniqid()); //randomly generated every time the uniqueID function is called

//it's better not to display the ID number, but the order number of the post, like the number one, two, three and so on
//we still need the ID numbers because we are going to use them when we update or delete posts.


//to connect it to the database
mongoose.connect('mongodb+srv://michelalabianco1993:SfqiTvWEOckZwlCZ@mycluster.iko6f.mongodb.net/travels');
//mongoose.connect('mongodb://localhost/travels'); //travels is the name of the database
//create-post.js
app.use(express.json());//***


//to make it so that the name of a file doesn't change,
//Instead of the key dest, we use the key storage and as the value we need to set a so-called multer storage:
let imageStorage = multer.diskStorage({
    //path file
    destination: (request, file, callback) => callback(null, 'client-side/images'), //value -> arrow function with 3 arguments
    //we call the callback() function with 2 arguments:
    //first : in case of an error
    //where to store the image
    
    //how the name of the file has to be created
    filename: (request, file, callback) => callback(null, file.originalname) //every file has a key called originalname
});

//When the images are uploaded to the server, it has to be saved in the folder client-side and then in the folder images
//multer({}) -> in the {} we add a JavaScript object with some settings : (key)destination: (value)the path where to save the images
app.use(multer({storage : imageStorage}).single('imageFile')); 
//app.use(multer({dest : 'client-side/images'}).single('imageFile')); 
//.single and in the () we have to specify the name of the key has to be used for the file


//DON'T NEED IT ANYMORE because of let uniqid = require('uniqid');
//let id = 1; //we create a variable called ID with the initial value of 1 to get unique ID numbers for each post


// // **! instead we create a route so that the client could get posts from the server 
// //(--> the request is done on a root path /posts):
// app.get('/posts', async(request, response) => { //async before the function
//     //we need to create two commands: The first is to receive post and the second is to send these posts to the client.
//     let posts = await Post.find();  //to get the posts --> the process of finding all post is an asynchronous process (so we use async await)
//     //Post that we imported  --> let Post = require('./models/post.model').Post;
//     response.send(posts); //sending the posts to the client
// }); //done with the back end part here, 
// //--> for the front end part check main.js in the admin folder


// //create-post.js
// //we create another route for the post request --> the request is done on a root path /posts
// app.post('/posts', async(request, response) => { //data is sent to json format so we convert it to the json format ***
//     let requestBody = request.body; //here we take information from the body of the Post's request
//     let imgPath; //created a variable
//     if(requestBody.imageURL){
//         imgPath = requestBody.imageURL; // if it is not empty, we have to set request body.imageURL
//     } else {
//         //Otherwise, we need to set the path to the file just uploaded to the folder images.
//         imgPath = request.file.path.substring(request.file.path.indexOf('/'), request.file.path.length);  //***********
//         //Started from a request.file.path.indexof and up to the length of a row, including
//     }
//     let newPost = new Post({ //to create a new post object
//         //in the {} we add which information has to be in every post:
//         //we create a variable called ID above
//         id: uniqid(),
//         //'' + id++, //In the schema, we specify that the ID number has the data type string
//         //so we need to convert number 1 into a string value --> '' and the + sign, 
//         //automatic type conversion will be applied and the number 1 will be turned into a 'string' value
//         //id++ because we have to increase the value of the ID by one -> ++
//         title: requestBody.title,
//         date: new Date(), // generated automatically
//         description: requestBody.description,
//         text: requestBody.text,
//         country: requestBody.country,
//         imageURL: imgPath //imgPath instead of requestBody.imageURL because we created a variable above
//     })
//     //when you inspect it in HTML code you get <img src="client-side/images/1 Berat.jpg">
//     //that's why in the folder the server tries to find another folder called client-side, and only then the folder images and so on.
//     //So for src, we should leave / images / name of file --> check if statement ***********
//     await newPost.save(); //this is an asynchronous process --> so we use async await
//     //console.log(request.file); //Because the file which we send to the server is not stored in request.body, but in request.file
//     //That's why, instead of newPost, we need to write requests.file
//     response.send('created!');
// })


// //don't need this anymore **!
// // let post1 = new Post({
// //     id: '2',
// //     title: 'Statue of Liberty',
// //     date: new Date(), // generated automatically
// //     description: 'some description',
// //     text: 'some text',
// //     country: 'USA',
// //     imageURL: '/images/img-3.jpg'
// // });
// //the save function returns promise -> .then()
// // post1.save().then(() => console.log('saved'));


// //we add a route for the delete request with the id of the post we want to delete
// app.delete('/posts/:id', async (request, response) => {
//     let id = request.params.id; //to take the id of the post
//     await Post.deleteOne({id: id}) // to delete the post by its id
//     //And in the ({}) we add the id of the post = that the post with this ID will be deleted --> This is an asynchronous process
//     response.send('Deleted..'); //when the post has been deleted, the message deleted gets displayed in the console
// })

app.use(express.static('client-side')); //to see the index.html
/*All files of the client side are stored in the folder called client-side. When we write express.static('client-side')
we informed the server that that folder is the root folder of the client side.
(For the root folder, we can simply use the / sign and the server will understand that we mean the folder client-side.)
Our task is to redirect the user to this index.html file -> the main page of our website.

As you can see, this admin file is stored inside of the folder client-side.
So if we use the slash sign, the local server will understand that it has to find a file inside of the folder.
When the user clicks on the menu item 'home' on the admin page, the user will be redirected to the main page of the website. 
--> check index.html file*/

//and then And we add it so that the cookies are automatically generated for every request.
app.use(cookieParser());


//!!!
//Now we need to specify that when the user requests the root path, which starts with /posts 
//the request has to be redirected to the file posts.route.js
app.use('/posts', postsRouter); //in () 2 arguments : first argument is the root path on which the request is made, second argument is what router has to be used
//So when the request starts with the route /posts this request will be redirected to the file post.route.js 
//and then the end of the route path has to be found in the post.route.js file --> check it out !*!
//So the beginning of the route path /posts is taken from this line of code -> app.use('/posts', postsRouter)  ***!


//And then if the request starts with the route path /callback-requests,
//then the request has to be redirected to callbackRequestsRouter  --> it means that it will be redirected to callback.route.js
app.use('/callback-requests', callbackRequestsRouter);

app.use('/emails', emailsRouter);

//here we write that when there is a request to the root path slash users, then this request has to be redirected to the file users route.
//check users.route.js
app.use('/users', usersRouter);
//So when the post request is made on the root path /users/login it means that the user wants to log into the admin page 
//and that means that the user submits both email and password to the server.


//asyn await because is an asynchronous process
app.get('/landmark', async (request,response) => { //when the get request is made, the => function with two arguments has to be called
    let id = request.query.id; //to read the landmark id as to query parameter
    let post = await Post.findOne({id:id}); //find the id
    response.render('landmark', { //first argument is the name of the file nested inside of the folder views
        title: post.title, //object with the data, which has to be passed to the file landmark.ejs
        imageURL: post.imageURL,
        date: post.date,
        text: post.text //check main.js --> posts.forEach((post) => { <a href="/landmark class="btn btn-primary"">Details</a>
    })
    //no need for file extension .ejs to the file name, because we have already specified that we use ejs

}) //when the get request is made on the route path /landmark, an HTML file has to be generated based on the file landmark.ejs


//don't need this anymore -> let isLoggedIn = false; (check notes)
// the variable isLoggedIn is used for all users and this is not correct because it has to be unique for every user.
app.get('/admin', (request, response) => {
    //Now, when the request is made to the route path /admin, the server has to read the cookie.
    //so we install a package called cookie-parser so that the server can read the cookie correctly. (check notes)

    //to read the cookie
    let token = request.cookies['auth_token']; //in [] we add the name of the cookie

    //if(isLoggedIn){ //if is true
    if(token && auth.checkToken(token)){ //if the token is correct, the admin page is opened, otherwise the user is redirected to the sign in page.
    //But if there is no token, we will get an error message. That's why we check whether the token exists.
    //So we check if token is true and checkToken is also true.
        response.render('admin'); //it shows the admin page to the user
        //to be shown to the user only when the user is already logged in
    } else{
        //if the user is not logged in, the user has to be redirected to the route path the user has to be redirected.
        response.redirect('/login');
    }
})

//we open the admin page and we were redirected to the sign in form because we are not a registered user.
//But we still see http://localhost:3000/admin/
//We need to see here /login 
//So we need to redirect a user to the root path slash log in when the user is not logged in.
app.get('/login', (request,response)=> {
    let token = request.cookies['auth_token'];    
    if(token && auth.checkToken(token)){
        response.redirect('/admin'); // if is logged in -> we redirect the user to /admin.
    } else {
        response.render('login'); //otherwise the sign in page has to be displayed
    }
})

/*To recap: when the request is made to the route path /admin and isLoggedIn is false, then the user is redirected to the sign in page.
And this route displays the sign in page.*/

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));


//how to display the information from the database on the admin page.



