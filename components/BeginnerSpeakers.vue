<template>
  <section id="beginner-speakers" class="container--white">
    <div class="container--fix container--center">
      <h2>Acccompagnement des nouveaux speakers</h2>
      <p>
        Depuis ses débuts, Touraine Tech souhaite offrir sa chance aux
        <strong>speakers débutant•e•s</strong>, donner la parole à tout le monde
        et favoriser la diversité dans notre milieu et plus particulièrement pour
        les speakers femmes et/ou issu•e•s de minorités.
      </p>
      <p>
        Inspirés par des évènements comme le YoungBlood et le Tremplin des
        speakers (organisé par CraftRecords, TADx et le Camping des speakers),
        nous voulons nous investir davantage cette année en offrant un
        <strong>accompagnement aux speakers débutant•e•s</strong>, particulièrement
        si vous avez peur de vous lancer !
      </p>
      <p>
        Vous bénéficierez de conseils sur la rédaction de vos sujets, un
        accompagnement dans la préparation de votre support et de votre discours
        et une occasion de répéter devant quelqu’un pour avoir des conseils
        personnalisés.
      </p>
      <p>
        L'idée est de vous offrir un évènement où vous vous sentez en sécurité pour faire vos premiers pas
        dans le monde des conférences, c'est pourquoi vous êtes libre de décider de quelle forme d'accompagnement
        vous souhaitez bénéficier et vous aurez libre choix de votre mentor femme ou homme parmi nos volontaires. 
      </p>
      <p>
        <strong>Choisissez le format "Speaker débutant•e" en remplissant le CFP</strong>, ou contactez-nous directement !
      </p>

      <ul class="contact-list">
        <li>
          <a class="contact-button" :href="mailLink">
            Par email à team@touraine.tech
          </a>
        </li>
        <li>
          <a class="contact-button" href="https://twitter.com/tourainetech">
            Via Twitter à @tourainetech
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
const mailSubject = "Speaker Débutant";
const mailBody = `Bonjour,

Je n'ai jamais ou peu parlé en conférences avant et souhaiterais être accompagné dans la création du CFP, la préparation et les répétitions de mon talk.

Mon idée de sujet est la suivante :
Je pensais partir sur un format xx minutes.`;

export default {
  data() {
    return {
      mailLink: `mailto:team@touraine.tech?subject=${encodeURIComponent(
        mailSubject
      )}&body=${encodeURIComponent(mailBody)}`
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

p {
  margin-bottom: 1rem;
}

.contact-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  & > li {
    margin: 0.5rem;
  }
}

.contact-button {
  display: inline-block;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  transition: transform 100ms ease-in-out;
  background-color: $color-primary;
  color: white;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline-color: $color-secondary;
  }
}
</style>
