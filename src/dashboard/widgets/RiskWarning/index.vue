<template>
  <BasePanel>
    <div class="risk-warning">
      <div
        class="row"
        v-for="item in 10"
        :class="{ warning: item === 1, error: item === 2 }"
      >
        <div class="column">福州信息中心机房</div>
        <div class="column">流量劫持</div>
        <div class="column">2024/05/06 12:00:00</div>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.risk-warning {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 440px;
  overflow: hidden;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 10px;
    &:nth-child(odd) {
      background-color: #565857;
      background-image: radial-gradient(#4b4d4c 50%, transparent 0);
      background-size: 4px 4px;
    }
    &.warning {
      background-color: rgba(225, 137, 70, 50%);
      background-image: radial-gradient(rgb(255, 110, 0) 50%, transparent 0);
      background-size: 3px 3px;
      border-color: #ff6e00;
    }

    // &.error {
    //   background-color: rgba(213, 18, 24, 50%);
    //   background-image: radial-gradient(
    //     rgb(213, 18, 24, 100%) 50%,
    //     transparent 0
    //   );
    //   background-size: 3px 3px;
    // }

    // border: 1px solid #888;
  }
}
</style>
