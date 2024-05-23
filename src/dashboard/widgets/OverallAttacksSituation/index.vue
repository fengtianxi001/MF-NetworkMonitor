<template>
  <BasePanel title="总体攻击情况">
    <div class="overall-attacks-situation">
      <div
        class="body-item"
        v-for="(item, index) in list"
        :class="{ active: index === 0 }"
      >
        <div class="item-bg">
          <div class="title-cn">{{ item.cn }}</div>
          <div class="title-en">{{ item.en }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
        <div class="item-bg-1"></div>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
const list = [
  // {
  //   cn: '情报收集',
  //   en: 'INFOMATION GATHERING',
  //   value: '50%',
  // },
  // {
  //   cn: '漏洞入侵',
  //   en: 'vulnerability intrusion',
  //   value: '25%',
  // },
  {
    cn: '密码破解',
    en: 'password cracking',
    value: '28%',
  },
  {
    cn: '权限提升',
    en: 'privilege escalation',
    value: '20%',
  },
  {
    cn: '流量劫持',
    en: 'traffic hijacking',
    value: '35%',
  },
  {
    cn: '网络篡改',
    en: 'website defacement',
    value: '18%',
  },
  {
    cn: '跨站脚本攻击',
    en: 'cross-site scripting',
    value: '22%',
  },
  {
    cn: '拒绝服务攻击',
    en: 'denial-of-service attack',
    value: '40%',
  },
]
</script>
<style lang="scss" scoped>
.overall-attacks-situation {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  .body-item {
    position: relative;
    width: 100%;
    cursor: pointer;

    $size-1: 28px;
    &.active,
    &:hover {
      .item-bg {
        color: #fff;
        background-color: rgba(225, 137, 70, 50%);
        background-image: radial-gradient(rgb(255 110 0) 50%, transparent 0);
        border-color: #ff6e00;
        &::before {
          background-color: #ff6e00;
        }
      }
      .item-bg-1 {
        background-color: rgba(225, 137, 70, 50%);
        background-image: radial-gradient(rgb(255 110 0) 50%, transparent 0);
        border-color: #ff6e00;
        &::before {
          background-color: #ff6e00;
        }
      }
    }
    .item-bg {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 6px 6px 2px;
      clip-path: polygon(
        0 0,
        100% 0,
        100% calc(100% - #{$size-1}),
        calc(100% - #{$size-1}) 100%,
        0 100%
      );
      color: #c8c8c8;
      background-color: #565857;
      background-image: radial-gradient(#4b4d4c 50%, transparent 0);
      background-size: 4px 4px;
      border: 2px solid #848381;
      .title-cn {
        font-size: 16px;
        font-weight: bold;
      }
      .title-en {
        font-size: 12px;
        font-weight: lighter;
      }
      .value {
        font-family: DengJuGengShaHeiTi;
        font-size: 30px;
        font-weight: bold;
      }

      $size-1-1: 38px; /* $size-1 * 1.4142; */
      &::before {
        position: absolute;
        top: calc(100% - #{$size-1-1 / 2});
        left: calc(100% - #{$size-1-1 / 2});
        width: $size-1-1;
        height: $size-1-1;
        content: '';
        background-color: #848381;
        transform: rotate(45deg);
      }
    }

    $size-2: 14px;
    .item-bg-1 {
      position: absolute;
      right: 0;
      bottom: 0;
      width: $size-2;
      height: $size-2;
      clip-path: polygon(100% 0, 100% 0, 100% 100%, 0 100%);
      background-color: #565857;
      background-image: radial-gradient(#4b4d4c 50%, transparent 0);
      background-size: 4px 4px;
      border: 2px solid #848381;

      $size-2-2: 18px; /* $size-2 * 1.4142 */
      &::before {
        position: absolute;
        top: calc(-#{$size-2-2 / 2});
        left: calc(-#{$size-2-2 / 2});
        width: $size-2-2;
        height: $size-2-2;
        content: '';
        background-color: #848381;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
