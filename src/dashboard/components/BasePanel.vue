<template>
  <div class="base-panel">
    <div class="panel-header">
      <div class="header-title-cn">{{ title }}</div>
      <div class="header-title-en">OVERALL ATTACKS SITUATION</div>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface PropsType {
  title: string
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-panel {
  .panel-header {
    position: relative;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 8px 15px;
    background-color: #565857;
    background-image: radial-gradient(#4b4d4c 50%, transparent 0);
    background-size: 4px 4px;
    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
      height: 0;
      content: '';
      border-bottom: 6px solid #9e9e9e;
      border-left: 6px solid transparent;
    }
    .header-title-cn {
      font-size: 16px;
      font-weight: bold;
    }
    .header-title-en {
      font-size: 12px;
      font-weight: lighter;
    }
  }
  .panel-body {
    padding: 10px;
    background: rgba(0, 0, 0, 29%);
  }
}
</style>
