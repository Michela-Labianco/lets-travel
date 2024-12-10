//this is the main file for the main page of the website
//here we add posts to the main page

async function getPosts(){
    return await fetch('/posts') //in () we specify the requested URL
    .then((response) => response.json()) //converted in json (readable) format
    .then((data) => data);
}

let callMeForm = document.querySelector('.call-me-form'); //to find the form for the phone number

document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts(); 
    let articles = document.querySelector('.landmarks'); //to search the div (*block of code) by his class name
    articles.innerHTML = ''; 
    
    // *> since is an array we use the forEach()
    posts.forEach((post) => {
        //we added a new class called landmarks -> to insert them into the *block of code (div)
        let postHTML = `
            <div class="col">
                <div class="card">
                    <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <a href="/landmark?id=${post.id}" class="btn btn-primary"">Details</a>
                    </div>
                </div>
            </div>
        `;
        //same here: according to the schema in post.model.js file -> each post must have its id, title date, description, imageURL and so on.
        articles.insertAdjacentHTML('beforeend', postHTML);
        //the option 'beforeend' inserts dom element before the closing tag </div>
    })
})

//We created all the necessary JavaScript code, so we connect it to the index.HTML file--> <script src="/js/main.js"></script>


callMeForm.addEventListener('submit', function(e){
    e.preventDefault();
    let phoneInput = callMeForm.querySelector('input'); //because inside the .call-me-form there is only one input
    fetch('/callback-requests', { //to make a post request to the server
        method: 'POST', //is the post method
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
        //converted in text format
    }).then((response) => response.text()).then(() => alert("We'll call you back as soon as possible!"))
})


let emailsForm = document.querySelector('.contact-us-form'); //to find it by his class name
emailsForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetch('/emails', { //to make a request to the server
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
