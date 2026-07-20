import { siteConfig } from '@data/config/site';
import { getAllSponsors } from '@lib/data';

// Source de verite : la phase de campagne pilote le hero + l'ordre editorial.
export const phase = siteConfig.phase;

export const isCfp = phase === 'cfp';
export const isTicketing = phase === 'ticketing';
export const isProgramme = phase === 'programme';
export const isPost = phase === 'post-event';

// Etats independants
export const isSponsoringOpen = siteConfig.isSponsoringOpen;
export const isTicketingOpen = siteConfig.isTicketingOpen;

// Derive de la donnee : ne jamais renseigner a la main.
export const hasSponsors = getAllSponsors().length > 0;

// Flags legacy derives (consommes par HeroSection / Navigation).
// C'est ce mapping qui garantit "une seule conversion principale par phase"
// et corrige le bug "CFP invisible".
export const isCfpOpen = isCfp;
export const isProgrammePublished = isProgramme || isPost;

// La card billetterie du hero s'affiche pendant les phases billetterie/programme
// (l'etat "ouvert vs bientot" est gere par isTicketingOpen a l'interieur).
export const showTicketCard = isTicketing || isProgramme;

// Le bloc sponsors commercial (argumentaire + CTA) : ouvert et hors post-event.
export const showSponsoringCta = isSponsoringOpen && !isPost;
