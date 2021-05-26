<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">

<div class='background'>
    <div class='load-animation'>
    <!-- <div class='header'>
        <ul>   
            <li><h1> Dashboard </h1></li>
            <li><button class='logout' on:click={() => logout()}>Logout</button></li>
        </ul>
    </div> -->

    <div class='right-panel'>
        <!-- <Calendar class='frame' {today} year={2020}/> -->
    </div>

    <div class='right-panel'>
        <div class='profile-container'>
            <img src={imageLink} alt='profile picture'/>
            <h1> {name} </h1>
            <h3> {position} </h3>
        </div>
        <hr>
        <div class='info-container'>
            <div class='info-titles'>
                <p> Company </p>
                <p> Joining Date </p>
                <p> Conferences </p>
            </div>
            <div class='info'>
                <p> {company} </p>
                <p> {joiningDate} </p>
                <p> {activeConferences} </p>
            </div>
        </div>
    </div>

    <!-- <button class='add-event'>+ Add an event</button> -->
    </div>
</div>

<style>
    
    .frame {
        width: 10%;
        height: 10%;
    } 
    .profile-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .info-container {
        display: inline;
    }
    .info-titles {
        float: left;
        color: #5C5C5C;
        font-weight: 700;
        font-size: 1vmax;
        margin-left: 10%;
    }

    .info {
        float: right;
        font-size: 1vmax;
        margin-right: 10%;
        color: #5C5C5C;
        font-weight: 500;
    }

    .right-panel {
        display: block;
        float: right;
        position: relative;
        background-color: white;
        width: 30vmax;
        height: 25vmax;
        border-radius: 3vh;
        margin: 10px;
    }

    .background {
        background-color: #EEEEEE;
        width: 100%;
        height: 100%;
    }

    .load-animation {
        animation: fadeIn 1s linear;
    }

    hr {
        width: 80%;
        height: 2px;
        border: none;
        background-color: #bfbfbf;
    }

    h3 {
        font-size: 1.2vmax;
        font-weight: 500;
        text-align: center;
        margin-bottom: 0;
    }

    h1 {
        font-size: 2vmax;
        text-align: center;
        margin-bottom: 0;
    }

    img {
        width: 5vmax;
        margin-top: 4vh;
        height: 10%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    @keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

</style>

<script>
    import Router from 'page';
    import firebase from 'firebase/app';
    import Calendar from './Calendar.svelte';
    import Datepicker from 'svelte-calendar';

    const today = new Date;
    let imageLink = '/defaultProfilePicture.jpg'
    let name = 'Leumas'
    let position = 'CEO'
    let company = 'Google';
    let joiningDate = '01/08/2018';
    let activeConferences = '34 Active';

    function logout() {
        Router.redirect('./');
    }

    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        }, function(error) {
        console.error('Sign Out Error', error);
    });
</script>