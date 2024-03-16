<template>
  <div class="content">
    <div ref="myMap" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
import chinaJson from '@/utils/china.json';
import cloneDeep from 'lodash/cloneDeep'; //lodash库中深拷贝对象的方法
import "echarts-gl"
export default {
  name: 'map-chart',
    data() {
      return {
        myChart:null,
        provinceList: [
        { name: '吉林', value: 36, pos: [125.8154, 44.2584] },
        { name: '北京', value: 32, pos: [116.4551, 40.2539] },
        { name: '辽宁', value: 54, pos: [123.1238, 42.1216] },
        { name: '河北', value: 23, pos: [114.4995, 38.1006] },
        { name: '天津', value: 78, pos: [117.4219, 39.4189] },
        { name: '山西', value: 30, pos: [112.3352, 37.9413] },
        { name: '陕西', value: 50, pos: [109.1162, 34.2004] },
        { name: '甘肃', value: 80, pos: [103.5901, 36.3043] },
        { name: '宁夏', value: 20, pos: [106.3586, 38.1775] },
        { name: '四川', value: 60, pos: [103.9526, 30.7617] },
        { name: '山东', value: 30, pos: [117.1582, 36.8701] },
        { name: '河南', value: 24, pos: [113.4668, 34.6234] },
        { name: '江苏', value: 72, pos: [118.8062, 31.9208] },
        { name: '湖北', value: 90, pos: [114.3896, 30.6628] },
        { name: '浙江', value: 30, pos: [119.5313, 29.8773] },
        { name: '福建', value: 40, pos: [119.4543, 25.9222] },
        { name: '江西', value: 20, pos: [116.0046, 28.6633] },
        { name: '湖南', value: 80, pos: [113.0823, 28.2568] },
        { name: '贵州', value: 30, pos: [106.6992, 26.7682] },
        { name: '云南', value: 10, pos: [102.9199, 25.4663] },
        { name: '海南', value: 20, pos: [110.3893, 19.8516] },
        { name: '上海', value: 82, pos: [121.4648, 31.2891] },
        { name: '香港', value: 60, pos: [114.3, 22.9] },
        { name: '澳门', value: 30, pos: [113.5, 22.2] },
        { name: '台湾', value: 70, pos: [121, 23] },
        { name: '广东', value: 85, pos: [113.12244, 23.009505] },
        { name: '安徽', value: 59, pos: [117.29, 32.0581] },
        { name: '广西', value: 70, pos: [108.479, 23.1152] },
        { name: '青海', value: 30, pos: [99.4038, 36.8207] },
        { name: '新疆', value: 30, pos: [87.9236, 43.5883] },
        { name: '西藏', value: 80, pos: [88.388277, 31.56375] },
        { name: '重庆', value: 70, pos: [108.384366, 30.439702] },
        { name: '黑龙江', value: 70, pos: [127, 48] },
        { name: '内蒙古', value: 30, pos: [110.3467, 41.4899] }
        ],
        // provinceList: [
        // { name: '吉林', value:[125.8154, 44.2584,34] },
        // { name: '北京', value:[116.4551, 40.2539,56] },
        // { name: '辽宁', value:[123.1238, 42.1216,78] },
        // { name: '河北', value:[114.4995, 38.1006,46] },
        // { name: '天津', value:[117.4219, 39.4189,88] },
        // { name: '山西', value:[112.3352, 37.9413,24] },
        // { name: '陕西', value:[109.1162, 34.2004,18] },
        // { name: '甘肃', value:[103.5901, 36.3043,46] },
        // { name: '宁夏', value:[106.3586, 38.1775,13] },
        // { name: '四川', value:[103.9526, 30.7617,78] },
        // { name: '山东', value:[117.1582, 36.8701,22] },
        // { name: '河南', value:[113.4668, 34.6234,56] },
        // { name: '江苏', value:[118.8062, 31.9208,53] },
        // { name: '湖北', value:[114.3896, 30.6628,98] },
        // { name: '浙江', value:[119.5313, 29.8773,58] },
        // { name: '福建', value:[119.4543, 25.9222,96] },
        // { name: '江西', value:[116.0046, 28.6633,57] },
        // { name: '湖南', value:[113.0823, 28.2568,76] },
        // { name: '贵州', value:[106.6992, 26.7682,76] },
        // { name: '云南', value:[102.9199, 25.4663,94] },
        // { name: '海南', value:[110.3893, 19.8516,38] },
        // { name: '上海', value:[121.4648, 31.2891,48] },
        // { name: '香港', value:[114.3, 22.9,38] },
        // { name: '澳门', value:[113.5, 22.2,61] },
        // { name: '台湾', value:[121, 23,26] },
        // { name: '广东', value:[113.12244, 23.009505,39] },
        // { name: '安徽', value:[117.29, 32.0581,68] },
        // { name: '广西', value:[108.479, 23.1152,48] },
        // { name: '青海', value:[99.4038, 36.8207,48] },
        // { name: '新疆', value:[87.9236, 43.5883,94] },
        // { name: '西藏', value:[88.388277, 31.56375,49] },
        // { name: '重庆', value:[108.384366, 30.439702,39] },
        // { name: '黑龙江', value:[127, 48,48] },
        // { name: '内蒙古', value:[110.3467, 41.4899,48] }
        // ],
        lowerPrice:20
        };
  },
  mounted() {
        this.initMap();
    },
    methods: {

        initMap() {
            this.myChart = this.echarts.init(this.$refs.myMap);
            this.myChart.showLoading();
            this.myChart.hideLoading();
            this.echarts.registerMap('myMap', chinaJson);

            var option = {
                tooltip: {
                // 自定义代码
                },

                series: [
                    {
                        
                        type: 'map3D',
                        name: '地区',
                        selectedMode: 'single', // 地图高亮单选
                        regionHeight: 4, // 地图高度
                        map: 'myMap',
                        viewControl: {
                            distance: 98, // 地图视角 控制初始大小
                            alpha: 50,// 倾斜角度
                            rotateSensitivity: [1, 1]
                        },
                        label: {
                            show: true, // 是否显示名字
                            color: '#fff', // 文字颜色
                            fontSize: 12, // 文字大小
                          fontWeight: 'bold', // 文字大小
                    },
                    data: this.provinceList,
                    // regions: this.provinceList.map((area) => {
                      // return {
                        // name: area.name,
                        itemStyle: {
                          color: function (params) {
                            if (params.value < 20) {
                              return 'red'
                            } else {
                              return '#4389ED'
                            }
                          },
                                    borderWidth: 1, // 分界线wdith
                                    borderColor: '#61CFF8', // 分界线颜色
                        },
                      // }
            // }),
                            // itemStyle: {
                                  // areaColor:'red',
                                    // color: 'red', // 地图背景颜色
                                    // borderWidth: 1, // 分界线wdith
                                    // borderColor: '#61CFF8', // 分界线颜色
                                    // opacity: 0.92
                                // },
                        emphasis: {
                            label: {
                                show: true, // 是否显示高亮
                                textStyle: {
                                    color: '#fff' // 高亮文字颜色
                            },
                            formatter: function (params) {
                              return params.name+':'+params.value
                            }
                            },
                            itemStyle: {
                                color: '#007EE8', // 地图高亮颜色
                                borderWidth: 10, // 分界线wdith
                                borderColor: '#6BECF5'// 分界线颜色
                            }
                        },
                        light: {
                            main: {
                                color: '#fff',
                                intensity: 1,
                                shadow: true,
                                shadowQuality: 'high',
                                alpha: 25, //
                                beta: 20
                            },
                            ambient: {
                                color: '#fff',
                                intensity: 0.6
                            }
                        }
                    }
                ]
            };
            this.linstenProvinceClick()
            this.myChart.setOption(option);
            // window.addEventListener('resize', function () {
            // this.myChart.resize();
        // });
            window.addEventListener('resize',this.adaptScreen)
      },
      adaptScreen() {
      this.myChart.resize();
    },
    linstenProvinceClick() {
      // 接收一个对象， 解构出的data对象值为series数组中data数据源中的对象
      this.myChart.on('click', ({ data }) => {
        console.log('111111');
        // if (data.name == '浙江') {
        //   this.getlist=this.zhejiang
        // } else if (data.name == '上海') {
        //   this.getlist=this.shanghai
        // } else {
        //   return
        // }
        if (!data || !data.name) return;
        const provinceName = data.name;
        const provinceList = cloneDeep(this.provinceList);
        provinceList?.forEach(item => {
          if (item.name === provinceName) {
            item.value = 100;
          }
        });
        const option = {
          series: [
            {
              data: provinceList
            }
          ]
        };
        this.myChart.setOption(option);
      });
      },
    
  // 获取地图数据区域对应的颜色
    getAreaColorByValue(areaCount) {
    let color = '#4389ED'
      if (areaCount >= this.lowerPrice) {
        color = '#4389ED' // 绿色
      } else if (areaCount == 0) {
        color='skyblue'
      }
      else {
        color = 'red'
      }
      return color
    }
  },
}
</script>

<style>
/* .content{
  width: 100%;
  height: 100%;
  background-color: #092f59;
} */
</style>