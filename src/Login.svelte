<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

<div class='background'>
    <div class='sign-in__container ' id='container'>
        <div class='sign-in__content load-animation__fade' >
            <h1> Conference Manager  </h1>
            <input id='email' bind:value={email} placeholder="Email">
            <input type='password' id='password' bind:value={password} placeholder="Password">
            <button on:click="{handleLogin}"> Login </button>

            {#if visible}
                {#if errorOccured}
                    <p class='error' id='error'> The username or password you entered is incorrect. </p>
                {:else}
                    <p class='success'> Login succesful! </p>
                {/if}
            {/if}

            <hr>
            <p> Don't have an account? <a href='./Signup'> Sign up </a> </p>
        </div>
    </div>
</div>


<style>

    /* == Global == */ 

    :global(body) {
        padding: 0;
        font-family: Montserrat;
    }

    /* == Sign Up == */ 

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
        width: 40vw;
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
    
    .load-animation__fade {
        animation: fade 1.5s;
    }
    
    /* .load-animation__extend {
        animation: extend 10.5s ease-in-out;
    } */

    .background {
        width: 100%;
        height: 100%;
        background-image: url('/hero.jpg'); 
        background-size:contain;
        background-color: #4C82F8;
        background-blend-mode: multiply;
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
        background-color: #bfbfbf;
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

    @keyframes extend {

        0% {
            width: 40%;
            border-top-left-radius: 5vh;
            border-bottom-left-radius: 5vh;
        }

        50% {
            width: 38%;
            border-top-left-radius: 5vh;
            border-bottom-left-radius: 5vh;
        }

        100% {
            width: 100%;
            border-top-left-radius: 0vh;
            border-bottom-left-radius: 0vh;
        }

    }
</style>

<script>


    // General imports 
    import { store } from './store.js';
    import Router from 'page';
        
    
    // Firebase import
    import firebase from "firebase/app";

    // Login variables
    let email = ''; 
    let password = '';
    var visible = false;
    var errorOccured = false;

    // Listen for auth status changes
    firebase.auth().onAuthStateChanged(user => {

        // Check if user is logged in
        if (user) {
            (firebase.database().ref('users/' + user.uid + '/choice')).on('value', (snapshot) => {
                if (snapshot.val() != null) {
                    let role = snapshot.val().toLowerCase();
                    Router.redirect(`/${role[0].toUpperCase() + role.slice(1)}`);
                }  
            });
        }

    }) 

    // Login with firebase
    function handleLogin() {
        firebase.auth().signInWithEmailAndPassword(email, password) .then((userCredential) => {
            // Set boolean values
            visible = true;
            errorOccured = false;
            store.set(true);

            // Make login persistant 
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                console.log('persisted');
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                console.log('failed to persist');
            });

        })
        .catch((error) => {
            visible = true;
            errorOccured = true;
        });
	}

</script>