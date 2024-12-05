
//in this file we're going to work with all requests made on the root path /users 
let User = require('../models/user.model').User; //to connect the class
let express = require('express'); 
let router = express.Router(); 
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');//to connect the file auth.js

//So a user fills in this form with some email and password and then clicks on the sign in button.
//When the user clicks on this button, the post request is made on the root path / users/login


//router responsible for the sign in process
//SIGN IN TAB
//if the user is already in the collection users -> is yes we redirect it to admin page if no we send the message rejected
//create a route to check whether the email and password are already stored in the database or not:
router.post('/login', async (request,response) => { //only /login becasue the part /users is going to be in the app.js file.
    //and in the app.js file we write that when there is a request to the root path /users , then this request has to be redirected to the file users.route.js

    //to read the email and password:
    let email = request.body.email; 
    let password = request.body.password;

    //then we search for the Users in the database
    //the find() returns an array of elements
    let users = await User.find().where({email:email});//.where({password:password}); we don't need it because of the encrypted password
    if(users.length > 0){ //So if the array called users is not empty = if greater then 0
        // if the array is not empty -> meaning that by using the find function, the user was found in the database,
        //then the user can log into the admin page

        //compare the password to the one saved in the database
        let comparisonResult = await bcrypt.compare(password, users[0].password); //[0] because we need the first element of the array users
        //As a result of this function, we're going to get either true or false. 
        //true if the passwords are identical and false if they are different.
        if(comparisonResult === true){ //you can also write only if(comparisonResult) and still means if it's true
            let token = auth.generateToken(users[0]);//a unique token has to be generated. 
            //we're going to call the function from the file auth.js

            //to add our token to cookies
            response.cookie('auth_token', token); //And we said two arguments: the first argument is the name of the key, and the second argument is its value.
            //no need to send it anymore response.send(token); //to send the token to the client
            //response.send('Logged in'); //we get this message back 
            response.send({
                redirectURL : '/admin',
                message : 'Success'
            });
        } else {
        response.send({message : 'Rejected'}); // turned the text rejected into an object.
        }
    } else {
        response.send({message : 'Rejected'});
    }
})

//REGISTER TAB
//create a router for adding users to the database
router.post('/register', async (request,response) => {
    //to read email and password
    let email = request.body.email; 
    let password = request.body.password;
    //And then we check whether the email which is proposed for registration, hasn't already been used by someone else.
    let users = await User.find().where({email:email}); //if email hasn't been used from someone else 
    if(users.length === 0){ 

        let encryptedPass = await bcrypt.hash(password, 12); //asynchronous function

        //If this email hasn't been used by someone else, then we add this email to the database.
        let newUser = new User({ 
                email, //could be {email, password} when the key and the value have the same name
                password: encryptedPass }); //in this case we set bcrypt as the value of the password key
            // email : email,
            // password : password
        //})
        await newUser.save(); //So to wait for the result of this process, we use a async await
        response.send({message : 'Done'});
    } else {
        response.send({message : 'Rejected'});
    }
})

//to make a request from the front end part to a register and log in we go to login.js

module.exports = router; //to export router otherwise you get an error