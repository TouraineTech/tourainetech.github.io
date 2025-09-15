<template>
  <section id="cfp" class="container--white cfp-section">
    <div class="cfp-card container--fix container--center">
      <div class="cfp-icon">
        <!-- Microphone SVG icon -->
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="none" />
          <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 14 0zM11 19.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93z" fill="#4CAF50" />
        </svg>
      </div>
      <h2 class="cfp-title">
        Call for Paper
      </h2>
      <template v-if="configuration.isCfpOpen">
        <p class="cfp-open-text">
          <a href="https://cfp26.touraine.tech" target="_blank" class="cfp-btn">
            CFP est ouvert
          </a>
        </p>
        <p class="cfp-date-text">
          Vous pouvez proposer un sujet jusqu'au <span class="cfp-badge">{{ configuration.cfClosingDate }} à 23h59</span>
        </p>
      </template>
      <template v-else>
        <p class="cfp-closed-text">
          Le CFP est clos pour cette édition.
        </p>
      </template>
      <div class="cfp-delib">
        La délibération se fera courant <span class="cfp-badge">{{ configuration.cfpDeliberationDate }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    configuration() {
      return this.$store.getters.configuration;
    }
  }
}
</script>

<style scoped>
.cfp-section {
  padding: 4rem 0;
  background: #f9fafb;
}
.cfp-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.12);
  padding: 3rem 2rem 2.5rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.cfp-icon {
  margin-bottom: 1.2rem;
}
.cfp-icon svg path {
  fill: #5ec3b6;
}
.cfp-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #222;
}
.cfp-open-text {
  margin-bottom: 2.2rem;
}
.cfp-btn {
  display: inline-block;
  background: linear-gradient(90deg, #5ec3b6 0%, #43e97b 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.7rem 2.2rem;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(94, 195, 182, 0.15);
  text-decoration: none;
  transition: transform 0.12s, box-shadow 0.12s;
}
.cfp-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 18px rgba(94, 195, 182, 0.22);
}
.cfp-date-text {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}
.cfp-badge {
  display: inline-block;
  background: #e0f7f4;
  color: #21867b;
  font-weight: 700;
  border-radius: 12px;
  padding: 0.2em 0.8em;
  font-size: 1rem;
  margin-left: 0.3em;
}
.cfp-closed-text {
  color: #b71c1c;
  font-weight: 600;
  margin-bottom: 1.5rem;
}
.cfp-delib {
  font-size: 1.05rem;
  color: #444;
  margin-top: 1.2rem;
}
</style>
