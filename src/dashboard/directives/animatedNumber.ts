import type { App } from 'vue'
import gsap from 'gsap'

export function setupAnimatedNumber(app: App) {
  const onGaspUpdate = (el: any) => {
    const value = el.animateNumber?.targets()[0].number || 0
    el.textContent = String(Math.round(value))
  }
  const onGaspComplete = (el: any) => {
    el.animateNumber = undefined
  }

  app.directive('number', {
    mounted(el, binding) {
      el.animateNumber = gsap.to(
        { number: binding.oldValue ?? 0 },
        {
          duration: 2,
          number: Number(binding.value) ?? 0,
          onUpdate: () => onGaspUpdate(el),
          onComplete: () => onGaspComplete(el),
        }
      )
    },
    updated(el, binding) {
      el.animateNumber?.kill()
      el.animateNumber = gsap.to(
        { number: binding.oldValue ?? 0 },
        {
          duration: 2,
          number: Number(binding.value) || 0,
          onUpdate: () => onGaspUpdate(el),
          onComplete: () => onGaspComplete(el),
        }
      )
    },
    unmounted(el) {
      el.animateNumber?.kill()
    },
  })
}

export default setupAnimatedNumber
