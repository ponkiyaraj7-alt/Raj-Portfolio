import * as fonts from "next/font/google";
const candidates = [
  "Bricolage_Grotesque","Space_Grotesk","Urbanist","Instrument_Sans",
  "Plus_Jakarta_Sans","Manrope","Epilogue","Syne","Inter","DM_Sans",
  "Barlow","Unbounded","Cabinet_Grotesk","Hanken_Grotesk"
];
candidates.forEach(c => console.log(c, c in fonts ? "✅" : "❌"));
