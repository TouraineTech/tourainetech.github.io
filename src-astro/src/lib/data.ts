import { marked } from 'marked';
import type {
  Speaker,
  ConferenceHallData,
  ScheduledTalk,
  TimeSlot,
  Sponsor,
  JobOffer,
} from './types';

import conferenceHallData from '@data/generated/conferenceHall.json';
import scheduleData from '@data/generated/schedule.json';
import timesData from '@data/config/times.json';
import roomsData from '@data/config/rooms.json';
import sponsorsYaml from '@data/sponsors.yaml';

// Type the imported JSON data
const conferenceHall = conferenceHallData as ConferenceHallData;
const schedule = scheduleData as ScheduledTalk[];
const times = timesData as TimeSlot[];
const rooms = roomsData as string[];

// Re-export types for convenience
export type { Sponsor, JobOffer };

// Types for the data utility functions (enriched versions)
export interface FullSpeaker {
  uid: string;
  name: string;
  bio?: string;
  company?: string;
  picture?: string | null;
  twitter?: string | null;
  github?: string | null;
}

export interface FullTalk {
  id: string;
  title: string;
  abstract?: string;
  formats: string;
  categories: string | null;
  level: string | null;
  speakers: FullSpeaker[];
  day: number;
  times: number[];
  rooms: number[];
  timeDisplay: string;
  roomDisplay: string;
  languages?: string[];
}

// OpenFeedback configuration
const OPENFEEDBACK_EVENT_ID = 'nIlFquxGUZ1IJ1cDkc1z';
const DATE_BY_DAY: Record<number, string> = {
  1: '2026-02-12', // Jeudi
  2: '2026-02-13', // Vendredi
};

const DAY_LABELS: Record<number, string> = {
  1: 'Jeudi 12',
  2: 'Vendredi 13',
};

// Category color mapping (centralized)
const CATEGORY_COLORS: Record<string, string> = {
  front: 'var(--cat-front)',
  design: 'var(--cat-front)',
  ui: 'var(--cat-front)',
  ux: 'var(--cat-front)',
  backend: 'var(--cat-backend)',
  back: 'var(--cat-backend)',
  java: 'var(--cat-backend)',
  data: 'var(--cat-backend)',
  cloud: 'var(--cat-backend)',
  archi: 'var(--cat-archi)',
  architecture: 'var(--cat-archi)',
  conception: 'var(--cat-archi)',
  iot: 'var(--cat-iot)',
  embarqué: 'var(--cat-iot)',
  tools: 'var(--cat-tools)',
  outils: 'var(--cat-tools)',
  outil: 'var(--cat-tools)',
  pratique: 'var(--cat-tools)',
  dev: 'var(--cat-tools)',
  human: 'var(--cat-human)',
  humain: 'var(--cat-human)',
  ai: 'var(--cat-ai)',
  ia: 'var(--cat-ai)',
  machine: 'var(--cat-ai)',
  alien: 'var(--cat-alien)',
};

/**
 * Get CSS color variable for a category
 */
export function getCategoryColor(category: string | null): string {
  if (!category) return 'var(--accent)';
  const lowerCat = category.toLowerCase();
  for (const [key, color] of Object.entries(CATEGORY_COLORS)) {
    if (lowerCat.includes(key)) return color;
  }
  return 'var(--accent)';
}

/**
 * Get short label for a category
 */
export function getCategoryLabel(category: string | null): string {
  if (!category) return 'Keynote';
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('front') || lowerCat.includes('design') || lowerCat.includes('ui')) return 'Front';
  if (lowerCat.includes('back') || lowerCat.includes('java') || lowerCat.includes('data') || lowerCat.includes('cloud')) return 'Backend';
  if (lowerCat.includes('archi') || lowerCat.includes('conception')) return 'Archi';
  if (lowerCat.includes('iot') || lowerCat.includes('embarqué')) return 'IoT';
  if (lowerCat.includes('outil') || lowerCat.includes('pratique') || lowerCat.includes('dev')) return 'Tools';
  if (lowerCat.includes('humain') || lowerCat.includes('human')) return 'Human';
  if (lowerCat.includes('ia') || lowerCat.includes('ai') || lowerCat.includes('machine')) return 'AI';
  if (lowerCat.includes('alien')) return 'Alien';
  return category.length > 10 ? category.substring(0, 10) : category;
}

/**
 * Convert a Speaker from conferenceHall to FullSpeaker
 */
function toFullSpeaker(speaker: Speaker): FullSpeaker {
  return {
    uid: speaker.uid,
    name: speaker.name || speaker.displayName || speaker.uid.replace(/_/g, ' '),
    bio: speaker.bio,
    company: speaker.company,
    picture: speaker.picture || speaker.photoURL,
    twitter: speaker.twitter,
    github: speaker.github,
  };
}

/**
 * Get a speaker by their UID
 */
export function getSpeakerByUid(uid: string): FullSpeaker | undefined {
  const speaker = conferenceHall.speakers?.find((s) => s.uid === uid);
  if (!speaker) return undefined;
  return toFullSpeaker(speaker);
}

/**
 * Get all speakers from conferenceHall
 */
export function getAllSpeakers(): FullSpeaker[] {
  return (conferenceHall.speakers || []).map(toFullSpeaker);
}

/**
 * Get all speakers that have at least one scheduled talk
 */
export function getAllScheduledSpeakers(): FullSpeaker[] {
  const speakerUids = new Set<string>();

  // Collect all speaker UIDs from scheduled talks
  schedule.forEach((scheduledTalk) => {
    const chTalk = conferenceHall.talks?.find((t) => t.id === scheduledTalk.id);
    if (chTalk?.speakers) {
      chTalk.speakers.forEach((uid) => speakerUids.add(uid));
    }
  });

  // Get full speaker data for each UID
  return Array.from(speakerUids)
    .map((uid) => getSpeakerByUid(uid))
    .filter((s): s is FullSpeaker => s !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}

/**
 * Get a talk by its ID, merged with schedule and conferenceHall data
 */
export function getTalkById(id: string): FullTalk | undefined {
  const scheduledTalk = schedule.find((t) => t.id === id);
  const chTalk = conferenceHall.talks?.find((t) => t.id === id);

  if (!scheduledTalk) return undefined;

  // Get speakers data
  const speakers: FullSpeaker[] = (chTalk?.speakers || [])
    .map((uid) => getSpeakerByUid(uid))
    .filter((s): s is FullSpeaker => s !== undefined);

  return {
    id: scheduledTalk.id,
    title: chTalk?.title || scheduledTalk.title,
    abstract: chTalk?.abstract,
    formats: chTalk?.formats || scheduledTalk.formats,
    categories: chTalk?.categories || scheduledTalk.categories,
    level: chTalk?.level || scheduledTalk.level,
    speakers,
    day: scheduledTalk.day,
    times: scheduledTalk.times,
    rooms: scheduledTalk.rooms,
    timeDisplay: formatTimeDisplay(scheduledTalk.times[0], scheduledTalk.day),
    roomDisplay: formatRoomDisplay(scheduledTalk.rooms),
    languages: chTalk?.languages,
  };
}

/**
 * Get all scheduled talks
 */
export function getAllScheduledTalks(): FullTalk[] {
  return schedule
    .map((t) => getTalkById(t.id))
    .filter((t): t is FullTalk => t !== undefined);
}

/**
 * Get all talks by a specific speaker
 */
export function getTalksBySpeakerUid(uid: string): FullTalk[] {
  return schedule
    .filter((scheduledTalk) => {
      const chTalk = conferenceHall.talks?.find((t) => t.id === scheduledTalk.id);
      return chTalk?.speakers?.includes(uid);
    })
    .map((t) => getTalkById(t.id))
    .filter((t): t is FullTalk => t !== undefined);
}

/**
 * Format time display (e.g., "Jeudi 12 a 09h00")
 */
export function formatTimeDisplay(timeIndex: number, day: number): string {
  const slot = times.find((t) => t.timeIndex === String(timeIndex));
  const dayLabel = DAY_LABELS[day] || `Jour ${day}`;
  const time = slot?.time?.replace(':', 'h') || '??h??';
  return `${dayLabel} a ${time}`;
}

/**
 * Format room display (e.g., "Salle F21" or "Salles F21, F22")
 */
export function formatRoomDisplay(roomIndexes: number[]): string {
  const roomNames = roomIndexes.map((idx) => rooms[idx - 1]);
  if (roomNames.length === 1) {
    return `Salle ${roomNames[0]}`;
  }
  return `Salles ${roomNames.join(', ')}`;
}

/**
 * Get raw time string (e.g., "09:00")
 */
export function getTimeString(timeIndex: number): string {
  const slot = times.find((t) => t.timeIndex === String(timeIndex));
  return slot?.time || '??:??';
}

/**
 * Build OpenFeedback URL for a talk
 */
export function buildOpenFeedbackUrl(talkId: string, day: number): string {
  const date = DATE_BY_DAY[day] || DATE_BY_DAY[1];
  return `https://openfeedback.io/${OPENFEEDBACK_EVENT_ID}/${date}/${talkId}`;
}

/**
 * Convert markdown to HTML
 */
export function markdownToHtml(md: string | undefined | null): string {
  if (!md) return '';
  return marked.parse(md, { async: false }) as string;
}

/**
 * Generate speaker avatar URL
 * Priority: picture URL > local file by UID > onerror fallback to UI Avatars
 */
export function getSpeakerAvatarUrl(speaker: FullSpeaker): string {
  // Si une URL de photo existe deja (ex: depuis Conference Hall), l'utiliser
  if (speaker.picture) {
    return speaker.picture;
  }
  // Sinon, utiliser l'UID comme nom de fichier local
  // L'onerror dans les composants fera le fallback vers UI Avatars si le fichier n'existe pas
  return `/img/speakers/${speaker.uid}.png`;
}

/**
 * Check if a talk is a workshop/hands-on
 */
export function isWorkshop(talk: FullTalk): boolean {
  return talk.formats.includes('Hands-on') || talk.formats.includes('120min');
}

/**
 * Check if a talk is a lightning talk
 */
export function isLightning(talk: FullTalk): boolean {
  return talk.formats.includes('Lightning') || talk.formats.includes('15min');
}

/**
 * Check if a talk is a keynote
 */
export function isKeynote(talk: FullTalk): boolean {
  return talk.id.toLowerCase().includes('keynote');
}

/**
 * Get format label for a talk
 */
export function getFormatLabel(talk: FullTalk): string {
  if (isKeynote(talk)) return 'Keynote';
  if (isWorkshop(talk)) return 'Atelier';
  if (isLightning(talk)) return 'Lightning';
  return 'Conference';
}

/**
 * Get duration label for a talk
 */
export function getDurationLabel(talk: FullTalk): string {
  if (talk.formats.includes('120min') || talk.formats.includes('Hands-on')) {
    return '2h';
  }
  if (talk.formats.includes('15min') || talk.formats.includes('Lightning')) {
    return '15min';
  }
  if (talk.formats.includes('50min') || talk.formats.includes('Conference')) {
    return '50min';
  }
  return '';
}

/**
 * Get all sponsors
 */
export function getAllSponsors(): Sponsor[] {
  return (sponsorsYaml as Sponsor[]) || [];
}

/**
 * Get sponsor by ID
 */
export function getSponsorById(id: string): Sponsor | undefined {
  return getAllSponsors().find((s) => s.id === id);
}

/**
 * Get sponsors by type
 */
export function getSponsorsByType(type: Sponsor['type']): Sponsor[] {
  return getAllSponsors().filter((s) => s.type === type);
}

/**
 * Get sponsor type label
 */
export function getSponsorTypeLabel(type: Sponsor['type']): string {
  const labels: Record<Sponsor['type'], string> = {
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
    bronze: 'Bronze',
    partenaires: 'Partenaire',
  };
  return labels[type] || type;
}
