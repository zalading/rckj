<template>
  <div class="content">
    <sideNav />
    <div class="top">
      <div class="company">
      {{ companyName }}有限公司
    </div>
    <div class="search">
          选择关键词：
          <el-select v-model="params.keyword" placeholder="请选择关键词" @change="changeGoods">
              <el-option
                v-for="item in optionkeyword"
                :key="item"
                :label="item"
                :value="item" style="text-align: center;">
              </el-option>
            </el-select>
        </div>
    <div class="search">
        选择平台：
        <el-select v-model="params.site" placeholder="请选择平台" @change="changeGoods">
            <el-option
              v-for="item in optionsite"
              :key="item"
              :label="item"
              :value="item" style="text-align: center;">
            </el-option>
          </el-select>
      </div>
    </div>
    <div class="part">
      <div class="part1">
        <h3>链接总数量</h3>
        <div class="partbody">
          <div class="left">
            <div class="box">
              <p>链接总数</p>
            <p>{{this.allLinknum}}</p>
            </div>
            <div class="box">
              <p>暂无地区</p>
              <p>{{this.unlinknum}}</p>
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
              <p>1222</p>
            </div>
            <div class="box">
              <p>总低价卖家</p>
              <p>1222</p>
            </div>
            <div class="box">
              <p>占比</p>
              <p>22%</p>
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
        <h3>低价正价链接数量</h3>
        <div class="partbody">
          <div class="linknum" ref="lowNormal"></div>
          <div class="bottom">
            <div class="left">
            <p>总低价链接数</p>
            <p>222</p>
          </div>
          <div class="left">
            <p>总正价链接数</p>
            <p>890</p>
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
              <p>1222</p>
            </div>
            <div class="box2">
              <p>总低价销售额</p>
              <p>1222</p>
            </div>
            <div class="box2">
              <p>占比</p>
              <p>22%</p>
            </div>
          </div>
        </div>
      </div>
      <div class="part4">
        <h3>监控链接销售额</h3>
        <div class="link">
          <div class="link-title">
            <p>商品图片</p>
            <p>店铺名称</p>
            <p>价格</p>
            <p>销量</p>
            <p>总销售额</p>
          </div>
          <div class="link-body">
            <p>商品图片</p>
            <p>店铺名称</p>
            <p>价格</p>
            <p>销量</p>
            <p>总销售额</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { maplistApi } from '@/apis/map'
import store from '@/store'
export default {
  name: 'DataScreen',
    data() {
      return {
        companyName: store.getters.companyName,
        optionsite: ['全部', '淘宝', '京东', '拼多多'],
        optionkeyword:store.getters.keywordAll.split(','),
        params: {
          site: '',
          keyword:''
        },

        linknum: [], //链接数量
        allLinknum: 0,//链接总数量
        unlinknum:0 //未知地区
       }
  },
  created() {
    this.getlinknumApi()
    this.params.keyword=this.optionkeyword[0]
    
  },
  mounted() {
   
    this.getlowsale()
    this.getlowsamll()
    this.getlowNormal()
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
      const res = await maplistApi({ keywordAll: store.getters.keywordAll,isArea:'1'})
      this.linknum = []
      this.allLinknum=0
      res.forEach(item => {
        if (item.location == '暂无') {
          this.unlinknum=item.uniqueProductCount
        } else {
          this.linknum.push({ name: item.location, value: item.uniqueProductCount })
          this.allLinknum+=item.uniqueProductCount
          
        }
      })
      this.allLinknum+=this.unlinknum
      console.log('this.linknum', this.linknum);
      this.getlinknum()
    },
    //链接总数量
    getlinknum() {
      let myChart = this.echarts.init(this.$refs.linknum)
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
              // label: {
                // show: false,
              //   // position: 'center',
              //   // formatter:'{b}:{d}%'
              // },
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
      option && myChart.setOption(option);
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
              // label: {
                // show: false,
              //   // position: 'center',
              //   // formatter:'{b}:{d}%'
              // },
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
              data: [
                { value: 1048, name: 'Search' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union' },
                { value: 300, name: 'Video' }
              ]
            }
          ]
        };
      option && myChart.setOption(option);
    },
    //低价销售额占比
    getlowsamll() {
      let myChart = this.echarts.init(this.$refs.lowsmall)
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
              radius: ['0%', '85%'],
              // startAngle: 180,
              // endAngle: 360,
              avoidLabelOverlap: false,
              // label: {
                // show: false,
              //   // position: 'center',
              //   // formatter:'{b}:{d}%'
              // },
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
              data: [
                { value: 1048, name: 'Search' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union' },
                { value: 300, name: 'Video' }
              ]
            }
          ]
        };
      option && myChart.setOption(option);
    },
    //低价正价链接数量
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
              data: [
        { value: 1548, name: 'Search Engine' },
        { value: 775, name: 'Direct' },
        { value: 679, name: 'Marketing', selected: true }
      ]
    },
    {
      name: '低价链接数',
      type: 'pie',
      radius: ['70%', '100%'],
      labelLine: {
        length: 20
      },
      label: {
        formatter: '{b|{b}：}{c}',
        color:'#fff',
        // borderColor: '#8C8D8E',
        // borderWidth: 1,
        // borderRadius: 4,
        rich: {
          // a: {
          //   color: '#6E7079',
          //   lineHeight: 22,
          //   align: 'center'
          // },
          // hr: {
          //   borderColor: '#8C8D8E',
          //   width: '100%',
          //   borderWidth: 1,
          //   height: 0
          // },
          // b: {
          //   color: '#4C5058',
          //   fontSize: 14,
          //   fontWeight: 'bold',
          //   lineHeight: 33
          // },
          // per: {
          //   color: '#fff',
          //   backgroundColor: '#4C5058',
          //   padding: [3, 4],
          //   borderRadius: 4
          // }
        }
      },
      data: [
        { value: 1048, name: 'Baidu' },
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 251, name: 'Google' },
        { value: 234, name: 'Union Ads' },
        { value: 147, name: 'Bing' },
        { value: 135, name: 'Video Ads' },
        { value: 102, name: 'Others' }
      ]
    }
  ]
};
      option && myChart.setOption(option);
    }
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
  }
  .part{
    padding:0 20px;
    display: flex;
    color: #fff;
    margin-bottom: 20px;
    .part3{
      width: 650px;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 10px;
      h3{
        padding: 10px;
        text-align: center;
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
      h3{
        text-align: center;
        padding: 10px;
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
            padding: 10px 30px;
            p{
              text-align: center;
              height: 40px;
              font-size: 32px;
            }
          }
          .box2{
            padding: 10px 20px;
            p{
              text-align: center;
              height: 34px;
              font-size: 32px;
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
        .left{
          width: 170px;
          .box{
            margin-bottom: 20px;
            margin-left: 20px;
            p{
            text-align: center;
            height: 40px;
            font-size: 32px;
          }
          }
        }
        .linknum{
          width: 480px;
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
        padding: 10px;
        text-align: center;
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
    .part5{
      width: 600px;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-right: 30px;
      h3{
        padding: 10px;
        text-align: center;
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
            font-size: 32px;
          }
        }
        }
      }
    }
  }
}
</style>