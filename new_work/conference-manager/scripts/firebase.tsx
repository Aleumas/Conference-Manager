// Firebase import
import { app } from "../scripts/firebaseInit.tsx";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, inMemoryPersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


// Variables
var analytics = getAnalytics(app); 
var auth = getAuth(app); 
var firestore = getFirestore(app); 
var database = getDatabase(app); 


// Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

// Login with firebase
export async function handleSignin(email, password) {
		let signinMessage = signInWithEmailAndPassword(auth, email, password) .then((userCredential) => {

				// Make login persistant 
				let persistMessage = setPersistence(auth, inMemoryPersistence)
				.then(() => {
						signInWithEmailAndPassword(auth, email, password);
						return 'Successful!';
				})
				.catch((error) => {
						// Handle Errors here.
						return error.message;
				});
				
				return persistMessage;

		})
		.catch((error) => {
			return error.code;
		});

		return await signinMessage;
}

// Signup with firebase
export async function handleSignup(firstName, lastName, company, position, email, password) {
				createUserWithEmailAndPassword(auth, email, password) .then((userCredential) => {

				// Change login state
				auth.onAuthStateChanged((user) => {
						if (user) {
								// Logged in
							console.log('logged in');
						} else {
								// Logged out
								console.log('logged out');
						}
				});

				// Make login persistant 
				auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
				.then(() => {
						console.log('persisted');
						return signInWithEmailAndPassword(auth, email, password);
				})
				.catch((error) => {
						// Handle Errors here.
						console.log(error.message);
				});

				// Add user information to firebase 
				var user = auth.currentUser;
				database.ref('users/' + user.uid).set({
								firstName: firstName,
								lastName: lastName,
								company: company,
								position: position,
								joiningDate: today

				});

		})
		.catch((error) => {
			// status update
			console.log(error.message);
		});
}

