<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

<div class='sign-in__container'>
    <div class='sign-in__content load-animation'>
        <h1> Conference Manager  </h1>
        <input id='email' bind:value={email} placeholder="Email">
        <input type='password' id='password' bind:value={password} placeholder="Password">
        <button on:click="{handleLogin}"> Sign up</button>

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

    // Firebase import
    import firebase from "firebase/app";

    // Login variables
    let email = ''; 
    let password = '';
    var errorMessage = '';
    var visible = false;
    var errorOccured = false;
    

    // Login with firebase
    function handleLogin() {
        firebase.auth().createUserWithEmailAndPassword(email, password) .then((userCredential) => {
            visible = true;
            errorOccured = false;
            var user = userCredential.user;
        })
        .catch((error) => {
            visible = true;
            errorOccured = true;
            errorMessage = error.message;
        });
	}

</script>