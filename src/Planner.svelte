<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">

<div class='load-animation'>
    <div class='background'></div>
    <div class='header'>
        <ul>   
            <li><h1> Dashboard </h1></li>
            <li><button class='logout' on:click={() => logout()}>Logout</button></li>
        </ul>
    </div>
    <div class='stats-bar'>
        <div class='active-conferences'> 
            <div class='center'>
                <p class='stats-title'>Active Conferences</p>
                <p class='stat'> 0 </p>
            </div>
        </div>
        <!-- <div class='average-rating'>
            <p class='stats-title'>Average Rating</p>
            <p class='stat'> 0 </p>
        </div> -->
        <!-- <div class='average-rating'>
            <p class='stats-title'>Average Rating</p>
            <p class='stat'> 0 </p>
        </div> -->
    </div>
    <button class='add-event'>+ Add an event</button>

</div>

<style>

    .center {
        position: absolute;
    }

    .stats-bar {
        position: relative;
        display: inline;
    }

    .active-conferences {
        margin-top: 0;
        width: 25vw;
        height: 6vw;
        background-color: white;
        border-radius: 2vh;
    }

    .stats-title {
        color: #BFBFBF;
        font-weight: 500;
        padding-left: 20px;
        margin-bottom: 0;
        margin-top: 0;
    }

    .stat {
        font-weight: 700;
        font-size: larger;
        padding-left: 20px;
        margin-bottom: 0;
        margin-top: 1vh;
    }

    .header {
        display: inline;
        position: relative;
    }

    .background {
        position: absolute;
        background-color: #f5f5f5;
        width: 100%;
        height: 100%;
    }

    .logout {
        background-color: #F88A4C;
        width: 10vw;
        margin: 0;
        padding: 0;
        margin-right: 5vw;
        margin-top: 0;
        float: right;
    }

    .add-event {
        position: absolute;
        right: 5vw;
        bottom: 5vw;
        margin: 0;
        z-index: 999;
    }

    .load-animation {
        animation: fadeIn 1s linear;
    }
   
    ul {
        display: block;
        list-style-type: none;
        margin-top: 0;
        padding-top: 0;
    } 

    h1 {
        padding-bottom: 2vh;
        color: #5C5C5C;
        font-weight: 700;
        font-size: xx-large;
        margin: 0;
        padding: 0;
        float: left;
    }

    button {
        display: block;
        width: 20vw;
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
        border: none;
    }

    @keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

</style>

<script>
    import Router from 'page';
    import firebase from 'firebase/app';

    function logout() {
        Router.redirect('./');
    }

    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        }, function(error) {
        console.error('Sign Out Error', error);
    });
</script>