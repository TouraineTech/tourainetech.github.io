// Publishing a new edition must never expose the previous edition's programme.
export function canPublishProgramme(phase: string, editionYear: number, dataYear: number): boolean {
  return (phase === 'programme' || phase === 'post-event') && editionYear === dataYear;
}

export function isProgrammePath(pathname: string): boolean {
  return /^\/(schedule|speakers|speaker|talk)(\/|$)/.test(pathname);
}

// Une date limite ISO reste ouverte jusqu'à la fin de la journée à Paris.
// Sur le site statique, ce statut est recalculé à chaque build.
export function isDeadlineOpen(deadlineDate: string | undefined, now: Date = new Date()): boolean {
  if (!deadlineDate) return false;

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

  return today <= deadlineDate;
}
