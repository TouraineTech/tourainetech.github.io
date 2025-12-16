const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/source/conferenceHall.raw.json'), 'utf8'));

// Extract unique speakers with their talks
const speakersMap = new Map();

data.forEach(talk => {
  if (!talk.speakers) return;
  talk.speakers.forEach(speaker => {
    if (!speakersMap.has(speaker.id)) {
      speakersMap.set(speaker.id, {
        ...speaker,
        talks: []
      });
    }
    speakersMap.get(speaker.id).talks.push({
      title: talk.title,
      status: talk.deliberationStatus,
      format: talk.formats?.[0] || ''
    });
  });
});

// Extract survey answers
function getSurveyAnswer(survey, questionKeyword) {
  if (!survey) return '';
  const q = survey.find(s => s.question.toLowerCase().includes(questionKeyword.toLowerCase()));
  if (!q) return '';
  if (Array.isArray(q.answer)) return q.answer.join(', ');
  return q.answer || '';
}

// Extract social links by type
function getSocialLink(socialLinks, type) {
  if (!socialLinks) return '';
  const link = socialLinks.find(l => l.toLowerCase().includes(type.toLowerCase()));
  return link || '';
}

// Determine max number of talks per speaker
const speakers = Array.from(speakersMap.values()).sort((a, b) => a.name.localeCompare(b.name));

// Sort talks for each speaker: ACCEPTED first, then others
speakers.forEach(s => {
  s.talks.sort((a, b) => {
    if (a.status === 'ACCEPTED' && b.status !== 'ACCEPTED') return -1;
    if (a.status !== 'ACCEPTED' && b.status === 'ACCEPTED') return 1;
    return 0;
  });
});
const maxTalks = Math.max(...speakers.map(s => s.talks.length));

// CSV header
const header = [
  'Nom',
  'Email',
  'Company',
  'GitHub',
  'X/Twitter',
  'LinkedIn',
  'Taille T-Shirt',
  'Restrictions Alimentaires',
  'Soirée Speakers'
];

// Add columns for each talk slot
for (let i = 1; i <= maxTalks; i++) {
  header.push(`Talk ${i} - Titre`, `Talk ${i} - Statut`, `Talk ${i} - Format`);
}

console.log(header.map(h => '"' + h + '"').join(';'));

speakers.forEach(s => {
  const tshirt = getSurveyAnswer(s.survey, 't-shirt');
  const food = getSurveyAnswer(s.survey, 'alimentaire');
  const dinner = getSurveyAnswer(s.survey, 'soirée');
  const github = getSocialLink(s.socialLinks, 'github');
  const twitter = getSocialLink(s.socialLinks, 'x.com') || getSocialLink(s.socialLinks, 'twitter');
  const linkedin = getSocialLink(s.socialLinks, 'linkedin');

  const row = [
    s.name,
    s.email || '',
    s.company || '',
    github,
    twitter,
    linkedin,
    tshirt,
    food,
    dinner
  ];

  // Add talk columns (fill empty if speaker has fewer talks)
  for (let i = 0; i < maxTalks; i++) {
    const talk = s.talks[i];
    if (talk) {
      row.push(talk.title, talk.status, talk.format);
    } else {
      row.push('', '', '');
    }
  }

  console.log(row.map(v => '"' + (v || '').replace(/"/g, '""') + '"').join(';'));
});
