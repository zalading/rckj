<template>
  <div class="conten">
    <div class="one">
      <div class="header">
        <div><img src="../../assets/shouye/logo.png" alt="" class="logo"></div>
        <!-- 导航栏 -->
        <div class="nav">
          <ul>
            <li class="nav-item" @click="godashbord">首页</li>
            <li class="nav-item active">事业中心</li>
            <li class="nav-item" @click="gotechnology">技术实力</li>
            <li class="nav-item" @click="goabout">关于苒辰</li>
            <li class="nav-item" @click="gonews">新闻中心</li>
            <li class="nav-item" @click="gorelate">联系苒辰</li>
          </ul>
        </div>
        <img src="@/assets/shouye/loginicon.png" alt="" @click="openLogin" class="loginicon">
      </div>
      <img src="@/assets/shouye/businessimg.png" alt="" class="image">
    </div>
    <div class="two">
      <h3>负责的板块</h3>
      <div class="blueline"></div>
      <ul>
        <li>
          <img src="@/assets/shouye/business-1.png" alt="">
          <p>控价打假</p>
        </li>
        <li>
          <img src="@/assets/shouye/business-2.png" alt="">
          <p>假货防货</p>
        </li>
        <li>
          <img src="@/assets/shouye/business-3.png" alt="">
          <p>品牌入驻</p>
        </li>
        <li>
          <img src="@/assets/shouye/business-4.png" alt="">
          <p>内容营销</p>
        </li>
        <li>
          <img src="@/assets/shouye/business-5.png" alt="">
          <p>电商数据</p>
        </li>
        <li>
          <img src="@/assets/shouye/business-6.png" alt="">
          <p>品牌维护</p>
        </li>
        <li>
          <img src="@/assets/shouye/business-7.png" alt="">
          <p>渠道管理</p>
        </li>
        <li>
          <img src="@/assets/shouye/business-8.png" alt="">
          <p>知识产权侵权</p>
        </li>
      </ul>
    </div>
    <div class="three">
      <h3>负责的板块</h3>
      <div class="blueline"></div>
      <ul>
        <li>
          <img src="@/assets/shouye/bankuai1.png" alt="">
          <h4>图文类</h4>
          <p>种草类图文</p>
          <p>测评类图文</p>
          <p>教程类图文</p>
          <p>指南类图文等...</p>
        </li>
        <li>
          <img src="@/assets/shouye/bankuai2.png" alt="">
          <h4>视频类</h4>
          <p>测评类图文</p>
          <p>分享类图文</p>
          <p>教程类图文</p>
          <p>故事性短视频等...</p>
        </li>
        <li>
          <img src="@/assets/shouye/bankuai3.png" alt="">
          <h4>直播类</h4>
          <p>产品介绍类直播</p>
          <p>教程类直播</p>
          <p>用品推荐类直播</p>
          <p>试穿/试用类直播等...</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessIndex',
  data() {
    return {

    }
  },
  methods: {
    godashbord() {
      this.$router.push('/dashbord')
    },
    gotechnology() {
        this.$router.push('/technology')
      },
      goabout() {
        this.$router.push('/about')
      },
      gonews() {
        this.$router.push('/news')
      },
      gorelate() {
        this.$router.push('/relate')
      },
    openLogin() {
        this.$router.push('/login')
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
.one{
  width: 100%;
  height: 1080px;
  background-image: url(@/assets/shouye/shouyebgi.png);
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .logo{
      margin-top: 24px;
      margin-left: 50px;
      width: 191px;
      height: 191px;
    }
    .nav{
      width: 1370px;
      height: 57px;
      ul{
        display: flex;
        margin-top: 70px;
        border-bottom: 1px solid rgba(194, 194, 194, 1);
        padding:0 77px;
      }
      .nav-item{
        font-size: 36px;
        font-weight: 400;
        color: #fff;
        margin-right: 128px;
        padding-bottom: 7px;
        border-bottom: 5px solid transparent;
        list-style: none;
        font-size: 26px;
        font-weight: bolder;
        &:last-child{
          margin-right: 0;
        }
      }
      .active{
        border-color: rgba(255, 141, 26, 1);
      }
      .navup{
        width: 100%;
        height: 150px;
        position: fixed;
        top: 117px;
        left: 0;
        background-color: rgba(255, 255, 255, 0.7);
        padding-top: 15px;
      .two{
          display: flex;
          justify-content: center;
          p{
            width: 144px;
            text-align: center;
            padding: 0 20px;
            margin-right: 30px;
            margin-bottom: 15px;
          }
        }
      }
    }
    .loginicon{
      width: 52px;
      height: 49px;
      margin-top: 70px;
      margin-right: 25px;
    }
  }
  .image{
    margin-top: 6vh;
    margin-left: 40px;
  }
}
.two{
  width: 100%;
  height: 1080px;
  background-image: url(@/assets/shouye/twobgi.png);
  h3{
    font-size: 48px;
    font-weight: normal;
    padding-top: 71px;
    text-align: center;
    margin-bottom: 13px;
  }
  .blueline{
    margin: auto;
    width: 93px;
    height: 5px;
    background-color: rgba(31, 108, 196, 1);
  }
  ul{
    display: flex;
    margin-left: 185px;
    margin-right: 160px;
    margin-top: 90px;
    flex-wrap: wrap;
    li{
      width: 290px;
      height: 274px;
      margin-right: 127px;
      list-style: none;
      margin-bottom: 108px;
      img{
        width: 290px;
        height: 209px;
        display: block;
      }
      p{
        height: 81px;
        line-height: 81px;
        text-align: center;
        background-color:rgba(204, 204, 204, 1);
;
      }
      &:nth-child(4n){
        margin-right: 0;
      }
    }
  }
}
.three{
  background-image: url(@/assets/shouye/threebgi.png);
  width: 100%;
  height: 1080px;
  h3{
    font-size: 48px;
    font-weight: normal;
    padding-top: 71px;
    text-align: center;
    margin-bottom: 13px;
    color: #fff;
  }
  .blueline{
    margin: auto;
    width: 93px;
    height: 5px;
    background-color: #fff;
  }
  ul{
    display: flex;
    margin-top: 155px;
    margin-left: 280px;
    li{
      list-style: none;
      height: 435px;
      width: 287px;
      text-align: center;
      color: #fff;
      margin-right: 260px;
      &:last-child{
        margin-right: 0;
      }
      img{
        width: 136px;
        height: 136px;
      }
      h4{
        font-size: 31px;
        font-weight: 400; 
        margin-top: 11px;
        margin-bottom: 47px;
      }
      p{
        font-size: 31px;
        font-weight: 400;
        color: rgba(204, 200, 200, 1);
      }
    }
  }
}
</style>