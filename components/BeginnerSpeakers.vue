<script setup lang="ts">
const mailSubject = "Speakers débutant·e·s"
const mailBody = `Bonjour,

Je n'ai jamais ou peu parlé en conférences avant et souhaiterais être accompagné·e dans la création du CFP, la préparation et les répétitions de mon talk.

Mon idée de sujet est la suivante :
Je pensais partir sur un format xx minutes.`

const mailLink = `mailto:team@touraine.tech?subject=${encodeURIComponent(
  mailSubject
)}&body=${encodeURIComponent(mailBody)}`
</script>

<template>
  <section id="beginner-speakers" class="container--green">
    <div class="beginners-card container--fix container--center">
      <div class="beginners-icon">
        <!-- Microphone SVG icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960" fill="#6ABFAD"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" /></svg>
      </div>
      <h2 class="beginners-title">
        Accompagnement des speakers débutant·e·s
      </h2>
      <div class="beginners-content">
        <p>
          Depuis ses débuts, Touraine Tech souhaite offrir sa chance aux
          <strong>speakers débutant·e·s</strong>, donner la parole à tout le monde
          et favoriser la diversité dans notre milieu et plus particulièrement
          pour les speakers femmes et/ou speakers issu·e·s de minorités.
        </p>
        <p>
          Inspirés par des évènements comme le YoungBlood et le Tremplin des
          speakers (organisé par CraftRecords, TADx et le Camping des speakers),
          nous voulons nous investir davantage cette année en offrant un
          <strong>accompagnement aux speakers débutant·e·s</strong>,
          particulièrement si vous avez peur de vous lancer&nbsp;!
        </p>
        <p>
          Vous bénéficierez de conseils sur la rédaction de vos sujets, un
          accompagnement dans la préparation de votre support et de votre discours
          et une occasion de répéter devant quelqu'un pour avoir des conseils
          personnalisés.
        </p>
        <p>
          L'idée est de vous offrir un évènement où vous vous sentez en sécurité
          pour faire vos premiers pas dans le monde des conférences, c'est
          pourquoi vous êtes libre de décider de quelle forme d'accompagnement
          vous souhaitez bénéficier et vous aurez libre choix de votre mentor
          femme ou homme parmi nos volontaires.
        </p>
        <p>
          Contactez-nous en indiquant que vous souhaitez rejoindre l'aventure&nbsp;!
        </p>
      </div>
      <ul class="contact-list">
        <li>
          <a class="contact-button" :href="mailLink">
            <span class="contact-button-icon" aria-hidden="true">✉️</span> Par
            email à team@touraine.tech
          </a>
        </li>
        <li>
          <a class="contact-button" href="https://bsky.app/profile/tourainetech.bsky.social">
            <span class="contact-button-icon bluesky-icon" aria-hidden="true">
              <img src="/img/Bluesky_Logo.svg" alt="bluesky logo" />
            </span>
            Via Bluesky à @tourainetech
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

.beginners-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.12);
  padding: 3rem 2rem 2.5rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  transition: box-shadow 0.18s, transform 0.18s;
}

.beginners-icon {
  margin-bottom: 1.2rem;
}
.beginners-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #222;
}
.beginners-content p {
  font-size: 1.15rem;
  color: #222;
  margin-bottom: 1.1rem;
  line-height: 1.6;
}
.contact-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 2rem 0 0 0;
  & > li {
    margin: 0.5rem;
  }
}
.contact-button {
  display: inline-flex;
  align-items: center;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none;
  transition: transform 100ms ease-in-out, box-shadow 0.12s;
  background: #e0f7f4;
  color: #21867b;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(94, 195, 182, 0.13);
  border: none;
  cursor: pointer;
  min-width: 220px;
}
.contact-button:hover {
  background: #c2ece6;
  color: #21867b;
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(94, 195, 182, 0.22);
}
.contact-button:focus {
  outline-color: $color-secondary;
}
.contact-button-icon {
  font-size: 1.3em;
  margin-right: 0.5em;
  line-height: 1;
}
.bluesky-icon img {
  width: 1.15em;
  height: 1.15em;
  display: inline-block;
  vertical-align: middle;
  margin-top: -0.08em;
}
@media (max-width: 600px) {
  .beginners-card {
    padding: 2rem 0.5rem 1.5rem 0.5rem;
  }
  .beginners-title {
    font-size: 1.4rem;
  }
  .beginners-content p {
    font-size: 1rem;
  }
  .contact-button {
    min-width: 140px;
    font-size: 1rem;
    padding: 0.8rem 1rem;
  }
}
</style>
