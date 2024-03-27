<template>
  <div :id="prop.id" :style="{ width: prop.width, height: prop.height }"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent, //标题
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import { debounce } from 'throttle-debounce'
//console.log(CanvasRenderer)

echarts.use([
    LineChart
])

interface IProp {
  id: string
  width: string
  height: string
  option: IEchartsOption
}
const prop = defineProps<IProp>()
let chart: echarts.ECharts
const initChart = async () => {
    console.log(document.getElementById(prop.id))
    const charts = echarts.init(document.getElementById(prop.id) as HTMLElement)
    charts.setOption(prop.option)
    chart = charts
}
const init = () => {
  initChart()
}

onMounted(() => {
  init()
})
</script>