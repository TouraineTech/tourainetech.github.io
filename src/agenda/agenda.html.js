const moment = require('moment');
const rawAgenda = require('./agenda.json');

const agenda = rawAgenda.resources
    .map(resource => {
        const events = rawAgenda.events
            .filter(event => event.resourceId === resource.id)
            .sort(sortEventByStartDateAsc);

        return {
            ...resource,
            events,
        }
    });


const agendaPartial = agenda
    .map(resourceTemplate)
    .join('');

module.exports = `<section id="agenda" class="agenda">
    <h1>Agenda</h1>
    <div class="agenda-content">
        ${agendaPartial}
    </div>
</section>`;

function eventTemplate(event) {
    return trim(`
        <article class="agenda-event ${event.formatType}">
            <div class="agenda-event-wrapper" style="border-bottom-color: ${event.color}"  title="${event.event_type}">
                <span class="agenda-hours">
                    ${moment(event.start).utcOffset(1).format('HH:mm')}
                </span>
                <h1>${event.id ? `<a href="agenda.html#${event.id}">${event.title}</a>` : event.title}</h1>
                <p>${event.speakers}</p>
            </div>
        </article>
    `);
}

function resourceTemplate(resource) {
    return trim(`
        <section class="agenda-resource ${resource.title.includes('TD ') ? 'agenda-TD' : ''}">
            <h1>${resource.title}</h1>
            ${ resource.events
                .map(eventTemplate)
                .join('') }
        </section>
    `)
}

function trim(s) {
    return s.replace(/\n/g, '').trim();
}

function sortEventByStartDateAsc(e1, e2) {
    // Since it's ISO formatted date string comparison is enough
    if (e1.start > e2.start) {
        return 1;
    } else if (e1.start < e2.start) {
        return -1;
    } else {
        return 0;
    }
}
