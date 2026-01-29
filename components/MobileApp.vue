<template>
  <section id="mobile-app" class="mobileapp-section">
    <div class="mobileapp-card container--fix container--center">
      <div class="mobileapp-content">
        <div class="mobileapp-text">
          <div class="mobileapp-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="1" width="14" height="22" rx="3" fill="#5ec3b6" />
              <rect x="7" y="4" width="10" height="14" rx="1" fill="#fff" />
              <circle cx="12" cy="21" r="1" fill="#fff" />
            </svg>
          </div>
          <h2 class="mobileapp-title">
            L'application mobile
          </h2>
          <div class="mobileapp-badge">
            Retrouvez le programme dans votre poche
          </div>
          <p class="mobileapp-desc">
            Consultez les talks, créez votre planning personnalisé et ne manquez aucune conférence grâce aux notifications.
          </p>
          <div class="mobileapp-stores">
            <a
              href="https://apps.apple.com/app/id1599891078"
              target="_blank"
              rel="noopener noreferrer"
              class="mobileapp-store-link"
            >
              <img src="/img/badge-app-store.svg" alt="Télécharger sur l'App Store" class="mobileapp-store-badge mobileapp-store-badge--apple">
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=to.chapi.tnt"
              target="_blank"
              rel="noopener noreferrer"
              class="mobileapp-store-link"
            >
              <img src="/img/badge-google-play.png" alt="Disponible sur Google Play" class="mobileapp-store-badge">
            </a>
          </div>
        </div>
        <div ref="mockupRef" class="mobileapp-mockup" :class="{ 'is-visible': mockupVisible }">
          <div class="mobileapp-phone">
            <div class="mobileapp-phone-notch" />
            <div class="mobileapp-phone-screen">
              <img src="/img/app-mobile.webp" alt="Application mobile Touraine Tech" class="mobileapp-phone-img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const mockupRef = ref(null)
const mockupVisible = ref(false)

onMounted(() => {
  if (!mockupRef.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        mockupVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 },
  )
  observer.observe(mockupRef.value)
})
</script>

<style lang="scss" scoped>
@use "./../assets/scss/variables" as *;

.mobileapp-section {
  padding: 4rem 0;
  background: #f9fafb;
}

.mobileapp-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.1);
  padding: 3rem 2rem 2.5rem;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(circle, rgba(106, 191, 173, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

.mobileapp-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.mobileapp-text {
  flex: 1;
  text-align: left;
}

.mobileapp-icon {
  margin-bottom: 1.2rem;
}

.mobileapp-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #222;
}

.mobileapp-badge {
  display: inline-block;
  background: #e0f7f4;
  color: #21867b;
  font-weight: 600;
  border-radius: 16px;
  padding: 0.5em 1.2em;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.mobileapp-desc {
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.mobileapp-stores {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.mobileapp-store-link {
  display: block;
  transition: transform 0.15s, opacity 0.15s;

  &:hover {
    transform: translateY(-2px) scale(1.03);
    opacity: 0.9;
  }
}

.mobileapp-store-badge {
  height: 60px;
  width: auto;
  display: block;

  &--apple {
    height: 46px;
  }
}

// Phone mockup
.mobileapp-mockup {
  flex-shrink: 0;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobileapp-phone {
  width: 180px;
  height: 340px;
  background: $color-primary;
  border-radius: 28px;
  padding: 10px;
  position: relative;
  box-shadow:
    0 16px 48px rgba(106, 191, 173, 0.25),
    0 4px 16px rgba(34, 35, 51, 0.15);
}

.mobileapp-phone-notch {
  width: 60px;
  height: 6px;
  background: #444;
  border-radius: 4px;
  margin: 4px auto 8px;
}

.mobileapp-phone-screen {
  border-radius: 18px;
  height: calc(100% - 18px);
  overflow: hidden;
}

.mobileapp-phone-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// Responsive
@media screen and (max-width: $mobile-step) {
  .mobileapp-card {
    padding: 2rem 1rem 1.5rem;
  }

  .mobileapp-content {
    flex-direction: column-reverse;
    text-align: center;
  }

  .mobileapp-text {
    text-align: center;
  }

  .mobileapp-title {
    font-size: 1.4rem;
  }

  .mobileapp-stores {
    justify-content: center;
  }

  .mobileapp-phone {
    width: 140px;
    height: 260px;
    border-radius: 22px;
  }

  .mobileapp-phone-screen {
    border-radius: 14px;
  }
}
</style>
