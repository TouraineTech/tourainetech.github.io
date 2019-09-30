<template>
  <section
    id="backtoschool"
    class="container--green"
  >
    <div class="container--fix container--center">
      <h2>#BackToSchool</h2>
      <p class="backtoschool--intro">
        Rendez-vous le <span class="label--text label--white">vendredi 31 janvier 2020</span> à <span class="label--text label--white">Polytech'TOURS</span> pour une journée de conférence à un prix accessible.
      </p>
      <ul class="backtoschool--numbers">
        <li><span>18</span> conférences</li>
        <li><span>6</span> lightning talks</li>
        <li><span>2</span> hands on</li>
      </ul>
      <ul class="backtoschool--themes">
        <li><img
            src="@/assets/img/1_design.svg"
            alt="design logo"
          >Design, UI, UX</li>
        <li><img
            src="@/assets/img/2_front.svg"
            alt="front logo"
          >Front web, mobile</li>
        <li><img
            src="@/assets/img/3_cloud.svg"
            alt="cloud logo"
          >Backends, Cloud, Big Data</li>
        <li><img
            src="@/assets/img/4_jeux.svg"
            alt="jeux logo"
          >Jeux vidéos et hybrides</li>
        <li><img
            src="@/assets/img/5_objets.svg"
            alt="objets logo"
          >Internet des objets</li>
        <li><img
            src="@/assets/img/6_archi.svg"
            alt="archi logo"
          >Conception, architecture</li>
        <li><img
            src="@/assets/img/7_outils.svg"
            alt="outils logo"
          >Outillage, pratiques de développement</li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/variables";

p {
  font-size: 24px;
}

ul {
  list-style: none;
  padding: 0;
}

ul.backtoschool--numbers {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  li {
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }
  span {
    font-size: 3rem;
    font-weight: bold;
  }
}

ul.backtoschool--themes {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  li {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    font-size: 18px;
    width: 150px;
  }
  img {
    width: 100px;
    height: 100px;
    margin: auto auto 1rem;
  }
}
</style>
