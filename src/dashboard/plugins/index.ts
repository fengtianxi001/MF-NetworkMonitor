import autofit from 'autofit.js'
import type { App } from 'vue'

export function setupPlugins(app: App) {
  const ScreenSize = {
    big: [2560, 1440],
    normal: [1920, 1080],
    small: [1280, 720],
  }['normal']

  autofit.init({
    el: '#app',
    dw: ScreenSize[0],
    dh: ScreenSize[1],
    resize: true,
    ignore: ['.map-local-marker'],
  })
}
