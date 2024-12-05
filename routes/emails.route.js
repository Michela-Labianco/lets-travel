//here we create routes for getting requests from the database, adding request and deleting requests.
//back end part

let uniqid = require('uniqid');
let emailRequests = require('../models/emails.model').emailRequests;
//to connect the class
//not to connect the whole object, but only the class we write .emailRequests

let express = require('express'); 
let router = express.Router(); 

//middleware function
let authMiddleware = require('../middleware/auth');


//to get requests
router.get('/', authMiddleware, async(request, response) => { //async before the function
    //we need to create two commands: The first is to receive emails and the second is to send these to the client
    response.send(await emailRequests.find()); //sending them to the client
});

//for adding new ones
router.post('/', async(request, response) => {
    let requestBody = request.body; //to read the data which has to be sent to the database
    //we create a new document:
    let newEmail = new emailRequests({
        id: uniqid(),
        name: requestBody.name,
        text: requestBody.text,
        email: requestBody.email,
        date: new Date()
    });
    await newEmail.save(); //to save the document to the database
    response.send('Accepted');
})


//to delete them
//  /:id  because we delete requests by their id
router.delete('/:id', authMiddleware, async (request, response) => { 
    await emailRequests.deleteOne({id: request.params.id}) // to delete the post by its id
    //And in the ({}) we add the id of the post = that the post with this ID will be deleted --> This is an asynchronous process
    response.send('deleted');
})

//export the object router
module.exports = router;