#!/usr/bin/env node
/**
 * Generate QR codes for OpenFeedback URLs
 * Usage: node tools/generateQRCodes.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const OPENFEEDBACK_EVENT_ID = 'nIlFquxGUZ1IJ1cDkc1z';
const OUTPUT_DIR = path.join(__dirname, '../public/qrcodes');
const LOGO_PATH = path.join(__dirname, '../public/img/logo_TNT26.png');
const QR_SIZE = 800;
const LOGO_WIDTH = 300; // Logo width in the center (logo is wide, ~2.4:1 ratio)

// Load sessions data
const openfeedback = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../api/generated/openfeedback.json'), 'utf8')
);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Extract date (YYYY-MM-DD) from ISO startTime
function extractDate(isoDate) {
  return isoDate.split('T')[0];
}

// Generate URL-friendly slug from title
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')     // Replace special chars with dashes
    .replace(/^-+|-+$/g, '')         // Trim dashes from start/end
    .substring(0, 80);               // Limit length
}

// Build OpenFeedback URL
function buildOpenFeedbackUrl(sessionId, date) {
  return `https://openfeedback.io/${OPENFEEDBACK_EVENT_ID}/${date}/${sessionId}`;
}

// Generate QR code with logo overlay
async function generateQRCode(slug, url, logoBuffer) {
  // Generate QR code as buffer
  const qrBuffer = await QRCode.toBuffer(url, {
    errorCorrectionLevel: 'H', // High error correction for logo overlay
    type: 'png',
    width: QR_SIZE,
    margin: 2,
    color: {
      dark: '#222333',
      light: '#ffffff',
    },
  });

  let finalBuffer = qrBuffer;

  // Overlay logo if available
  if (logoBuffer) {
    // Resize logo keeping aspect ratio, just setting width
    const resizedLogo = await sharp(logoBuffer)
      .resize({ width: LOGO_WIDTH })
      .png()
      .toBuffer();

    // Get actual dimensions of resized logo
    const logoMeta = await sharp(resizedLogo).metadata();
    const logoWidth = logoMeta.width;
    const logoHeight = logoMeta.height;

    // Create white rounded background slightly larger than logo
    const padding = 8;
    const bgWidth = logoWidth + padding * 2;
    const bgHeight = logoHeight + padding * 2;
    const whiteBg = await sharp({
      create: {
        width: bgWidth,
        height: bgHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .png()
      .toBuffer();

    // Composite logo on white background
    const logoWithBg = await sharp(whiteBg)
      .composite([{ input: resizedLogo, left: padding, top: padding }])
      .png()
      .toBuffer();

    // Center position on QR code
    const leftPos = Math.floor((QR_SIZE - bgWidth) / 2);
    const topPos = Math.floor((QR_SIZE - bgHeight) / 2);

    finalBuffer = await sharp(qrBuffer)
      .composite([{ input: logoWithBg, left: leftPos, top: topPos }])
      .png()
      .toBuffer();
  }

  const outputPath = path.join(OUTPUT_DIR, `qr-${slug}.png`);
  fs.writeFileSync(outputPath, finalBuffer);

  return outputPath;
}

// Main
async function main() {
  console.log('Generating QR codes for OpenFeedback...\n');

  // Load logo
  let logoBuffer = null;
  if (fs.existsSync(LOGO_PATH)) {
    logoBuffer = fs.readFileSync(LOGO_PATH);
    console.log(`Logo loaded: ${LOGO_PATH}`);
  } else {
    console.warn(`Warning: Logo not found at ${LOGO_PATH}`);
  }

  const sessions = Object.values(openfeedback.sessions);
  let generated = 0;
  let errors = 0;

  for (const session of sessions) {
    const date = extractDate(session.startTime);
    const url = buildOpenFeedbackUrl(session.id, date);
    const slug = slugify(session.title);

    try {
      await generateQRCode(slug, url, logoBuffer);
      generated++;
      process.stdout.write(`\r  Generated: ${generated}/${sessions.length}`);
    } catch (error) {
      errors++;
      console.error(`\n  Error for ${slug} (${session.id}): ${error.message}`);
    }
  }

  console.log(`\n\nQR codes generated in: ${OUTPUT_DIR}`);
  console.log(`  ${generated} QR codes generated`);
  if (errors > 0) {
    console.log(`  ${errors} errors`);
  }
}

main().catch(console.error);
