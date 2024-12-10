//when we click on the create Post button. All data filled in the form is sent to the server and then to the database
//When the request is made on /posts, the server has to take information and send it to the database --> open app.js


//search for a form by his class name -> <form class="create-post-form">
let createForm = document.querySelector('.create-post-form');
//to collect all data filled in the form and send it to the server
//we use id names
let title = document.querySelector('#title');
let country = document.querySelector('#country');
let imageURL = document.querySelector('#imageURL');
let text = document.querySelector('#text');
let imageFile = document.querySelector('#image-file'); // to send image files to the server
//Now we can choose two options simultaneously -> not correct 
//only one option (image) has to be chosen

createForm.addEventListener('submit', function(e) {
    e.preventDefault();
    //for the events submit, the browser as a default event handler (e) to stop it
    let createText = text.value; // to not repeat text.value in the text: and description:
    let createDescription; //variable createDescription created here

    //**** we need to add an additional condition if the text doesn't have any dots, then text has to be used for the description.
    if(createText.indexOf('.') === -1 ){ // it means if there are not dots in the text 
        //then the value of the variable createText has to be assigned to the description.
        createDescription = createText;
    } else { //if there is a dot in the description we copy */* and assign it to the variable createDescription
        createDescription = createText.substring(0, createText.indexOf('.') +1 ); //+1 --> to add the dot to the description
    }

    //Any file is binary data, so to send files we have to use another format called FormData
    //created a variable called data
    let data = new FormData(); //We create an object of the type FormData
    //by using the form DataFormat, we can work with files
    data.append('title', title.value); //in () 2 arguments = key and value
    data.append('country', country.value);
    data.append('imageURL', imageURL.value);
    data.append('text', createText);
    data.append('description', createDescription);
    data.append('imageFile', imageFile.files[0]); //in this case, we work with .file, so the input value is in the key called files.
    //this key is an array
    //to send all this data we have to change the value for body -> body : data


    fetch('https://lets-travel-es6w.onrender.com/posts', { //in () we specify the requested URL
        method: 'POST', //is the post method
        // don't need the headers because it was used for json format
        //headers: {
        //     'Content-type' : 'application/json'
        // },
        body: data
        //we write data and we delete this:
        // JSON.stringify({ //don't need the date because is generated automatically
        //     title: title.value,
        //     country: country.value,
        //     imageURL: imageURL.value,
        //     text: createText,
        //     //in the description, we see the first sentence of the article text
        //     description: createDescription //so here we set the value of createDescription
            //description: createDescriptio instead of -> */*   description: createText.substring(0, createText.indexOf('.') +1 ) 
            //from the index element 0 to the index element with the '.' as the value.    +1 --> to add the dot to the description
            //but if the text doesn't have any dot at the end of the sentence, the description will be empty. so ****
        // }) 
    
    //converted in text (readable) format
    }).then((response) => response.text()).then((data) => /*console.log(data)*/ window.history.go());
})
//If you refresh the page the post appeares. But why did the Post appear immediately? 
//Because the list with the post is refreshing when the page is loading. 
//That is when the event 'DOMContentLoaded' (document.addEventListener('DOMContentLoaded', async function(){}) happens. -> main.js in the admin
//That's why to see a newly added post we have to refresh the page.
//to have that when a post is added, we reload the admin page -> http://localhost:3000/admin
//we change console.log(data) with window.history.go() so it will be automatically redirected to the admin page each time a post is added



function disableImage(input1, input2){ //2 arguments
    if(input1.value){ //So we check whether input1 is empty or not, if input one is filled
        input2.disabled = true; //input2 has to be disabled
    } else{
        input2.disabled = false; //And otherwise, input2 has to be working and input1 has to be disabled
    }
}
//Now, by calling the disableImage function, we're going to choose which input has to be disabled
imageURL.addEventListener('change', () => disableImage(imageURL, imageFile));
imageFile.addEventListener('change', () => disableImage(imageFile, imageURL));
//When the event 'change' happens for the imageURL.addeventlistener
//We call the callback function with the disableImage() function as an argument

//The disableImage() function has two arguments:
//first argument we add the input1 and for this, we have to check whether it is filled or not.
//secong argument we had another input called inuptOr.



//Now we need to check whether request body.imageURL is empty or not
//check app.js file --> let imgPath;