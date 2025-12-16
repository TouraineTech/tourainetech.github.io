#!/usr/bin/env node
/**
 * Download speaker photos
 * Usage: node tools/photos.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPEAKERS_DIR = path.join(__dirname, '../public/img/speakers');
const DEFAULT_IMG = path.join(SPEAKERS_DIR, 'default.jpeg');
const CONFERENCE_HALL_PATH = path.join(__dirname, '../api/generated/conferenceHall.json');

async function downloadPhoto(url, destPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
}

function copyDefault(destPath) {
  if (fs.existsSync(DEFAULT_IMG)) {
    fs.copyFileSync(DEFAULT_IMG, destPath);
  }
}

async function main() {
  console.log('📸 Downloading speaker photos...\n');

  // Ensure speakers directory exists
  if (!fs.existsSync(SPEAKERS_DIR)) {
    fs.mkdirSync(SPEAKERS_DIR, { recursive: true });
  }

  // Load speakers from generated conferenceHall.json
  if (!fs.existsSync(CONFERENCE_HALL_PATH)) {
    console.error('❌ Run "node tools/build.mjs" first to generate conferenceHall.json');
    process.exit(1);
  }

  const { speakers } = JSON.parse(fs.readFileSync(CONFERENCE_HALL_PATH, 'utf8'));
  console.log(`Found ${speakers.length} speakers\n`);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  let usedDefault = 0;

  for (const speaker of speakers) {
    const destPath = path.join(SPEAKERS_DIR, `${speaker.uid}.png`);

    // Skip if already exists
    if (fs.existsSync(destPath)) {
      skipped++;
      continue;
    }

    if (!speaker.picture) {
      // No photo URL, use default
      copyDefault(destPath);
      usedDefault++;
      console.log(`📋 ${speaker.uid} (default)`);
      continue;
    }

    try {
      await downloadPhoto(speaker.picture, destPath);
      downloaded++;
      console.log(`✅ ${speaker.uid}`);
    } catch (err) {
      console.log(`❌ ${speaker.uid}: ${err.message}`);
      copyDefault(destPath);
      failed++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Downloaded: ${downloaded}`);
  console.log(`   Skipped (exists): ${skipped}`);
  console.log(`   Used default: ${usedDefault}`);
  console.log(`   Failed: ${failed}`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
