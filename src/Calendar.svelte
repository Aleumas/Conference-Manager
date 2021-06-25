<script>
	import calendarize from 'calendarize';
	import Arrow from './Arrow.svelte';
	import firebase from 'firebase/app';
	
	export let year = 2019;
	export let month = 0; 
	export let offset = 0; 
	export let today = null; 
	let events = [];
	
	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	$: today_month = today && today.getMonth();
	$: today_year = today && today.getFullYear();
	$: today_day = today && today.getDate();
	
	let prev = calendarize(new Date(year, month-1), offset);
	let current = calendarize(new Date(year, month), offset);
	let next = calendarize(new Date(year, month+1), offset);

	async function loadEvents(user) {
		var conferences = firebase.database().ref('users/' + user.uid + '/conferences/conference');
		var snapshot = await conferences.once('value');
		return snapshot;
	}

	
	


	function toPrev() {
		[current, next] = [prev, current];
		
		if (--month < 0) {
			month = 11;
			year--;
		}
		
		prev = calendarize(new Date(year, month-1), offset);
	}
	
	function toNext() {
		[prev, current] = [current, next];
		
		if (++month > 11) {
			month = 0;
			year++;
		}
		
		next = calendarize(new Date(year, month+1), offset);
	}
	
	function isToday(day) {
		return today && today_year === year && today_month === month && today_day === day;
	}

	function isEvent(day) {
		var i;
		firebase.auth().onAuthStateChanged((user) => {
				loadEvents(user).then( function(value) {
					events = value.val();
					Promise.all(events);
					for (i = 0; i < events.length; i++) {
						let event_day = events[i].date.slice(0,2);
						if (event_day.charAt(0) == '0') {
							event_day = event_day.charAt(1);
						}

						if (today && today_year === year && today_month === month && day == event_day) {
							return true;
						}
					}			
				})
		})
		return false;
	}

</script>

<header>
	<Arrow left on:click={toPrev} />
	<h4>{months[month]} {year}</h4>
	<Arrow on:click={toNext} />
</header>

<div class="month">
	{#each labels as txt, idx (txt)}
		<span class="label">{ labels[(idx + offset) % 7] }</span>
	{/each}

	{#each { length:6 } as w, idxw (idxw)}
		{#if current[idxw]}
			{#each { length:7 } as d,idxd (idxd)}
				{#if current[idxw][idxd] != 0}
					<span class="date" class:today={isToday(current[idxw][idxd])} class:event={isEvent(current[idxw][idxd])}>
						{ current[idxw][idxd] }
					</span>
				{:else if (idxw < 1)}
					<span class="date other">{ prev[prev.length - 1][idxd] }</span>
				{:else}
					<span class="date other">{ next[0][idxd] }</span>
				{/if}
			{/each}
		{/if}
	{/each}
</div>

<style>
	header {
		display: flex;
		margin: 0.5vmax auto;
		align-items: center;
		justify-content: center;
		user-select: none;
	}
	
	h4 {
		display: block;
		text-align: center;
		text-transform: uppercase;
		font-size: 1vmax;
		margin: 0 0.5vmax;
	}
	
	.month {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: right;
		grid-gap: 0.5vmax;
	}
	
	.label {
		font-weight: 300;
		font-size: 1vmax;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		opacity: 0.6;
	}
	
	.date {
		height: 0.7vmax;
		font-size: 1vmax;
		border: 1px solid #e6e4e4;
		padding-right: 4px;
		font-weight: 700;
		padding: 0.5rem;
	}
	
	.date.today {
		color: #5286fa;
		background: #c4d9fd;
		border-color: currentColor;
	}

	.date.event {
		color: #6452fa;
		background: #c4d9fd;
		border-color: currentColor;
	}
	
	.date.other {
		opacity: 0.2;
	}
</style>
