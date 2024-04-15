<template>
  <div class="content">
    <sideNav />
    <div class="top">
      <div class="company">
      {{ companyName }}有限公司
    </div>
    <div class="search">
        选择平台：
        <el-select v-model="params.site" placeholder="请选择平台" @change="changeDatas">
            <el-option
              v-for="item in optionsite"
              :key="item"
              :label="item"
              :value="item" style="text-align: center;">
            </el-option>
          </el-select>
      </div>
      <div class="search">
        选择关键词：
        <el-select v-model="params.keyword" placeholder="请选择关键词" @change="changeall">
            <el-option
              v-for="item in optionkeyword"
              :key="item"
              :label="item"
              :value="item" style="text-align: center;">
            </el-option>
          </el-select>
      </div>
      <p class="pirce">低价：<i>￥{{ this.params.lowPrice }}</i></p>
    </div>
    <div class="part">
      <div class="part1">
        <h3>总链接地区分布</h3>
        <div class="partbody">
         <div class="allbox">
          <div class="left">
            <div class="box">
              <p>链接总数</p>
            <!-- <p>{{this.allLinknum}}</p> -->
            <p><CountTo :startVal='0' :endVal='allLinknum' :duration='1000' /></p>
            </div>
            <div class="box" v-if="this.unlinknum">
              <p>暂无地区数</p>
              <!-- <p>{{this.unlinknum}}</p> -->
              <p><CountTo :startVal='0' :endVal='unlinknum' :duration='1000' /></p>
            </div>
          </div>
         </div>
          <div class="linknum" ref="linknum"></div>
        </div>
      </div>
      
      <div class="part2">
        <h3>低价卖家占比</h3>
        <div class="partbody">
          <div class="linknum" ref="lowsale"></div>
          <div class="left">
            <div class="box">
              <p>总卖家</p>
              <!-- <p>{{this.allsale}}</p> -->
              <p><CountTo :startVal='0' :endVal='allsale' :duration='1000' /></p>
            </div>
            <div class="box">
              <p>总低价卖家</p>
              <!-- <p>{{this.alllowsale}}</p> -->
              <p><CountTo :startVal='0' :endVal='alllowsale' :duration='1000' /></p>
            </div>
            <div class="box">
              <p>占比</p>
              <p>{{(((this.alllowsale/this.allsale)*100).toFixed(2))}}%</p>
            </div>
            <div class="box">
              <p>暂无地区数</p>
              <!-- <p>{{ this.unallowsale }}/{{this.unallsale}}</p> -->
              <p><CountTo :startVal='0' :endVal='unallowsale' :duration='1000' />/<CountTo :startVal='0' :endVal='unallsale' :duration='1000' /></p>
            </div>
          </div>
        </div>
      </div>
      <div class="part3">
        <h3>新增低价链接</h3>
        <div class="link">
          <div class="link-title">
            <p>商品图片</p>
            <p>店铺名称</p>
            <p>商品名称</p>
            <p>价格</p>
            <p>地区</p>
          </div>
          <div class="link-body">
            <p>商品图片</p>
            <p>店铺名称</p>
            <p>商品名称</p>
            <p>价格</p>
            <p>地区</p>
          </div>
        </div>
      </div>
      
    </div>
    <div class="part">
      <div class="part5">
        <h3>低价正价链接分布</h3>
        <div class="partbody">
          <div class="linknum" ref="lowNormal"></div>
          <div class="bottom">
            <div class="left">
            <p>总低价链接数</p>
            <p><CountTo :startVal='0' :endVal='lowlinkstate' :duration='1000' /></p>
          </div>
          <div class="left">
            <p>总正价链接数</p>
            <p><CountTo :startVal='0' :endVal='normallinkstate' :duration='1000' /></p>
          </div>
          <div class="left">
            <p>暂无地区数</p>
            <p><CountTo :startVal='0' :endVal='unlowlinkstate' :duration='1000' />/<CountTo :startVal='0' :endVal='unnormallinkstate' :duration='1000' /></p>
          </div>
          </div>
        </div>
      </div>
      <div class="part2">
        <h3>低价销售额占比</h3>
        <div class="partbody">
          <div class="linknum" ref="lowsmall"></div>
          <div class="left">
            <div class="box2">
              <p>总销售额</p>
              <p><CountTo :startVal='0' :endVal='totalsales' :duration='1000' /></p>
            </div>
            <div class="box2">
              <p>总低价销售额</p>
              <p><CountTo :startVal='0' :endVal='somesales' :duration='1000' /></p>
            </div>
            <div class="box2">
              <p>占比</p>
              <p>{{((this.somesales/this.totalsales)*100).toFixed(2)}}%</p>
            </div>
          </div>
        </div>
      </div>
      <div class="part4">
        <h3>监控链接销售额
          <!-- <p>总:￥<CountTo :startVal='0' :endVal='allsaleprice' :duration='2000' /></p> -->
          <p>总:￥{{ allsaleprice.toFixed(2) }}</p>
        </h3>
        <div class="link">
          <div class="link-title">
            <p>商品图片</p>
            <h4>店铺名称</h4>
            <h4>商品名称</h4>
            <span>价格</span>
            <span>销量</span>
            <span>销售额</span>
          </div>
          <div class="linkbox">
            <div class="link-body"  v-for="(item,index) in linksaleList" :key="index">
              <p >
                <a :href="item.shopUrl" target="_blank">
                  <img :src="item.imgUrl" alt="" v-if="item.imgUrl" @error=handleImageError>
                  <img src="@/assets/imgerro.jpg" alt="" v-else>
                </a>
              </p>
            <h4 :title="item.shop">{{item.shop}}</h4>
            <h4 :title="item.title">{{item.title}}</h4>
            <span>￥{{Number(item.price)}}</span>
            <span>{{item.deal}}</span>
            <span>￥{{(Number(item.price)*item.deal).toFixed(2)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { maplistApi } from '@/apis/map'
import {linkSalesApi,lowsalesApi,totalpriceApi,linkStatisticsApi} from '@/apis/dataScreen'
import store from '@/store'
import CountTo from 'vue-count-to';
export default {
  name: 'DataScreen',
  components: {
    CountTo,
  },
    data() {
      return {
        myChart1:null, //总链接地区分布图
        companyName: store.getters.companyName,
        optionsite: ['全部', '淘宝', '京东', '拼多多'],
        optionkeyword:store.getters.keywordAll.split(','),
        allparams: {   //总链接地区参数
          // lowestPrice: 0,
          isArea: '1',
          keywordAll: store.getters.keywordAll
        },
        params: {  //低价卖家占比参数
          // lowestPrice: 0,
          keyword: store.getters.keywordPrice[0].word,
          isArea: '1',
          keywordAll: store.getters.keywordAll
        },
        linkparams: {  //链接监控销售额参数
          keywordAll: store.getters.keywordAll
        },
        linkstateparams: { //低价正价链接分布销售--低价参数
          isFlag:0
        },
        linkstateparams2: { //低价正价链接分布销售--正价参数
          isFlag:1
        },
        salesparams: { //低价销售额占比参数
          keyword: store.getters.keywordPrice[0].word,
          // keywordAll: store.getters.keywordAll
        },
        linknum: [], //总链接地区
        allLinknum: 0,//总链接地区
        unlinknum: 0, //未知地区---总链接地区
        lowsale: [], //低价卖家
        alllowsale:0,//总低价卖家
        allsale: 0, //总卖家
        unallsale:0,//未知地区---低价卖家占比
        unallowsale: 0,//未知地区---低价卖家占比
        linksaleList: [], //监控链接销售额
        allsaleprice: 0, //监控链接总销售额
        linkstateList1:[], //低价链接分布--低价正价链接分布
        linkstateList2: [], //正价链接分布--低价正价链接分布
        lowlinkstate: 0,//总低价链接数
        normallinkstate: 0, //总正价链接数
        unlowlinkstate: 0,//未知地区总低价链接数
        unnormallinkstate:0,//未知地区总正价链接数
        salespriceList: [],//低价销售额占比
        totalsales: 0, // 总销售额---低价销售额占比
        somesales:0, //总低价销售额--低价销售额占比
       }
  },
  created() {
    this.getlowsales()
    this.getlinknumApi()
    this.getallDataApi()
    this.getlinkSales()
    this.getlinkStatistics()
  },
  methods: {
   
    //时间处理
    getTime(time) {
      if (time) {
        return time.slice(0,3).join('/')
      }
    },
    //获取链接数量接口
    async getlinknumApi() {
      if (this.params.keyword) {
        this.allparams.keyword=this.params.keyword
      //   store.getters.keywordPrice.forEach((item) => {
      //   if (this.allparams.keyword === item.word) {
      //     this.allparams.lowestPrice=item.lowestPrice
      //   }
      // })
      }
      if (this.params.site) {
        this.allparams.site=this.params.site
      }
      const res = await maplistApi(this.allparams)
      this.linknum = []
      this.allLinknum=0
      res.forEach(item => {
        if (item.location == '暂无') {
          this.unlinknum = item.uniqueProductCount
        } else {
          this.linknum.push({ name: item.location, value: item.uniqueProductCount })
          this.allLinknum+=item.uniqueProductCount
        }
      })
      this.allLinknum += this.unlinknum
      this.getlinknum()
    },
    //链接总数量
    getlinknum() {
      this.myChart1 = this.echarts.init(this.$refs.linknum)
      let option
      option = {
          tooltip: {
          trigger: 'item',
          formatter:'{a}<br/>{b}:{c}({d}%)'
          },
        // legend: {
        //     top:'30%',
        //     right: '5%',
        //     orient: 'vertical',
        //     textStyle: {  color: '#fff'},
        //   },
          series: [
            {
              name: '链接总数量',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                color:'#fff',
                // show: false,
              //   // position: 'center',
              //   // formatter:'{b}:{d}%'
              },
               emphasis: {
                itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
               },
              // labelLine: {
              //   show: false
              // },
              data: this.linknum
            }
          ]
      };
      this.changePages1()
      option && this.myChart1.setOption(option);
     
    },
    //总链接地区分布跳转
    changePages1() {
      this.myChart1.on('click',({ data }) =>{
        this.$router.push({ name: 'goodsAlayse', params: { location: data.name,keyword:this.params.keyword } }).catch(err => err)
      })
    },
     //获取低价卖家占比接口
     async getallDataApi() {
      
      // this.params={
      //     keyword: store.getters.keywordPrice[0].word,
      //     isArea: '1',
      //     keywordAll: store.getters.keywordAll
       //   }
      //  if (this.allparams.site) {
      //   this.params.site=this.allparams.site
      // }
       const res = await maplistApi(this.params)
       this.unallsale = 0
      this.allsale=0
       res.forEach(item => { 
         if (item.location == '暂无') { 
           this.unallsale = item.uniqueShopCount
           this.allsale += item.uniqueShopCount
         } else {
           this.allsale+=item.uniqueShopCount
         }
      })
      store.getters.keywordPrice.forEach((item) => {
        if (this.params.keyword === item.word) {
          this.params.lowPrice=item.lowestPrice
        }
      })
      const res2 = await maplistApi(this.params)
      this.lowsale = []
       this.alllowsale = 0
      this.unalllowsale=0
      res2.forEach(item => {
        if (item.location == '暂无') {
          this.alllowsale += item.uniqueShopCount
          this.unallowsale=item.uniqueShopCount
        } else {
          this.lowsale.push({name: item.location, value: item.uniqueShopCount})
          this.alllowsale+=item.uniqueShopCount
        }
      })
      this.getlowsale()
    },
    //低价卖家占比
    getlowsale() {
      let myChart = this.echarts.init(this.$refs.lowsale)
      let option
      option = {
          tooltip: {
          trigger: 'item',
          formatter:'{b}:{c}({d}%)'
          },
        // legend: {
        //     top:'30%',
        //     right: '5%',
        //     orient: 'vertical',
        //     textStyle: {  color: '#fff'},
        //   },
          series: [
            {
              // name: 'Access From',
              type: 'pie',
              radius: ['90%', '140%'],
              center: ['50%', '90%'],
              startAngle: 180,
              endAngle: 360,
              avoidLabelOverlap: false,
              label: {
                color:'#fff',
                // show: false,
              //   // position: 'center',
              //   // formatter:'{b}:{d}%'
              },
               emphasis: {
                itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
               },
              // labelLine: {
              //   show: false
              // },
              data: this.lowsale
            }
          ]
      };
      myChart.on('click',({ data }) =>{
        this.$router.push({ name: 'goodsAlayse', params: { location: data.name,keyword:this.params.keyword,wordprice:this.params.lowPrice } }).catch(err => err)
      })
      option && myChart.setOption(option);
    },
    //获取低价销售额占比接口
    async getlowsales() {
      if (this.params.site) {
        this.salesparams.site=this.params.site
      }
      store.getters.keywordPrice.forEach((item) => {
        if (this.params.keyword === item.word) {
          this.salesparams.lowPrice=item.lowestPrice
        }
      })
      const res=await lowsalesApi(this.salesparams)
      this.salespriceList = res
      this.somesales=0
      res.forEach(item => {
        this.somesales += item.totalPrice
        let range = item.priceRange.split('~')
        let range1 =Number(range[0]).toFixed(2) 
        let range2 = Number(range[1]).toFixed(2)
        let range3=`￥${range1}~${range2}`
        this.salespriceList.push({name:range3,value:item.count})
      })
      this.gettotalprice()
      this.getlowsamll()
    },
    //获取低价销售额占比--总销售额
    async gettotalprice() {
      const res = await totalpriceApi({ keyword: this.salesparams.keyword })
      this.totalsales=res.allLowPrice
    },
    //低价销售额占比
    getlowsamll() {
      let myChart = this.echarts.init(this.$refs.lowsmall)
      let option
      option = {
          tooltip: {
          trigger: 'item',
          formatter:'{b} :{c}({d}%)'
          },
        // legend: {
        //     top:'30%',
        //     right: '5%',
        //     orient: 'vertical',
        //     textStyle: {  color: '#fff'},
        //   },
          series: [
            {
              // name: 'Access From',
              type: 'pie',
              radius: ['0%', '82%'],
              // startAngle: 180,
              // endAngle: 360,
              avoidLabelOverlap: false,
              label: {
                color:'#fff',
                // show: false,
              //   // position: 'center',
              //   // formatter:'{b}:{d}%'
              },
               emphasis: {
                itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
               },
              // labelLine: {
              //   show: false
              // },
              data: this.salespriceList
            }
          ]
      };
      myChart.on('click',({ data }) =>{
        this.$router.push({ name: 'goodsAlayse', params: {keyword:this.params.keyword,rangeprice:data.name } }).catch(err => err)
      })
      option && myChart.setOption(option);
    },
    //获取低价正价分布链接接口---低价
    async getlinkStatistics() {
      if (this.params.site) {
        this.linkstateparams.site=this.params.site
      }
      this.linkstateparams.keyword = this.params.keyword
      store.getters.keywordPrice.forEach((item) => {
        if (this.linkstateparams.keyword === item.word) {
          this.linkstateparams.lowPrice=item.lowestPrice
        }
      })
      const res = await linkStatisticsApi(this.linkstateparams)
      this.lowlinkstate = 0
      this.unlowlinkstate = 0
      this.linkstateList1=[]
      res.forEach(item => {
        if (item.location == '暂无') {
          this.unlowlinkstate=item.linkCount
        } else {
          this.linkstateList1.push({ name: item.location, value: item.linkCount })
          this.lowlinkstate+=item.linkCount
        }
      })
      
      this.getlinkStatistics2()
    },
    //获取低价正价链接分布接口---正价
    async getlinkStatistics2() {
      if (this.params.site) {
        this.linkstateparams2.site=this.params.site
      }
      this.linkstateparams2.keyword = this.params.keyword
      store.getters.keywordPrice.forEach((item) => {
        if (this.linkstateparams2.keyword === item.word) {
          this.linkstateparams2.lowPrice=item.lowestPrice
        }
      })
      const res = await linkStatisticsApi(this.linkstateparams2)
      this.normallinkstate = 0
      this.unnormallinkstate = 0
      this.linkstateList2=[]
      res.forEach(item => {
        if (item.location == '暂无') {
          this.unnormallinkstate=item.linkCount
        } else {
          this.linkstateList2.push({ name: item.location, value: item.linkCount })
          this.normallinkstate+=item.linkCount
        }
      })
      this. getlowNormal()
    },
    //低价正价链接分布
    getlowNormal() {
      let myChart = this.echarts.init(this.$refs.lowNormal)
      let option
      option = {
          tooltip: {
          trigger: 'item',
          formatter:'{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '正价链接数',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '50%'],
              label: {
                position: 'inner',
                fontSize: 14
              },
              labelLine: {
                show: false
              },
              data: this.linkstateList2
            },
            {
              name: '低价链接数',
              type: 'pie',
              radius: ['70%', '100%'],
              labelLine: {
                length: 20
              },
              label: {
                formatter: '{a}-{b}：{c}',
                color:'#fff',
              },
              data:this.linkstateList1
            }
          ]
      };
      myChart.on('click',(params) =>{
        console.log(params);
        if (params.seriesName === '低价链接数') {
          this.$router.push({ name: 'goodsAlayse', params: { location: params.data.name,keyword:this.params.keyword,wordprice:this.params.lowPrice } }).catch(err => err)
        } else {
          this.$router.push({ name: 'goodsAlayse', params: { location: params.data.name,keyword:this.params.keyword,wordprice2:this.params.lowPrice } }).catch(err => err)
        }
      })
      option && myChart.setOption(option);
    },
    //更换平台
    changeDatas() {
      if (this.params.site == '全部') {
        this.params.site = ''
        this.allparams.site=''
        this.linkparams.site = ''
        this.salesparams.site = ''
        this.linkstateparams.site = ''
        this.linkstateparams2.site=''
      }
      this.getlinknumApi()
      this.getallDataApi()
      this.getlinkSales()
      this.getlowsales()
      this.getlinkStatistics()
    },
    //更换链接总数量关键词
    changeall() {
      this.getallDataApi()
      this.getlinknumApi()
      this.getlowsales()
      this.getlinkSales()
      this.getlinkStatistics()
    },
    //更换低价卖家占比关键词
    // changeshop() {
    //   this.getallDataApi()
    // },
    //更换低价销售额占比关键词
    // changesales() {
    //   this.getlowsales()
    // },
    //更换监控链接销售额关键词
    // changelink() {
    //   this.getlinkSales()
    // },
    //监控链接销售额接口
    async getlinkSales() {
      if (this.params.site) {
        this.linkparams.site = this.params.site
      }
      const res = await linkSalesApi(this.linkparams)
      this.linksaleList = res
      this.allsaleprice=0
      this.linksaleList.forEach(item => {
        this.allsaleprice+=Number((Number(item.price)*item.deal).toFixed(2))
      })
    },
    //图片路径错误时换成指定图片
    handleImageError(e) {
      e.srcElement.src = require("@/assets/imgerro.jpg");
    },
    }
  }
</script>


<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  background-image: url(@/assets/tablebgi.png); 
  width: 100%;   
  height: 100vh;  
  position: absolute;  
  background-repeat: no-repeat;     
  background-size: 100% 100%;
  background-color: #0c234d;
  padding:20px;
  .top{
    display: flex;
    align-items: center;
    color: #fff;
    .company{
      color: #fff;
      margin-left: 100px;
      height: 60px;
      font-size: 26px;
      font-weight: bolder;
      line-height: 54px;
      margin-right: 50px;
    }
    .search{
        display: flex;
        align-items: center;
        margin:0 20px;
        font-size: 16px;
        .lowerPrice{
        width: 70px;
        height: 36px;
        border: 1px solid #ccc;
        line-height: 36px;
        text-align: center;
        color: red;
        }
        input{
          width: 100px;
          height: 30px;
        }
        button{
          width: 70px;
          height: 30px;
          margin-left: 10px;
        }
      }
      .pirce{
        font-size: 16px;
        font-weight: normal;
        i{
          padding: 0 5px;
          border-bottom: 1px solid #fff;
        }
      }
  }
  .part{
    padding:0 20px;
    display: flex;
    color: #fff;
    margin-bottom: 20px;
    font-size: 20px;
    .part3{
      width: 650px;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 10px;
      h3{
        padding: 10px;
        text-align: center;
        position: relative;
        .search{
          position: absolute;
          top: 10px;
          left: -15px;
      font-size: 12px;
      padding-left: 20px;
      .el-select{
        width: 100px;
        ::v-deep .el-input__inner{
          height: 30px;
        }
        ::v-deep .el-icon-arrow-up{
          line-height: 30px;
        }
      }
    }
      }
      .link{
        .link-title{
          width: 606px;
          height: 35px;
          line-height: 35px;
          display: flex;
          padding:0 20px;
          p{
          width: 120px;
          text-align: center;
        }
        }
        .link-body{
          width: 610px;
          height: 300px;
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
          display: flex;
          padding:0 20px;
          p{
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
          }
        }
      }
    }
    .part2{
      width: 540px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-right: 30px;
      padding: 10px;
      h3{
        position: relative;
        text-align: center;
        // span{
        //   margin-left: 240px;
        // }
        .search{
          position: absolute;
          top: 10px;
          left: -15px;
      font-size: 12px;
      padding-left: 20px;
      .el-select{
        width: 100px;
        ::v-deep .el-input__inner{
          height: 30px;
        }
        ::v-deep .el-icon-arrow-up{
          line-height: 30px;
        }
      }
      
    }
      }
      .partbody{
        .linknum{
          width: 540px;
          height: 250px;
        }
        .left{
          padding-top: 10px;
          width: 540px;
          display: flex;
          justify-content: space-between;
          .box{
            padding: 10px 20px;
            p{
              text-align: center;
              height: 32px;
              font-size: 22px;
            }
          }
          .box2{
            padding: 10px 20px;
            p{
              text-align: center;
              height: 34px;
              font-size: 28px;
            }
          }
        }
      }
    }
    .part1{
      width: 600px;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-right: 30px;
      h3{
        text-align: center;
        padding: 10px;
      }
      .partbody{
        display: flex;
        align-items: center;
        .allbox{
          height: 345px;
        }
        .search{
      font-size: 12px;
      padding-left: 20px;
      .el-select{
        width: 100px;
      }
    }
        .left{
          width: 200px;
          height: 285px;
          margin-top: 30px;
          .box{
            margin-bottom: 40px;
            margin-left: 20px;
            p{
            text-align: center;
            height: 36px;
            font-size: 32px;
          }
          }
        }
        .linknum{
          width: 460px;
          height: 350px;
        }
      }
    }
    .part4{
      width: 650px;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 10px;
      h3{
        position: relative;
        padding: 10px;
        text-align: center;
        .search{
          position: absolute;
          top: 10px;
          left: -5px;
      font-size: 12px;
      padding-left: 20px;
      .el-select{
        width: 100px;
        ::v-deep .el-input__inner{
          height: 30px;
        }
        ::v-deep .el-icon-arrow-up{
          line-height: 30px;
        }
      }
    }
    p{
      position: absolute;
      top: 15px;
      right: 30px;
      font-size: 20px;
      color: #ccc;
    }
      }
      .link{
        .link-title{
          width: 616px;
          height: 35px;
          line-height: 35px;
          display: flex;
          align-items: center;
          font-size: 16px;
          padding: 0 10px;
          p{
          width: 80px;
          text-align: center;
        }
        span{
            width: 80px;
            text-align: center;
            font-size: 18px;
          }
          h4{
            width: 170px;
            font-weight: normal;
            text-align: center;
          }
        }
        .linkbox{
          width: 620px;
          height: 300px;
          padding:0 10px;
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
        }
        .link-body{
          display: flex;
          align-items: center;
          p{
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            img{
              width: 80px;
              height: 80px;
              border-radius: 5px;
            }
          }
          span{
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 14px;
            &:nth-child(3){
              width: 100px;
            }
          }
          h4{
            width: 160px;
            height: 80px;
            line-height: 60px;
            font-weight: normal;
            text-align: center;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding: 10px;
            &:hover{
              cursor: default;
            }
          }
        }
      }
    }
    .part5{
      width: 600px;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-right: 30px;
      h3{
        position: relative;
        padding: 10px;
        text-align: center;
        .search{
          position: absolute;
          top: 10px;
          left: -15px;
      font-size: 12px;
      padding-left: 20px;
      .el-select{
        width: 100px;
        ::v-deep .el-input__inner{
          height: 30px;
        }
        ::v-deep .el-icon-arrow-up{
          line-height: 30px;
        }
      }
    }
    .pirce{
      position: absolute;
      top: 40px;
      left: 5px;
      font-size: 14px;
      font-weight: normal;
      i{
        padding: 0 5px;
        border-bottom: 1px solid #fff;
      }
    }
      }
      .partbody{
        .linknum{
          width: 600px;
          height: 260px;
        }
        .bottom{
          display: flex;
          padding: 5px 20px;
          .left{
          width: 650px;
          p{
            text-align: center;
            height: 40px;
            font-size: 22px;
          }
        }
        }
      }
    }
  }
}
</style>