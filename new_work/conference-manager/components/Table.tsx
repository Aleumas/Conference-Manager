import React, { useEffect, useState, Fragment } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import DataTable from 'react-data-table-component';

function Table() {

	const [pending, setPending] = React.useState(true);
	const [rows, setRows] = React.useState([]);
	const columns = [
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true,
			grow: 2,
			style: {
				color: '#5C5C5C',
				fontSize: '14px',
				fontWeight: 600,
			},
		},
		{
			name: 'Location',
			selector: row => row.location,
			style: {
				color: '#5C5C5C',
				fontSize: '14px',
				fontWeight: 600,
			},
		},
		{
			name: 'Date',
			selector: row => row.date,
			sortable: true,
			style: {
				color: '#5C5C5C',
				fontSize: '14px',
				fontWeight: 600,
			},
		},
		{
			name: 'Time',
			selector: row => row.time,
			sortable: true,
			style: {
				color: '#5C5C5C',
				fontSize: '14px',
				fontWeight: 600,
			},
		},
		{
			name: 'Access',
			selector: row => row.access,
			style: {
				color: '#5C5C5C',
				fontSize: '14px',
				fontWeight: 600,
			},
		}
	];

	const customStyles = {
			headRow: {
				style: {
					fontWeight: 600,
				},
			},
			headCells: {
				style: {
					color: '#3A3A3A',
					fontSize: '14px',
				},
			},
			rows: {
				highlightOnHoverStyle: {
					backgroundColor: 'rgb(230, 244, 244)',
					borderBottomColor: '#FFFFFF',
					outline: '1px solid #FFFFFF',
				},
			},
			pagination: {
				style: {
					border: 'none',
				 },
			},
		};

	useEffect(() => {

		let auth = getAuth();
		let user = auth.currentUser;

		const timeout = setTimeout(() => {

			onAuthStateChanged(auth, (user) => {
				if (user) {

					const querySnapshot = getDocs(collection(getFirestore(), 'conferences', user.uid, 'added' ));

					querySnapshot.then( (result) => {
							if (!result.empty) {

								const data = result.docs.map((doc) => { return doc.data() });
								setRows(data);
								setPending(false);
								
							}
						});

					}
				});
		});

		return () => clearTimeout(timeout);
		}, []);

	return (
		<div className='table'>
			<DataTable 
				columns={columns}
				data={rows}
				customStyles={customStyles}
				progressPending={pending}
				highlightOnHover
				pointerOnHover
			/>
		</div>
	);

}

export default Table;
