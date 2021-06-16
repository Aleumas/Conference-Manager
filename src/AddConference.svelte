<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
<div class='load-animation'>
    <h2> Create a new conference</h2>
    <h3> Enter conference information to share with attendees</h3>
    <input id='name' bind:value={name} placeholder="name" required>
    <input id='location' bind:value={location} placeholder="location" required>
    <input id='time' bind:value={time} placeholder="time" required>
    <Datepicker bind:formattedSelected bind:dateChosen required> 
        <button class='date-picker'> 
            {#if dateChosen} {formattedSelected} {:else} Pick a date {/if}
        </button>
    </Datepicker>
    <select id='access' bind:value={access} placeholder="access" required>
        <option value=''> access </option>
        <option value='Public'> public </option>
        <option value='Private'> private </option>
    </select>
    <button on:click="{() => addConf(conferenceData)}"> Add Conference </button>
</div>

<style>

    .date-picker {
        width: 25vw;
        padding-left: 3vh;

        font-weight: 700;
        font-size: small;
        text-align: left;
        border-radius: 2vh;
        border-color: #BFBFBF;
        border-width: 2px;
        background-color: white;
        color: #7d7975;
    }
    .load-animation {
        overflow: hidden;
        animation: fadeIn 1s linear;
    }
    h3 {
        margin-left: 2vw;
        margin-top: 1.5vh;
        margin-bottom: 5vh;
        font-weight: 500;
        color: #7d7975;
    }
    
    h2 {
        margin-left: 2vw;
        margin-bottom: 0;
    }

    select {
        display: block;
        width: 25%;
        height: 7vh;
        padding-left: 3vh;
        margin-left: 2vw;
        margin-bottom: 3vh;

        font-weight: 700;
        font-size: small;
        border-radius: 2vh;
        border-color: #BFBFBF;
        border-width: 2px;
        background-color: white;
        color: #7d7975;
    }
    
    option {
        display: block;
        width: 20%;
        height: 7vh;
        padding-left: 3vh;
        margin-left: 2vw;
        margin-bottom: 3vh;

        font-weight: 700;
        font-size: small;
        border-radius: 2vh;
        border-color: #BFBFBF;
        border-width: 2px;
        background-color: white;
        color: #7d7975;
    }

    input {
        display: block;
        width: 50%;
        height: 7vh;
        padding-left: 3vh;
        margin-bottom: 3vh;
        margin-left: 2vw;

        font-weight: 700;
        font-size: small;
        border-radius: 2vh;
        border-color: #BFBFBF;
        border-width: 2px;
    }

    button {
        display: block;
        width: 50%;
        height: 7vh;
        margin-left: 2vw;
        margin-bottom: 5vh;
        padding: 1vh;

        color: white;
        font-weight: 700;
        background-color: #4C82F8;
        font-size: medium;
        border-radius: 2vh;
    }

    @keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }
</style>

<script>

    import Router from 'page';
    import Datepicker from 'svelte-calendar'
    import firebase from 'firebase/app';

    let name = '';
    let location = '';
    let time = '';
    let access = '';
    let formattedSelected;
    let dateChosen;
    $: date = formattedSelected;

    $: conferenceData = {name: name, date: date, location: location, time: time, access: access};

    function addConf(newConferenceData) {

        var user = firebase.auth().currentUser;
        var conferencesSnapshot;

        let confRef = firebase.database().ref('users/' + user.uid + '/conferences');
        confRef.on('value', (snapshot) => {
            conferencesSnapshot = snapshot.val(); 
        });

        if (conferencesSnapshot == null) {
            firebase.database().ref('users/' + user.uid + '/conferences').set({
                conference: [conferenceData] 
            }); 
        } else {
            firebase.database().ref('users/' + user.uid + '/conferences').update({
                conference: conferencesSnapshot.conference.concat(conferenceData)
            });
        }
        
        Router.redirect('/Planner');
    }
</script>
