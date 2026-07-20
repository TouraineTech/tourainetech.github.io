// Ticket tier configuration
export interface TicketTier {
  name: string;
  price: number;
  isSoldOut: boolean;
}

// Site configuration
export interface SiteConfig {
  // Phases du site
  isCfpOpen: boolean;
  isTicketingOpen: boolean;
  isTicketingTeasing: boolean;
  ticketingOpenDate?: string;
  isProgrammePublished: boolean;
  isSponsoringOpen: boolean;

  // URLs externes
  cfpDeadline?: string;
  ticketingUrl: string;
  cfpUrl: string;
  sponsoringUrl: string;

  // Billetterie
  ticketTiers: TicketTier[];

  // Informations de l'edition
  edition: {
    year: number;
    dates: string;
    location: string;
  };
}

// Conference Hall data
export interface Talk {
  id: string;
  title: string;
  abstract?: string;
  formats: string;
  categories: string | null;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null;
  speakers: string[];
  languages?: string[];
}

export interface Speaker {
  uid: string;
  name: string;
  displayName?: string;
  company?: string;
  bio?: string;
  picture?: string | null;
  photoURL?: string;
  twitter?: string | null;
  github?: string | null;
  linkedin?: string;
}

export interface ConferenceHallData {
  talks: Talk[];
  speakers: Speaker[];
  categories: string[];
  formats: string[];
}

// Schedule data
export interface ScheduledTalk {
  id: string;
  title: string;
  categories: string | null;
  formats: string;
  rooms: number[];
  times: number[];
  day: number;
  level: string | null;
}

export interface TimeSlot {
  timeIndex: string;
  time: string;
  days: number[];
}

export interface Room {
  name: string;
  capacity: number;
}

export interface Break {
  id: string;
  title: string;
  rooms: number[];
  times: number[];
  day: number;
}

// Sponsors
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

// Team
export interface TeamMember {
  name: string;
  avatar: string;
}

// Photos
export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title?: string;
}

// Testimonials (new)
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
}

// Categories for home page
export interface TalkCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

// Stats
export interface Stat {
  value: string;
  label: string;
  icon?: string;
}
