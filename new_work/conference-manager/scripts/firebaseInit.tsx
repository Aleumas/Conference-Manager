
// Firebase imports 
import { initializeApp } from "firebase/app";

// Firebase config
var firebaseConfig = {
		apiKey: "AIzaSyAJ3JdkQaCpsBNQkdZ9C3TzzIuPdPI8wak",
		authDomain: "conference-manager-f1c34.firebaseapp.com",
		projectId: "conference-manager-f1c34",
		storageBucket: "conference-manager-f1c34.appspot.com",
		messagingSenderId: "236826523049",
		appId: "1:236826523049:web:f57db357c14643491180b8",
databaseURL: "https://conference-manager-f1c34-default-rtdb.firebaseio.com/",
		measurementId: "G-LYR5JNKQJP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

