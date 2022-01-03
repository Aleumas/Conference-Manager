<script>
		// Firebase imports 
    import firebase from "firebase/app";
    import "firebase/analytics";
    import "firebase/auth";
    import "firebase/firestore";
    import "firebase/database";

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
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    import Router from 'page';
    import { store } from './store.js';
    import Login from './Login.svelte'
	import Signup from './Signup.svelte'
	import Role from './Role.svelte'
    import Planner from './Planner.svelte';
    import AddConference from './AddConference.svelte';

	let isLoggedin;

    store.subscribe(value => {
		isLoggedin = value;
	}); 


	let page;
	let params;
	var user = firebase.auth().currentUser;

	console.log(user);
	Router('/',
		// (ctx, next) => {
		// 	console.log(user);
		// 	if (user) {
		// 		Router.redirect('/Role');
		// 	} else {
		// 		Router.redirect('/Signup');
		// 	}
		// }, 
		() => page = Role);




	Router('/Signup', (ctx, next) => {
		params = ctx.params;
		next();
	}, () => page = Signup);

	Router('/Role', (ctx, next) => {
		params = ctx.params;
		next();
	}, () => page = Role);

	Router('/Planner', (ctx, next) => {
		params = ctx.params;
		next();
	}, () => page = Planner);

	Router('/AddConference', (ctx, next) => {
		params = ctx.params;
		next();
	}, () => page = AddConference);
	Router.start();
</script>


<svelte:component this={page} {params}/>
