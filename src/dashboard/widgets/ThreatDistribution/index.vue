<template>
  <BasePanel title="总体攻击情况">
    <div class="threat-distribution">
      <div class="item" v-for="count in 10">
        <div class="item-info">
          <span>福州信息中心</span>
          <span>237</span>
        </div>
        <div class="item-bar">
          <div v-for="item in 20" :class="{ full: item < 5 }"></div>
        </div>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
// interface PropsType {}
// const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.threat-distribution {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 60px;
  .item {
    color: #fff;
    .item-info {
      display: flex;
      justify-content: space-between;
      span:first-child {
        font-size: 16px;

        // font-weight: bold;
      }
      span:last-child {
        font-family: DengJuGengShaHeiTi;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .item-bar {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      grid-gap: 4px;
      width: 100%;
      height: 15px;
      margin-top: 10px;
      div {
        // background-color: #999;
        background: #454545;
        &.full {
          background-color: #ed772f;
        }
      }
    }

    // background-color: red;
  }
}
</style>
