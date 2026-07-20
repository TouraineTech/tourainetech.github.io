import type { SiteConfig } from '@lib/types';

export const siteConfig: SiteConfig = {
  // Phase de campagne : 'cfp' | 'ticketing' | 'programme' | 'post-event'
  phase: 'intro',

  // Etats independants
  isCfpOpen: false,
  isTicketingOpen: false,
  isSponsoringOpen: false,
  ticketingOpenDate: '15 janvier 2026',

  // URLs externes
  cfpDeadline: '16 novembre 2025',
  ticketingUrl: 'https://www.billetweb.fr/touraine-tech-2026',
  cfpUrl: 'https://conference-hall.io/touraine-tech-2026',
  sponsoringUrl: 'https://sponsoring2026.touraine.tech',

  // Billetterie
  ticketTiers: [
    { name: 'Early-bird', price: 50, isSoldOut: true },
    { name: 'Plein tarif', price: 70, isSoldOut: false },
  ],

  // Informations de l'edition
  edition: {
    year: 2027,
    dates: '18-19 Fevrier 2027',
    location: 'Polytech Tours',
  },
};

// Stats affichees sur la home page
export const stats = [
  { value: '80', label: 'talks', icon: '🎤' },
  { value: '550', label: 'participants', icon: '👥' },
  { value: '85', label: 'speakers', icon: '🎙️' },
  { value: '2', label: 'jours', icon: '📅' },
];

// Categories de talks
export const talkCategories = [
  { id: 'backend', name: 'Backend, Cloud, Big Data', icon: '☁️', description: 'Infrastructure, APIs, donnees', color: '#4A90D9' },
  { id: 'frontend', name: 'Front, Design, UI/UX', icon: '🎨', description: 'Interfaces, experiences utilisateur', color: '#E84C88' },
  { id: 'architecture', name: 'Conception, Architecture', icon: '🏗️', description: 'Patterns, bonnes pratiques', color: '#6ABFAD' },
  { id: 'devops', name: 'DevOps, Outils', icon: '🔧', description: 'CI/CD, automatisation', color: '#F5A623' },
  { id: 'ia', name: 'IA, Data', icon: '🤖', description: 'Machine learning, analytics', color: '#9B59B6' },
  { id: 'humain', name: 'Humain & Tech', icon: '💬', description: 'Soft skills, carrieres', color: '#E74C3C' },
  { id: 'alien', name: 'Alien', icon: '👽', description: 'IoT, embarque, mobile, et plus', color: '#1ABC9C' },
];

// Temoignages reels a ajouter ici (l'ancien contenu etait fictif et a ete retire).
// La section n'est affichee sur la home que si ce tableau est non vide.
export const testimonials: Array<{
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}> = [];
