import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Demo: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 初始化 ECharts 实例
      const myChart = echarts.init(chartRef.current);

      // 配置项
      const option = {
        title: {
          text: '示例图表',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        series: [
          {
            name: '销量',
            type: 'pie', // 或者 'bar' 用于柱状图
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' },
            ],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }, []);

  return <div ref={chartRef} style={{ width: '600px', height: '400px' }} />;
};

export default Demo;