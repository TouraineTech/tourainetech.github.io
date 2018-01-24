const rawAgenda = require('./agenda.json');

const events = rawAgenda.events.filter(event => event.id);

const descriptionPartial = events
    .map(eventTemplate)
    .join('');

module.exports = `<section id="talkDescriptions" class="talkDescription">
    <h1>Descriptions</h1>
    <dl class="description-content">
        ${descriptionPartial}
    </dl>
</section>`;

function eventTemplate(event) {
    return trim(`
        <dt id="${event.id}" class="agenda-event">
            <h1>${event.title} par ${event.speakers}</h1>
        </dt>
        <dd>
            <p class="format">${event.format}</p>
            <p class="type">${event.event_type}</p>
            <p>${cariageReturn(event.description)}</p>
        </dd>
    `);
}

function cariageReturn(s) {
    return s.replace(/\n/g, '<br>');
}

function trim(s) {
    return s.replace(/\n/g, '').trim();
}
