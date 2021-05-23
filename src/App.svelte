<script>
	// Firebase imports 
    import firebase from "firebase/app";
    import "firebase/analytics";
    import "firebase/auth";
    import "firebase/firestore";

    // Firebase config
    var firebaseConfig = {
        apiKey: "AIzaSyAJ3JdkQaCpsBNQkdZ9C3TzzIuPdPI8wak",
        authDomain: "conference-manager-f1c34.firebaseapp.com",
        projectId: "conference-manager-f1c34",
        storageBucket: "conference-manager-f1c34.appspot.com",
        messagingSenderId: "236826523049",
        appId: "1:236826523049:web:f57db357c14643491180b8",
        measurementId: "G-LYR5JNKQJP"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    import Router from 'page';
    import { isLoggedin } from './main.js';
    import Login from './Login.svelte'
	import Signup from './Signup.svelte'
	import Role from './Role.svelte'

	let loginValue;

    const unsubscribe = isLoggedin.subscribe(value => {
		loginValue = value;
	}); 

	let page;
	let params;

	Router('/', () => page = Login);

	Router('/Signup', (ctx, next) => {
		params = ctx.params;
		next();
	}, () => page = Signup);

	Router('/Role', (ctx, next) => {
		params = ctx.params;
		next();
	}, () => page = Role);

	Router.start();
</script>


<svelte:component this={page} {params}/>
