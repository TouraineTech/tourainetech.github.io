import { siteConfig } from '@data/config/site';
import { primoSpeakersCampaign } from '@data/config/cfp';
import { getAllSponsors } from '@lib/data';
import programmeEdition from '@data/source/edition.json';
import { canPublishProgramme } from './publication';

// Source de verite : la phase de campagne pilote le hero + l'ordre editorial.
export const phase = siteConfig.phase;

export const isIntro = phase === 'intro';
export const isSponsoring = phase === 'sponsoring';
export const isCfp = phase === 'cfp';
export const isTicketing = phase === 'ticketing';
export const isProgramme = phase === 'programme';
export const isPost = phase === 'post-event';

// Etats independants
export const isCfpOpen = siteConfig.isCfpOpen;
export const isSponsoringOpen = siteConfig.isSponsoringOpen;
export const isTicketingOpen = siteConfig.isTicketingOpen;

// Derive de la donnee : ne jamais renseigner a la main.
export const hasSponsors = getAllSponsors().length > 0;

// Flags derives (consommes par HeroSection / Navigation).
export const isProgrammePublished = canPublishProgramme(phase, siteConfig.edition.year, programmeEdition.year);

export const isPrimoSpeakersOpen = isCfpOpen && primoSpeakersCampaign.isOpen && !isProgrammePublished && !isPost;

// La carte annonce aussi l'ouverture pendant le CFP quand une date est renseignée.
// L'état "ouvert vs bientôt" est géré par isTicketingOpen à l'intérieur.
export const showTicketCard = isTicketing || isProgramme
  || (isCfp && !isTicketingOpen && Boolean(siteConfig.ticketingOpenDate));

// Le bloc sponsors commercial (argumentaire + CTA) : ouvert et hors post-event.
export const showSponsoringCta = isSponsoringOpen && !isPost;
