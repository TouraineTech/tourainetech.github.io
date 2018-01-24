const moment = require('moment');
const rawAgenda = require('./agenda.json');

const events = rawAgenda.events;

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
    return `
        <dt id="${event.id}" class="agenda-event">
            <h1>${event.title} par ${event.speakers}</h1>
        </dt>
        <dd>
            <p class="format">${event.format}</p>
            <p class="type">${event.event_type}</p>
            <p>${event.description}</p>
        </dd>
    `;
}