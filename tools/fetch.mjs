#!/usr/bin/env node
/**
 * Fetch talks from Conference Hall API
 * Usage: API_KEY=xxx node tools/fetch.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVENT_ID = 'touraine-tech-2026';
const OUTPUT_PATH = path.join(__dirname, '../api/source/conferenceHall.raw.json');

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error('❌ API_KEY environment variable is required');
  console.error('Usage: API_KEY=xxx node tools/fetch.mjs');
  process.exit(1);
}

async function fetchConferenceHall() {
  console.log(`📡 Fetching from Conference Hall (event: ${EVENT_ID})...`);

  const response = await fetch(
    `https://conference-hall.io/api/v1/event/${EVENT_ID}?key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const { proposals } = data;

  console.log(`📥 Received ${proposals.length} proposals`);

  // Save raw data
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(proposals, null, 2));
  console.log(`✅ Saved to ${OUTPUT_PATH}`);

  // Stats
  const accepted = proposals.filter(p =>
    p.deliberationStatus === 'ACCEPTED' || p.confirmationStatus === 'confirmed'
  );
  console.log(`\n📊 Stats:`);
  console.log(`   Total proposals: ${proposals.length}`);
  console.log(`   Accepted/Confirmed: ${accepted.length}`);
}

fetchConferenceHall().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
