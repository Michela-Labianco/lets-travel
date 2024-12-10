//When the user makes a get request on the root path /callback requests, 
//we can call another function before to check whether the user has admin rights or not.

//When the user is authorized to see the admin pages, then this code :
// router.get('/', async(request, response) => { //async before the function
//     //we need to create two commands: The first is to receive callback requests and the second is to send these to the client
//     response.send(await CallbackRequest.find()); //sending them to the client
// });
//will be executed. If not, the request is denied.


//to use the checkToken(token) function we need to connect the file
let auth = require('../controllers/auth');

//next in this case is the function that has to be called if the user is authorized
function checkAuth(request,response,next ){ //To make it a middleware function, we need to pass three arguments to it.
    let token = request.cookies['auth_token']; 
    if(token && auth.checkToken(token)){
        next();
        //First we take a token and if there is a token and it is the correct one, 
        //then the function next is called.
    } else {
        response.status(400); //if the token is not correct, then we stop this request
        response.send('Not authorized');
    }
}

//to export this function
module.exports = checkAuth; //now go to callback.route.js, emails.route.js and posts.route.js file and connect this file

//In users.route.js file, we have two routes which are allowed for all users.
//That's why in this file we don't connect the middleware function.