"use client";
// Mute / unmute UI sounds. State persists in localStorage. Off by default.

import { useEffect, useState } from "react";
import { initAudio, isAudioEnabled, setAudioEnabled, sounds } from "@/lib/audio";

export default function AudioToggle({ dark = true }: { dark?: boolean }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    initAudio();
    setOn(isAudioEnabled());
  }, []);

  const toggle = () => {
    const next = !on;
    setAudioEnabled(next);
    setOn(next);
    if (next) sounds.click();
  };

  const fg = dark ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.65)";
  const bg = dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)";
  const bd = dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Mute UI sounds" : "Enable UI sounds"}
      aria-pressed={on}
      title={on ? "Sounds on" : "Sounds off"}
      style={{
        width: 28, height: 28, borderRadius: "50%",
        background: bg, border: `1px solid ${bd}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: fg, padding: 0,
        transition: "background 0.3s ease, color 0.3s ease, transform 0.2s ease",
      }}
    >
      {on ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
