<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const decorHearts = Array.from({ length: 10 }, (_, i) => ({
		id: i,
		left: 5 + i * 10,
		delay: i * 0.45,
		duration: 3 + (i % 3) * 0.8,
		size: 0.9 + (i % 3) * 0.4,
		emoji: ['❤️','💕','💖','🌸','💗'][i % 5]
	}));

	const sparkles = Array.from({ length: 8 }, (_, i) => ({
		id: i,
		left: Math.random() * 90 + 5,
		top: Math.random() * 80 + 5,
		delay: i * 0.3
	}));
</script>

<div class="screen">
	<!-- Floating decoration -->
	{#each decorHearts as h (h.id)}
		<span
			class="deco-heart"
			style="left:{h.left}%; animation-delay:{h.delay}s; animation-duration:{h.duration}s; font-size:{h.size}rem;"
		>{h.emoji}</span>
	{/each}

	<!-- Sparkles -->
	{#each sparkles as s (s.id)}
		<span class="sparkle" style="left:{s.left}%; top:{s.top}%; animation-delay:{s.delay}s">✦</span>
	{/each}

	<div class="card">
		<!-- Cat with halo -->
		<div class="cat-wrap">
			<div class="cat-halo"></div>
			<span class="cat-icon">🐱</span>
		</div>

		<h1 class="title">
			<span class="title-line1">Mèo Bắt</span>
			<span class="title-line2">Trái Tim</span>
		</h1>

		<p class="desc">Giúp chú mèo bắt thật nhiều trái tim 💕</p>

		<div class="info-box">
			<div class="info-item">🎯 Bắt đủ <strong>15 ❤️</strong> để nhận lời chúc 8/3</div>
			<div class="info-item">⏱ Thời gian: <strong>30 giây</strong></div>
			<div class="info-item">💖 Mỗi lần chơi có <strong>lời chúc khác nhau</strong>!</div>
		</div>

		<button class="btn-start" on:click={() => dispatch('start')}>
			🎮 Bắt đầu!
		</button>

		<p class="hint">
			📱 Kéo ngón tay · 🖱️ Di chuột để điều khiển
		</p>
	</div>
</div>

<style>
	.screen {
		width: 100%;
		height: 100%;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		background: linear-gradient(135deg, #fde8f0 0%, #f0d8f8 50%, #d8eaf8 100%);
	}

	/* Floating hearts */
	.deco-heart {
		position: absolute;
		top: 110%;
		pointer-events: none;
		animation: floatUp linear infinite;
		opacity: 0.5;
	}

	@keyframes floatUp {
		0%   { top: 110%; opacity: 0; transform: translateX(0) rotate(0deg); }
		15%  { opacity: 0.6; }
		85%  { opacity: 0.4; }
		100% { top: -10%;  opacity: 0; transform: translateX(16px) rotate(20deg); }
	}

	/* Sparkles */
	.sparkle {
		position: absolute;
		font-size: 0.85rem;
		color: rgba(255,140,170,0.6);
		animation: sparkleAnim 2s ease-in-out infinite alternate;
		pointer-events: none;
	}

	@keyframes sparkleAnim {
		from { opacity: 0.2; transform: scale(0.7) rotate(0deg); }
		to   { opacity: 0.9; transform: scale(1.3) rotate(30deg); }
	}

	/* Card */
	.card {
		background: rgba(255,255,255,0.88);
		backdrop-filter: blur(24px);
		border-radius: 32px;
		padding: 2.25rem 2rem;
		text-align: center;
		box-shadow:
			0 12px 50px rgba(232,92,128,0.18),
			0 3px 18px rgba(201,167,235,0.15),
			inset 0 1px 0 rgba(255,255,255,0.95);
		border: 1.5px solid rgba(255,255,255,0.7);
		max-width: 360px;
		width: 92%;
		z-index: 2;
		animation: slideUp 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes slideUp {
		from { opacity: 0; transform: translateY(50px) scale(0.88); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	/* Cat */
	.cat-wrap {
		position: relative;
		display: inline-block;
		margin-bottom: 0.4rem;
	}

	.cat-halo {
		position: absolute;
		inset: -10px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255,180,210,0.5) 0%, transparent 70%);
		animation: haloAnim 2s ease-in-out infinite alternate;
	}

	@keyframes haloAnim {
		from { transform: scale(0.9); opacity: 0.6; }
		to   { transform: scale(1.15); opacity: 1; }
	}

	.cat-icon {
		font-size: 4.5rem;
		display: block;
		position: relative;
		animation: catBounce 1.2s ease-in-out infinite alternate;
	}

	@keyframes catBounce {
		from { transform: translateY(0) rotate(-6deg) scale(1); }
		to   { transform: translateY(-14px) rotate(6deg) scale(1.05); }
	}

	/* Title */
	.title {
		display: flex;
		flex-direction: column;
		margin-bottom: 0.6rem;
	}

	.title-line1 {
		font-size: 2rem;
		font-weight: 900;
		background: linear-gradient(135deg, var(--pink-deep), var(--purple));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.2;
	}

	.title-line2 {
		font-size: 2rem;
		font-weight: 900;
		background: linear-gradient(135deg, var(--purple), #60a0f5);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.2;
	}

	.desc {
		color: var(--text-light);
		font-size: 0.95rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	/* Info box */
	.info-box {
		background: linear-gradient(135deg, rgba(255,240,248,0.8), rgba(240,230,255,0.8));
		border-radius: 16px;
		padding: 0.85rem 1rem;
		margin-bottom: 1.25rem;
		text-align: left;
		border: 1px solid rgba(255,200,220,0.4);
	}

	.info-item {
		font-size: 0.85rem;
		color: var(--text);
		padding: 0.2rem 0;
		font-weight: 600;
	}

	.info-item + .info-item {
		border-top: 1px dashed rgba(255,180,200,0.3);
		margin-top: 0.2rem;
		padding-top: 0.25rem;
	}

	/* Button */
	.btn-start {
		background: linear-gradient(135deg, var(--pink), var(--pink-deep));
		color: white;
		font-size: 1.15rem;
		font-weight: 900;
		padding: 0.9rem 2rem;
		border-radius: 50px;
		box-shadow: 0 5px 24px var(--shadow);
		width: 100%;
		margin-bottom: 0.85rem;
		transition: transform 0.15s, box-shadow 0.15s;
		letter-spacing: 0.02em;
	}

	.btn-start:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px var(--shadow);
	}

	.btn-start:active {
		transform: scale(0.96) translateY(0);
		box-shadow: 0 2px 10px var(--shadow);
	}

	.hint {
		font-size: 0.78rem;
		color: var(--text-light);
		font-weight: 600;
	}
</style>
