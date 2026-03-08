<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let score;

	const WIN_SCORE = 15;
	const pct = Math.round((score / WIN_SCORE) * 100);

	const messages = [
		{ min: 0,  text: 'Đừng nản lòng, thử lại nhé! 💪' },
		{ min: 5,  text: 'Gần rồi! Cố lên nào! 🌸' },
		{ min: 10, text: 'Chút nữa là xong! Thử lại đi! 💕' }
	];

	const msg = [...messages].reverse().find(m => score >= m.min)?.text ?? messages[0].text;
</script>

<div class="screen">
	<!-- Floating sad hearts -->
	{#each { length: 6 } as _, i}
		<span class="sad-heart" style="--i:{i}">💔</span>
	{/each}

	<div class="card">
		<div class="emoji">😿</div>
		<h1 class="title">Hết giờ rồi!</h1>
		<p class="subtitle">Mèo chưa bắt đủ trái tim…</p>

		<div class="score-area">
			<div class="score-label">Số tim đã bắt</div>
			<div class="score-num">❤️ {score} / {WIN_SCORE}</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width:{pct}%"></div>
			</div>
			<div class="score-pct">{pct}%</div>
		</div>

		<p class="encourage">{msg}</p>

		<button class="btn" on:click={() => dispatch('replay')}>
			🔄 Chơi lại
		</button>
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
		background: linear-gradient(135deg, #fce4ec 0%, #e8d5f5 100%);
	}

	.sad-heart {
		position: absolute;
		font-size: 1.5rem;
		left: calc(var(--i) * 17%);
		animation: sadFloat 3s ease-in-out infinite;
		animation-delay: calc(var(--i) * 0.4s);
		opacity: 0.4;
		pointer-events: none;
	}

	@keyframes sadFloat {
		0%, 100% { top: 10%; transform: translateY(0); }
		50%       { top: 15%; transform: translateY(10px); }
	}

	.card {
		background: rgba(255,255,255,0.88);
		backdrop-filter: blur(16px);
		border-radius: 28px;
		padding: 2rem 1.75rem;
		text-align: center;
		box-shadow: 0 8px 40px rgba(232,92,128,0.2);
		max-width: 320px;
		width: 90%;
		z-index: 10;
		animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes popIn {
		from { opacity: 0; transform: scale(0.7); }
		to   { opacity: 1; transform: scale(1); }
	}

	.emoji {
		font-size: 3.5rem;
		animation: sadShake 2s ease-in-out infinite;
		display: block;
		margin-bottom: 0.25rem;
	}

	@keyframes sadShake {
		0%, 100% { transform: rotate(0deg); }
		25%       { transform: rotate(-5deg); }
		75%       { transform: rotate(5deg); }
	}

	.title {
		font-size: 1.75rem;
		font-weight: 900;
		background: linear-gradient(135deg, var(--pink-deep), var(--purple));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.25rem;
	}

	.subtitle {
		color: var(--text-light);
		font-size: 0.9rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.score-area {
		background: var(--bg2);
		border-radius: 16px;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.score-label {
		font-size: 0.8rem;
		color: var(--text-light);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.3rem;
	}

	.score-num {
		font-size: 1.5rem;
		font-weight: 900;
		color: var(--pink-deep);
		margin-bottom: 0.5rem;
	}

	.progress-bar {
		background: rgba(255,255,255,0.7);
		border-radius: 6px;
		height: 10px;
		overflow: hidden;
		margin-bottom: 0.25rem;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--pink-light), var(--pink));
		border-radius: 6px;
		transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1);
	}

	.score-pct {
		font-size: 0.8rem;
		color: var(--text-light);
		font-weight: 700;
	}

	.encourage {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 1.25rem;
	}

	.btn {
		background: linear-gradient(135deg, var(--pink), var(--pink-deep));
		color: white;
		font-size: 1rem;
		font-weight: 800;
		padding: 0.8rem 2rem;
		border-radius: 50px;
		box-shadow: 0 4px 16px var(--shadow);
		width: 100%;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.btn:active {
		transform: scale(0.96);
	}
</style>
