import React, { useState, useEffect } from 'react';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Calendar from 'react-calendar';

function calendar() {

	const [value, onChange] = useState(new Date());

	console.log('today: ', value);

	useEffect(() => {

		let auth = getAuth();
		let user = auth.currentUser;

		onAuthStateChanged(auth, (user) => {
			if (user) {

				const querySnapshot = getDocs(collection(getFirestore(), 'conferences', user.uid, 'added' ));

				querySnapshot.then( (result) => {
						if (!result.empty) {

							const dates = result.docs.map((doc) => { return new Date(doc.data().date + 'Z') });
							console.log(dates);

							
						}
					});

				}
			});

		}, []);


	return (
		<div>
			<Calendar
					onChange={onChange}
					value={value}
				/>	
		</div>
	);
}

export default calendar;
