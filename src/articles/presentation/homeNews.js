import Siema from 'siema'
import picomodal from 'picomodal'

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

const slides = [ ...document.querySelectorAll('.news-previews-list .news-item:not(.modal-content)') ]

slides.forEach((slide) => {
    const modalContent = slide.querySelector('.modal-content')

    const modal = picomodal(modalContent.outerHTML)

    slide
        .querySelector('.read-more')
        .addEventListener('click', (event) => {
            modal.show()
        })
})