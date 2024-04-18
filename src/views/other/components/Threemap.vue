<template>
  <div class="content">
    
    <div class="maplabel">
      商家数量占比
      <div class="divcircle">
        <div class="circle">
          <div class="circleitem" style="background-color: #4389ED;"></div>
          <p>无商品</p>
        </div>
        <div class="circle">
          <div class="circleitem" style="background-color: #f9768d;"></div>
          <p>0-10%</p>
        </div>
        <!-- <div class="circle">
          <div class="circleitem" style="background-color: #fe7310;"></div>
          <p>10%-20%</p>
        </div> -->
      </div>
      <div class="divcircle">
        <div class="circle">
          <div class="circleitem" style="background-color: #fe7310;"></div>
          <p>10%-20%</p>
        </div>
        <div class="circle">
          <div class="circleitem" style="background-color: #fc36fd;"></div>
          <p>20%-30%</p>
        </div>
        
      </div>
      <div class="divcircle">
        <div class="circle">
          <div class="circleitem" style="background-color: #fed116;"></div>
          <p>30%-40%</p>
        </div>
        <div class="circle">
          <div class="circleitem" style="background-color:#91ffff;"></div>
          <p>40%-50%</p>
        </div>
      </div>
      <div class="divcircle">
        <div class="circle">
          <div class="circleitem" style="background-color: #74cf1a;"></div>
          <p>50%以上</p>
        </div>
      </div>
    </div>
    <div ref="myMap" class="myMapcontent"></div>
  </div>
</template>

<script>
// import elementResizeDetectorMaker from "element-resize-detector";
import chinaJson from '@/utils/china.json';
import cloneDeep from 'lodash/cloneDeep'; //lodash库中深拷贝对象的方法
import "echarts-gl"
import { maplistApi, getPriceApi } from '@/apis/map'
import {getInfoApi} from '@/apis/user'
import store from '@/store';
export default {
  name: 'ThreeMap',
  props: ['price'],
    data() {
      return {
        myChart: null,
        num: 21,
        params: {
          keywordAll: '',
          lowPrice:0
        },
        options:[],
        mapkeyword:'', //地图关键词
        lowProduct:0,  //总商品数量
        provinceList: [],
        newMaplist: [
          { name: '吉林', pos: [125.8154, 44.2584] },
          { name: '北京',  pos: [116.4551, 40.2539] },
          { name: '辽宁',  pos: [123.1238, 42.1216] },
          { name: '河北',  pos: [114.4995, 38.1006] },
          { name: '天津',  pos: [117.4219, 39.4189] },
          { name: '山西',  pos: [112.3352, 37.9413] },
          { name: '陕西',  pos: [109.1162, 34.2004] },
          { name: '甘肃',  pos: [103.5901, 36.3043] },
          { name: '宁夏',  pos: [106.3586, 38.1775] },
          { name: '四川',  pos: [103.9526, 30.7617] },
          { name: '山东',  pos: [117.1582, 36.8701] },
          { name: '河南',  pos: [113.4668, 34.6234] },
          { name: '江苏',  pos: [118.8062, 31.9208] },
          { name: '湖北',  pos: [114.3896, 30.6628] },
          { name: '浙江',  pos: [119.5313, 29.8773] },
          { name: '福建',  pos: [119.4543, 25.9222] },
          { name: '江西',  pos: [116.0046, 28.6633] },
          { name: '湖南',  pos: [113.0823, 28.2568] },
          { name: '贵州',  pos: [106.6992, 26.7682] },
          { name: '云南',  pos: [102.9199, 25.4663] },
          { name: '海南',  pos: [110.3893, 19.8516] },
          { name: '上海',  pos: [121.4648, 31.2891] },
          { name: '香港',  pos: [114.16, 22.25] },
          { name: '澳门',  pos: [113.5, 22.2] },
          { name: '台湾',  pos: [121, 23] },
          { name: '广东',  pos: [113.12244, 23.009505] },
          { name: '安徽',  pos: [117.29, 32.0581] },
          { name: '广西',  pos: [108.479, 23.1152] },
          { name: '青海',  pos: [99.4038, 36.8207] },
          { name: '新疆',  pos: [87.9236, 43.5883,30] },
          { name: '西藏',  pos: [88.388277, 31.56375] },
          { name: '重庆',  pos: [108.384366, 30.439702] },
          { name: '黑龙江',  pos: [127, 48] },
          { name: '内蒙古', pos: [110.3467, 41.4899] }
        ], //重置地图数据
        maplist: [],  //返回的地图数据
        lowshop: 0,  //总商家数量
        };
  },
  watch: {
    mapkeyword(newvalue) {
      this.params.keyword = newvalue
      if (this.params.keyword === '全部'||this.params.keyword==='') {
        this.params.keyword = ''
        this.getlowerData()
      } else {
        this.getlowerData()
      }
    },
    price(newvalue) {
      this.params.lowPrice=newvalue
      if (this.params.lowPrice) {
        this.getlowerData()
      } else {
        this.getinitData()
      }
    },
    
  },
  async created() {
    await  this.getinfo()
    this.getPrice()
    this.getinitData()
  },
  mounted() {
    this.getinitData()
  },
  methods: {
       //获取关键词
       async getinfo() {
      const res = await getInfoApi({ userId: store.getters.id })
      res.forEach(item => {
        this.options.push(item.keyword)
      })
      this.params.keywordAll = this.options.join(',')
    },
    async getPrice() {
      const res = await getPriceApi({ userId: store.getters.id })
      this.params.lowPrice = res.minimumPrice
      this.$emit('lowerpricefn',{lowerprice: this.params.lowPrice})
      if (this.params.lowPrice) {
        this.getlowerData()
      } else {
        this.getinitData()
      }
    },

    //第一次获取全部地图数据
    async getinitData() {
      const res = await maplistApi({keywordAll:this.params.keywordAll})
      this.lowProduct=0
      this.maplist=[]
      this.maplist = res
      for (let i = 0; i < this.maplist.length; i++){
        this.lowProduct += this.maplist[i].uniqueProductCount
        this.lowshop += this.maplist[i].uniqueShopCount
      }
      this.$emit('lowProductfn', { lowProduct: this.lowProduct })
      this.$emit('allProductfn', { allProduct: this.lowProduct })
      this.handledata()
    },
    //输入最低价后全部数据
    async getlowerData() {
      this.maplist=[]
      const res = await maplistApi(this.params)
      this.maplist = res
      this.lowProduct=0
      for (let i = 0; i < this.maplist.length; i++){
        this.lowProduct += this.maplist[i].uniqueProductCount
        this.lowshop+=this.maplist[i].uniqueShopCount
      }
      this.$emit('lowProductfn', this.lowProduct)
      this.handlelowdata()
    },
    handledata() {
      this.provinceList = cloneDeep(this.newMaplist)
      for (let i = 0; i < this.provinceList.length; i++){
      for (let j = 0; j < this.maplist.length; j++){
          if (this.maplist[j].location === this.provinceList[i].name) {
             this.provinceList[i].uniqueShopCount=this.maplist[j].uniqueShopCount
             this.provinceList[i].uniqueProductCount=this.maplist[j].uniqueProductCount
             this.provinceList[i].priceCount = this.maplist[j].priceCount
             break
           }
           else {
             this.provinceList[i].uniqueShopCount=0
             this.provinceList[i].uniqueProductCount=0
             this.provinceList[i].priceCount = 0
           }
         }
      }
      this.initMap();
    },
    //处理低价地图数据
    handlelowdata() {
      for (let i = 0; i < this.provinceList.length; i++){
      for (let j = 0; j < this.maplist.length; j++){
          if (this.maplist[j].location === this.provinceList[i].name) {
             this.provinceList[i].lowShopCount=this.maplist[j].uniqueShopCount
             this.provinceList[i].lowProductCount=this.maplist[j].uniqueProductCount
             this.provinceList[i].lowpriceCount = this.maplist[j].priceCount
             break
           }
           else {
             this.provinceList[i].lowShopCount=0
             this.provinceList[i].lowProductCount=0
             this.provinceList[i].lowpriceCount = 0
           }
         }
      }
      this.initMap();
      },
    initMap() {
        // let num = this.price
        let lower=this.lowshop
            this.myChart = this.echarts.init(this.$refs.myMap);
            this.myChart.showLoading();
            this.myChart.hideLoading();
          this.echarts.registerMap('myMap', chinaJson);
            let option = {
              tooltip: {
                formatter: function (params) {
                  if (params.data.lowShopCount) {
                    return params.data.name + '<br/>' + '商家总数量：' + params.data.uniqueShopCount + '<br/>' +
                      '商品总数量：' + params.data.uniqueProductCount +'<br/>' + '低价商家总数量：'+ params.data.lowShopCount+'<br/>' + '低价商品总数量：'+ params.data.lowProductCount
                  } else {
                    return params.data.name + '<br/>' + '商家总数量：' + params.data.uniqueShopCount + '<br/>' +
                      '商品总数量：' + params.data.uniqueProductCount 
                  }
                }
              },//自定义代码
              layoutCenter: ['50%', '50%'],//设置地图在画布的位置
              layoutSize: 1000,  //设置地图大小
              series: [
                {
                        type: 'map3D',
                        name: '地区',
                        selectedMode: 'single', // 地图高亮单选
                        regionHeight: 4, // 地图高度
                        map: 'myMap',
                        viewControl: {
                          distance: 88, // 地图视角 控制初始大小
                          alpha: 55,// 倾斜角度
                          rotateSensitivity: [1, 1],
                          projection: 'orthographic',
                          orthographicSize: 75, //控制地图大小
                          maxOrthographicSize:75,
                          minOrthographicSize:75,
                        },
                        label: {
                            show: true, // 是否显示名字
                            color: '#432f2f', // 文字颜色
                            fontSize: 12, // 文字大小
                          fontWeight: 'bold', // 文字大小
                    },
                  data: this.provinceList,
                  itemStyle: {
                    color: function (params) {
                      if (params.data.uniqueShopCount === 0) {
                        return '#4389ED'
                      }else if (params.data.uniqueShopCount/lower>0&&params.data.uniqueShopCount / lower <= 0.1) {
                        if (params.data.lowpriceCount>0) {
                          return 'red'
                        } else {
                          return '#f9768d'
                        }
                      }else if (params.data.uniqueShopCount / lower <= 0.2&&params.data.uniqueShopCount/lower>0.1) {
                         if (params.data.lowpriceCount>0) {
                           return 'red'
                         } else {
                           return '#fe7310'
                         }
                       } else if (params.data.uniqueShopCount / lower <= 0.3&&params.data.uniqueShopCount/lower>0.2) {
                         if (params.data.lowpriceCount>0) {
                           return 'red'
                         } else {
                           return '#fc36fd'
                         }
                      } else if (params.data.uniqueShopCount / lower <= 0.4&&params.data.uniqueShopCount/lower>0.3) {
                        if (params.data.lowpriceCount > 0) {
                          return 'red'
                        } else {
                          return '#fed116'
                        }
                      }else if (params.data.uniqueShopCount / lower <= 0.5&&params.data.uniqueShopCount/lower>0.4) {
                        if (params.data.lowpriceCount > 0) {
                          return 'red'
                        } else {
                          return '#91ffff'
                        }
                      }else {
                         if (params.data.lowpriceCount > 0) {
                           return 'red'
                         } else {
                           return '#74cf1a'
                         }
                       }
                    }, // 地图背景颜色
                            borderWidth: 1, // 分界线wdith
                            borderColor: '#61CFF8', // 分界线颜色
                            opacity: 1
                        },
                        emphasis: {
                            label: {
                                show: true, // 是否显示高亮
                                textStyle: {
                                    color: '#fff' // 高亮文字颜色
                            },
                            formatter: function (params) {
                              return params.name
                            }
                            },
                            itemStyle: {
                                color: '#a776ff', // 地图高亮颜色
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
                    },
              ],
             
            };
            this.linstenProvinceClick()
            this.myChart.setOption(option);
          //  window.addEventListener('resize', function () {
          //  this.myChart.resize();
          //  });
        window.addEventListener('resize',this.adaptScreen)
             //根据当前容器的尺寸变化而让图表也跟着变化
            //  let changeSize = elementResizeDetectorMaker()
            // let _this = this
            // changeSize.listenTo(this.myChart,() => {  //chartDom为之前获取到的容器名
            //     _this.$nextTick(() => {
            //         this.myChart.resize()
            //     })
            // })
      },
      adaptScreen() {
      this.myChart.resize();
    },
    linstenProvinceClick() {
      // 接收一个对象， 解构出的data对象值为series数组中data数据源中的对象
      this.myChart.on('click', ({ data }) => {
        this.$router.push({name:'goodsAlayse',params:{location:data.name,wordprice:this.params.lowPrice,keyword:this.mapkeyword}}).catch(err=>err)
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
    },
}
</script>

<style lang="scss" scoped>
.content{
  position: relative;
  width: 762px;
  height: 500px;
  
  .maplabel{
    position: absolute;
    top: -20px;
    left: 45px;
    color: #fff;
    font-size: 12px;
    .divcircle{
      display: flex;
    }
    .circle{
      width: 80px;
      display: flex;
      align-items: center;
      height: 20px;
      margin-top: 4px;
      .circleitem{
        width: 10px;
        height: 10px;
        border-radius: 5px;
      }
      p{
        height: 20px;
        font-size: 12px;
        margin-left: 4px;
      }
    }
  }
  .myMapcontent{
    width: 762px;
    height: 500px;
  }
}
</style>