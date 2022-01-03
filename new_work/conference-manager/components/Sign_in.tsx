import Button from '../components/Button.tsx'
import Input from '../components/Input.tsx'
import { handleSignup, handleSignin } from '../scripts/firebase.tsx';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Sign_in(props) {
	
	const [statusMessage, updateStatus] = useState('');

	const statusMapping = {
		"auth/internal-error" : "Empty field",
		"auth/wrong-password" : "Wrong username or password",
		"auth/invalid-email" : "Invalid email",
		"Successful!" :  "Successful!"
	};

	useEffect(() => {

	
		var auth = getAuth();
		var user = auth.currentUser;
		let currentStatus = document.getElementById('status_message');

		if (currentStatus != undefined) {
			currentStatus.innerHTML = statusMapping[statusMessage];
			currentStatus.style.color = (statusMessage == 'Successful!') ? "green" : "red";
		}

		onAuthStateChanged(auth, (user) => {
				if (user) {
					window.location.replace(window.location.href + '/role');
					console.log('Logged in');
				} else {
					console.log('Logged out');
				}
		});


	}, [statusMessage]);	

	return (
		<div className='sign-in__container'>
			<div className='sign-in__content load-animation'>
				<h1>Conference Manager</h1>
				<Input id='email' type='normal' placeholder='Email'/>
				<Input id='password' type='password' placeholder='Password'/>
				<Button className='' title='Sign in' color='#4C82F8' onclick={() => { 

					handleSignin(document.getElementById('email').value, document.getElementById('password').value).then( (message) => {
						updateStatus(message);
					});
					
				}}/>

				{ (statusMessage != '') && <p id='status_message' className='status fade'></p> }
				{props.children} 
			</div>
		</div>
	);
}

export default Sign_in;
