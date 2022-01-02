import Button from '../components/Button.tsx'
import Input from '../components/Input.tsx'

function Sign_up(props) {
	return (
		<div className='sign-in__container'>
			<div className='sign-in__content load-animation'>
				<h1>Conference Manager</h1>
				<Input type='normal' placeholder='First name'/>
				<Input type='normal' placeholder='Last name'/>
				<Input type='normal' placeholder='Company name'/>
				<Input type='normal' placeholder='Company position'/>
				<Input type='normal' placeholder='Email'/>
				<Input type='password'  placeholder='Password'/>
				<Button title='Sign up' color='#4C82F8'/>
				{props.children}
			</div>
		</div>
	);
}

export default Sign_up;
