<template>
  <div class="wrap">
    <header class="header">
      <div class="title" >
        欣善怡商品数据展示
      </div>
      <sideNav />
    </header>
    <div class="body">
      <div class="left">
        <div class="circle">
          <div class="circleTitle">
            <div class="line"></div>
              <p>区域销量占比分析</p>
            <div class="line"></div>
          </div>
          <!-- <div class="alasyle" v-if="showalasyle" @click="showbingtu">占比分析</div> -->
          <div class="bingtu" ref="bingtu"></div>
        </div>
        <div class="bar">
          <div class="circleTitle">
            <div class="line"></div>
              <p>监控链接价格变动</p>
            <div class="line"></div>
          </div>
          <div class="select" v-if="selectProduct">
            <el-select v-model="value1" multiple placeholder="请选择" :multiple-limit="3" >
                <el-option
                  v-for="item in options1"
                  :key="item.numIid"
                  :label="item.title"
                  :value="item.numIid"> 
                  </el-option>
            </el-select>
            <button @click="changeLinetu">确定</button>
          </div>
          <div class="linetu" ref="linetu"></div>
          <div class="nodata" v-if="series.length===0">暂无数据</div>
        </div>
      </div>
      <div class="middle">
        <div class="map" ref="mapRef">
          <ThreeMap :price="lowerPrice" @lowProductfn="lowProductfn"></ThreeMap>
        </div>
        <div class="numtop">
          <div class="numtext">关键词</div>
          <div class="numtext">最低价</div>
          <div class="numtext" v-if="price">低价商品数</div>
          <div class="numtext" v-else>总商品数</div>
        </div>
        <div class="numbotton">
          <div class="numbgi">
            <el-select v-model="value" placeholder="请选择" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <p>{{ goodsName }}</p> -->
          </div>
          <div class="numbgi">
            <input type="number" placeholder="最低价" v-model="price" @input="changePrice">
          </div>
          <div class="numbgi">
            <p><CountTo :startVal='0' :endVal='lowProduct' :duration='2000' /></p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="saleAvager">
          <div class="site">
            <button @click="changeSite()">全部</button>
            <button @click="changeSite('天猫')">天猫</button>
            <button @click="changeSite('京东')">京东</button>
            <button @click="changeSite('拼多多')">拼多多</button>
            
            <img src="@/assets/search.png" alt="">
            <input type="text" placeholder="请输入" v-model="searchValue" @input="changelowSite">
            <!-- <input type="text" placeholder="请输入" v-model="searchValue" @input="changelowSite"> -->
          </div>
          <div class="circleTitle">
            <div class="line"></div>
              <p>全网最低价商品排序</p>
            <div class="line"></div>
          </div>
          <div class="nodate" v-if="nodate">暂无数据</div>
          <div class="bingtu" v-else>
            <div class="showGoods">
              <div class="shangpin" v-for="(item,index) in lowerlist" :key="index">
                <div class="s-left">
                  <img :src="item.imgUrl" alt="" @error=handleImageError v-if="item.imgUrl">
                  <img src="@/assets/imgerro.jpg" alt="" v-else>
                </div>
                <div class="s-right">
                  <p>{{ item.title }}</p>
                  <div class="s-title">
                    店铺：{{ item.shop }}
                  </div>
                  <div class="price">
                    <p>￥{{ item.price }}</p>
                    <p v-if="item.deal">销售量:{{ item.deal }}</p> 
                  </div>
                  <div class="price">
                    <p>{{ item.site }}</p>
                    <p v-if="item.location">地区：{{ item.location }}</p>
                  </div>
                </div>
                <!-- <div class="money">
                  <p>{{ item.data }}</p>
                </div> -->
                <div class="money">
                  <!-- <p>盈利金额</p> -->
                  <!-- <h6>利润￥{{ item.money }}</h6> -->
                  <a :href="item.detailUrl" target="_blank">
                    <button>跳转详情</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="priceAvager">
          <div class="circleTitle">
            <div class="line"></div>
              <p>重点链接监控情况</p>
            <div class="line"></div>
          </div>
          <div class="bingtu">
            <div class="showGoods">
              <div class="shangpin" v-for="(item,index) in linkList" :key="index">
                <div class="s-left">
                  <a :href="item.detailUrl" target="_blank">
                    <img :src="item.imgUrl" alt="" @error=handleImageError v-if="item.imgUrl">
                    <img src="@/assets/imgerro.jpg" alt="" v-else>
                  </a>
                </div>
                <div class="s-right">
                  <p>{{ item.title }}</p>
                  <div class="s-title">
                    店铺：{{ item.shop }}
                  </div>
                  <div class="price">
                    <p>￥{{ item.price }}</p>
                    <p v-if="item.deal">{{ item.deal }}</p>
                  </div>
                  <div class="price">
                    <p v-if="item.site">{{ item.site }}</p>
                    <p v-if="item.location">地区：{{ item.location }}</p>
                  </div>
                </div>
                <div class="link">
                  <p>{{ getTime(item.searchDate) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import CountTo from 'vue-count-to';
import ThreeMap from '@/views/map/components/Threemap' 
import {lowerGoodsApi,linetuApi,lineDataApi,linkDetailApi} from '@/apis/map'
export default {
  name:'MapIndex',
  components: {
    CountTo,
    ThreeMap,
  },
  data() {
    return {
      myChart: null,
      bingdata: [
              { name: '吉林', value: 86,itemStyle:{color:'#84f1ff'}},
              { name: '北京', value: 72,itemStyle:{color:'#6a92f5'} },
              { name: '辽宁', value: 64,itemStyle:{color:'#513bff'} },
              { name: '河北', value: 53,itemStyle:{color:'#7242f0'} },
              { name: '天津', value: 48,itemStyle:{color:'#986cfd'} },
              { name: '山西', value: 34,itemStyle:{color:'#3e6ff7'} },
              { name: '浙江', value: 30,itemStyle:{color:'#62edfb'} },
              { name: '内蒙古', value: 24,itemStyle:{color:'#4e6ebb'} }
      ],
      series: [{name:'欣善怡麦片',data:[34,45],type:'line'}],
      getlist: [],
      searchValue: '',  //搜索名称
      avasaleData: [
        {area:'新疆',avaSale:'345'},
        {area:'吉林',avaSale:'277'},
        {area:'安徽',avaSale:'422'},
        {area:'浙江',avaSale:'123'},
        {area:'安庆',avaSale:'232'},
        {area:'山西',avaSale:'246'},
        {area:'河北',avaSale:'342'},
      ],
      avapriceData: [
        {area:'新疆',avaPrice:'345'},
        {area:'吉林',avaPrice:'277'},
        {area:'安徽',avaPrice:'422'},
        {area:'浙江',avaPrice:'123'},
        {area:'安庆',avaPrice:'232'},
        {area:'山西',avaPrice:'246'},
        {area:'河北',avaPrice:'342'},
      ],
      lowerPrice: 0,//最低价
      lowerNum: 0, //最低数量
      lowProduct:0,
      goodsName: '瑞幸',
      Timer: null,
      site: '',
      lowerlist: [],
      nodate: false,
      options: [{
          value: '选项1',
          label: '欣善怡全麦脆'
        }, {
          value: '选项2',
          label: '欣善怡麦片'
        }, {
          value: '选项3',
          label: '欣善怡燕麦块'
        }, {
          value: '选项4',
          label: '欣善怡燕麦饼干'
        }, {
          value: '选项5',
          label: '欣善怡麦片无糖'
        }],
      options1: [], //返回的监控对象
      lineData: [], //  收集所有的折线图title
      linePricedata:[], //处理后的折线图的数据
      value1: '',
      selectProduct:false,
      value: '',
      price: null,
      linkList:[]   //监控链接详情
    };
  },
  created() {
    this.changeSite()
    this.getlineData()
    this.getlink()
  },
  mounted() {
  this.chartBingtu();
  // this.chartZhuzhuangtu()
    
  },
  methods: {
    //选择展示的折线图
    changeLinetu() {
      console.log('this.value1',this.value1);
    },
    //显示选择折线图下拉框
     Productshow() {
       if (this.linePricedata.length > 5) {
         this.selectProduct = true
       } else {
         this.selectProduct = false
       }
    },
    //获取所有监控的折线图的title
    async getlineData() {
      const res=await linetuApi()
      this.options1 = res.data.data
      this.options1.forEach((item) => {
        this.lineData.push(item.numIid)  //传入numIid
      })
      this.lineData = this.lineData.toString()
      if (this.lineData) {
        const res2 = await lineDataApi({numIids:this.lineData})
        this.linePricedata = res2.data.data
        this.lineprice()
        console.log('this.linePricedata', this.linePricedata);
      }
      this.Productshow()
    },
    //折线图数据处理
    lineprice() {
      this.series=[]
      for (let i = 0; i < this.options1.length; i++){
        for (let j = 0; j < this.linePricedata.length; j++){
          if (this.linePricedata[j].numIid === this.options1[i].numIid) {
            let obj = {
              name: this.options1[i].title,
              data: this.linePricedata[j].averagePrice.split(','),
              type:'line'
            }
            this.series[j]=obj
            this.chartZhuzhuangtu()
          }
        }
      }
      console.log('series', this.series);
    },
    //接收地图组件传回来的低价商品数量
    lowProductfn(e) {
      this.lowProduct=e.lowProduct
    },
    //低价商品搜索平台数据
    async changelowSite() {
      clearTimeout(this.Timer)
         this.Timer = setTimeout(async() => {
           this.site = this.searchValue
           const res =await lowerGoodsApi({site:this.site,keyword:'欣善怡'})
          if (res.data.data.length>0) {
            this.lowerlist = res.data.data
            this.nodate=false
          } else {
            this.nodate=true
          }
         },500)
    },
    //低价商品平台切换数据
    async changeSite(val) {
        this.site = val
        this.searchValue=''
      const res =await lowerGoodsApi({site:this.site,keyword:'欣善怡'})
      if (res.data.data.length>0) {
        this.lowerlist = res.data.data
        this.nodate=false
      } else {
        this.nodate=true
      }
    },
    //监控链接详情
    async getlink() {
      const res = await linkDetailApi()
      this.linkList=res.data.data
    },
     //时间戳转换
    getTime(time) {
      const time1 = Math.floor(time / (24 * 60 * 60 * 1000))
      const time2 = Math.floor(new Date() / (24 * 60 * 60 * 1000))
       if (time1===time2) {
        return '上架中'
       } else {
        return '已下架'
      }
    },
    //关闭侧边栏弹窗
    handleClose(done) {
      done()
    },

    //设置最低价
    changePrice() {
      this.lowerPrice = this.price
      this.$refs.mapRef.price=this.price
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
        legend: {
          top: 'center',
          right: '5%',
          orient: 'vertical',
          textStyle: {
            color: '#fff',
            fontSize:16
          }
        },
        series: [
          {
            name: '区域销量占比分析',
            type: 'pie',
            radius: ['40','100'],
            center: ['39%', '50%'],
            // roseType: 'area',
            data: this.bingdata,
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

    //折线图
    chartZhuzhuangtu() {
      let myChart = echarts.init(document.querySelector('.linetu'));
      let option;
      option = {
        animationDuration: 7000,
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            if ((size.viewSize[0] / 2) >= point[0]) {
              return [point[0]+50,'10%']
            } else {
              return [point[0]-200,'10%']
            }
          },
          formatter:'{b}'+'<br/>'+'{a}'+':{c}'+'元'
        },
        legend: {
          // data: ['欣善怡全麦脆', '欣善怡麦片', '欣善怡燕麦块', '欣善怡燕麦饼干', '欣善怡麦片无糖'],
          textStyle: {
            color: '#fff'
          },
          //  selectedMode:'single'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   },
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
        },
        yAxis: {
          type: 'value'
        },
        series: this.series
      }
      option && myChart.setOption(option);
    },

    //图片路径错误时换成指定图片
    handleImageError(e) {
      e.srcElement.src = require("@/assets/imgerro.jpg");
    },
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
  height: 100%;
  background-image: url(@/assets/mapbgc.png);
  position: absolute;
  top: 0;
  left: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  .header {
    width: 927px;
    height: 128px;
    background-image: url(@/assets/maptitle.png);
    margin-left: 551px;
    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 40px;
      color: transparent;
      filter: blur(0.5px);
      // text-shadow: 3px 3px 4px  rgba(0, 119, 255, 0.5), -3px -3px 4px  rgba(0, 119, 255, 0.5);
      background: linear-gradient(to bottom, rgba(0, 119, 255, 0.5), #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      /* 兼容不支持-webkit-text-fill-color的浏览器 */
      background-clip: text;
      font-size: 45px;
      font-weight: 400;
    }
  }
  .body {
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    // height: 100%;
    display: flex;
    .left {
      margin-top: 10px;
      padding-left: 135px;
      width: 614px;
      height: 686px;
      background-image: url(@/assets/leftbgi.png);
      // position: relative;
        .circle{
          width: 440px;
          height: 340px;
          .circleTitle{
            padding-top: 41px;
            padding-left: 45px;
            display: flex;
            .line{
              width: 56px;
              height: 1px;
              background-color: #fff;
              margin: 15px 10px;
            }
            p{
              color: #fff;
              height: 35px;
              font-size: 24px;
              text-align: center;
            }
          }
          .alasyle{
            width: 263px;
            height: 89px;
            margin-top: 66px;
            margin-left: 91px;
            background-image: url(@/assets/buttonkuang.png);
            color: #fff;
            line-height: 89px;
            text-align: center;
            font-size: 36px;
            font-weight: 400;
          }
          
          .bingtu{
            width: 450px;
            height: 270px;
          }
        }
        .bar{
          position: relative;
          width: 440px;
          height: 383px;
          .circleTitle{
            padding-top: 30px;
            padding-left: 25px;
            display: flex;
            .line{
              width: 56px;
              height: 1px;
              background-color: #fff;
              margin: 15px 10px;
            }
            p{
              color: #fff;
              height: 35px;
              font-size: 24px;
              text-align: center;
            }
          }
          .select{
            position: absolute;
            left: 3px;
            bottom: 3px;
            width: 450px;
            height: 27px;
            margin-top: 20px;
            margin-left: 45px;
            button{
              margin-left: 25px;
              width: 70px;
              height: 36px;
              border-radius: 5px;
              background-color: transparent;
              color: #fff;
              border: 1px solid #287adf;
              &:active{
                      background-color: #fff;
                      color: #3db3eb;
                    }
            }
          }
          .nodata{
            position: absolute;
            top: 150px;
            left: 150px;
            color: #ccc;
          }
          .linetu{
            width: 420px;
            height: 260px;
          }
        }
      }
      .middle{
        width: 762px;
        height: 768px;
        background-image: url(@/assets/middlebgi.png);
        // .cellPrice{
        //   width: 500px;
        //   height: 263px;
        //   margin-top: 10px;
        //   margin-left: 120px;
        //   .goodName{
        //     color: rgba(255, 255, 255, 0.8);
        //     font-size: 24px;
        //     padding-top: 10px;
        //     height: 60px;
        //     display: flex;
        //     justify-content: center;
        //     span{
        //       padding:15px 27px;
        //     }
        //   }
        //   .goodNum{
        //     height: 60px;
        //     color: rgba(255, 255, 255, 0.5);
        //     font-size: 24px;
        //     display: flex;
        //     justify-content: space-between;
        //     padding: 20px 70px;
        //   }
        // }
        .map {
          // height: 625px;
          height: 500px;
          width: 762px;
        }
        .numtop{
          margin-top: 20px;
          display: flex;
          color: #fff;
          font-size: 15px;
          text-align: center;
          margin-left: 178px;
          .numtext{
            width: 131px;
            height: 46px;
            line-height: 50px;
            background-image: url(@/assets/numtext.png);
            margin-right: 9px;
          }
        }
        .numbotton{
          margin-top: 20px;
          display: flex;
          color: #fff;
          font-size: 15px;
          text-align: center;
          margin-left: 178px;
          .numbgi{
            width: 106px;
            height: 40px;
            position: relative;
            background-image: url(@/assets/numbgi.png);
            margin:0 16px;
            line-height: 40px;
            input{
              width: 80px;
              height: 30px;
              border-radius: 10px;
              background-color: transparent;
              border: 1px solid transparent;
              text-align: center;
              color: #fff;
              outline: none;
              &:focus{
                border: 1px solid transparent;
              }
              &::placeholder{
                color: #ccc;
              }
            }
            ::v-deep .el-input__inner{
              width: 126px;
              background-color: transparent;
              border: 1px solid transparent;
              color: #fff;
              height: 30px;
              border-radius: 10px;
              // padding: 0;
            }
            .el-select ::v-deep .popper-class {
              width: 100px;
            }
            .iclass-text-ellipsis {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    .right {
      margin-top: 10px;
      width: 613px;
      height: 671px;
      background-image: url(@/assets/rightbgi.png);
      background-position: right;
      .saleAvager{
          width: 500px;
          height: 327px;
          // height: 480px;
          // margin-bottom: 30px;
          position: relative;
          .site{
            position: absolute;
            top: -42px;
            left: -3px;
            button{
              width: 70px;
              height: 30px;
              background-color: transparent;
              color: #fff;
              border: 1px solid #287adf;
              &:active{
                      background-color: #fff;
                      color: #3db3eb;
                    }
            }
            img{
              width: 20px;
              height: 20px;
              position: absolute;
              top: 6px;
              right: 11px;
            }
            input{
              height: 30px;
              background-color: transparent;
              color: #fff;
              border:1px solid #287adf;
              margin-left: 10px;
              padding-left: 10px;
              &::placeholder{
                color: #fff;
              }
            }
          }
          .circleTitle{
            padding-top: 35px;
            padding-left: 40px;
            display: flex;
            .line{
              width: 56px;
              height: 1px;
              background-color: #fff;
              margin: 15px 10px;
            }
            p{
              color: #fff;
              height: 35px;
              font-size: 24px;
              text-align: center;
            }
          }
          .nodate{
            display: flex;
            justify-content: center;
            margin-top: 100px;
            color: #ccc;
          }
          .bingtu{
            padding: 10px 30px;
            .showGoods{
              height:245px;
              width:439px;
              overflow-y: scroll;
              &::-webkit-scrollbar {
                  width: 4px; /* 设置滚动条的宽度 */
              }
              &::-webkit-scrollbar-track {
                  background-color: #1d4366 !important; /* 设置背景色 */
              }
              &::-webkit-scrollbar-thumb {
                  background-color: #388fcd; /* 设置滑块的颜色 */
              }
              .shangpin{
                display: flex;
                width: 435px;
                .s-left{
                  width: 100px;
                  height: 100px;
                  img{
                    width: 100px;
                    height: 100px;
                    border-radius: 5px;
                  }
                }
                .s-right{
                  width: 205px;
                  height: 100px;
                  margin-left: 10px;
                  p{
                    margin: 2px  !important;
                    font-size: 12px;
                    color: #dad4d4;
                    padding-top: 5px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    // &:hover{
                    //   overflow: visible;
                    // }
                  }
                  .s-title{
                    width: 205px;
                    color: #dad4d4;
                    font-size: 12px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                  .price{
                    display: flex;
                    justify-content: space-between;
                  }
                }
                .money{
                  height: 100px;
                  width: 100px;
                  // width: 55px;
                  color: #fff;
                  font-size: 12px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  h6{
                    font-size: 12px;
                    font-weight: normal;
                  }
                  button{
                    width: 80px;
                    height: 30px;
                    background-color: #388fcd;
                    
                  }
                }
              }

            }
          }
        }
        .priceAvager{
          width: 500px;
          height: 383px;
          .circleTitle{
            padding-top: 40px;
            padding-left: 55px;
            display: flex;
            .line{
              width: 56px;
              height: 1px;
              background-color: #fff;
              margin: 15px 10px;
            }
            p{
              color: #fff;
              height: 35px;
              font-size: 24px;
              text-align: center;
            }
          }
          .bingtu{
            padding: 10px 30px;
            .showGoods{
              height:245px;
              width:439px;
              overflow-y: scroll;
              &::-webkit-scrollbar {
                  width: 4px; /* 设置滚动条的宽度 */
              }
              &::-webkit-scrollbar-track {
                  background-color: #1d4366 !important; /* 设置背景色 */
              }
              &::-webkit-scrollbar-thumb {
                  background-color: #388fcd; /* 设置滑块的颜色 */
              }
              .shangpin{
                display: flex;
                width: 435px;
                .s-left{
                  width: 100px;
                  height: 100px;
                  img{
                    width: 100px;
                    height: 100px;
                    border-radius: 5px;
                  }
                }
                .s-right{
                  width: 240px;
                  height: 100px;
                  margin-left: 10px;
                  p{
                    margin: 2px  !important;
                    font-size: 12px;
                    color: #dad4d4;
                    padding-top: 5px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    // &:hover{
                    //   overflow: visible;
                    // }
                  }
                  .s-title{
                    width: 245px;
                    color: #dad4d4;
                    font-size: 12px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                  .price{
                    display: flex;
                    justify-content: space-between;
                  }
                }
                .link{
                  height: 100px;
                  width: 75px;
                  color: #fff;
                  font-size: 12px;
                  text-align: center;
                  line-height: 72px;
                }
              }

            }
            // .title{
            //   width: 380px;
            //   height: 30px;
            //   display: flex;
            //   justify-content: space-between;
            //   color: #fff;
            //   p{
            //     width: 190px;
            //     text-align: center;

            //   }
            // }
          }
        }
    }
  }
}
::v-deep .el-select-dropdown__list{
  padding: 6px 15px;
}

</style>