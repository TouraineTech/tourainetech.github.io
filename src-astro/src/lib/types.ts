// Site configuration
export interface SiteConfig {
  isCfpOpen: boolean;
  isTicketingOpen: boolean;
  isProgrammePublished: boolean;
  cfpDeadline?: string;
  ticketingUrl: string;
  cfpUrl: string;
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
  categories: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null;
  speakers: string[];
  languages: string[];
}

export interface Speaker {
  uid: string;
  displayName: string;
  company?: string;
  bio?: string;
  photoURL?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

export interface ConferenceHallData {
  talks: Talk[];
  speakers: Speaker[];
  categories: Category[];
  formats: Format[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Format {
  id: number;
  name: string;
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
  link: string;
}

export interface Sponsor {
  id: string;
  name: string;
  type: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partenaires';
  image: string;
  link: string;
  desc?: string;
  linkedIn?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
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
