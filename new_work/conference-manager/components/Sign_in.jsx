import Button from './Button'
import Input from './Input'
import { handleSignup, handleSignin } from '../scripts/firebase';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Sign_in(props) {
	
		return (
		<div className='sign-in__container'>
			<div className='sign-in__content load-animation'>
				<h1>Conference Manager</h1>
				<form id='signin'>
					<Input id='email' type='normal' placeholder='Email'/>
					<Input id='password' type='password' placeholder='Password'/>
					<Button type='submit' className='' title='Sign in' color='#4C82F8' onclick={() => { 
						handleSignin();
					}}/>
				</form>
				<p id='status_message' className='status fade'></p> 
				{props.children} 
			</div>
		</div>
	);
}

export default Sign_in;
