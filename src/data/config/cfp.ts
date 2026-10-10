// Source commune aux pages CFP, primo-speakers et aux invitations de l'accueil.
export const primoSpeakersCampaign = {
  // Site statique : passer à false et redéployer à la clôture du 11 octobre.
  // Ce statut est indépendant du CFP général, ouvert jusqu'au 1er novembre.
  isOpen: true,
  deadline: '11 octobre 2026',
  deadlineDate: '2026-10-11',
  format: 'Lightning primo-speakers (15min)',
  duration: '15 minutes, questions comprises',
  contactEmail: 'team@touraine.tech',
};

export const cfpFormats = [
  { name: 'Lightning', duration: '15 min', description: 'Une idée ou un retour d’expérience, dans un format court. Questions comprises.' },
  { name: 'Conférence', duration: '50 min', description: 'Le temps d’explorer un sujet et de partager votre expérience. Questions comprises.' },
  { name: 'Hands-on', duration: '120 min', description: 'Un atelier de deux heures pour apprendre en pratiquant.' },
];

export const primoSpeakersJourney = [
  { title: 'Faire grandir votre idée', description: 'Une personne de l’équipe de mentorat vous aide à préciser votre sujet, votre angle et ce que vous souhaitez transmettre.' },
  { title: 'Construire votre intervention', description: 'Vous préparez le fil de votre présentation et vos supports, avec des retours pour avancer.' },
  { title: 'Répéter et prendre confiance', description: 'Le coaching à la prise de parole et les répétitions vous aident à trouver vos mots et votre rythme.' },
  { title: 'Partager le jour J', description: 'L’accompagnement continue à Touraine Tech, puis lors du débrief pour faire le point sur cette première expérience.' },
];
