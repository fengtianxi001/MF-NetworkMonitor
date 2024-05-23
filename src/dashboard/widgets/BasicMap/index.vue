<template>
  <div ref="container" class="base-map"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useMap } from './hooks/useMap'

const { container, scene, bootstrap } = useMap()
onMounted(() => {
  bootstrap({
    geojsons: ['/geojson/350000.json'],
  })
})
</script>
<style lang="scss" scoped>
.base-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
