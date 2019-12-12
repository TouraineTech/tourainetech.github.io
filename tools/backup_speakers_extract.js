/**
Tool to generate backup speaker email content, need to extract data from conference-hall to a `export.json`.
*/
const talks = require('./export.json');

//console.dir(talks);

let speakers = {};
talks.speakers.forEach(speaker => {
    speakers[speaker.uid] = speaker;
});

//console.dir(speakers);

let speakersAndTalks = talks.talks.map( talk => {
    return {
      "title": talk.title,
      "speakers": talk.speakers.map(id => speakers[id].email)
    };
});

//console.dir(speakersAndTalks);

speakersAndTalks.forEach(s => {
    console.log(`
[TNT 20] Confirmation de talk

${s.speakers.join(',')}

Bonjour,
nous vous contactons car votre sujet "${s.title}" a retenu toute notre attention et a obtenu d'excellentes notes lors de la délibération du CFP Touraine Tech.
Cependant, nous avons du effectuer des choix et votre sujet n'a pas été retenu dans le lot des sujets "principaux". En revanche, nous serions ravis de vous compter parmis nous en tant que speaker "de reserve".

Bien entendu, dans le cas où vous êtes partant, votre place est offerte, vous ferez parti des speakers et aurez également accès à la soirée speaker la veille.
Cela signifie que vous pourriez être amené à faire votre présentation si un des speakers "principaux" a un empêchement.

Merci de répondre par retour de mail,

Cedric, pour l'équipe Touraine Tech
    `);

    console.log("----------------");
});