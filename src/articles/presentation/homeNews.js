import Siema from 'siema'

const perPage = 2
const timeBetweenTwoNews = 10000

const carousel = new Siema({
    selector : '.news-previews-list',
    perPage,
    draggable: true,
    loop     : true,
    onInit   : changeSlideAfterTime,
    onChange : changeSlideAfterTime
})

let lastTimeout = null

function changeSlideAfterTime() {
    const carousel = this

    if (lastTimeout) {
        clearTimeout(lastTimeout)
    }

    lastTimeout = setTimeout(changeSlide, timeBetweenTwoNews, carousel)
}

function changeSlide(carousel) {
    carousel.next()
}
