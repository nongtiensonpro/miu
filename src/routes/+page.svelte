<script>
	import '../app.css';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import GameScreen from '$lib/components/GameScreen.svelte';
	import WinScreen from '$lib/components/WinScreen.svelte';
	import LoseScreen from '$lib/components/LoseScreen.svelte';

	let phase = 'start'; // 'start' | 'playing' | 'win' | 'lose'
	let finalScore = 0;

	function startGame() {
		phase = 'playing';
	}

	function handleWin(e) {
		finalScore = e.detail?.score ?? 15;
		phase = 'win';
	}

	function handleLose(e) {
		finalScore = e.detail?.score ?? 0;
		phase = 'lose';
	}

	function replay() {
		phase = 'start';
	}
</script>

{#if phase === 'start'}
	<StartScreen on:start={startGame} />
{:else if phase === 'playing'}
	<GameScreen on:win={handleWin} on:lose={handleLose} />
{:else if phase === 'win'}
	<WinScreen score={finalScore} on:replay={replay} />
{:else if phase === 'lose'}
	<LoseScreen score={finalScore} on:replay={replay} />
{/if}
