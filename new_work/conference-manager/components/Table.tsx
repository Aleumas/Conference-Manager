import React, { useEffect, useState, Fragment } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDocs, collection } from "firebase/firestore";

function Table() {

	const [conferences, updateConferences] = useState(<tr><td>loading...</td></tr>);

	
	useEffect(() => {

		let auth = getAuth();
		let user = auth.currentUser;

		onAuthStateChanged(auth, (user) => {
			if (user) {

				let data = [];
				const querySnapshot = getDocs(collection(getFirestore(), 'conferences', user.uid, 'added' ));

				querySnapshot.then( (result) => {
						if (!result.empty) {
							result.forEach((doc) => {
								data.push(doc.data());
							});	

							const rows = data.map((conference, index) => {
								return (
									<Fragment key={index}>
										<tr>
											<td className='left-rounded-corners'> { conference.name } </td>
											<td> { conference.location } </td>
											<td> { conference.date } </td>
											<td> { conference.time } </td>
											<td className='right-rounded-corner'> 
												{conference.access == 'Public' ? <div className='public'> { conference.access} </div> : <div className=' private'> { conference.access} </div> 
												}
											</td>
										</tr>
									</Fragment>
								)}
							);
							updateConferences(rows);
						}
					});

				}
			});

	}, []);

	return (
		<table id='table'>
			<thead>
				<tr>
					<th> name </th>
					<th> location </th>
					<th> date </th>
					<th> time </th>
					<th> access </th>
				</tr>
			</thead>
			<tbody>
				{conferences}
			</tbody>
		</table>
	);

}

export default Table;
