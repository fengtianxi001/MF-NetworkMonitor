import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'
import type { AsyncComponentLoader } from 'vue'

const components: any = import.meta.glob('./*.vue')

export function setupComponents(app: App) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    app.component(name, defineAsyncComponent(value as AsyncComponentLoader))
  }
}

export default setupComponents
