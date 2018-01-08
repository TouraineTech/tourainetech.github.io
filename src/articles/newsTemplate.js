export default function template(article) {
    return `
        <article class="news-item">
            <header class="news-item-header">
                ${
                    article.meta.title
                        ? `<h1>${article.meta.title}</h1>`
                        : ''
                }
                <span>Publié le : ${ article.creationDate.format('YYYY-MM-DD') }</span>
            </header>
            <div class="news-item-content">
                ${ article.content}
            </div>
        </article>
    `
}