<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

<div class='background'>
    <div class='sign-in__container'>
        <div class='sign-in__content load-animation'>
            <h1> Conference Manager  </h1>
            <input bind:value={firstName} placeholder="First name">
            <input bind:value={lastName} placeholder="Last name">
            <input bind:value={company} placeholder="Company name">
            <input bind:value={position} placeholder="Company position name">
            <input bind:value={email} placeholder="Email">
            <input type='password' bind:value={password} placeholder="Password">
            <button on:click="{handleSignup}"> Sign up</button>

            {#if visible}
                {#if errorOccured}
                    <p class='error' id='error'> {errorMessage} </p>
                {:else}
                    <p class='success'> Sign up succesful! </p>
                {/if}
            {/if}

            <hr>
            <p> Have an account? <a href='./'> Login </a> </p>
        </div>
    </div>
</div>


<style>

    /* == Global == */ 

    :global(body) {
        padding: 0;
        background-color: #EEEEEE; 
        font-family: Montserrat;
    }

    /* == Sign Up Classes == */ 

    .sign-in__container{
        position: relative;
        float: right;
        width: 40%;
        height: 100vh;
        text-align: center;

        background-color: white;
        border-top-left-radius: 5vh;
        border-bottom-left-radius: 5vh;
    }

    .sign-in__content {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
    }

    .background {
        width: 100%;
        height: 100%;
        background-image: url('/hero.jpg') ; 
        background-size:contain;
        background-color: #4C82F8;
        background-blend-mode: multiply;
    }
    
    .error {
        margin-bottom: 5vh;
        margin-top: -1vh;
        color: red;
    }

    .success {
        margin-bottom: 5vh;
        margin-top: -1vh;
        color: green;
    }

    .load-animation {
        animation: fade 1.5s;
    }


    h1 {
        padding-bottom: 2vh;
        color: #5C5C5C;
        font-weight: 700;
        font-size: xx-large;
    }

    input {
        display: block;
        width: 70%;
        height: 7vh;
        padding-left: 3vh;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 3vh;

        font-weight: 700;
        font-size: small;
        border-radius: 2vh;
        border-color: #BFBFBF;
        border-width: 2px;
    }

    button {
        display: block;
        width: 70%;
        height: 7vh;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5vh;
        padding: 1vh;

        color: white;
        font-weight: 700;
        background-color: #4C82F8;
        font-size: medium;
        border-radius: 2vh;
    }

    hr {
        width: 70%;
        height: 2px;
        border: none;
        background-color: #BFBFBF;
    }

    p {
        float: right;
        padding-right: 15%;
    }

    a {
        font-weight: 700;
        color: #4C82F8;
        text-decoration: underline;
    }

    ::placeholder {
        color: #BFBFBF;
    }

    @keyframes fade {

        from  {
            opacity: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        to {
            opacity: 1;
            top: 50%;
            transform: translateY(-50%);
        }
    }
     
</style>

<script>
    import Router from 'page';

    // Firebase import
    import firebase from "firebase/app";

    // Login variables
    let firstName = '';
    let lastName = '';
    let company = '';
    let position = '';
    let email = ''; 
    let password = '';
    var errorMessage = '';
    var visible = false;
    var errorOccured = false;


    // Date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    

    // Signup with firebase
    function handleSignup() {
        firebase.auth().createUserWithEmailAndPassword(email, password) .then((userCredential) => {
            visible = true;
            errorOccured = false;

            // Change login state
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // Logged in
                    Router.redirect('/Role');
                } else {
                    // Logged out
                }
            });

            // Make login persistant 
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                console.log('persisted');
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                console.log(errorMessage);
            });

            // Add user information to firebase 
            var user = firebase.auth().currentUser;
            firebase.database().ref('users/' + user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    company: company,
                    position: position,
                    joiningDate: today

            });

        })
        .catch((error) => {
            visible = true;
            errorOccured = true;
            errorMessage = error.message;
        });
	}

</script>