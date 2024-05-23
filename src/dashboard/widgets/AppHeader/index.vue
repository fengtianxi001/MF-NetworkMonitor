<template>
  <div class="app-header">
    <div class="header-logo">MF</div>
    <div class="header-info">
      <div class="header-name-cn">网络安全监控平台</div>
      <div class="header-name-en">
        NETWORK SECURITY<br />MONITORING PLATFORM
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.app-header {
  display: flex;
  gap: 10px;
  align-items: center;
  height: 100px;
  color: #fff;
  .header-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    font-size: 30px;
    font-weight: bolder;
    background-color: #565857;
    background-image: radial-gradient(#4b4d4c 50%, transparent 0);
    background-size: 4px 4px;
  }
  .header-info {
    .header-name-cn {
      font-size: 24px;
      font-weight: bolder;
    }
    .header-name-en {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: lighter;
      white-space: pre-line;
    }
  }
}
</style>
