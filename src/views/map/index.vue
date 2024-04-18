<template>
  <div class="wrap">
    <header class="header">
      <div class="title" >
        {{companyName}}商品数据展示
      </div>
      <sideNav />
    </header>
    <div class="body">
      <div class="left">
        <div class="circle">
          <div class="circleTitle">
            <div class="line"></div>
              <p>监控商家信息</p>
            <div class="line"></div>
          </div>
          <div class="nodata" v-if="false">暂无数据</div>
          <div class="bingtu">
            <div class="showGoods">
              <div class="shangpin" v-for="(item,index) in superData" :key="index">
                <div class="s-left">
                  <a v-if="item.response.seller.pcShopUrl" :href="item.response.seller.pcShopUrl" target="_blank">
                    <img :src="item.response.seller.shopIcon" alt="" @error=handleImageError v-if="item.response.seller.shopIcon">
                    <img src="@/assets/imgerro.jpg" alt="" v-else>
                  </a>
                </div>
                <div class="s-right">
                 <p>店铺名称：{{ item.response.seller.sellerNick }}</p>
                  <div class="price">
                    <p>宝贝描述：{{ item.response.seller.evaluates[0].score }}</p>
                    <p>卖家服务：{{ item.response.seller.evaluates[1].score }}</p>
                    <p>物流服务：{{ item.response.seller.evaluates[2].score }}</p>
                  </div>
                  <div class="priceinfo" >
                    <p v-if="item.response.componentsVO.extensionInfoVO.infos[0].items">优惠信息:
                      <template v-if="item.response.componentsVO.extensionInfoVO.infos[0].title=='优惠'">
                        <span v-for="(item1,ind) in item.response.componentsVO.extensionInfoVO.infos[0].items" :key="ind">
                          <!-- {{ 99 }} {{ item1 }} -->
                          <i v-if="item1.text">
                          <span v-for="(item2,index2) in item1.text" :key="index2" > {{ item2 }}  </span>
                          </i>
                        </span>
                      </template>
                      <i v-else>暂无优惠</i>
                    </p>
                  </div>
                  <div class="price">
                    <p>发货信息：{{ item.response.componentsVO.deliveryVO.deliveryFromAddr }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bar">
          <div class="circleTitle">
            <div class="line"></div>
              <p>监控链接价格变动</p>
            <div class="line"></div>
          </div>
          <div class="select" v-if="selectProduct">
            <el-select v-model="value1" @change="changevalue" multiple collapse-tags placeholder="请选择" :multiple-limit="5" >
                <el-option
                  v-for="item in options1"
                  :key="item.uniqueHashId"
                  :label="item.title"
                  :value="item.numIid"> 
                  </el-option>
            </el-select>
            <button @click="changeLinetu">确定</button>
          </div>
          <div class="nodata" v-if="series.length===0">暂无数据</div>
          <div class="linetu" ref="linetu"></div>
        </div>
      </div>
      <div class="middle">
        <div class="map" ref="mapRef">
          <ThreeMap :price="lowerPrice" @allProductfn="allProductfn" @lowProductfn="lowProductfn" @lowerpricefn="lowerpricefn" ref="map"></ThreeMap>
        </div>
        <div class="numtop">
          <div class="numtext">关键词</div>
          <div class="numtext">最低价</div>
          <div class="numtext" v-if="price">低价商品数</div>
          <div class="numtext" v-else>总商品数</div>
        </div>
        <div class="numbotton">
          <div class="numbgi">
            <el-select v-model="mapkeyword" placeholder="请选择" @change="changePrice">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item" style="text-align: center;">
              </el-option>
            </el-select>
          </div>
          <div class="numbgi">
            <input type="number" placeholder="最低价" v-model="price" @input="changePrice">
          </div>
          <div class="numbgi">
            <input type="number" v-model="lowProduct" disabled>
            <!-- <p>{{this.lowProduct}}</p> -->
            <!-- <p><CountTo :startVal='0' :endVal='lowProduct' :duration='2000' /></p> -->
          </div>
        </div>
        <div class="allnum">总商品数量<p>{{allproduct  }}</p></div>
      </div>
      <div class="right">
        <div class="saleAvager">
          <div class="site">
            <button @click="changeSite()">全部</button>
            <button @click="changeSite('淘宝')">淘宝</button>
            <button @click="changeSite('京东')">京东</button>
            <button @click="changeSite('拼多多')">拼多多</button>
            <button @click="changeSite('1688')">1688</button>
            <div class="inputbox">
              <img src="@/assets/search.png" alt="">
              <input type="text" placeholder="请输入" v-model="searchValue">
            </div>
          </div>
          <div class="circleTitle">
            <div class="line"></div>
              <p>低价商品排序</p>
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
                <div class="money">
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
                  <p>{{ item.sj }}</p>
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
// import CountTo from 'vue-count-to';
import ThreeMap from '@/views/map/components/Threemap' 
import { lowerGoodsApi, linetuApi, lineDataApi, linkDetailApi,storeInfoApi } from '@/apis/map'
import { getInfoApi } from '@/apis/user'
import store from '@/store'
// import cloneDeep from 'lodash/cloneDeep'; //lodash库中深拷贝对象的方法
export default {
  name:'MapIndex',
  components: {
    // CountTo,
    ThreeMap,
  },
  data() {
    return {
      myChart: null,
      series: [{name:'欣善怡麦片',data:[34,45],type:'line'}],
      getlist: [],
      searchValue: '',  //搜索名称
      lowerPrice: 0,//最低价
      lowerNum: 0, //最低数量
      allproduct:0,
      lowProduct:0,
      Timer: null,
      site: '',
      lowerlist: [],
      nodate: false,
      options: ['全部'],
      options1: [], //返回的监控对象
      lineData: [], //  收集所有的折线图title
      linePricedata:[], //处理后的折线图的数据
      value1: '',
      selectProduct:false,
      value: '',
      price: null,  //最低价
      mapkeyword:'', //地图关键词
      linkList: [],  //监控链接详情
      id:'', //获取用户id
      lowPrice: 0, //获取地图最低价,
      // infoshow: [],
      superData: [], //优惠商家,
      detailinfo: [],
      xdata:[] , //折线图x轴数据
      keywordAll: [], //全部关键词
      keywordPrice:[], //全部关键词+价格
      companyName:store.getters.companyName
    };
  },
  async created() {
    
    await this.getinfo()
    this.changeSite()
    this.getlineData()
    this.getlink()
    this.storeInfo()
    // this.getPrice()
  },
  methods: {
    
    //获取监控商家店铺信息
    async storeInfo() {
      const res = await storeInfoApi()
      this.superData = res
      for(let i=0;i<this.superData.length;i++){
        if(this.superData[i].site==='淘宝'){
          i++
        }else{
          this.superData.splice(i,1)
          i--
        }
      }
      // console.log('superData1',this.superData);
      for (let i = 0; i < this.superData.length; i++){
        // console.log('i',i);
        for (let j = i + 1; j < this.superData.length; j++){
          // console.log('j',j);
          if (this.superData[i].response.seller.shopId&&(this.superData[i].response.seller.shopId === this.superData[j].response.seller.shopId)) {
            this.superData.splice(j,1)
            j--
          }
        }
      }
      // this.infoshow = []
      // for (let i = 0; i < this.superData.length; i++){
      //   let obj = { value: false }
      //   this.infoshow.push(obj)
      // }
    },
    //获取关键词
     async getinfo() {
       const res = await getInfoApi({ userId: store.getters.id })
       res.forEach(item => {
         this.options.push(item.keyword)
         this.keywordPrice.push({word:item.keyword,lowestPrice:item.lowestPrice})
       })
      for (let i = 0; i < this.options.length; i++){
         if (i > 0) {
           this.keywordAll.push(this.options[i])
         }
       }
       await this.$store.commit('saveKeywordAll', this.keywordAll.join(','))
       this.$store.commit('savekeywordPrice',this.keywordPrice)
       this.onshow=true
     },
    //选择展示的折线图
    async changeLinetu() {
      if (this.value1.length>0) {
        this.lineData=this.value1.toString()
        const res2 = await lineDataApi({numIids:this.lineData})
          this.linePricedata = res2
          this.lineprice()
      }
    },
    //折线图下拉框空时
    changevalue() {
      if (this.value1.length === 0) {
        this.getlineData()
      }
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
      this.lineData=[]
      const res=await linetuApi({keywordAll:store.getters.keywordAll})
      this.options1 = res
      this.options1.forEach((item) => {
        this.lineData.push(item.numIid)  //传入numIid
      })
      this.lineData = this.lineData.toString()
      if (this.lineData) {
        const res2 = await lineDataApi({numIids:this.lineData})
        this.linePricedata = res2
        this.lineprice()
      }
      this.Productshow()
      // console.log('this.linePricedata',this.linePricedata);
    },
    //折线图数据处理
    lineprice() {
      this.series=[]
      let newlinePrice = []
      this.linePricedata.forEach((item) => {
        let isExists = newlinePrice.some((newItem) => {
          if (item.searchDate.slice(0, 3).join() === newItem.searchDate.slice(0, 3).join()) {
            return true
          } else {
            return false
          }
        })
        if (!isExists) {
          newlinePrice.push({
            searchDate: item.searchDate.slice(0,3),
            data: []
          })
        }
      })  
         if (newlinePrice.length > 0) {
           for(let n=0;n<newlinePrice.length;n++){
             let arr3=newlinePrice[n].searchDate
             for(let k=0;k<this.linePricedata.length;k++){
               let arr4=this.linePricedata[k].searchDate
               let obj2={
               numIid:this.linePricedata[k].numIid,
               response:this.linePricedata[k].response,
               site:this.linePricedata[k].site
               }
               if(arr3[0]===arr4[0]&&arr3[1]===arr4[1]&&arr3[2]===arr4[2]){
                 newlinePrice[n].data.push(obj2)
              }
             }
           }
       }
      let t
      for (let ja = 0; ja < newlinePrice.length; ja++){
        for (let jb = ja + 1; jb < newlinePrice.length; jb++){
          if (newlinePrice[ja].searchDate[2] >= newlinePrice[jb].searchDate[2]) {
               if (newlinePrice[ja].searchDate[1] >= newlinePrice[jb].searchDate[1]) {
                 if (newlinePrice[ja].searchDate[0] >=newlinePrice[jb].searchDate[0]) {
                   t =newlinePrice[ja]
                   newlinePrice[ja] = newlinePrice[jb]
                   newlinePrice[jb]=t
                 }
               }
               }
         }
      }
      newlinePrice=newlinePrice.slice(-7)
       let itemsava = []
       this.xdata = []
        for (let a = 0; a < newlinePrice.length; a++){
          this.xdata.push(newlinePrice[a].searchDate.slice(1, 3).join('/'))
       }
      this.xdata=this.xdata.slice(-7)
      let shijian
       let ab=0
       // console.log('xdata', this.xdata);
         for (let i2 = 0; i2 < newlinePrice.length; i2++){
           for (let i4 = 0; i4 < newlinePrice[i2].data.length; i4++){
         let arr=Array(this.xdata.length).fill(NaN)
          for (let i1 = 0; i1 < this.xdata.length; i1++) {
            if (this.xdata[i1] === newlinePrice[i2].searchDate.slice(1, 3).join('/')) {
             shijian=i1
            }
             }
             let avag = 0
             newlinePrice[i2].data[i4].response.items.forEach(item => {
              //每个sku都添加进去
              // let sindex --numIid+sku_id
              //  let flag = itemsava.some((newitem,index) => {
              //    if (item.sku_id == newitem.sku_id) {
              //     sindex=index
              //    return true
              //    } else {
              //    return false
              //  }
              //  })
              //  if (!flag) {
              //    itemsava[ab] = { data: arr, sku_id: item.sku_id,numIid:newlinePrice[i2].data[i4].numIid }
              //    itemsava[ab].data[shijian]=Number(item.sku_price)
              //    ab++
              //  } else {
              //   itemsava[sindex].data[shijian]=Number(item.sku_price)
              //  }


               //只计算spu---numIid
               
              avag+=Number(item.sku_price)
             })
             let sindex
             avag =(avag/ newlinePrice[i2].data[i4].response.items.length).toFixed(2)
             let flag = itemsava.some((item,index) => {
                if ( newlinePrice[i2].data[i4].numIid== item.numIid) {
                 sindex=index
                return true
                } else {
                return false
              }
              })
              if (!flag) {
                itemsava[ab] = { data: arr,numIid:newlinePrice[i2].data[i4].numIid }
                itemsava[ab].data[shijian]=Number(avag)
                ab++
              } else {
               itemsava[sindex].data[shijian]=Number(avag)
              }
         }
       }
      for (let n = 0; n < itemsava.length; n++){
        for (let m = 1; m < itemsava[n].data.length; m++){
           if (itemsava[n].data[m - 1] && !(itemsava[n].data[m])) {
             itemsava[n].data[m]=itemsava[n].data[m-1]
           }
        }
      }
      //    for (let n = 0; n < itemsava.length; n++){
      //      for (let m = n + 1; m < itemsava.length; m++){
      //        if (itemsava[n].numIid === itemsava[m].numIid) {
      //          itemsava[n].avag.push(itemsava[m].avag[0])
      //          itemsava.splice(m, 1)
      //          m--
      //        }
      //      }
      //    }
          // console.log('itemsava',itemsava);
        for (let x = 0; x < this.options1.length; x++){
          for (let y = 0; y < itemsava.length; y++){
            if (itemsava[y].numIid === this.options1[x].numIid) {
              let obj = {
                name: this.options1[x].title,
                data: itemsava[y].data,
                type:'line'
              }
              this.series[y]=obj
            }
           }
       }
        this.chartZhuzhuangtu()
      
    },
    //接收地图组件传回来的低价商品数量
    lowProductfn(e) {
        if(this.price==''){
          this.lowProduct = e.lowProduct
        }else{
          this.lowProduct=e
        }
    },
    allProductfn(e) {
      this.allproduct=e.allProduct
    },
    //回显最低价到页面
    lowerpricefn(e) {
      this.price=e.lowerprice
    },
    //低价商品搜索平台数据
    async changelowSite() {
      clearTimeout(this.Timer)
         this.Timer = setTimeout(async() => {
           this.site = this.searchValue
           const res =await lowerGoodsApi({site:this.site,keywordAll:store.getters.keywordAll})
          if (res.data.length>0) {
            this.lowerlist = res.data
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
      const res =await lowerGoodsApi({site:this.site,keywordAll:store.getters.keywordAll})
      if (res.length>0) {
        this.lowerlist = res
        this.nodate=false
      } else {
        this.nodate=true
      }
    },
    //监控链接详情
    async getlink() {
      const res = await linkDetailApi({keywordAll:store.getters.keywordAll})
      this.linkList = res
    },
    //关闭侧边栏弹窗
    handleClose(done) {
      done()
    },

    //设置最低价、选择关键词
    changePrice() {
      this.lowerPrice = this.price
      this.$refs.map.mapkeyword=this.mapkeyword
    },

    //折线图
    chartZhuzhuangtu() {
      let myChart = echarts.init(document.querySelector('.linetu'));
      myChart.clear()
      let option;
      option = {
        animationDuration: 7000,
        tooltip: {
          // trigger: 'axis',
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
          top:'0%',
          left:'2%',
          textStyle: {
            color: '#fff',
            fontSize:'10'
          },
          itemGap: 0,
          formatter: function (name) {
            return name.length > 42 ? name.substr(0, 42) + '...' : name;
          },
          tooltip: {
            show: true,
            trigger:'item'
          }
        },
        grid: {
          // top:'30%',
          left: '3%',
          right: '6%',
          bottom: '1%',
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
          data:this.xdata
        },
        yAxis: {
          type: 'value'
        },
        series: this.series
      }

      option && myChart.setOption(option);

      if (this.series.length <= 5) {
        myChart.setOption({legend:{show:true}})
        myChart.setOption({grid:{top:'35%'}})
      } else {
        myChart.setOption({ legend: { show: false } })
        myChart.setOption({grid:{top:'10%'}})
      }
      // myChart.on('click', { seriesType: 'line' }, function (params) {
      //   console.log('折线图点击',params);
      // })
    },

    //图片路径错误时换成指定图片
    handleImageError(e) {
      e.srcElement.src = require("@/assets/imgerro.jpg");
    },
  },
  // async beforeRouteLeave(to,from,next) {
  //    this.id = String(store.getters.id)
  //     this.lowPrice=Number(this.price)
  //      await updataPriceApi({
  //        userId: this.id,
  //        lowPrice:this.lowPrice
  //      })
  //   next()
  // }
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
  // top: 0;
  // left: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  .header {
    width: 927px;
    background-repeat: no-repeat;
    height: 128px;
    background-image: url(@/assets/maptitle.png);
    background-size: cover;
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
      // position: relative;
      margin-top: 10px;
      padding-left: 135px;
      width: 614px;
      height: 686px;
      background-image: url(@/assets/leftbgi.png);
      background-size: cover;
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
          .nodata{
            color: #ccc;
            margin-left: 140px;
            margin-top: 110px;
          }
          .bingtu{
            padding: 10px;
            .showGoods{
              height:245px;
              width:400px;
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
                width: 395px;
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
                  width: 275px;
                  height: 100px;
                  margin-left: 10px;
                  p{
                    margin: 2px  !important;
                    font-size: 12px;
                    color: #dad4d4;
                    padding-top: 5px;
                    // white-space: nowrap;
                    // text-overflow: ellipsis;
                    // overflow: hidden;
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
                  .priceinfo{
                    width: 275px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    span{
                      color: #dad4d4;
                    }
                  }
                }
              }

            }
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
        position: relative;
        width: 762px;
        height: 768px;
        background-image: url(@/assets/middlebgi.png);
        .allnum{
          position: absolute;
          bottom:  139px;
          right: 60px;
          width: 100px;
          text-align: center;
          color: #fff;
          p{
            font-size: 36px;
            color: yellow;
            margin-top: 30px;
          }
        }
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
      width: 582px;
      height: 671px;
      background-image: url(@/assets/rightbgi.png);
      background-size: cover;
      background-position: right;
      .saleAvager{
          width: 500px;
          height: 327px;
          // height: 480px;
          // margin-bottom: 30px;
          position: relative;
          .site{
            position: absolute;
            display: flex;
            top: -42px;
            left: -33px;
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
            .inputbox{
              width: 180px;
              position: relative;
              margin-left: 10px;
              img{
                width: 20px;
                height: 20px;
                position: absolute;
                top: 6px;
                right: 0px;
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
          }
          .circleTitle{
            padding-top: 35px;
            padding-left: 80px;
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
          }
        }
    }
  }
}
::v-deep .el-select-dropdown__list{
  padding: 6px 15px;
}

</style>