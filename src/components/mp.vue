<template>
  <div id ="container"></div>
</template>

<script>
import * as echarts from 'echarts';
import {mapData} from "../assets/map.js"

export default {
  name: 'mp',
  props: {
    msg: String
  },
  mounted() {
    this.Draw()
  },
  methods:{
    Draw(){
      const chartDom = document.getElementById('container');
      const myChart = echarts.init(chartDom);
      echarts.registerMap("ChinaMap",mapData);
      const option = {
        title: {
          text: "这是一个测试地图",
          x: 'center',
          y: 'top',
          textAlign: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (辆)'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          },
        },
        visualMap: {
          min: 800,
          max: 50000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [
          {
            name: 'testMap',
            type: 'map',
            map: 'ChinaMap',
            label: {
              show: false,
              fontSize: '10px',
            },
            roam: true,
            data: [
              {name: '北京市', value: 20057.34},
              {name: '天津市', value: 15477.48},
              {name: '江苏省', value: 31686.1},
              {name: '上海市', value: 6992.6},
              {name: '重庆市', value: 44045.49},
              {name: '四川省', value: 40689.64},
              {name: '浙江省', value: 37659.78},
              {name: '福建省', value: 45180.97},
              {name: '广东省', value: 55204.26},
              {name: '海南省', value: 21900.9},
              {name: '辽宁省', value: 4918.26},
              {name: '吉林省', value: 5881.84},
              {name: '山东省', value: 4178.01},
              {name: '黑龙江省', value: 2227.92},
              {name: '山西省', value: 2180.98},
              {name: '陕西省', value: 9172.94},
              {name: '江西省', value: 3368},
              {name: '湖南省', value: 806.98}
            ],
          }]
      };
      myChart.setOption(option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#container{
  width:1200px;
  height:600px;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
}
</style>
