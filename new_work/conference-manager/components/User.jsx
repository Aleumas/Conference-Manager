import React, { useState, useEffect, Fragment } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc } from "firebase/firestore";


function User() {
	const [content, changeContent] = useState(<h1></h1>);

	useEffect(() => {

		let auth = getAuth();
		let user = auth.currentUser;


		onAuthStateChanged(auth, (user) => {
			if (user) {

				const querySnapshot = getDoc(doc(getFirestore(), 'users', user.uid));

				querySnapshot.then( (result) => {
						if (result.exists()) {
	
							const data = result.data();

							console.log(result);
							const userInfo = (
								<Fragment> 
									<h1 className='user-name'> {data.firstName + " " + data.lastName} </h1>
									<h3 className='company'> {data.position} </h3>
									<div className='info-container'>
										<div className='info-titles'>
											<hr/>
											<div className='info-row'>
												<p> Company </p>
												<p className='info'> {data.company} </p>
											</div>
											<hr/>
											<div className='info-row'>
												<p> Date Joined </p>
												<p className='info'> {data.joiningDate} </p>
											</div>
											<hr/>

											<div className='info-row' style={{ marginBottom: '0.5rem' }}>
												<p> Conferences </p>
												<p id='numberOfConferences' className='info'> {data.conferences} </p>
											</div>
										</div>
										
									</div>
								</Fragment>
							);

							changeContent(userInfo);							

						}
				});



				}
			});


		}, []);

	

	return (
		<div className='user-info-container'>
			{content}
		</div>
	);
}

export default User;
