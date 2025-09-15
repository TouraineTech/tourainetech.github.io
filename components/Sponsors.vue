<template>
  <section id="sponsors" class="container--white sponsors-section">
    <div class="sponsors-card container--fix container--center">
      <div class="sponsors-icon">
        <!-- Handshake SVG icon -->
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 17l5 5a3 3 0 0 0 4.24 0l7.07-7.07a2 2 0 0 0 0-2.83l-5.66-5.66a2 2 0 0 0-2.83 0L2 12.76a3 3 0 0 0 0 4.24z" fill="#5ec3b6" />
          <path d="M17 7l4-4" stroke="#5ec3b6" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
      <h2 class="sponsors-title">
        Nos sponsors
      </h2>
      <div class="sponsors-links">
        <a href="/sponsor_2026.pdf" target="_blank" class="sponsors-badge">
          <span class="sponsors-badge-icon" aria-hidden="true">📄</span> Dossier de sponsoring
        </a>
        <a class="sponsors-btn" href="https://sponsoring2026.touraine.tech" target="_blank">
          <span class="sponsors-btn-icon">💼</span> Devenez sponsor
        </a>
      </div>
      <div class="sponsors-blocs">
        <sponsors-bloc type="Platinium"></sponsors-bloc>
        <sponsors-bloc type="Gold"></sponsors-bloc>
        <sponsors-bloc type="Silver"></sponsors-bloc>
        <sponsors-bloc type="Bronze"></sponsors-bloc>
        <sponsors-bloc type="Partenaires"></sponsors-bloc>
      </div>
    </div>
  </section>
</template>

<script>
import SponsorsBloc from "./SponsorsBloc.vue";

export default {
  components: {
    SponsorsBloc
  }
};
</script>

<style scoped>
.sponsors-section {
  padding: 4rem 0;
  background: #f9fafb;
}
.sponsors-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.10);
  padding: 3rem 2rem 2.5rem 2rem;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.sponsors-icon {
  margin-bottom: 1.2rem;
}
.sponsors-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1.2rem;
}
.sponsors-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}
.sponsors-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0f7f4;
  color: #21867b;
  font-weight: 600;
  border-radius: 16px;
  padding: 0.6rem 1.2em;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.15s;
  min-height: 2.4rem;
}
.sponsors-badge:hover {
  background: #c2ece6;
}
.sponsors-badge-icon {
  display: inline-block;
  font-size: 1.3em;
  margin-right: 0.5em;
  line-height: 1;
}
.sponsors-btn {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(90deg, #5ec3b6 0%, #43e97b 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.6rem 1.8rem;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(94, 195, 182, 0.13);
  text-decoration: none;
  transition: transform 0.12s, box-shadow 0.12s;
}
.sponsors-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 18px rgba(94, 195, 182, 0.22);
}
.sponsors-btn-icon {
  font-size: 1.3em;
  margin-right: 0.5em;
}
.sponsors-blocs {
  margin-top: 2.5rem;
}
@media (max-width: 600px) {
  .sponsors-card {
    padding: 2rem 0.5rem 1.5rem 0.5rem;
  }
  .sponsors-title {
    font-size: 1.4rem;
  }
  .sponsors-links {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
