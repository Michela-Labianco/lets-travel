let signInForm = document.querySelector('.sign-in-form'); //to search it by his class name
let registerForm = document.querySelector('.register-form'); //to search it by his class name


signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    //to take the email and password from signInForm
    let email = document.querySelector('#sign-in-email').value; //by its id and we don't need the whole imput but only the value
    let password = document.querySelector('#sign-in-password').value;
    //for the front end part, 
    //already found the email and password for the sign in form and now we can call the fetch function
    fetch('https://lets-travel-es6w.onrender.com/users/login', { //in () we specify the requested URL
        method: 'POST',
        headers: {
            'Content-type' : 'application/json' //send the json object
        },
        body: JSON.stringify({email, password}) 
        //since we wrote the two words email and password inside of a pair of {} brackets,
        //javascript will understand that email and password have to be created.
        //JavaScript will set the values of the variable email and the variable password 
        //in the variable email, the email which the user submitted is saved 
        //and in the variable password, the password which was submitted is saved.

        //then when the request is succesfully made is converted to text format
    }).then((response) => response.json()) //in data.redirect URL we work with an object.
    //So to work with the object, we specify that the response from the server 
    //has to be converted not in a text format, but in json format.
    .then((data) => /* alert(data) */ {
        let redirectURL = data.redirectURL; //to read the redirectURL sent by the server
        //to check whether we have redirect URL or not.
        //Because if the user didn't type in the correct login details, the server will not send the redirectURL.
        if(redirectURL){ // if true
            window.location.href = redirectURL;
        } else {
            alert(`Your password or email don't match. Please try again`);
        }
    });
})

registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.querySelector('#register-email').value; //by its id and we don't need the whole imput but only the value
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-Password').value;

    //password and rePassword have to be the same
    if(password !== rePassword) { //if is not equal
        return; //to stop the event handler immediately
    }
    fetch('https://lets-travel-es6w.onrender.com/users/register', { //in () we specify the requested URL
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((response) => response.text()).then((data) => alert(data));
})