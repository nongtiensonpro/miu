<script>
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { playCatch, playWin, playLose, startBgMusic, stopBgMusic } from '$lib/sound.js';

	const dispatch = createEventDispatcher();

	// ---- Config ----
	const WIN_SCORE = 15;
	const GAME_DURATION = 30;
	const CAT_WIDTH = 72;
	const HEART_SIZE = 38;
	const SPAWN_INTERVAL_MS = 850;
	const BASE_SPEED = 2.5;

	// ---- State ----
	let score = 0;
	let timeLeft = GAME_DURATION;
	let catX = 0;
	let hearts = [];
	let pops = [];
	let stars = [];       // sparkle background particles
	let combo = 0;        // consecutive catches in 1s
	let showCombo = false;
	let gameWidth = 375;
	let gameHeight = 667;
	let nextId = 0;
	let musicOn = true;

	let containerEl;
	let rafId;
	let timerInterval;
	let spawnInterval;
	let starInterval;
	let lastFrame = 0;
	let lastCatchTime = 0;

	onMount(() => {
		measure();
		startGame();
	});

	onDestroy(() => {
		stopAll();
	});

	function measure() {
		if (!containerEl) return;
		const r = containerEl.getBoundingClientRect();
		gameWidth = r.width;
		gameHeight = r.height;
		catX = gameWidth / 2;
	}

	function startGame() {
		score = 0;
		timeLeft = GAME_DURATION;
		hearts = [];
		pops = [];
		stars = [];
		combo = 0;
		catX = gameWidth / 2;

		if (musicOn) startBgMusic();

		timerInterval = setInterval(() => {
			timeLeft -= 1;
			if (timeLeft <= 0) {
				stopAll();
				playLose();
				dispatch('lose', { score });
			}
		}, 1000);

		spawnInterval = setInterval(spawnHeart, SPAWN_INTERVAL_MS);
		spawnHeart();

		// Ambient sparkles in background
		starInterval = setInterval(spawnStar, 600);

		lastFrame = performance.now();
		rafId = requestAnimationFrame(loop);
	}

	function stopAll() {
		clearInterval(timerInterval);
		clearInterval(spawnInterval);
		clearInterval(starInterval);
		cancelAnimationFrame(rafId);
		stopBgMusic();
	}

	function spawnHeart() {
		const margin = HEART_SIZE + 12;
		const x = margin + Math.random() * (gameWidth - margin * 2);
		const speed = BASE_SPEED + Math.random() * 1.5 + score * 0.07;
		// Occasionally spawn a special "big heart" (worth 2 points)
		const big = Math.random() < 0.12;
		hearts = [...hearts, { id: nextId++, x, y: -HEART_SIZE, speed, caught: false, big }];
	}

	function spawnStar() {
		const x = Math.random() * gameWidth;
		stars = [...stars, { id: nextId++, x, y: -10, opacity: 0.3 + Math.random() * 0.4 }];
		// Clean up old stars
		if (stars.length > 15) stars = stars.slice(-15);
	}

	function loop(now) {
		const dt = Math.min((now - lastFrame) / 16.67, 3);
		lastFrame = now;

		const catLeft = catX - CAT_WIDTH / 2;
		const catRight = catX + CAT_WIDTH / 2;
		const catTop = gameHeight - 96;
		const catBottom = gameHeight - 28;

		let newScore = score;
		let won = false;
		let newPops = [];

		hearts = hearts
			.map(h => {
				if (h.caught) return h;
				const newY = h.y + h.speed * dt;
				const hw = h.big ? HEART_SIZE * 1.4 : HEART_SIZE;
				const hLeft = h.x - hw / 2;
				const hRight = h.x + hw / 2;
				const hit =
					hRight > catLeft && hLeft < catRight &&
					(newY + hw) > catTop && newY < catBottom;

				if (hit) {
					const pts = h.big ? 2 : 1;
					newScore += pts;
					const now2 = performance.now();
					combo = now2 - lastCatchTime < 1500 ? combo + 1 : 1;
					lastCatchTime = now2;
					if (combo >= 3) {
						showCombo = true;
						setTimeout(() => { showCombo = false; }, 800);
					}
					newPops.push({ id: nextId++, x: h.x, y: newY, big: h.big });
					playCatch();
					return { ...h, y: newY, caught: true };
				}
				return { ...h, y: newY };
			})
			.filter(h => !h.caught && h.y < gameHeight + HEART_SIZE);

		if (newPops.length) {
			pops = [...pops, ...newPops];
			setTimeout(() => {
				const ids = new Set(newPops.map(p => p.id));
				pops = pops.filter(p => !ids.has(p.id));
			}, 600);
		}

		if (newScore !== score) {
			score = newScore;
			if (score >= WIN_SCORE) won = true;
		}

		if (won) {
			stopAll();
			playWin();
			dispatch('win', { score });
			return;
		}

		rafId = requestAnimationFrame(loop);
	}

	// ---- Controls ----
	function moveCat(clientX) {
		if (!containerEl) return;
		const r = containerEl.getBoundingClientRect();
		const x = clientX - r.left;
		catX = Math.max(CAT_WIDTH / 2, Math.min(gameWidth - CAT_WIDTH / 2, x));
	}

	function onMouseMove(e) { moveCat(e.clientX); }

	function onTouchMove(e) {
		e.preventDefault();
		moveCat(e.touches[0].clientX);
	}

	function toggleMusic() {
		musicOn = !musicOn;
		if (musicOn) startBgMusic();
		else stopBgMusic();
	}

	$: timerColor = timeLeft <= 10 ? '#e85c80' : 'var(--text)';
	$: timerPulse = timeLeft <= 10;
	$: urgencyLevel = timeLeft <= 10 ? 'urgent' : timeLeft <= 20 ? 'warning' : '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="game-wrap {urgencyLevel}"
	bind:this={containerEl}
	on:mousemove={onMouseMove}
	on:touchmove|preventDefault={onTouchMove}
	on:touchstart|preventDefault={onTouchMove}
>
	<!-- Ambient background sparkles -->
	{#each stars as s (s.id)}
		<div class="bg-star" style="left:{s.x}px; opacity:{s.opacity}">✦</div>
	{/each}

	<!-- Floating cloud decorations -->
	<div class="cloud cloud-1">☁️</div>
	<div class="cloud cloud-2">☁️</div>

	<!-- HUD -->
	<div class="hud">
		<div class="hud-score">❤️ <span class="score-num">{score}</span><span class="score-denom"> / {WIN_SCORE}</span></div>
		<button class="music-btn" on:click={toggleMusic} aria-label="Toggle music">
			{musicOn ? '🎵' : '🔇'}
		</button>
		<div class="hud-timer" class:pulse={timerPulse} style="color:{timerColor}">⏱ {timeLeft}s</div>
	</div>

	<!-- Progress bar -->
	<div class="progress-track">
		<div class="progress-fill" style="width:{Math.min((score / WIN_SCORE) * 100, 100)}%">
			<div class="progress-shine"></div>
		</div>
	</div>

	<!-- Combo toast -->
	{#if showCombo && combo >= 3}
		<div class="combo-toast">🔥 Combo ×{combo}!</div>
	{/if}

	<!-- Hearts -->
	{#each hearts as h (h.id)}
		<div
			class="heart"
			class:heart-big={h.big}
			style="left:{h.x - (h.big ? HEART_SIZE*0.7 : HEART_SIZE/2)}px; top:{h.y}px;"
		>
			{h.big ? '💖' : '❤️'}
			{#if h.big}<div class="heart-glow"></div>{/if}
		</div>
	{/each}

	<!-- Pop effects -->
	{#each pops as p (p.id)}
		<div class="pop" style="left:{p.x}px; top:{p.y}px">
			{p.big ? '💥' : '✨'}
		</div>
	{/each}

	<!-- Ground decoration -->
	<div class="ground">
		<div class="grass">🌿 🌸 🌿 🌷 🌿 🌸 🌿 🌺 🌿 🌸 🌿 🌷 🌿</div>
	</div>

	<!-- Cat shadow -->
	<div class="cat-shadow" style="left:{catX - CAT_WIDTH/2 + 4}px"></div>

	<!-- Cat -->
	<div class="cat" style="left:{catX - CAT_WIDTH/2}px" class:catching={pops.length > 0}>
		<span class="cat-emoji">🐱</span>
		<div class="cat-paws">🐾</div>
	</div>
</div>

<style>
	.game-wrap {
		width: 100%;
		height: 100%;
		height: 100dvh;
		position: relative;
		overflow: hidden;
		background: linear-gradient(180deg,
			#fde8f0 0%,
			#f9c8dc 25%,
			#f0b8d0 55%,
			#e8d0f0 80%,
			#dcc8f0 100%
		);
		touch-action: none;
		cursor: none;
		font-family: var(--font);
	}

	.game-wrap.warning {
		background: linear-gradient(180deg, #ffe0e8 0%, #ffb8cc 50%, #f0c0e0 100%);
	}

	.game-wrap.urgent {
		background: linear-gradient(180deg, #ffd0d8 0%, #ff9eb5 50%, #f0b0d0 100%);
		animation: urgentShake 0.08s ease-in-out infinite;
	}

	@keyframes urgentShake {
		0%, 100% { transform: translateX(0); }
		25%  { transform: translateX(-1px); }
		75%  { transform: translateX(1px); }
	}

	/* Ambient sparkles */
	.bg-star {
		position: absolute;
		font-size: 0.7rem;
		color: rgba(255,160,180,0.8);
		pointer-events: none;
		top: 30%;
		animation: starDrift 8s ease-in-out infinite;
	}

	@keyframes starDrift {
		0%   { top: 10%; transform: scale(0.8) rotate(0deg); }
		50%  { transform: scale(1.2) rotate(180deg); }
		100% { top: 90%; transform: scale(0.8) rotate(360deg); opacity: 0; }
	}

	/* Clouds */
	.cloud {
		position: absolute;
		font-size: 2rem;
		opacity: 0.35;
		pointer-events: none;
		animation: cloudDrift linear infinite;
	}

	.cloud-1 { top: 12%; animation-duration: 18s; animation-delay: 0s; left: -60px; }
	.cloud-2 { top: 24%; animation-duration: 24s; animation-delay: -8s; left: -60px; }

	@keyframes cloudDrift {
		from { transform: translateX(-80px); }
		to   { transform: translateX(calc(100vw + 80px)); }
	}

	/* HUD */
	.hud {
		position: absolute;
		top: 0; left: 0; right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem 0.5rem;
		z-index: 10;
		background: linear-gradient(to bottom, rgba(253,232,240,0.95) 0%, transparent 100%);
	}

	.hud-score {
		font-weight: 800;
		font-size: 1.1rem;
		color: var(--text);
		background: rgba(255,255,255,0.7);
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		backdrop-filter: blur(4px);
		border: 1.5px solid rgba(255,133,162,0.3);
	}

	.score-num { color: var(--pink-deep); font-size: 1.2rem; }
	.score-denom { font-size: 0.85rem; color: var(--text-light); }

	.music-btn {
		font-size: 1.2rem;
		background: rgba(255,255,255,0.7);
		border: 1.5px solid rgba(255,133,162,0.3);
		border-radius: 50%;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.15s;
	}

	.music-btn:active { transform: scale(0.9); }

	.hud-timer {
		font-weight: 800;
		font-size: 1.1rem;
		background: rgba(255,255,255,0.7);
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		backdrop-filter: blur(4px);
		border: 1.5px solid rgba(255,133,162,0.3);
		transition: color 0.3s;
	}

	.hud-timer.pulse {
		animation: timerPulse 0.5s ease-in-out infinite alternate;
	}

	@keyframes timerPulse {
		from { transform: scale(1); }
		to   { transform: scale(1.12); box-shadow: 0 0 12px rgba(232,92,128,0.5); }
	}

	/* Progress bar */
	.progress-track {
		position: absolute;
		top: 58px; left: 1rem; right: 1rem;
		height: 10px;
		background: rgba(255,255,255,0.45);
		border-radius: 5px;
		overflow: hidden;
		z-index: 10;
		box-shadow: inset 0 1px 3px rgba(0,0,0,0.08);
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #ffb3c6, var(--pink), var(--pink-deep));
		border-radius: 5px;
		transition: width 0.35s cubic-bezier(0.34,1.56,0.64,1);
		position: relative;
		overflow: hidden;
	}

	.progress-shine {
		position: absolute;
		top: 0; left: -100%; width: 60%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
		animation: shine 1.5s ease-in-out infinite;
	}

	@keyframes shine {
		from { left: -60%; }
		to   { left: 110%; }
	}

	/* Combo toast */
	.combo-toast {
		position: absolute;
		top: 80px;
		left: 50%;
		transform: translateX(-50%);
		background: linear-gradient(135deg, var(--pink), var(--pink-deep));
		color: white;
		font-weight: 900;
		font-size: 1.1rem;
		padding: 0.4rem 1.2rem;
		border-radius: 50px;
		z-index: 30;
		animation: comboToast 0.8s ease-out forwards;
		box-shadow: 0 4px 20px rgba(232,92,128,0.4);
		white-space: nowrap;
	}

	@keyframes comboToast {
		0%   { opacity: 0; transform: translateX(-50%) scale(0.7) translateY(0); }
		30%  { opacity: 1; transform: translateX(-50%) scale(1.1) translateY(-4px); }
		70%  { opacity: 1; transform: translateX(-50%) scale(1) translateY(-8px); }
		100% { opacity: 0; transform: translateX(-50%) scale(0.9) translateY(-20px); }
	}

	/* Hearts */
	.heart {
		position: absolute;
		font-size: 28px;
		line-height: 1;
		pointer-events: none;
		will-change: top;
		animation: heartWiggle 0.5s ease-in-out infinite alternate;
		filter: drop-shadow(0 3px 6px rgba(232,92,128,0.5));
	}

	.heart-big {
		font-size: 40px;
		filter: drop-shadow(0 4px 10px rgba(255,85,120,0.7));
		animation: bigHeartWiggle 0.4s ease-in-out infinite alternate;
	}

	.heart-glow {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255,100,130,0.3), transparent 70%);
		animation: glowPulse 0.6s ease-in-out infinite alternate;
	}

	@keyframes glowPulse {
		from { transform: scale(0.9); opacity: 0.6; }
		to   { transform: scale(1.3); opacity: 1; }
	}

	@keyframes heartWiggle {
		from { transform: rotate(-10deg) scale(1); }
		to   { transform: rotate(10deg) scale(1.08); }
	}

	@keyframes bigHeartWiggle {
		from { transform: rotate(-8deg) scale(1); }
		to   { transform: rotate(8deg) scale(1.12); }
	}

	/* Pop effect */
	.pop {
		position: absolute;
		font-size: 1.6rem;
		pointer-events: none;
		transform: translate(-50%, -50%);
		animation: popAnim 0.6s ease-out forwards;
		z-index: 20;
	}

	@keyframes popAnim {
		0%   { opacity: 1; transform: translate(-50%,-50%) scale(0.4); }
		40%  { opacity: 1; transform: translate(-50%,-90%) scale(1.5); }
		100% { opacity: 0; transform: translate(-50%,-140%) scale(0.9); }
	}

	/* Ground */
	.ground {
		position: absolute;
		bottom: 0; left: 0; right: 0;
		height: 36px;
		background: linear-gradient(to bottom, rgba(200,220,170,0.4) 0%, rgba(180,210,140,0.6) 100%);
		overflow: hidden;
	}

	.grass {
		font-size: 1.2rem;
		white-space: nowrap;
		line-height: 1;
		padding: 4px 0 0 0;
		animation: grassScroll 12s linear infinite;
		display: inline-block;
	}

	@keyframes grassScroll {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}

	/* Cat shadow */
	.cat-shadow {
		position: absolute;
		bottom: 30px;
		width: 64px;
		height: 12px;
		background: radial-gradient(ellipse, rgba(180,100,130,0.25) 0%, transparent 70%);
		border-radius: 50%;
		pointer-events: none;
		will-change: left;
		transition: left 0.06s linear;
	}

	/* Cat */
	.cat {
		position: absolute;
		bottom: 30px;
		pointer-events: none;
		will-change: left;
		transition: left 0.06s linear;
		z-index: 5;
		text-align: center;
		width: 72px;
	}

	.cat-emoji {
		font-size: 56px;
		line-height: 1;
		display: block;
		filter: drop-shadow(0 5px 10px rgba(200,80,120,0.4));
		animation: catBob 0.5s ease-in-out infinite alternate;
	}

	@keyframes catBob {
		from { transform: translateY(0) scaleX(1); }
		to   { transform: translateY(-3px) scaleX(1.02); }
	}

	.cat.catching .cat-emoji {
		animation: catCatch 0.2s ease-out;
	}

	@keyframes catCatch {
		0%   { transform: scaleY(1.2) scaleX(0.9); }
		50%  { transform: scaleY(0.85) scaleX(1.15); }
		100% { transform: scaleY(1) scaleX(1); }
	}

	.cat-paws {
		font-size: 0.7rem;
		opacity: 0.5;
		margin-top: -4px;
		letter-spacing: 6px;
	}
</style>
