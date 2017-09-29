import { lazyScripts } from './lazyScripts';

export function initializeGA() {
    return lazyScripts('https://www.google-analytics.com/analytics.js')
        .then(() => {
            const ga = window.ga;
            /** if it didn't load */
            if (!ga) return noAnalytics();

            ga('create', 'UA-106348061-1', 'auto');
            ga('send', 'pageview');
        }).catch(noAnalytics);
}

function noAnalytics() {
    console.log("google analytics weren't loaded");
}
