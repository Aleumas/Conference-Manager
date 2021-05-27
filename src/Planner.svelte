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

    <!-- <div class='right-panel'>
        <Calendar class='frame' {today} year={2020}/>
    </div> -->
<!-- 
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
    </div> -->
    <h2> My conferences</h2>
    <div class='info-title-container'>
        <p class='info-category'> name </p>
        <p class='info-category'> location </p>
        <p class='info-category'> date </p>
        <p class='info-category'> time </p>
        <p class='info-category'> access </p>
        <p></p>
    </div>

    {#each userConferences as conf}
        <div class='cell-container'> 
            <p class='conf-info'> {conf.name} </p>
            <p class='conf-info'> {conf.location} </p>
            <p class='conf-info'> {conf.date} </p>
            <p class='conf-info'> {conf.time} </p>

            {#if conf.access == 'Private'} 
                <p class='conf-info private'> {conf.access} </p>
            {:else}
                <p class='conf-info public'> {conf.access} </p>
            {/if}

            <button class='more'> ••• </button>
        </div>
    {/each}
    <!-- <button class='add-event'>+ Add an event</button> -->
    </div>
</div>

<style>
    
    h2 {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 2vh;
        padding-top: 2vh;
        
    }

    .info-title-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 60vmax;
        height: 5vmax;
        border-radius: 3vh;
        padding-left: 1vw;
        padding-right: 1vw;
        margin-left: 1vw;
        margin-top: 0;
        margin-bottom: -2vh;
    }

    .info-category {
        font-weight: 500;
    }

    .more {
        border: none;
        background-color: white;
        color:#5C5C5C;
        font-weight: 700;
        font-size: x-large;
        margin-bottom: 0;
    }

    .frame {
        width: 10%;
        height: 10%;
    } 

    .conf-info {
        font-weight: 400;
    }

    .private {
        width: 10vw;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 1vh;
        font-weight: 700;
        background-color: #E1BEBE;
        color: #C88A8A;
    }
    
    .public {
        width: 10vw;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1vh;
        text-align: center;
        font-weight: 700;
        background-color: #C2E1BE;
        color: #90C88A;
    }

    .cell-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 60vmax;
        height: 5vmax;
        border-radius: 3vh;
        padding-left: 1vw;
        padding-right: 1vw;
        margin-left: 1vw;
        margin-top: 2vh;
        background-color: white;
    }

    .profile-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .info-container {
        display: inline;
        margin-left: 90%;
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
        position: relative;
        background-color: white;
        width: 30vmax;
        height: 25vmax;
        border-radius: 3vh;
        margin-left: 70%;
        margin-top: 1%;
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

    const today = new Date;
    let imageLink = '/defaultProfilePicture.jpg'
    let name = 'Leumas'
    let position = 'CEO'
    let company = 'Google';
    let joiningDate = '01/08/2018';
    let activeConferences = '34 Active';
    let userConferences = [
        { name: 'Google I/O', location: 'Online', date: '20 May 2021', time: '01:00 PM', access: 'Public' },
        { name: 'Apple WWDC', location: 'Online', date: '3 Aug 2021', time: '05:00 PM', access: 'Private' }
    ]

    function logout() {
        Router.redirect('./');
    }

    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        }, function(error) {
        console.error('Sign Out Error', error);
    });
</script>