<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">

<input id='name' bind:value={name} placeholder="name">
<input id='date' bind:value={date} placeholder="date">
<input id='location' bind:value={location} placeholder="location">
<input id='time' bind:value={time} placeholder="time">
<input id='access' bind:value={access} placeholder="access">

<button on:click="{() => addConf(conferenceData)}"> Add Conference </button>

<style>
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
</style>

<script>

    import Router from 'page';
    import firebase from 'firebase/app';

    let name = '';
    let date = '';
    let location = '';
    let time = '';
    let access = '';

    $: conferenceData = {name: name, date: date, location: location, time: time, access: access};

    function addConf(newConferenceData) {

        var user = firebase.auth().currentUser;

        let confRef = firebase.database().ref('users/' + user.uid + '/conferences');
        let conferences; 
        confRef.on('value', (snapshot) => {
            const data = snapshot.val();
            conferences = data;
        });

        if (conferences == null) {
            firebase.database().ref('users/' + user.uid + '/conferences').set({
                conference: [newConferenceData] 
            }); 
        } else {
            firebase.database().ref('users/' + user.uid + '/conferences').update({
                conference: conferences.conference.concat(newConferenceData)
            });
        }
        
        Router.redirect('/Planner');
        console.log('New conf created');
    }
</script>