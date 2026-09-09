// Publishing a new edition must never expose the previous edition's programme.
export function canPublishProgramme(phase: string, editionYear: number, dataYear: number): boolean {
  return (phase === 'programme' || phase === 'post-event') && editionYear === dataYear;
}

export function isProgrammePath(pathname: string): boolean {
  return /^\/(schedule|speakers|speaker|talk)(\/|$)/.test(pathname);
}
