// Firebase import
import { app } from "../scripts/firebaseInit.tsx";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, onAuthStateChanged, browserSessionPersistence, signOut} from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc, getDoc, getDocs, collection } from "firebase/firestore";


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
export async function handleSignin(email, password) {
		// Make login persistant 
		let persistMessage = setPersistence(auth, browserSessionPersistence)
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

		return await persistMessage;
}

// Signup with firebase
export async function handleSignup(firstName, lastName, company, position, email, password) {

			// Make login persistant 
			let persistMessage = setPersistence(auth, browserSessionPersistence)
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

		return await persistMessage;
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


export async function createConference() {

		var user = auth.currentUser;

		onAuthStateChanged(auth, (user) => {
			if (user) {


				setDoc(doc(firestore, 'conferences', user.uid, 'added', `${document.getElementById('name').value}`) , {
						name: document.getElementById('name').value,
						location: document.getElementById('location').value,
						time: document.getElementById('time').value,
						date: document.getElementById('date').value,
						access: document.getElementById('access').value 
				}).then(() => {
					const querySnapshot = getDoc(doc(firestore, 'users', user.uid));
					querySnapshot.then((result) => {
						updateDoc(doc(firestore, 'users', user.uid), {
								conferences:  result.data().conferences + 1
						});

						const lastIndex = window.location.href.lastIndexOf('/');
						const home = window.location.href.slice(0, lastIndex);
						window.location.replace(home + '/dashboard');
					})
					
				});
				
			}
		});
		}


