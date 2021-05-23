import App from './App.svelte';
import { writable } from "svelte/store";

export const isLoggedin = writable(false);

var app = new App({
	target: document.body
});

export default app;