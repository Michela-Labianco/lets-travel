//this is the main file for the admin page
//In this file we're going to save all functions for working with posts

//create a function that contact the server and get posts
async function getPosts() {
    //To make a request to the server, we need to use the fetch() function --> an asynchronous function
    //the getPosts() function --> a synchronous function, which means that it doesn't wait for the result from the fetch function
    //So we use async await to make it so that the getPosts() function waits for a result from the fetch function.
    //in () we specify the requested URL (in the back and part, we specified that the route path is /posts, so in the front in part, we need to use the same route path)
    return await fetch('http://localhost:3000/posts')
    //return --> to be able to use this data outside of the getPosts() function
        .then((response) => response.json()) //after getting the response we need to converted in json (readable) format
        .then((data) => data);
}


async function getRequest() {
    return await fetch('http://localhost:3000/callbacks-requests')
    //return --> to be able to use this data outside of the function
        .then((response) => response.json()) 
        .then((data) => data);
}
//Each time you use a request to open the admin page, the getPost() function will be called
//this way the post are received from the database and then they are inserted into the admin page 

async function getEmailRequest() {
    return await fetch('http://localhost:3000/emails')
    //return --> to be able to use this data outside of the function
        .then((response) => response.json()) 
        .then((data) => data);
}
//as soon as the admin page is downloaded we need to display these posts on the admin page.
//How do we understand that the admin page has already been opened?
//the object document has an event called DOMContentLoaded --> This event happens when all the content of the page has been downloaded.
//So when this event happens, we need to call the getPost() function, and then each post has to be displayed on the admin page
document.addEventListener('DOMContentLoaded', async function(){ 
    addPost();
    addCallbackRequest();
    //in this case, we don't add the await keyword before the functions 
    //because these functions can be called at the same time --> they can be loaded simultaneously
    addEmailRequest();
    
    //CREATE POST
    //find the 2 buttons
    let addPostBtn = document.querySelector('.add-post'); //by his class name -> <button class="add-post btn btn-primary mb-3">Add post</button>
    let createPostBtn = document.querySelector('#v-pills-add-post-tab'); //by his #id name

    addPostBtn.addEventListener('click', () => createPostBtn.click());
    //when the user clicks on the addPostBtn, the createPostBtn must be automatically clicked.
})

//to add posts to the main page we need to create a JavaScript file for the main page of the site.
//So in the folder js, which is stored inside of the folder client-side, 
//we create a JavaScript file called main.js (with bootstrap.min.js)

async function addPost() {
    //since above we wrote the word async to getPost() function we have to write the word await before the getPost() 
    //and in consequences we have to write the word async before the function()
    let posts = await getPosts(); // *> first we'll get an array of posts and stored them in the variable posts

    //need to convert this code to a DOM element and then add it inside of the table
    //so we created a class articles-list --> check index.html admin
    let articles = document.querySelector('.articles-list tbody'); //search the table by his class name
    //The <tbody> tag is used to group the body content in an HTML table
    //the tbody tag is automatically created for each tr tag. 
    //That's why we need to insert the elements not into the table tag, but into the tbody tag --> ('.articles-list tbody')
    articles.innerHTML = ''; //to clear everything that is inside of the table --> **
    let i = 1; //instead of an ID number, we need to add the order number of the post, so we create a variable i
    //for saving order numbers and the very first number is one.

    // *> since is an array we use the forEach()
    posts.forEach((post) => { //post is the value argument (element) 
        //out of this post we are going to take the information we need
        // `` back ticks
        //according to the schema -> post.id , post.title and so on

        //we replace ID with the variable i but we also need to keep the ID numbers of the posts so we create an input of the special type hidden.
        //This input will not be visible on the Web page and we set a value for it (which we are going to use when we need it), which is post.id
        //we also add classes
        let postHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${post.id}"</td> 
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="country">${post.country}</td>
            <td><button type="button" class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button type="button" class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        `;
        //these lines of code are going to serve as a template for each post
        //Because in the post.model.js file, according to the schema each post must have its id, title date, description and so on.

        // ** now we can insert this postHTML inside of the table :
        articles.insertAdjacentHTML('beforeend', postHTML);   //This function automatically converts html code to the DOM element
    })
    //this funtion has 2 arguments -> first where to insert the DOM element the <tr>:
    //The first option is 'afterbegin': it inserts the Dom element straight after the opening tag <tr>
    //The second option is 'afterend' : it inserts the Dom element straight after the closing tag </tr>
    //the option 'beforebegin' insert before the opening tag
    //the option 'beforeend' inserts dom element before the closing tag </tr>
    //second argument is what we want to insert (In our case -> the value of the variable called postHTML): 

    //We created all the necessary JavaScript code, so we connect it to the admin index.HTML file --> <script src="/admin/js/main.js"></script> 

    //So when we click on the Add post button, JavaScript clicks to create post button 
    //<button class="nav-link d-none" id="v-pills-add-post-tab" data-bs-toggle="pill" data-bs-target="#v-pills-add-post" type="button" role="tab" aria-controls="v-pills-add-post" aria-selected="false">Create Post</button>

}

//to see the callback requests List in the admin page
async function addCallbackRequest() {
    let requests = await getRequest(); 
    let callbackList = document.querySelector('#v-pills-callback tbody'); 
    callbackList.innerHTML = ''; 
    let i = 1;
    requests.forEach((request) => { 
        let requestHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${request.id}"</td> 
            <td class="number">${request.phoneNumber}</td>
            <td class="date">${request.date}</td>
            <td><button type="button" class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        `;
        callbackList.insertAdjacentHTML('beforeend', requestHTML);  
    })
}

//to see the email requests List in the admin page
async function addEmailRequest() {
    let emailRequests = await getEmailRequest(); 
    let emailsList = document.querySelector('#v-pills-mails tbody'); 
    emailsList.innerHTML = ''; 
    let i = 1;
    emailRequests.forEach((email) => { 
        let emailHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${email.id}"</td> 
            <td class="name">${email.name}</td>
            <td class="email">${email.email}</td>
            <td class="date">${email.date}</td>
            <td><button type="button" class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        <tr>
            <td colspan="5" class="text">${email.text}</td>
        </tr>
        `;
        emailsList.insertAdjacentHTML('beforeend', emailHTML);  
    })
}


//so you can also submit a callback request from the admin page
let callMeFormAdmin = document.querySelector('.call-me-form'); //to find the form for the phone number
callMeFormAdmin.addEventListener('submit', function(e){
    e.preventDefault();
    let phoneInput = callMeFormAdmin.querySelector('input'); //because inside the .call-me-form there is only one input
    fetch('http://localhost:3000/callbacks-requests', { //to make a post request to the server
        method: 'POST', //is the post method
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
        //converted in text format
    }).then((response) => response.text()).then(() => alert("We'll call you back as soon as possible!"));
})


//to remove the callback request
let callbackBlock = document.querySelector('#v-pills-callback');
callbackBlock.addEventListener('click', function(e){
    if(e.target.classList.contains('remove-btn')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/callbacks-requests/' + id, {
            method: 'DELETE'
        }).then((response) => response.text()).then(() => alert("Request deleted"))
        .then(() => window.history.go());
    }
})


//so you can also submit a email request from the admin page
let emailsFormAdmin = document.querySelector('.contact-us-form'); //to find it by his class name
emailsFormAdmin.addEventListener('submit', function(e){
    e.preventDefault();
    fetch('http://localhost:3000/emails', { //to make a post request to the server
        method: 'POST', //is the post method
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            text: document.querySelector('#message').value,
        })
        //converted in text format
    }).then((response) => response.text()).then(() => alert("We'll email you back as soon as possible"))
    .then(() => window.history.go());
})



//to remove the email request
let emailsBlock = document.querySelector('#v-pills-mails');
emailsBlock.addEventListener('click', function(e){
    if(e.target.classList.contains('remove-btn')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/emails/' + id, {
            method: 'DELETE'
        }).then((response) => response.text()).then(() => alert("Request deleted"))
        .then(() => window.history.go());
    }
})

//to log out
let logOutBtn = document.querySelector('.log-out-btn');

//when it's clicked, the function is called for deleting our token from the cookies.
//To delete cookies we have to write a quite long and complicated line of code (check notes)
logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    //to redirect the user to the main page
    window.location.href = '/';
})