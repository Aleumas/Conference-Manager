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
    <div class='panel-container'>
    
    <div class='left-panel'>
    <h1 class='pageTitle'> Conferences </h1>
    <ul>
        <li><button class='add-event' on:click={addConf}> + New Event </button></li>
        <li><button class='logout' on:click={() => logout()}>Logout</button></li>
    </ul>
    <h2> My conferences</h2>
    <table>
    	<tr>
		<th> name </th>
		<th> location </th>
		<th> date </th>
		<th> time </th>
		<th> access </th>
		<th></th>
    	</tr>

	{#each userConferences as conf, i}
	<tr>
            <td class='left-rounded-corners'> {conf.name} </td>
            <td> {conf.location} </td>
            <td> {conf.date} </td>
            <td> {conf.time} </td>

            {#if conf.access == 'Private'} 
	    	<td>
		    <div class='private'>
        	      {conf.access} 
		    </div>
		</td>
            {:else}
		<td>
		    <div class='public'>
        	      {conf.access} 
		    </div>
		</td>
            {/if}
	<td class='right-rounded-corners'>
            <select> 
                <option value="none"> ••• </option>
                <option value='delete'> delete </option>
            </select>
	</td>
	</tr>
    {/each}

    </table>
    </div>
    <div class='right-panel'>

        <div class='profile-container'>
		{#if userProfilePicture}
        		<img on:click={()=>{fileinput.click();}} on:mouseover={profilePictureOnHover} on:mouseleave={profilePictureOffHover} src={userProfilePicture} alt='profile picture'/>
		{:else}
        		<img on:click={()=>{fileinput.click();}} on:mouseover={profilePictureOnHover} on:mouseleave={profilePictureOffHover} src={defaultProfilePicture} alt='profile picture'/>
		{/if}
		<input style="display:none" type="file" accept=".jon:click={()=>{fileinput.click();}}pg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
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
            <div  id='o' class='info'>
                <p> {company} </p>
                <p> {joiningDate} </p>
                <p> {activeConferences} </p>
            </div>
        </div>
    </div>
    </div>
</div>
</div>

<style>
    
    h2 {
        font-size: 1.8vmax;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 2vh;
        padding-top: 2vh;
    }
    
    ul {
        margin: 0;
        padding-left: 1vw;
    }

    ul li {
        display: inline-block;
        list-style-type: none;
        margin-top: 0;
        margin-left: 0;
        padding-top: 0;
    } 

    select {
        width: 10%;
        height: 7vh;
        padding-left: 3vh;
        margin-left: 2vw;
        -moz-appearance: none;
        -webkit-appearance: none;

        font-weight: 700;
        font-size: x-large;
        border: none;
        background-color: white;
        color: #7d7975;
    }
    
    option {
        display: block;
        width: 10%;
        height: 7vh;
        padding-left: 3vh;
        margin-left: 2vw;

        font-weight: 700;
        font-size: small;
        border-radius: 2vh;
        border-color: #BFBFBF;
        border-width: 2px;
        background-color: white;
        color: #7d7975;
    }

    select option[value=none] {
    	display: none;
    }

    select::-ms-expand {
        display: none;
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
        margin-bottom: -1vmax;
    }

    th, td {
  	margin: 1vmax 2vmax 1vmax 2vmax;
  	text-align: center;
        font-size: 1.2vmax;
    }

    td {
    	background-color: white;
	padding-right: 2vmax;
	padding-left: 2vmax;
    }

    tr {
    	margin-bottom: 2vmax;
    }

    .left-rounded-corners {
        border-top-left-radius: 3vh;
        border-bottom-left-radius: 3vh;
    }

    .right-rounded-corners {
	border-top-right-radius: 3vh;
	border-bottom-right-radius: 3vh;
    }

    table {
    	border-spacing: 0 15px;
	margin-left: 1vmax;
    }

    .access-container {
    	background-color: white;
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

    button {
        display: inline-block;
        margin-right: 0;
        margin-bottom: 5vh;
        padding: 2vh 2vh;
        color: white;
        font-weight: 700;
        background-color: #4C82F8;
        font-size: 1.2vmax;
        border-radius: 2vh;
        border: none;
    }

    .logout {
        background-color: #F88A4C;
        margin: 0;
        margin-right: 5vw;
        margin-top: 0;
    }

    .add-event {
        margin: 0;
        margin-top: 1vw;
    
    }

    .frame {
        width: 10%;
        height: 10%;
    } 

    .conf-info {
        font-weight: 400;
    }

    .private {
        height: 40%;
	padding-left: 1vmax;
	padding-right: 1vmax;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 0.5vmax;
        font-weight: 700;
        background-color: #E1BEBE;
        color: #C88A8A;
    }
    
    .public {
        height: 40%;
	padding-left: 1vmax;
	padding-right: 1vmax;
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

    .panel-container {
        display: flex;
    }

    .right-panel {
        flex: 1;
        background-color: white;
        width:28vmax;
        height: 25vmax;
        border-radius: 3vh;
    }

    .left-panel {
        flex: 1;
        width: 65vmax;
        height: 100vmax;
        margin-right: 1vw;
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
        margin-top: 0;
        padding-top: 2vmax;
    }

    .pageTitle {
        text-align: left;
        padding-left: 1vw;
    }

    img {
        width: 5vmax;
        margin-top: 4vmax;
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
    // General imports
    import Router from 'page';

import firebase from 'firebase/app';


    let defaultProfilePicture = '/defaultProfilePicture.jpg';
    let userProfilePicture;
    let name = 'none'
    let position = 'none'
    let company = 'none';
    let joiningDate = 'none';
    let userConferences = [];
    let option;
    $: activeConferences = userConferences.length;
    

    firebase.auth().onAuthStateChanged(user => {
        (firebase.database().ref('users/' + user.uid + '/conferences')).on('value', (snapshot) => {
            if (snapshot.val() != null) {
                userConferences = snapshot.val().conference;
            }  
        });

        (firebase.database().ref('users/' + user.uid + '/firstName')).on('value', (snapshot) => {
            name = snapshot.val();
        });

        (firebase.database().ref('users/' + user.uid + '/position')).on('value', (snapshot) => {
            position = snapshot.val();
        });

        (firebase.database().ref('users/' + user.uid + '/company')).on('value', (snapshot) => {
            company = snapshot.val();
        });

        (firebase.database().ref('users/' + user.uid + '/joiningDate')).on('value', (snapshot) => {
            joiningDate = snapshot.val();
        });

        (firebase.database().ref('users/' + user.uid + '/profilePicture')).on('value', (snapshot) => {
            userProfilePicture = snapshot.val();
        });
    })
    
    
    function profilePictureOnHover() {
        imageLink = '/defaultProfilePictureHover.jpg';
    }

    function profilePictureOffHover() {
        imageLink = '/defaultProfilePicture.jpg';
    }

    function changeProfilePicture() {
        
    }

    document.getElementsByTagName('select').onchange = function() {
    	console.log("changed");
    }

    let  avatar, fileinput;
	
    const onFileSelected =(e)=>{
    	let image = e.target.files[0];
	let reader = new FileReader();
	reader.readAsDataURL(image);
	//avatar = e.target.result
	reader.onload = e => {
	firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
		profilePicture: e.target.result 
	})
	}
    }

    function deleteConference(index) {
    	console.log("click");
    	console.log(index);
    }
    function logout() {
        firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        }, function(error) {

        console.error('Sign Out Error', error);
    });
        Router.redirect('./');
    }

    function addConf() {
        Router.redirect('/AddConference');
    }

    

</script>
