import Button from '../components/Button.tsx'
import Input from '../components/Input.tsx'
import { handleSignup, handleSignin } from '../scripts/firebase.tsx';
import React, { useState, useEffect } from 'react';

function Sign_up(props) {
	

	return (
		<div className='sign-in__container'>
			<div className='sign-in__content load-animation'>
				<h1>Conference Manager</h1>
				<form id='signup'>
					<Input id='first_name' type='normal' placeholder='First name'/>
					<Input id='last_name' type='normal' placeholder='Last name'/>
					<Input id='company' type='normal' placeholder='Company'/>
					<Input id='position' type='normal' placeholder='Position'/>
					<Input id='email' type='normal' placeholder='Email'/>
					<Input id='password' type='password' placeholder='Password'/>
					<Button type='submit' className='' title='Sign up' color='#4C82F8' onclick={() => { 
						handleSignup();			
					}}/>
				</form>
				<p id='status_message' className='status fade'></p> 
				{props.children} 
			</div>
		</div>
	);
}

export default Sign_up;
