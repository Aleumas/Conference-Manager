<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

<div class='sign-in__container'>
    <div class='sign-in__content'>
        <h1> Conference Manager  </h1>
        <input id='email' bind:value={email} placeholder="Email">
        <input type='password' id='password' bind:value={password} placeholder="Password">
        <button on:click="{handleLogin}"> Log in </button>

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


<style>

    /* == Global == */ 

    :global(body) {
        padding: 0;
        background-color: #EEEEEE; 
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
        width: 100%;
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
     
</style>

<script>

    // Navigation imports
    import { Router, Link, Route } from "svelte-routing";
    import Signup from "./Signup.svelte";
    export let url = "";

    // Firebase imports 
    import firebase from "firebase/app";
    import "firebase/analytics";
    import "firebase/auth";
    import "firebase/firestore";

    // Firebase config
    var firebaseConfig = {
        apiKey: "AIzaSyAJ3JdkQaCpsBNQkdZ9C3TzzIuPdPI8wak",
        authDomain: "conference-manager-f1c34.firebaseapp.com",
        projectId: "conference-manager-f1c34",
        storageBucket: "conference-manager-f1c34.appspot.com",
        messagingSenderId: "236826523049",
        appId: "1:236826523049:web:f57db357c14643491180b8",
        measurementId: "G-LYR5JNKQJP"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // Login variables
    let email = ''; 
    let password = '';
    var visible = false;
    var errorOccured = false;
    var user = { loggedIn: false, errorOccured: false };
    

    // Login with firebase
    function handleLogin() {
        firebase.auth().signInWithEmailAndPassword(email, password) .then((userCredential) => {
            visible = true;
            errorOccured = false;
            var user = userCredential.user;
        })
        .catch((error) => {
            visible = true;
            errorOccured = true;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
	}
</script>