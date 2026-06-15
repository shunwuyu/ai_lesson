import './style.css';
import * as echarts from 'echarts';
import { MONTHS, sales } from './data.js';

const chartDom = document.querySelector('#chart');
const chart = echarts.init(chartDom);

const option = {
  title: {
    text: '某品牌服装 2025 年月度销售额',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params) => `${params[0].name}<br/>销售额：${params[0].value} 万元`,
  },
  xAxis: {
    type: 'category',
    data: MONTHS,
  },
  yAxis: {
    type: 'value',
    name: '万元',
  },
  series: [
    {
      type: 'bar',
      data: sales,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#667eea' },
          { offset: 1, color: '#764ba2' },
        ]),
        borderRadius: [4, 4, 0, 0],
      },
      barWidth: '50%',
    },
  ],
};

chart.setOption(option);

window.addEventListener('resize', () => chart.resize());
