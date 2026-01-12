import type { SiteConfig } from '@lib/types';

export const siteConfig: SiteConfig = {
  // Mode du site - ajuster selon le cycle de l'evenement
  isCfpOpen: false,
  isTicketingOpen: true,
  isProgrammePublished: true,

  // URLs externes
  cfpDeadline: '16 novembre 2025',
  ticketingUrl: 'https://www.billetweb.fr/touraine-tech-2026',
  cfpUrl: 'https://conference-hall.io/touraine-tech-2026',

  // Informations de l'edition
  edition: {
    year: 2026,
    dates: '12-13 Fevrier 2026',
    location: 'Faculté des Sciences - Université de Tours',
  },
};

// Stats affichees sur la home page
export const stats = [
  { value: '50+', label: 'talks', icon: '🎤' },
  { value: '800', label: 'participants', icon: '👥' },
  { value: '60', label: 'speakers', icon: '🎙️' },
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

// Temoignages (placeholders)
export const testimonials = [
  {
    id: '1',
    quote: 'Une conference a taille humaine avec des talks de grande qualite. Je reviens chaque annee!',
    author: 'Marie Dupont',
    role: 'Developpeur Senior',
    company: 'TechCorp',
    avatar: '',
  },
  {
    id: '2',
    quote: 'L\'ambiance est top, les speakers accessibles, et le lieu est parfait. Vivement l\'annee prochaine!',
    author: 'Thomas Martin',
    role: 'Tech Lead',
    company: 'StartupXYZ',
    avatar: '',
  },
  {
    id: '3',
    quote: 'Mon premier talk en conference, et l\'equipe m\'a super bien accompagne. Une experience inoubliable.',
    author: 'Sophie Bernard',
    role: 'Speaker 2025',
    company: '',
    avatar: '',
  },
];
