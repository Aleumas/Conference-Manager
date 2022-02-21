import SignIn from '../components/Sign_in.tsx'
import SignUp from '../components/Sign_up.tsx'
import React, { useState } from 'react'

function Auth(props) {

	let [auth, updateAuth] = useState('sign_in');

	if (auth == 'sign_in') {
		
		return (
			<SignIn>	
				<p> Don't have an account? <a onClick={() => {updateAuth('sign_up');}}> Sign up </a></p>
			</SignIn>
		)

	} else if (auth == 'sign_up') {

		return (
			<SignUp>
				<hr/>
				<p> Have an account? <a onClick={() => {updateAuth('sign_in');}}> Sign in</a>
				</p>
			</SignUp>
		)

	}

	return <h1> could not create auth component </h1>;	
}

export default Auth;
