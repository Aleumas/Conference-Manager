import Button from '../components/Button.tsx'
import Input from '../components/Input.tsx'
import { handleSignup, handleSignin } from '../scripts/firebase.tsx';
import React, { useState, useEffect } from 'react';

function Sign_up(props) {
	
	const [statusMessage, updateStatus] = useState('');

	const statusMapping = {
		"auth/internal-error" : "Empty field",
		"auth/email-already-in-use" : "Email is already in use",
		"auth/weak-password" : "Weak password",
		"auth/invalid-email" : "Invalid email",
		"Successful!" :  "Successful!"
	};

	useEffect(() => {

		let currentStatus = document.getElementById('status_message');

		console.log("Status: " + statusMessage);

		if (currentStatus != undefined) {
			currentStatus.innerHTML = statusMapping[statusMessage];
			currentStatus.style.color = (statusMessage == 'Successful!') ? "green" : "red";
		}

	}, [statusMessage]);	

	return (
		<div className='sign-in__container'>
			<div className='sign-in__content load-animation'>
				<h1>Conference Manager</h1>
				<Input id='first_name' type='normal' placeholder='First name'/>
				<Input id='last_name' type='normal' placeholder='Last name'/>
				<Input id='company' type='normal' placeholder='Company'/>
				<Input id='position' type='normal' placeholder='Position'/>
				<Input id='email' type='normal' placeholder='Email'/>
				<Input id='password' type='password' placeholder='Password'/>
				<Button className='' title='Sign up' color='#4C82F8' onclick={() => { 

					handleSignup(document.getElementById('first_name').value, document.getElementById('last_name').value, document.getElementById('company').value, document.getElementById('position').value, document.getElementById('email').value, document.getElementById('password').value).then( (message) => {
						console.log("Message: " + message);
						updateStatus(message);
					});
					
				}}/>

				{ (statusMessage != '') && <p id='status_message' className='status fade'></p> }
				{props.children} 
			</div>
		</div>
	);
}

export default Sign_up;
