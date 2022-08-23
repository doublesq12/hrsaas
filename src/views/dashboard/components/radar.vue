<template>
  <div class="radarCharts" ref="main">雷达图</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},

  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)

      const radarOption = {
        backgroundColor: '#000',
        title: {
          text: '人员绩效表',
          textStyle: {
            color: 'red',
            fontSize: '20px',
          },
        },
        legend: {
          data: ['张三', '李四'],
          textStyle: {
            color: 'yellow',
            fontSize: 25,
          },
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: 'bug数量', max: 100 },
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '摸鱼', max: 100 },
          ],
          splitLine: {
            lineStyle: {
              color: ['red', 'green'],
            },
          },
          splitArea: {
            areaStyle: {
              color: ['#fff', '#000'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
            },
          },
          axisLine: {
            lineStyle: {
              color: 'yellow',
            },
          },
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [10, 0, 9, 10, 30, 10],
                name: '张三',
              },
              {
                value: [100, 100, 100, 100, 100, 100],
                name: '李四',
              },
            ],
          },
        ],
      }
      // 绘制图表
      myChart.setOption(radarOption)
    },
  },
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 700px;
  height: 500px;
}
</style>
