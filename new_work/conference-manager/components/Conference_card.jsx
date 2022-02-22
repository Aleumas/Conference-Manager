import { book, unbook } from '../scripts/firebase';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../scripts/firebaseInit";
function Conference_card(props) {
	const location_icon = require('../public/Location.svg').default.src;
	const date_icon = require('../public/Date.svg').default.src;
	const time_icon = require('../public/Time.svg').default.src;
	const people_icon = require('../public/People.svg').default.src;
	const [attendees, updateAttendees] = useState(props.attendees);
	const bookButton = <button className='book-conference' onClick={() => {
						book(props.title, props.ownerId, props.conferenceIndex);
						updateAttendees(attendees + 1);
						updateBooked('true');
					}}>book now</button>

	const unbookButton = <button className='unbook-conference' onClick={() => {
						unbook(props.ownerId, props.conferenceIndex);
						updateAttendees(attendees - 1);
						updateBooked('false');
					}}>cancel booking</button> 
	const [booked, updateBooked] = useState('');

	var firestore = getFirestore(app); 
	var auth = getAuth(app); 
	var user = auth.currentUser;
	useEffect( () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const userSnapshot = getDoc(doc(firestore, 'users', user.uid));
				userSnapshot.then((result) => {
					const bookedConferences = result.data().bookedConferences;
					updateBooked(`${bookedConferences.includes(props.title)}`);
				})
			}
		});
	},[])
		console.log(booked);

	return (
		<div className={'card-container'}>
			<div className={'card-content'}>

				<h1 className='card-title'>{props.title}</h1>
				<p className='card-summary'>{props.summary}</p>

				<div className='card-details-container'>

					<div className='card-details'>

						<div className='details-container'>
							<img className='icon' src={location_icon}/>
							<h4 className='details'>{'Location: ' + props.location}</h4>
						</div>

						<div className='details-container'>
							<img className='icon' src={date_icon}/>
							<h4 className='details'>{'Date: ' + props.date}</h4>
						</div>

						<div className='details-container'>
							<img className='icon' src={time_icon}/>
							<h4 className='details'>{'Time: ' + props.time}</h4>
						</div>

						<div className='details-container'>
							<img className='icon' src={people_icon}/>
							<h4 className='details'>{'Attendees: ' + attendees}</h4>
						</div>

					</div>
					
					{booked == 'true' ? unbookButton : bookButton}
				</div>
				
			</div>
		</div>
	);
}

export default Conference_card;
