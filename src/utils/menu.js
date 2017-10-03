document.body.addEventListener('click', (e) => {
    if (e.target.id !== "nav-open" && e.target.id !== "nav-trigger") {
        document.querySelector('#nav-trigger').checked = false
    }
})