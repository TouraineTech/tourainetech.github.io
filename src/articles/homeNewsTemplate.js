const maxPreviewCharactersCount = 250

export default function template(article) {
    const header = `
        <header class="news-item-header">
            ${
                article.meta.title
                    ? `<h1>${article.meta.title}</h1>`
                    : ''
            }
            <span>Publié le : ${ article.creationDate.format('YYYY-MM-DD') }</span>
        </header>
    `
    return `
        <article class="news-item">
            ${ header }
            <div class="news-item-content">
                ${ article.content.slice(0, maxPreviewCharactersCount) + (article.content.length > maxPreviewCharactersCount ? '...' : '') }
            </div>
            
            <footer class="news-item-footer">
                <button class="read-more">Lire plus</button>
            </footer>
            
            <article class="modal-content news-item">
                ${ header }
                ${ article.content }
            </article>
        </article>
    `
}