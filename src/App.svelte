<script>
    import Router from 'page';
    import Login from './Login.svelte'
	import Signup from './Signup.svelte'
	let page;
	let params;

	Router('/', () => page = Login);
	Router('/Signup', (ctx, next) => {
		params = ctx.params;
		next();
	}, () => page = Signup);	
	Router.start();
</script>


<svelte:component this={page} {params}/>
