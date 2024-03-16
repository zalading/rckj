<template>
  <div class="wrap">
    <header class="header">
      <div class="title" >商品区域分布展示
        <div class="white"></div>
      </div>
      <sideNav />
    </header>
    <div class="body">
      <div class="left">
        <div class="circle">
          <p>区域销量占比分析</p>
          <div class="bingtu" ref="bingtu"></div>
        </div>
        <div class="bar">
          <p>区域Top10商家数量</p>
          <div class="bingtu" ref="linetu"></div>
        </div>
      </div>
      <div class="middle">
        <!-- 放地图 -->
        <div class="cellPrice">
            <div class="goodName">
             <span>最低价</span>
             <span>产品名称</span>
             <span>数量</span>
            </div>
            <div class="goodNum">
             <p>￥
              <CountTo :start-val="0" :end-val="21" :duration="1000"></CountTo>
             </p>
             <p>瑞幸</p>
             <p><CountTo :startVal='0' :endVal='223' :duration='1000' /></p>
            </div>
        </div>
        <div class="map" ref="mapRef">
          <ThreeMap></ThreeMap>
        </div>
      </div>
      <div class="right">
        <div class="saleAvager">
          <p>地区销量平均值</p>
          <div class="bingtu" ref=""></div>
        </div>
        <div class="priceAvager">
          <p>地区价格平均值</p>
          <div class="bingtu" ref=""></div>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
// import chinaJson from '@/utils/china.json';
// import cloneDeep from 'lodash/cloneDeep'; //lodash库中深拷贝对象的方法
import CountTo from 'vue-count-to';
import ThreeMap from '@/views/map/components/Threemap' 
export default {
  name:'MapIndex',
  components: {
    CountTo,
    ThreeMap
  },
  data() {
    return {
      zhejiang: [
        { title:'瑞幸拿铁咖啡速溶瑞星咖啡萃取液胶囊粒手冲生椰拿铁冰美式提神 咖啡 瑞星 咖啡',location: '浙江 温州', price: 127.7, del: 0, shop: '夸香特产直销', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星速溶咖啡瑞幸咖啡速溶粉瑞幸即溶咖啡元气弹冷萃冻干美式拿铁 瑞星 咖啡 咖啡 咖啡',location: '浙江 金华', price: 21, del: 0, shop: '尚展裕腾', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2215787740617/O1CN01cospJk1GQdE4CefRJ_!!2215787740617.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 嘉兴', price: 25.9, del: 4, shop: '发财树树陆店', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 5.5, del: 96, shop: '冰美式yyds', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 134, del: 96, shop: '美村集品食品专营店', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 35, del: 96, shop: '中国杭州妙瑞餐饮管理有限公司', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 温州', price: 127.7, del: 0, shop: '夸香特产直销', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 金华', price: 21, del: 0, shop: '尚展裕腾', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2215787740617/O1CN01cospJk1GQdE4CefRJ_!!2215787740617.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 嘉兴', price: 25.9, del: 4, shop: '发财树树陆店', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 5.5, del: 96, shop: '冰美式yyds', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 134, del: 96, shop: '美村集品食品专营店', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 35, del: 96, shop: '中国杭州妙瑞餐饮管理有限公司', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' }
      ],
      shanghai: [
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 999, del: 16, shop: '天猫超市', imgurl: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/6000000003499/O1CN01TIEHPM1bialbzPtAZ_!!6000000003499-0-sm.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 399, del: 68, shop: '炫品酒类专营店', imgurl: 'https://gw.alicdn.com/imgextra/O1CN01ohWmHB1f4WZypzCky_!!2762873953-0-picasso.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 25.9, del: 4, shop: '天猫超市', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/6000000003630/O1CN01XO9X0D1cgaePiynYt_!!6000000003630-0-sm.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 5.5, del: 96, shop: '赛盼旗舰店', imgurl: '' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 134, del: 96, shop: '贝蒂威尔旗舰店', imgurl: '' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 35, del: 96, shop: '密果迷恋旗舰店', imgurl: '' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 999, del: 16, shop: '天猫超市', imgurl: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/6000000003499/O1CN01TIEHPM1bialbzPtAZ_!!6000000003499-0-sm.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 399, del: 68, shop: '炫品酒类专营店', imgurl: 'https://gw.alicdn.com/imgextra/O1CN01ohWmHB1f4WZypzCky_!!2762873953-0-picasso.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 25.9, del: 4, shop: '天猫超市', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/6000000003630/O1CN01XO9X0D1cgaePiynYt_!!6000000003630-0-sm.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '上海', price: 5.5, del: 96, shop: '赛盼旗舰店', imgurl: '' }
      ],
      wuliangye: [
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 999, del: 16, shop: '五粮浓香官方旗舰店', imgurl: 'https://img.alicdn.com/imgextra/i2/1106960035/O1CN01QaLAcm1C84g5ESj4P_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '辽宁 沈阳', price: 399, del: 68, shop: '酒富盛酩酒类专营店', imgurl: 'https://img.alicdn.com/imgextra/i2/120634331/O1CN01PgavvV1hreIDJ5HjR_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 25.9, del: 4, shop: '天猫超市', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/6000000003630/O1CN01XO9X0D1cgaePiynYt_!!6000000003630-0-sm.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 5.5, del: 96, shop: '五粮浓香官方旗舰店', imgurl: 'https://picasso.alicdn.com/imgextra/O1CNA1MBPOjT2MRRsY9qvuy_!!2207953779824-0-psf.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 134, del: 96, shop: '五粮浓香官方旗舰店', imgurl: 'https://picasso.alicdn.com/imgextra/O1CNA1GC4yhR2MRRsUW3Mzw_!!2207953779824-0-psf.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '江苏 南京', price: 35, del: 96, shop: '苏宁易购官方旗舰店', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2616970884/O1CN01xoqlQN1IOv2tV4r5u_!!0-item_pic.jpg_580x580q90.jpg_.webp' }
      ],
      coffee: [
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '福建 泉州', price: 999, del: 16, shop: 'Lantek兰泰克食品', imgurl: 'https://img.alicdn.com/imgextra/i4/314020065/O1CN011rlLuB1CLoUDxR5VH_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '福建 泉州', price: 399, del: 68, shop: 'Lantek兰泰克食品', imgurl: 'https://img.alicdn.com/imgextra/i1/314020065/O1CN0194jVQR1CLoZ2kHKGG_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '广东 广州', price: 25.9, del: 4, shop: '天猫超市', imgurl: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/2070505646/O1CN01MC4moY1rZv6RmScFk_!!2070505646.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '浙江 温州', price: 5.5, del: 96, shop: '毛球美食优惠', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 134, del: 96, shop: '夸香特产直销', imgurl: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/2215864919718/O1CN01GZ6Unp2LetpxbPM8u_!!2215864919718.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '江苏 苏州', price: 35, del: 96, shop: '发财树树陆店', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2616970884/O1CN01xoqlQN1IOv2tV4r5u_!!0-item_pic.jpg_580x580q90.jpg_.webp' },
      ],
      getlist: [],
      searchValue: '',  //搜索名称
      areaSale: [],
    };
  },
  created() {
    this.getlist=this.zhejiang
  },
  mounted() {
    // 名称必须是 china ，否则南海岛屿无法展示
    // this.echarts.registerMap('china', chinaJson);
    // this.initChart();
    this.chartBingtu();
    this.chartZhuzhuangtu()
  },
  // beforeDestroy() {
  //   window.removeEventListener('resize',this.adaptScreen);
  // },
  methods: {
    handleClose(done) {
      done()
    },
    //饼图
    chartBingtu() {
      let myChart = echarts.init(this.$refs.bingtu);
      let option;

      option = {
        title: {},
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '区域销量占比分析',
            type: 'pie',
            radius: ['35%','70%'],
            center:['55%','50%'],
            data: [
        { name: '吉林', value: 36,itemStyle:{color:'#84f1ff'}},
        { name: '北京', value: 32,itemStyle:{color:'#6a92f5'} },
        { name: '辽宁', value: 54,itemStyle:{color:'#513bff'} },
        { name: '河北', value: 23,itemStyle:{color:'#7242f0'} },
        { name: '天津', value: 78,itemStyle:{color:'#986cfd'} },
        { name: '山西', value: 30,itemStyle:{color:'#3e6ff7'} },
        { name: '浙江', value: 30,itemStyle:{color:'#62edfb'} },
        { name: '内蒙古', value: 34,itemStyle:{color:'#4e6ebb'} }
            ],
            // data:this.areaSale,
            emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
          }
        ]
      };

      option && myChart.setOption(option);
    },

    //柱状图
    chartZhuzhuangtu() {
      let myChart = echarts.init(this.$refs.linetu);
      let option;
      option = {
  title: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  // legend: {},
  grid: {
    left: '10%',
    top: '5%',
    bottom:'5%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show:false
    },
    boundaryGap: [0, 0.01],
    axisLabel: {
      color: '#fff',
    }
  },
        yAxis: {
    type: 'category',
    axisTick: {
      show:true
    },
    data: ['四川','吉林', '北京', '重庆', '安徽', '浙江','上海','内蒙古','大连','重庆'],
    axisLine: {
      lineStyle: {
        color:'#fff'
      }
    },
    axisLabel: {
      color:'#fff'
    }
  },
  series: [
    {
      name: '数量',
      type: 'bar',
      data: [23,89, 120, 199, 208, 269, 311, 322, 378, 546],
      itemStyle: {
        barBorderRadius: 6,
        barWidth: '30px',
        normal: {
          color: function (params) {
            if (params.data<= 200) {
              return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color:'#e4265d' },
              { offset: 1, color: '#e1c237' },
            ],false)
            }
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color:'#15e2e4' },
              { offset: 1, color:'#e8f549' },
            ],false)
              
          }
        }
      }

    },
  ]
};

option && myChart.setOption(option);
    },

    //地图
    // initChart() {
    //   const option = {
    //     tooltip: {
    //       //提示框组件
    //       show: true,
    //       trigger: 'item'
    //     },
    //     visualMap: {
    //       textStyle: {
    //         color: '#fff'
    //       },
    //       show: true, // 是否显示视觉映射组件
    //       min: 0, // 视觉映射组件的最小值
    //       max: 100, // 视觉映射组件的最大值
    //       left: '2%', // 视觉映射组件的左边界
    //       bottom: '12%', // 视觉映射组件的上边界
    //       calculable: true, // 是否开启视觉映射组件的拖拽缩放功能
    //       inRange: {
    //         // 视觉映射组件的色彩映射区间
    //         // 不同区间的颜色值
    //         color: [
    //           '#6caad7',
    //           '#514aca',
    //           '#4243c2',
    //           '#4d32a5',
    //           '#3892dc',
    //           '#5f1e83',
    //           '#25abde',
    //           '#3497dc',
    //           '#6f8dcd'
    //         ]
    //       }
    //     },
    //     geo: {
    //           show: true,
    //       map: 'china',
    //       left: '10%', //移动地图在容器中的位置
    //         top: '8%',
    //           label: {
    //             show:false
    //           },
    //           roam: false,
    //           itemStyle: {
    //             normal: {
    //               areaColor: '#151d4c',
    //               //borderWidth: 2,//设置外层边框
    //                   borderColor:'#79bbe9',
    //             },
    //             emphasis: {
    //                   show:false,
    //                 }
    //               }
    //         },
    //     series: [
    //       {
    //         name: '中国',
    //         type: 'map',
    //         map: 'china',
    //         left: '10%', //移动地图在容器中的位置
    //         top: '8%',
    //         label: {
    //           show: true,
    //           color: '#fff',
    //           fontSize: 10
    //         },
    //         roam:false,
    //         itemStyle: {
    //           normal: {
    //             areaColor: '#151d4c',
    //             borderWidth: 1, // 区域边框宽度，默认为1，表示边框宽度为1px
    //             borderColor: '#5d7695',// 区域边框颜色值，默认为#e1e1e1，表示浅灰色边框

    //           }
    //           // opacity: 0.7,
    //           // shadowBlur: 3,
    //           // shadowColor: "#1f343a",
    //           // shadowOffsetX: 4,
    //           // shadowOffsetY: 4,
    //         },
    //         emphasis: {
    //           // 选中状态下的样式设置
    //           label: {
    //             // 标签样式设置
    //             show: true
    //           },
    //           itemStyle: {
    //             // 区域填充样式设置
    //             areaColor: '#90c31d',
    //             shadowBlur: 3,
    //             shadowColor: "#1f343a",
    //             shadowOffsetX: 4,
    //             shadowOffsetY: 4,
    //           }
    //         },
    //         data: this.provinceList
    //       }
    //     ]
    //   };
    //   this.chartRef = this.echarts.init(this.$refs.mapRef);
    //   this.linstenProvinceClick();
    //   this.chartRef.setOption(option);
    //   window.addEventListener('resize', this.adaptScreen);
    // },
    // adaptScreen() {
    //   this.chartRef.resize();
    // },
    // linstenProvinceClick() {
    //   // 接收一个对象， 解构出的data对象值为series数组中data数据源中的对象
    //   this.chartRef.on('click', ({ data }) => {
    //     if (data.name == '浙江') {
    //       this.getlist=this.zhejiang
    //     } else if (data.name == '上海') {
    //       this.getlist=this.shanghai
    //     } else {
    //       return
    //     }
    //     if (!data || !data.name) return;
    //     const provinceName = data.name;
    //     const provinceList = cloneDeep(this.provinceList);
    //     provinceList?.forEach(item => {
    //       if (item.name === provinceName) {
    //         item.value = 100;
    //       }
    //     });
    //     const option = {
    //       series: [
    //         {
    //           data: provinceList
    //         }
    //       ]
    //     };
    //     this.chartRef.setOption(option);
    //   });
    // },

    //全部搜索
    // AllGoods() {
    //   this.searchValue = ''
    //   this.getlist=this.zhejiang
    // },
    //搜索功能
    // changeGoods() {
    //   clearTimeout(this.Timer)
    //   this.Timer = setTimeout(() => {
    //     if (this.searchValue === '') {
    //       this.getlist=this.zhejiang
    //     } else if (this.searchValue === '五粮醇') {
    //       this.getlist=this.wuliangye
    //     } else if(this.searchValue === '瑞幸咖啡') {
    //       this.getlist=this.coffee
    //     } else {
    //       console.log('没有该选项');
    //     }
    //   },300)
      
    // },
  }
};
</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrap {
  width: 100%;
  height: 1070px;
  background-image: url(@/assets/mapbgc.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  .header {
    width: 100%;
    height: 110px;
    // position: relative;
    .title {
      position: relative;
      display: flex;
      justify-content: center;
      padding-top: 20px;
      color: #fff; /* 将文本颜色设置为透明 */
      font-size: 45px;
      text-shadow: 3px 3px 4px  rgba(0, 119, 255, 0.5), -3px -3px 4px  rgba(0, 119, 255, 0.5);
      font-weight: 400;
      .white{
        position: absolute;
        top: 67px;
        left: 760px;
        width: 310px;
        height: 33px; 
        background: rgba(255, 255, 255, 0.75);
        filter: blur(20px);
        opacity: 1;
      }
    }
  }
  .body {
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    // height: 100%;
    display: flex;
    .left {
      margin-left: 30px;
      margin-right: 30px;
      // position: relative;
        .circle{
          background-image: url(@/assets/echarsBgi.png);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 505px;
          height: 390px;
          margin-bottom: 30px;
          p{
            color: #fff;
            height: 100px;
            line-height: 150px;
            font-size: 24px;
            text-align: center;
            text-shadow: -2px -2px 4px  rgba(29, 99, 191, 1), 2px 2px 4px  rgba(29, 99, 191, 1);
          }
          .bingtu{
            width: 450px;
            height: 270px;
          }
        }
        .bar{
          background-image: url(@/assets/echarsBgi.png);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 515px;
          height: 396px;
          p{
            color: #fff;
            height: 100px;
            line-height: 157px;
            font-size: 24px;
            text-align: center;
            text-shadow: -2px -2px 4px  rgba(29, 99, 191, 1), 2px 2px 4px  rgba(29, 99, 191, 1);
          }
          .bingtu{
            width: 450px;
            height: 270px;
          }
        }
      }
      .middle{
        width: 750px;
        .cellPrice{
          background-image: url(@/assets/yuantai.png);
          background-size: cover;
          background-repeat: no-repeat;
          width: 454px;
          height: 263px;
          margin-top: 25px;
          margin-left: 150px;
          .goodName{
            color: rgba(255, 255, 255, 0.8);
            font-size: 24px;
            padding-top: 10px;
            height: 60px;
            display: flex;
            justify-content: center;
            span{
              padding:15px 27px;
            }
          }
          .goodNum{
            height: 60px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 24px;
            display: flex;
            justify-content: space-between;
            padding: 20px 70px;
          }
        }
        .map {
          height: 625px;
          width: 100%;
        }
      }
    .right {
      width: 505px;
      height: 100%;
      .saleAvager{
          background-image: url(@/assets/echarsBgi.png);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 505px;
          height: 390px;
          margin-bottom: 30px;
          p{
            color: #fff;
            height: 100px;
            line-height: 150px;
            font-size: 24px;
            text-align: center;
            text-shadow: -2px -2px 4px  rgba(29, 99, 191, 1), 2px 2px 4px  rgba(29, 99, 191, 1);
          }
        }
        .priceAvager{
          background-image: url(@/assets/echarsBgi.png);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 505px;
          height: 390px;
          margin-bottom: 30px;
          p{
            color: #fff;
            height: 100px;
            line-height: 150px;
            font-size: 24px;
            text-align: center;
            text-shadow: -2px -2px 4px  rgba(29, 99, 191, 1), 2px 2px 4px  rgba(29, 99, 191, 1);
          }
        }
//       .goods{
//         margin-bottom: 40px;
//        span{
//         padding: 5px;
//        }
//        .el-icon-search{
//         margin: 0 5px;
//         color: #ccc;
//        }
//        input{
//         margin-left: 5px;
//         background-color: transparent;
//         border: none;
//         color: #fff;
//         &:focus{
//         outline:1px solid transparent;
// }
//        }
//       }
//       .showGoods{
//         height:760px;
//         width: 400px;
//         overflow-y: scroll;
//         &::-webkit-scrollbar {
//             width: 4px; /* 设置滚动条的宽度 */
//         }

//         &::-webkit-scrollbar-track {
//             background-color: #1d4366 !important; /* 设置背景色 */
//         }

//         &::-webkit-scrollbar-thumb {
//             background-color: #388fcd; /* 设置滑块的颜色 */
//         }
//         .shangpin{
//           display: flex;
//           width: 350px;
//           // border: 1px solid #fff;
//           .s-left{
//             width: 100px;
//             height: 100px;
//             border-radius: 5px;
//             overflow: hidden;
//             img{
//               width: 100px;
//               height: 100%;
//             }
//           }
//           .s-right{
//             // width: 110px;
//             height: 100px;
//             p{
//               margin: 2px  !important;
//               font-size: 12px;
//               color: #dad4d4;
//               padding-top: 5px;
//               white-space: nowrap;
//               text-overflow: ellipsis;
//               overflow: hidden;
//               // &:hover{
//               //   overflow: visible;
//               // }
//             }
//             .s-title{
//               width: 240px;
//               // height: 36px;
//               white-space: nowrap;
//               text-overflow: ellipsis;
//               overflow: hidden;
//             }
//             .price{
//               display: flex;
//               justify-content: space-between;
//             }
//           }
//         }

//       }
    }
  }
}
</style>