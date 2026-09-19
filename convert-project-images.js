// convert-project-images.js
// Converts PNG project images in public/ root to WebP (quality 80)
// Does NOT touch the Frames/ subdirectory

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "public");

// Only convert PNGs in the root of public/ (not subdirectories)
const files = fs.readdirSync(PUBLIC_DIR).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return ext === ".png" && fs.statSync(path.join(PUBLIC_DIR, f)).isFile();
});

console.log(`Found ${files.length} PNG files to convert:`);
files.forEach((f) => console.log(`  - ${f}`));

async function convert() {
  for (const file of files) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const outputName = file.replace(/\.png$/i, ".webp");
    const outputPath = path.join(PUBLIC_DIR, outputName);

    const stats = fs.statSync(inputPath);
    const sizeBefore = (stats.size / 1024).toFixed(1);

    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const sizeAfter = (newStats.size / 1024).toFixed(1);
    const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

    console.log(`✓ ${file} → ${outputName}  (${sizeBefore}KB → ${sizeAfter}KB, -${savings}%)`);

    // Remove original PNG
    fs.unlinkSync(inputPath);
    console.log(`  Deleted original: ${file}`);
  }
  console.log("\nDone! All PNGs converted to WebP.");
}

convert().catch(console.error);
