//authentication.js

let jwt = require('jsonwebtoken'); //Now to connect the package to this file

//second argument for the sign() function 
let secret =  '3hfciasd8nck';//random sequence of letters and numbers as the value

//to generate keys 
function generateToken(user) { //So to generate tokens for every user, we need the object user.
    //the object user can have lots of different information, but we only need to take part of this data.
    //so we create a variable called payload and we assign a JavaScript object to this variable.
    let payload = {
        email : user.email,
        password : user.password
    } //These two fields are more than enough to create a unique key.
    return jwt.sign(payload, secret); //we call the function sign and then we pass two arguments to the sign function.

//So this function generates a unique token, and then this token is returned from this function.
}


/*JSON web token consists of three parts.
The first part is how the data is going to be encrypted. In the JSON web token package is already set by default so we can skip it.

The second part is called Payload, an unique object for every client, which is used for generating a unique sequence of letters and numbers.

As a rule, the unique data of the object called user is used for this purpose. For example, email and password.

And the third part is a secret key: a string sequence made of letters and numbers to encrypt a key. */



//here we create a function to check whether the token provided by the user is the correct one.
function checkToken(token) { //we pass the token to the function so we can verify it
    //return jwt.verify(token, secret); //it has two arguments: token to be checked and secret key 
    try{
        let result = jwt.verify(token, secret);
        return result;
    } catch (error){
        return false;
    }

    //So as a result of this function, we get either true or false. 
    //So we return the result so that we can use these functions in other files,
}


//and we're going to export them.
module.exports = {generateToken, checkToken}; //without the ()