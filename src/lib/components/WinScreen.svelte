<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { getRandomMessage } from '$lib/messages.js';
	const dispatch = createEventDispatcher();

	export let score;

	const msg = getRandomMessage();

	const CONFETTI_COUNT = 70;
	const COLORS = ['#ff85a2','#c9a7eb','#ffd6e0','#a8d8ea','#ffb3c6','#e8d5f5','#ffe4b5','#b5ffe4','#ffe0b5'];
	const confetti = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
		id: i,
		color: COLORS[i % COLORS.length],
		left: Math.random() * 100,
		delay: Math.random() * 1.5,
		duration: 1.8 + Math.random() * 2.2,
		size: 7 + Math.random() * 9,
		drift: (Math.random() - 0.5) * 240,
		shape: Math.random() < 0.4 ? 'circle' : 'square'
	}));

	const floatingHearts = Array.from({ length: 14 }, (_, i) => ({
		id: i,
		left: 3 + i * 7,
		delay: i * 0.22,
		duration: 2.2 + Math.random() * 1.5,
		size: 1.2 + Math.random() * 0.8,
		emoji: ['❤️','💕','💖','💗','💝'][i % 5]
	}));

	let visible = false;
	onMount(() => {
		requestAnimationFrame(() => { visible = true; });
	});
</script>

<div class="screen">
	<!-- Confetti -->
	{#each confetti as c (c.id)}
		<div
			class="confetti-piece"
			style="
				left:{c.left}%;
				background:{c.color};
				width:{c.size}px;
				height:{c.size * (c.shape==='circle' ? 1 : 1.5)}px;
				border-radius:{c.shape==='circle' ? '50%' : '2px'};
				animation-delay:{c.delay}s;
				animation-duration:{c.duration}s;
				--drift:{c.drift}px;
			"
		></div>
	{/each}

	<!-- Floating hearts -->
	{#each floatingHearts as h (h.id)}
		<span
			class="float-heart"
			style="left:{h.left}%; animation-delay:{h.delay}s; animation-duration:{h.duration}s; font-size:{h.size}rem;"
		>{h.emoji}</span>
	{/each}

	<!-- Card -->
	<div class="card" class:visible>
		<div class="trophy-wrap">
			<div class="trophy-glow"></div>
			<span class="msg-emoji">{msg.emoji}</span>
		</div>

		<h1 class="title">{msg.title}</h1>
		<p class="body-text">{msg.body}</p>

		<div class="divider">· · ✦ · ·</div>

		<div class="score-badge">❤️ × {score} trái tim</div>

		<div class="women-day">Happy Women's Day 🌸</div>

		<button class="btn" on:click={() => dispatch('replay')}>
			🔄 Chơi lại để nhận lời chúc mới!
		</button>
	</div>
</div>

<style>
	.screen {
		width: 100%;
		height: 100%;
		height: 100dvh;
		position: relative;
		overflow: hidden;
		background: linear-gradient(135deg, #fce4ec 0%, #e8d5f5 55%, #c9e8f5 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Confetti */
	.confetti-piece {
		position: absolute;
		top: -20px;
		animation: confettiFall linear infinite;
	}

	@keyframes confettiFall {
		0%   { top: -24px; transform: translateX(0) rotate(0deg); opacity: 1; }
		80%  { opacity: 1; }
		100% { top: 110vh; transform: translateX(var(--drift)) rotate(800deg); opacity: 0; }
	}

	.float-heart {
		position: absolute;
		top: 110%;
		animation: floatUp linear infinite;
		pointer-events: none;
	}

	@keyframes floatUp {
		0%   { top: 110%; opacity: 0; }
		15%  { opacity: 0.8; }
		85%  { opacity: 0.5; }
		100% { top: -10%; opacity: 0; }
	}

	/* Card */
	.card {
		background: rgba(255,255,255,0.9);
		backdrop-filter: blur(24px);
		border-radius: 32px;
		padding: 2rem 1.75rem;
		text-align: center;
		box-shadow:
			0 16px 60px rgba(232,92,128,0.2),
			0 4px 20px rgba(201,167,235,0.15),
			inset 0 1px 0 rgba(255,255,255,0.9);
		border: 1.5px solid rgba(255,255,255,0.7);
		max-width: 350px;
		width: 92%;
		z-index: 10;
		opacity: 0;
		transform: scale(0.75) translateY(40px);
		transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.card.visible {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	.trophy-wrap {
		position: relative;
		display: inline-block;
		margin-bottom: 0.4rem;
	}

	.trophy-glow {
		position: absolute;
		inset: -12px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255,200,50,0.35) 0%, transparent 70%);
		animation: glowPulse 1.5s ease-in-out infinite alternate;
	}

	@keyframes glowPulse {
		from { transform: scale(0.9); opacity: 0.7; }
		to   { transform: scale(1.2); opacity: 1; }
	}

	.msg-emoji {
		font-size: 4rem;
		display: block;
		position: relative;
		animation: emojiSpin 4s ease-in-out infinite;
	}

	@keyframes emojiSpin {
		0%, 100% { transform: rotate(-8deg) scale(1); }
		25%  { transform: rotate(0deg) scale(1.15); }
		50%  { transform: rotate(8deg) scale(1); }
		75%  { transform: rotate(0deg) scale(1.1); }
	}

	.title {
		font-size: 1.65rem;
		font-weight: 900;
		background: linear-gradient(135deg, var(--pink-deep) 0%, var(--purple) 60%, #60a0f0 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
		line-height: 1.2;
	}

	.body-text {
		font-size: 0.92rem;
		color: var(--text);
		line-height: 1.65;
		margin-bottom: 0.75rem;
	}

	.divider {
		font-size: 0.8rem;
		color: var(--pink-light);
		letter-spacing: 4px;
		margin-bottom: 0.75rem;
	}

	.score-badge {
		display: inline-block;
		background: linear-gradient(135deg, var(--pink), var(--pink-deep));
		color: white;
		font-weight: 800;
		font-size: 1rem;
		padding: 0.3rem 1.1rem;
		border-radius: 50px;
		margin-bottom: 0.5rem;
		box-shadow: 0 3px 12px var(--shadow);
	}

	.women-day {
		font-size: 0.95rem;
		font-weight: 800;
		color: var(--pink-deep);
		margin-bottom: 1.25rem;
		letter-spacing: 0.03em;
	}

	.btn {
		background: linear-gradient(135deg, var(--pink), var(--pink-deep));
		color: white;
		font-size: 0.95rem;
		font-weight: 800;
		padding: 0.85rem 1.5rem;
		border-radius: 50px;
		box-shadow: 0 5px 20px var(--shadow);
		width: 100%;
		transition: transform 0.15s, box-shadow 0.15s;
		letter-spacing: 0.01em;
	}

	.btn:active {
		transform: scale(0.96);
		box-shadow: 0 2px 10px var(--shadow);
	}
</style>
