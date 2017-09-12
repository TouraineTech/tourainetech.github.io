import { lazyScripts } from './lazyScripts';

export function initializeGA() {
    return lazyScripts('https://www.google-analytics.com/analytics.js')
        .then(() => {
            const ga = window.ga;

            ga('create', 'UA-106348061-1', 'auto');
            ga('send', 'pageview');
        });
}
