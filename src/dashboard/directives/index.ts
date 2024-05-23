import type { App } from 'vue'
import { setupAnimatedNumber } from './animatedNumber'

export function setupDirectives(app: App) {
  setupAnimatedNumber(app)
}
