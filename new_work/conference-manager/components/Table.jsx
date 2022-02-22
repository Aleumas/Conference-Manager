import React, { useEffect, useState, Fragment } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc, deleteDoc } from "firebase/firestore";
import { deleteConference } from '../scripts/firebase'
import differenceBy from 'lodash/differenceBy';
import DataTable from 'react-data-table-component';

function Table() {

	const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
	const [selectedRows, setSelectedRows] = useState(false);
  	const [toggledClearRows, setToggleClearRows] = useState(false);

	const handleRowSelected = React.useCallback(state => {
			setSelectedRows(state.selectedRows);
	}, []);
  
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

		const contextActions = React.useMemo(() => {
			const handleDelete = () => {
				
				if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {

					deleteConference(selectedRows);
					document.getElementById('numberOfConferences').innerHTML = document.getElementById('numberOfConferences').innerHTML - selectedRows.length;
					setToggleClearRows(!toggledClearRows);
					setRows(differenceBy(rows, selectedRows, 'name'));
				}
			};

			return (
				<button className='delete' onClick={handleDelete} style={{ backgroundColor: '#F8554C' }}>
					delete
				</button>
			);
		}, [rows, selectedRows, toggledClearRows]);

	useEffect(() => {

		let auth = getAuth();
		let user = auth.currentUser;
		
		const timeout = setTimeout(() => {

			onAuthStateChanged(auth, (user) => {
				console.log('read');
				if (user) {

					const querySnapshot = getDoc(doc(getFirestore(), 'conferences', user.uid ));

					querySnapshot.then( (result) => {
							
						if (result.data()) {
							setRows(result.data().conferences);
							{}		}
						setPending(false);

					});
					}
				});
		});

		return () => clearTimeout(timeout);
		}, []);

	return (
		<div className='table'>
			<DataTable 
				title='Your Conferences'
				columns={columns}
				data={rows}
				customStyles={customStyles}
				progressPending={pending}
				contextActions={contextActions}
				onSelectedRowsChange={handleRowSelected}
				clearSelectedRows={toggledClearRows}	
				highlightOnHover
				selectableRows
				pointerOnHover
				pagination
			/>
		</div>
	);

}

export default Table;
