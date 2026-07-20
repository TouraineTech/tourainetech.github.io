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
const OUTPUT_PATH = path.join(__dirname, '../src/data/source/conferenceHall.raw.json');

const apiKey = process.env.API_KEY;
const status = process.env.STATUS || 'pending,accepted';

if (!apiKey) {
  console.error('❌ API_KEY environment variable is required');
  console.error('Usage: API_KEY=xxx node tools/fetch.mjs');
  console.error('       API_KEY=xxx STATUS=accepted,pending node tools/fetch.mjs');
  process.exit(1);
}

async function fetchConferenceHall() {
  console.log(`📡 Fetching from Conference Hall (event: ${EVENT_ID})...`);
  console.log(`🔍 Filtering by status: ${status}`);

  const response = await fetch(
    `https://conference-hall.io/api/v1/event/${EVENT_ID}?key=${apiKey}&status=${status}`
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  let { proposals } = data;

  console.log(`📥 Received ${proposals.length} proposals from API`);

  // Filter by status if specified
  const statusList = status.split(',').map(s => s.toUpperCase());
  proposals = proposals.filter(p => statusList.includes(p.deliberationStatus));
  console.log(`🔍 Filtered to ${proposals.length} proposals (status: ${status})`);

  // Exclude declined proposals
  const beforeDeclined = proposals.length;
  proposals = proposals.filter(p => p.confirmationStatus !== 'DECLINED');
  if (beforeDeclined !== proposals.length) {
    console.log(`🚫 Excluded ${beforeDeclined - proposals.length} declined proposals`);
  }

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
