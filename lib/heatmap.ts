// lib/heatmap.ts — deterministic 52-week activity heatmap.
// Same render → same output (no Math.random) so the visualization is stable
// across SSR/CSR and across reloads. Honest "activity rhythm", not real data.

// Mulberry32 — fast, deterministic PRNG.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type HeatCell = {
  level: 0 | 1 | 2 | 3 | 4;     // intensity bucket
  count: number;                  // synthetic count for tooltip ("X contributions")
  weeksAgo: number;               // 0 = current week, 51 = oldest
  isWeekend: boolean;
};

export type HeatmapData = {
  weeks: HeatCell[][]; // 52 weeks × 7 days
  totalActiveDays: number;
  totalContributions: number;
  longestStreak: number;
};

/**
 * Generates a deterministic, plausible 52-week heatmap.
 * Recent weeks are denser (showing momentum). Weekends are slightly lighter.
 */
export function generateHeatmap(seed = 1729): HeatmapData {
  const rand = mulberry32(seed);
  const weeks: HeatCell[][] = [];
  let totalActiveDays = 0;
  let totalContributions = 0;
  let currentStreak = 0;
  let longestStreak = 0;

  // We build oldest-first (week index 51 → 0), then reverse the streak math.
  for (let w = 51; w >= 0; w--) {
    const week: HeatCell[] = [];
    // Momentum bias: more activity in recent weeks
    const recencyBoost = (51 - w) / 51; // 0 (oldest) → 1 (newest)
    for (let d = 0; d < 7; d++) {
      const isWeekend = d === 0 || d === 6;
      // Base density 0.45 → 0.85 across the year, weekends -0.15
      const baseDensity = 0.45 + recencyBoost * 0.40 - (isWeekend ? 0.15 : 0);
      const r = rand();
      const isActive = r < baseDensity;

      let level: HeatCell["level"] = 0;
      let count = 0;

      if (isActive) {
        // Bucket distribution (favor mid intensities, with occasional 4s)
        const r2 = rand();
        if (r2 < 0.30) { level = 1; count = 1 + Math.floor(rand() * 2); }       // 1-2
        else if (r2 < 0.65) { level = 2; count = 3 + Math.floor(rand() * 3); }  // 3-5
        else if (r2 < 0.90) { level = 3; count = 6 + Math.floor(rand() * 4); }  // 6-9
        else { level = 4; count = 10 + Math.floor(rand() * 8); }                 // 10-17

        // Recency boost can promote a level
        if (recencyBoost > 0.7 && rand() < 0.25 && level < 4) {
          level = (level + 1) as HeatCell["level"];
        }

        totalActiveDays += 1;
        totalContributions += count;
        currentStreak += 1;
        if (currentStreak > longestStreak) longestStreak = currentStreak;
      } else {
        currentStreak = 0;
      }

      week.push({
        level,
        count,
        weeksAgo: w,
        isWeekend,
      });
    }
    weeks.push(week);
  }

  // We pushed oldest-first; we want index 0 = oldest, index 51 = current. Already correct.
  return { weeks, totalActiveDays, totalContributions, longestStreak };
}

export const HEAT_COLORS_DARK: Record<HeatCell["level"], string> = {
  0: "rgba(255,255,255,0.05)",
  1: "rgba(82,183,136,0.25)",
  2: "rgba(82,183,136,0.45)",
  3: "rgba(82,183,136,0.70)",
  4: "rgba(82,183,136,0.95)",
};

export const HEAT_COLORS_LIGHT: Record<HeatCell["level"], string> = {
  0: "rgba(15,23,42,0.06)",
  1: "rgba(82,183,136,0.30)",
  2: "rgba(82,183,136,0.50)",
  3: "rgba(82,183,136,0.75)",
  4: "rgba(82,183,136,1.00)",
};
