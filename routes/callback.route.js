//here we create routes for getting requests from the database, adding request and deleting requests.
//back end part

let uniqid = require('uniqid');
let CallbackRequest = require('../models/callback.model').CallbackRequest;
//to connect the class
//not to connect the whole object, but only the class we write .emailRequests

let express = require('express'); 
let router = express.Router(); 

//middleware function
let authMiddleware = require('../middleware/auth');

//to get requests
//So this function has to be called before all route paths with admin rights.
//For example, only users with admin rights should have access to the root path /callback requests
//So to call the function authMiddleware before this route we add it there.
router.get('/', authMiddleware, async(request, response) => { //async before the function
    //we need to create two commands: The first is to receive callback requests and the second is to send these to the client
    response.send(await CallbackRequest.find()); //sending them to the client
});

//for adding new ones
router.post('/',  async(request, response) => {
    let requestBody = request.body; //to read the data which has to be sent to the database

    //we create a new document:
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: requestBody.phoneNumber,
        date: new Date()
    });
    await newRequest.save(); //to save the document to the database
    response.send('Accepted');
})


//to delete them
//  /:id  because we delete requests by their id
//only the users with admin rights should be allowed to delete callback requests.
router.delete('/:id', authMiddleware, async (request, response) => { 
    await CallbackRequest.deleteOne({id: request.params.id}) // to delete it by its id
    //And in the ({}) we add the id of the request = that the request with this ID will be deleted --> This is an asynchronous process
    response.send('Request deleted');
})

//export the router
module.exports = router;