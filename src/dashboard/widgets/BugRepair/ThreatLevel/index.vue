<template>
  <BasePanel title="威胁等级">
    <div class="threat-level">
      <div
        class="item"
        v-for="item in list"
        :style="{ borderColor: item.color }"
      >
        <div class="item-info">
          <span>{{ item.value }}</span>
          <span>108T</span>
        </div>
        <div class="item-cn">{{ item.cn }}</div>
        <div class="item-en">{{ item.en }}</div>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
const list = [
  {
    cn: '极高威胁',
    en: 'traffic hijacking',
    value: '35%',
    color: '#d51218',
  },
  {
    cn: '高威胁',
    en: 'password cracking',
    value: '28%',
    color: '#ed772f',
  },
  {
    cn: '中等威胁',
    en: 'privilege escalation',
    value: '20%',
    color: '#f1bf42',
  },
  {
    cn: '低威胁',
    en: 'traffic hijacking',
    value: '35%',
    color: '#58a65c',
  },
]
</script>
<style lang="scss" scoped>
.threat-level {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  .item {
    padding: 8px;
    background-color: #565857;
    background-image: radial-gradient(#4b4d4c 50%, transparent 0);
    background-size: 4px 4px;
    border-bottom: 6px solid red;
    .item-info {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      span:first-child {
        font-family: DengJuGengShaHeiTi;
        font-size: 30px;
        font-weight: bold;
        color: #c8c8c8;
      }
      span:last-child {
        font-family: DengJuGengShaHeiTi;
        font-size: 20px;
        font-weight: bold;
        color: #c8c8c8;
      }
    }
    .item-cn {
      font-weight: bold;
      color: #c8c8c8;
    }
    .item-en {
      font-size: 12px;
      font-weight: lighter;
      word-break: break-all;
      white-space: nowrap;
    }
  }
}
</style>
