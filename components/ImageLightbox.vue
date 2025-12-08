<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div v-if="modelValue" class="image-lightbox" @click.self="close">
        <div class="image-lightbox__backdrop" />
        <div class="image-lightbox__content">
          <button class="image-lightbox__close" aria-label="Fermer" @click="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div class="image-lightbox__showcase">
            <div class="image-lightbox__glow" />
            <img
              :src="src"
              :alt="alt"
              class="image-lightbox__image"
            >
          </div>
          <div v-if="badge || title || price" class="image-lightbox__info">
            <span v-if="badge" class="image-lightbox__badge">{{ badge }}</span>
            <h3 v-if="title" class="image-lightbox__title">{{ title }}</h3>
            <p v-if="price" class="image-lightbox__price">{{ price }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}

// Bloque le scroll quand la lightbox est ouverte
watch(() => props.modelValue, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

// Ferme avec Escape
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.modelValue) {
      close()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  })
})
</script>

<style lang="scss" scoped>
.image-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  &__backdrop {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 30% 20%, rgba(94, 195, 182, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(67, 233, 123, 0.1) 0%, transparent 50%),
      linear-gradient(180deg, rgba(15, 23, 32, 0.97) 0%, rgba(8, 12, 18, 0.99) 100%);
    backdrop-filter: blur(8px);
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90vw;
    width: 100%;
    animation: lightbox-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 10;
    backdrop-filter: blur(8px);

    svg {
      width: 28px;
      height: 28px;
      stroke-width: 2.5;
    }

    &:hover {
      background: rgba(94, 195, 182, 0.3);
      border-color: rgba(94, 195, 182, 0.5);
      transform: scale(1.1) rotate(90deg);
      box-shadow: 0 0 20px rgba(94, 195, 182, 0.4);
    }

    &:active {
      transform: scale(0.95) rotate(90deg);
    }
  }

  &__showcase {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  &__glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background: radial-gradient(circle, rgba(94, 195, 182, 0.35) 0%, transparent 70%);
    filter: blur(40px);
    animation: glow-pulse 3s ease-in-out infinite;
  }

  &__image {
    position: relative;
    max-width: 100%;
    max-height: 80vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 16px;
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    animation: image-float 4s ease-in-out infinite;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    text-align: center;
  }

  &__badge {
    display: inline-block;
    padding: 0.35rem 1rem;
    background: linear-gradient(135deg, rgba(94, 195, 182, 0.2) 0%, rgba(67, 233, 123, 0.15) 100%);
    border: 1px solid rgba(94, 195, 182, 0.3);
    border-radius: 20px;
    color: #5ec3b6;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  &__title {
    margin: 0;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  &__price {
    margin: 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
    font-weight: 500;
  }
}

// Animations
@keyframes lightbox-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes image-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

// Vue Transition
.lightbox-fade-enter-active {
  transition: opacity 0.3s ease;

  .image-lightbox__content {
    animation: lightbox-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;

  .image-lightbox__content {
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;

  .image-lightbox__content {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
}
</style>
