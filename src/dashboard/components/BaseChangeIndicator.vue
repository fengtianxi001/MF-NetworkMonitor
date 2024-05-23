<template>
  <span class="base-change-indicator" :class="status">
    <span v-if="label" class="indicator-label">{{ label }}</span>
    <span class="indicator-value">{{ value }}</span>
    <span class="indicator-icon" :class="iconName"></span>
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface PropsType {
  label?: number | string
  value: number | string
  status: 'up' | 'down'
}
const props = defineProps<PropsType>()

const iconName = computed(() => {
  const list = {
    up: 'fa-solid fa-arrow-trend-up',
    down: 'fa-solid fa-arrow-trend-down',
  }
  return list[props.status]
})
</script>
<style lang="scss" scoped>
.base-change-indicator {
  display: flex;
  grid-gap: 6px;
  .indicator-label {
    color: #9292c1;
  }
  &.up {
    color: #5eff5a;
  }
  &.down {
    color: #eb503c;
  }
}
</style>
