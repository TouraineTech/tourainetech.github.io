let $navTrigger = document.querySelector('#nav-trigger');
if ($navTrigger) {
    document.body.addEventListener('click', (e) => {
        if (e.target.id !== 'nav-open' && e.target.id !== 'nav-trigger') {
            $navTrigger.checked = false;
        }
    });
}