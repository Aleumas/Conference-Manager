// Firebase import
import { app } from "./firebaseInit.js";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, onAuthStateChanged, browserSessionPersistence, signOut} from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc, getDoc, getDocs, collection, deleteDoc } from "firebase/firestore";


// Variables
var analytics = getAnalytics(app); 
var auth = getAuth(app); 
var firestore = getFirestore(app); 


// Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

// Login with firebase
export async function handleSignin() {
		const signinForm = document.getElementById('signin');
		signinForm?.addEventListener('submit', async (e) => {
			e.preventDefault();
			const email = signinForm.elements['email'].value;
			const password = signinForm.elements['password'].value;
			// Make login persistant 
			let persistMessage = await setPersistence(auth, browserSessionPersistence)
			.then(() => {

					return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
							return 'Successful!';
					})
					.catch((error) => {
						return error.code;
					});

			})
			.catch((error) => {
					return error.message;
			});

			const statusMapping = {
				"auth/internal-error" : "Empty field",
				"auth/wrong-password" : "Wrong username or password",
				"auth/user-not-found" : "Wrong username or password",
				"auth/invalid-email" : "Invalid email",
				"Successful!" :  "Successful!"
			};

			let currentStatus = document.getElementById('status_message');
			console.log(persistMessage)
			if (currentStatus != undefined) {
				currentStatus.innerHTML = statusMapping[persistMessage];
				currentStatus.style.color = (persistMessage == 'Successful!') ? "green" : "red";
				if (persistMessage == 'Successful!') window.location.replace(window.location.href + '/role');
			}
		});
}

// Signup with firebase
export async function handleSignup() {
		const signupForm = document.getElementById('signup');
			signupForm?.addEventListener('submit', async (e) => {
			e.preventDefault();
			const firstName = signupForm.elements['first_name'].value;
			const lastName = signupForm.elements['last_name'].value;
			const company = signupForm.elements['company'].value;
			const position = signupForm.elements['position'].value;
			const email = signupForm.elements['email'].value;
			const password = signupForm.elements['password'].value;

			// Make login persistant 
			const persistMessage = await setPersistence(auth, browserSessionPersistence)
			.then(() => {
					return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
					const user = userCredential.user;
					return setDoc(doc(firestore, 'users', user.uid), {
							firstName: firstName,
							lastName: lastName,
							company: company,
							position: position,
							joiningDate: today,
							conferences: 0,
							bookedConferences: []
					}).then(() => {
						return 'Successful!';	
					});

				})
				.catch((error) => {
					return error.code;
				});

			})
			.catch((error) => {
					return error.message;
			});
			const statusMapping = {
				"auth/internal-error" : "Empty field",
				"auth/email-already-in-use" : "Email is already in use",
				"auth/weak-password" : "Weak password",
				"auth/invalid-email" : "Invalid email",
				"Successful!" :  "Successful!"
			};

			let currentStatus = document.getElementById('status_message');
			if (currentStatus != undefined) {
				currentStatus.innerHTML = statusMapping[persistMessage];
				currentStatus.style.color = (persistMessage == 'Successful!') ? "green" : "red";
				if (persistMessage == 'Successful!') window.location.replace(window.location.href + '/role');
			}
		});


}

export async function signout() {
		await signOut(auth).then(function() {
				const lastIndex = window.location.href.lastIndexOf('/');
				const home = window.location.href.slice(0, lastIndex);
				lastIndex = home.lastIndexOf('/');
				home = home.slice(0, lastIndex);
				window.location.replace(home);
				console.log('Signed Out');
		}, function(error) {
				console.error('Sign Out Error', error);
		});
}

export async function deleteConference(conferences) {

		var user = auth.currentUser;
		
		onAuthStateChanged(auth, (user) => {
			if (user) {

				for ( let i = 0; i < conferences.length; i++) {
					deleteDoc(doc(firestore, 'conferences', user.uid, 'added', conferences[i].name));
				}

				const querySnapshot = getDoc(doc(firestore, 'users', user.uid));
				querySnapshot.then((result) => {
					updateDoc(doc(firestore, 'users', user.uid), {
						conferences:  result.data().conferences - conferences.length
					});
				});
			}
		})
	
}


export async function createConference() {

		var user = auth.currentUser;

		onAuthStateChanged(auth, (user) => {
			if (user) {

				const querySnapshot = getDoc(doc(firestore, 'conferences', user.uid));
				querySnapshot.then((result) => {
					if (!result.data() || Object.keys(result.data()).length == 0) {
						setDoc(doc(firestore, 'conferences', user.uid) , {
							conferences: [ 
								{
									name: document.getElementById('name').value,
									location: document.getElementById('location').value,
									time: document.getElementById('time').value,
									date: document.getElementById('date').value,
									access: document.getElementById('access').value,
									summary: document.getElementById('summary').value,
									attendees: 0,
									ownerId: user.uid,
									conferenceIndex: 0
								}
							]
						}).then(() => {
							updateDoc(doc(firestore, 'users', user.uid), {
								conferences: 1 
							}).then(() => {
								const lastIndex = window.location.href.lastIndexOf('/');
								const home = window.location.href.slice(0, lastIndex);
								window.location.replace(home + '/dashboard');
							});
						})
					} else {
						const  updatedConferences = result.data().conferences;
						updatedConferences.push(
								{
									name: document.getElementById('name').value,
									location: document.getElementById('location').value,
									time: document.getElementById('time').value,
									date: document.getElementById('date').value,
									access: document.getElementById('access').value,
									summary: document.getElementById('summary').value,
									attendees: 0,
									ownerId: user.uid,
									conferenceIndex: updatedConferences.length
								}
							) 

						updateDoc(doc(firestore, 'conferences', user.uid), {
							conferences: updatedConferences 
						}).then(() => {
							updateDoc(doc(firestore, 'users', user.uid), {
								conferences:  result.data().conferences.length + 1
							}).then(() => {
								const lastIndex = window.location.href.lastIndexOf('/');
								const home = window.location.href.slice(0, lastIndex);
								window.location.replace(home + '/dashboard');
							});
						});
					}

				})
				
				
			}
		});
	}

export async function book(conference, ownerId, conferenceIndex) {
	var user = auth.currentUser;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const querySnapshot = getDoc(doc(firestore, 'conferences', ownerId));
				querySnapshot.then((result) => {

					const  updatedConferences = result.data().conferences;
					const userSnapshot = getDoc(doc(firestore, 'users', user.uid));
					updatedConferences[conferenceIndex].attendees = updatedConferences[conferenceIndex].attendees + 1;

					updateDoc(doc(firestore, 'conferences', ownerId), {
						conferences: updatedConferences
					});

					userSnapshot.then((result) => {
						const updatedBookedConferences = result.data().bookedConferences;
						updatedBookedConferences.push(conference);
						updateDoc(doc(firestore, 'users', user.uid), {
							bookedConferences: updatedBookedConferences 
						});
					})
					

				});
		}
	});
}


export async function unbook(ownerId, conferenceIndex) {
	var user = auth.currentUser;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const querySnapshot = getDoc(doc(firestore, 'conferences', ownerId));
				querySnapshot.then((result) => {

					const  updatedConferences = result.data().conferences;
					const userSnapshot = getDoc(doc(firestore, 'users', user.uid));
					updatedConferences[conferenceIndex].attendees = updatedConferences[conferenceIndex].attendees - 1;

					updateDoc(doc(firestore, 'conferences', ownerId), {
						conferences: updatedConferences
					});
					userSnapshot.then((result) => {
						const updatedBookedConferences = result.data().bookedConferences;
						updatedBookedConferences.splice(conferenceIndex,1);
						updateDoc(doc(firestore, 'users', user.uid), {
							bookedConferences: updatedBookedConferences 
						});
					})

				});
		}
	});
}
