import { marked } from 'marked';
import conferenceHall from '@data/generated/conferenceHall.json';
import schedule from '@data/generated/schedule.json';
import times from '@data/config/times.json';
import rooms from '@data/config/rooms.json';
import sponsorsYaml from '@data/sponsors.yaml';

// Types for the data utility functions
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

/**
 * Get a speaker by their UID
 */
export function getSpeakerByUid(uid: string): FullSpeaker | undefined {
  const speaker = (conferenceHall as any).speakers?.find(
    (s: any) => s.uid === uid
  );
  if (!speaker) return undefined;
  return {
    uid: speaker.uid,
    name: speaker.name || speaker.displayName || uid.replace(/_/g, ' '),
    bio: speaker.bio,
    company: speaker.company,
    picture: speaker.picture || speaker.photoURL,
    twitter: speaker.twitter,
    github: speaker.github,
  };
}

/**
 * Get all speakers from conferenceHall
 */
export function getAllSpeakers(): FullSpeaker[] {
  return ((conferenceHall as any).speakers || []).map((s: any) => ({
    uid: s.uid,
    name: s.name || s.displayName || s.uid.replace(/_/g, ' '),
    bio: s.bio,
    company: s.company,
    picture: s.picture || s.photoURL,
    twitter: s.twitter,
    github: s.github,
  }));
}

/**
 * Get all speakers that have at least one scheduled talk
 */
export function getAllScheduledSpeakers(): FullSpeaker[] {
  const speakerUids = new Set<string>();

  // Collect all speaker UIDs from scheduled talks
  (schedule as any[]).forEach((scheduledTalk) => {
    const chTalk = (conferenceHall as any).talks?.find(
      (t: any) => t.id === scheduledTalk.id
    );
    if (chTalk?.speakers) {
      chTalk.speakers.forEach((uid: string) => speakerUids.add(uid));
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
  const scheduledTalk = (schedule as any[]).find((t) => t.id === id);
  const chTalk = (conferenceHall as any).talks?.find((t: any) => t.id === id);

  if (!scheduledTalk) return undefined;

  // Get speakers data
  const speakers: FullSpeaker[] = (chTalk?.speakers || [])
    .map((uid: string) => getSpeakerByUid(uid))
    .filter((s: FullSpeaker | undefined): s is FullSpeaker => s !== undefined);

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
  return (schedule as any[])
    .map((t) => getTalkById(t.id))
    .filter((t): t is FullTalk => t !== undefined);
}

/**
 * Get all talks by a specific speaker
 */
export function getTalksBySpeakerUid(uid: string): FullTalk[] {
  return (schedule as any[])
    .filter((scheduledTalk) => {
      const chTalk = (conferenceHall as any).talks?.find(
        (t: any) => t.id === scheduledTalk.id
      );
      return chTalk?.speakers?.includes(uid);
    })
    .map((t) => getTalkById(t.id))
    .filter((t): t is FullTalk => t !== undefined);
}

/**
 * Format time display (e.g., "Jeudi 12 à 09h00")
 */
export function formatTimeDisplay(timeIndex: number, day: number): string {
  const slot = (times as any[]).find((t) => t.timeIndex === String(timeIndex));
  const dayLabel = DAY_LABELS[day] || `Jour ${day}`;
  const time = slot?.time?.replace(':', 'h') || '??h??';
  return `${dayLabel} à ${time}`;
}

/**
 * Format room display (e.g., "Salle F21" or "Salles F21, F22")
 */
export function formatRoomDisplay(roomIndexes: number[]): string {
  const roomNames = roomIndexes.map((idx) => (rooms as string[])[idx - 1]);
  if (roomNames.length === 1) {
    return `Salle ${roomNames[0]}`;
  }
  return `Salles ${roomNames.join(', ')}`;
}

/**
 * Get raw time string (e.g., "09:00")
 */
export function getTimeString(timeIndex: number): string {
  const slot = (times as any[]).find((t) => t.timeIndex === String(timeIndex));
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
  // Si une URL de photo existe déjà (ex: depuis Conference Hall), l'utiliser
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
  return (
    talk.formats.includes('Hands-on') || talk.formats.includes('120min')
  );
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
  return 'Conférence';
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
  if (talk.formats.includes('50min') || talk.formats.includes('Conférence')) {
    return '50min';
  }
  return '';
}

// Sponsor types and functions
export interface JobOffer {
  id: string;
  title: string;
  link?: string;
  pdf?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  type: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partenaires';
  image: string;
  link: string;
  desc?: string;
  linkedIn?: string;
  twitter?: string;
  bluesky?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  twitch?: string;
  github?: string;
  jobOffers?: JobOffer[];
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
