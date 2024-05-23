<template>
  <BasePanel>
    <div class="bug-repair" ref="container"></div>
  </BasePanel>
</template>
<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { range, sampleSize } from 'lodash'
import useEcharts from '@/dashboard/hooks/useEcharts'

const { container, echarts, setOption } = useEcharts()

const generateOptions = (sources: any[][]) => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#2f2f48',
      borderColor: '#2f2f48',
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      left: '10%',
      right: '2%',
      bottom: '15%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#c8c8c8',

        // fontSize: 15,
        margin: 10,
      },
      data: ['极高威胁', '高威胁', '中等威胁', '低威胁'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#c8c8c8',
        fontFamily: 'DengJuGengShaHeiTi',
      },
      splitLine: {
        lineStyle: {
          color: '#c8c8c830',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '已修复',
        type: 'bar',
        itemStyle: {
          color: '#ff6e00',
          //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     { offset: 0, color: '#32fedb' },
          //     { offset: 1, color: '#319cfc' },
          //   ]),
        },
        barWidth: 20,
        data: sources[0],
      },
      {
        name: '待修复',
        type: 'bar',
        itemStyle: {
          color: '#848381',
          //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     { offset: 0, color: '#f7cd5e' },
          //     { offset: 0.8, color: '#ee8149' },
          //   ]),
        },
        barWidth: 20,
        data: sources[1],
      },
    ],
  }
}

onMounted(() => {
  setTimeout(() => {
    const sources = [
      sampleSize(range(1000, 200), 7),
      sampleSize(range(1000, 200), 7),
      sampleSize(range(1000, 200), 7),
    ]

    const options = generateOptions(sources)
    setOption(options)
  }, 1000)
})
</script>
<style lang="scss" scoped>
.bug-repair {
  width: 100%;
  height: 200px;
}
</style>
