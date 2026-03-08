/**
 * Sound effects via Web Audio API — no external files needed.
 * All sounds are generated programmatically.
 */

let ctx = null;

function getCtx() {
    if (!ctx) ctx = new AudioContext();
    return ctx;
}

/** Play a quick catch-heart "pop" sound */
export function playCatch() {
    try {
        const ac = getCtx();
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ac.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ac.currentTime + 0.08);

        gain.gain.setValueAtTime(0.25, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);

        osc.start(ac.currentTime);
        osc.stop(ac.currentTime + 0.15);
    } catch (_) { }
}

/** Play a cheerful win fanfare */
export function playWin() {
    try {
        const ac = getCtx();
        // 3-note ascending arpeggio
        const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
        notes.forEach((freq, i) => {
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.connect(gain);
            gain.connect(ac.destination);

            osc.type = 'triangle';
            osc.frequency.value = freq;

            const t = ac.currentTime + i * 0.12;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

            osc.start(t);
            osc.stop(t + 0.35);
        });
    } catch (_) { }
}

/** Play a sad "aww" tone for lose */
export function playLose() {
    try {
        const ac = getCtx();
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ac.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ac.currentTime + 0.5);

        gain.gain.setValueAtTime(0.2, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5);

        osc.start(ac.currentTime);
        osc.stop(ac.currentTime + 0.5);
    } catch (_) { }
}

// ---- Background Music ----
let bgNodes = [];
let bgPlaying = false;

const BG_MELODY = [
    // freq, duration (s) — simple kawaii loop in C major
    [523, 0.3], [659, 0.3], [784, 0.3], [659, 0.3],
    [523, 0.3], [392, 0.3], [440, 0.3], [523, 0.6],
    [659, 0.3], [784, 0.3], [880, 0.3], [784, 0.3],
    [659, 0.3], [523, 0.3], [440, 0.3], [392, 0.6],
];

export function startBgMusic() {
    if (bgPlaying) return;
    bgPlaying = true;
    playLoop();
}

function playLoop() {
    if (!bgPlaying) return;
    try {
        const ac = getCtx();
        let time = ac.currentTime;

        BG_MELODY.forEach(([freq, dur]) => {
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.connect(gain);
            gain.connect(ac.destination);

            osc.type = 'triangle';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
            gain.gain.setValueAtTime(0.08, time + dur - 0.05);
            gain.gain.linearRampToValueAtTime(0, time + dur);

            osc.start(time);
            osc.stop(time + dur);

            bgNodes.push(osc);
            time += dur;
        });

        // Schedule next loop
        const totalDur = BG_MELODY.reduce((s, [, d]) => s + d, 0);
        setTimeout(() => {
            if (bgPlaying) playLoop();
        }, totalDur * 1000 - 100);
    } catch (_) { }
}

export function stopBgMusic() {
    bgPlaying = false;
    bgNodes.forEach(n => { try { n.stop(); } catch (_) { } });
    bgNodes = [];
}
