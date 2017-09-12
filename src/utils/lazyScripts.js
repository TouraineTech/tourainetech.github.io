const head = document.head || document.getElementsByTagName('head')[ 0 ];
const createElement = ::document.createElement;

export function lazyScripts(...args) {
    return Promise.all(
        args.map(src => {
            return new Promise((resolve, reject) => {
                const script = createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;

                head.appendChild(script);
            });
        })
    );
}