//to make it so that when we click the edit button and the update form pops up

//in the update-post.js and in the delete-post.js files, we have the same variable -> articlesBlock
//To avoid this kind of situation in the future, we write the code in a pair of {} brackets
//Now, these variables are different variables, even though they have the same name (SCOPE SECTION)

{
    let articlesBlock = document.querySelector('.articles-list');
    let updateBtn = document.querySelector('#v-pills-update-post-tab'); //id name of the update post button

    //front end part
    let updateForm = document.querySelector('.update-post-form'); //searching the form by his class name
    //2 request get and input request. 
    //So when the user clicks on the update post button, the submit event happens and the data must be sent to the server.


    // --->>> search for the input with the id update-title and update-text
    let titleInput = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');
    //let imageUpdate = document.querySelector('#update-image-file'); //and image id
    let id;

    articlesBlock.addEventListener('click', async function(e) { 
        if(e.target.classList.contains('edit-btn')) { //event delegation
            //back end part 
            //create the first route for getting data from the database -> we need to get the current title and text from the database by the ID number of the post.
            //check posts.route.js

            //here we only assign the value to the id variable
            id = e.target.parentNode.parentNode.querySelector('.id').value; //to search for this id
            let postInfo = await fetch('https://lets-travel-es6w.onrender.com/posts/' +id)
                //for the get request we don't to specify with method
                .then((response) => response.json())
                .then((data) => data) //So the data is returned from the => function.
                //So we await while all the data of the post is already in the variable postInfo, 
                //and only then we will fill in the input with the current title and text of the post. --->>>
                //Secondly, to fill in the form with the current title and the current text, we need to take these values
            titleInput.value = postInfo.title;
            textArea.value = postInfo.text;
            //imageUpdate.value = postInfo.file;
            updateBtn.click();
        }
    })

    //when to submit event happens, the function has to be called
    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        //so we can also change the description
        let updateDescription; 
        if(textArea.value.indexOf('.') === -1 ){
            updateDescription = textArea.value;
        } else {
            updateDescription = textArea.value.substring(0, textArea.value.indexOf('.') +1 );
        }

        // let updateImage; 
        // if(imageUpdate.value !== imageFile){
        //     updateImage = imageUpdate.value;
        // } else {
        //     updateImage === imageFile;
        // }

        fetch('https://lets-travel-es6w.onrender.com/posts/' +id, {
            method: 'PUT', //we specify that it is a put request
            headers: {
                'Content-Type': 'application/json' //we specify that we send the data to the server in the Json format
            },
            body: JSON.stringify({ //we send the new title and the new text of the post
                title: titleInput.value,
                text: textArea.value,
                description: updateDescription,
                //image: updateImage
            })
        }).then((response) => response.text()).then(() => window.history.go()); //then we refresh the web page by writing window.history.go
    })
}
//on the front end part, we must create 2 requests: get and put requests.
//on the back end part, we must create two routes for getting data from the database and for updating data in the database 
//-> check posts.route.js  after router.delete()



