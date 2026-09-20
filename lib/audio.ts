// lib/audio.ts — single source of truth for UI sounds.
// Sounds are off by default; user opts-in via the navbar audio toggle.
// All sounds are synthesized via the WebAudio API (no asset downloads).

let ctx: AudioContext | null = null;
let enabled = false;
let userInitiated = false;

const STORAGE_KEY = "portfolio-audio-enabled";

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      ctx = new Ctx();
    } catch {
      return null;
    }
  }
  return ctx;
}

export function initAudio() {
  if (typeof window === "undefined") return;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    enabled = stored === "1";
  } catch {
    enabled = false;
  }
}

export function setAudioEnabled(v: boolean) {
  enabled = v;
  userInitiated = true;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {}
  }
  if (v) {
    // Resume context on opt-in (autoplay policies)
    const c = getCtx();
    if (c && c.state === "suspended") c.resume().catch(() => {});
  }
}

export function isAudioEnabled() { return enabled; }

// Simple synthesized blip — used for slider drag start/end + button hovers.
// Frequency in Hz, duration in seconds, gain 0–1. Capped low for non-fatigue.
function blip(freq: number, dur = 0.08, gain = 0.06, type: OscillatorType = "sine") {
  if (!enabled || !userInitiated) return;
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") { c.resume().catch(() => {}); }
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = 0;
  // ADSR-ish envelope for non-clicky sound
  const now = c.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(gain, now + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(g).connect(c.destination);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

export const sounds = {
  hover: () => blip(880, 0.05, 0.025, "sine"),
  dragStart: () => blip(420, 0.09, 0.05, "triangle"),
  dragEnd: () => blip(660, 0.07, 0.04, "triangle"),
  snap: () => blip(1040, 0.06, 0.05, "sine"),
  click: () => blip(540, 0.05, 0.04, "square"),
};
