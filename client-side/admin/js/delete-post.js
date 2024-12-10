/*when the user clicks any of these X buttons, the post has to be deleted.

But there is some problem -> we can't attach an event handler to every X button.
When thee web page starts loading-> index.HTML file of the admin page there are no posts on the web page because we store them in the database, 
not in the HTML file.

So in fact, first the HTML file is loading and only then the posts are dynamically added to the web page.
So we can't attach the event handler to posts because they don't exist on the web page at the moment that a web page starts loading.

So to attach the event handler to the elements which are created dynamically, we need to use the event delegation, 
to implement event delegation we need to attach the event handler to the HTML element, which already exist on the web page while it's loading. */

{
    let articlesBlock = document.querySelector('.articles-list');

    articlesBlock.addEventListener('click', function(e){ //the object e = event . This object stores all data about the event and has a property called target
        // the target property stores the element which was clicked.
        if(e.target.classList.contains('remove-btn')){
            let id = e.target.parentNode.parentNode.querySelector('.id').value; //the tr tag is a parent node element of the id tag, so the search for a tr tag, we add .parentNode again
        //So remove-btn is nested inside of the td tag. 
        //That's why the remove-btn is a child element and the td tag is a parent element or in other words, the td tag is a parent node element.
        //let id because we delete posts by their ID numbers.
        //.querySelector('.id').value ->  which is our input with the class id and we add value because we only need the value
            
        // to do is delete the post with this I.D. number from the database:
            fetch('https://lets-travel-es6w.onrender.com/posts/' + id, {
                method: 'DELETE'
            }).then((response) => response.text())
            .then(() => window.history.go()); // then we redirect the client to the main page of the admin page. 
        }
    })
}


//in the update-post.js and in the dele-post.js files, we have the same variable -> ArticlesBlock
//To avoid this kind of situation in the future, we write the code in a pair of {} brackets
//Now, these variables are absolutely different variables, even though they have the same name (SCOPE SECTION)