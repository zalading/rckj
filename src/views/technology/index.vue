<template>
  <div class="content">
    <div class="one">
      <div class="header">
        <div><img src="../../assets/shouye/logo.png" alt="" class="logo"></div>
        <!-- 导航栏 -->
        <div class="nav">
          <ul>
            <li class="nav-item" @click="godashbord">首页</li>
            <li class="nav-item" @click="ggobusiness">事业中心</li>
            <li class="nav-item active">技术实力</li>
            <li class="nav-item" @click="goabout">关于苒辰</li>
            <li class="nav-item" @click="gonews">新闻中心</li>
            <li class="nav-item" @click="gorelate">联系苒辰</li>
          </ul>
        </div>
        <img src="@/assets/shouye/loginicon.png" alt="" @click="openLogin" class="loginicon">
      </div>
      <img src="@/assets/shouye/technologyimg.png" alt="" class="image">
    </div>
    <div class="two">
      <h3>我们的技术</h3>
      <div class="blueline"></div>
      <img src="@/assets/shouye/ourstechnology.png" alt="">
    </div>
    <div class="three">
      <h3>我们的实力</h3>
      <div class="blueline"></div>
      <div class="text">
        <p>我们主要服务于：</p>
        <p>淘宝，京东，美的，五粮液，酒鬼酒，</p>
        <p>华熙生物，海尔等多家品牌</p>
      </div>
      <div class="picture">
        <img src="@/assets/shouye/wuuliangye.png" alt="" class="img1">
        <img src="@/assets/shouye/taobao.png" alt="" class="img2">
        <img src="@/assets/shouye/haier.png" alt="" class="img2">
        <img src="@/assets/shouye/midea.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechnologyIndex',
  data() {
    return {

    }
  },
  methods: {
    godashbord() {
      this.$router.push('/dashbord')
    },
    ggobusiness() {
        this.$router.push('/business')
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
        this.$router.push('/login').catch(()=>{this.drawer=false})
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
    margin-left: 80px;
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
  img{
    margin-top: 193px;
    margin-left: 313px;
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
  .text{
    margin-top: 129px;
    margin-left: 266px;
    margin-bottom: 71px;
    p{
      font-size: 48px;
      color: #fff;
    }
  }
  .picture{
    width: 1327px;
    height: 331px;
    background-color: rgb(191,203,217);
    border-radius: 84px;
    margin-left: 405px;
    margin-top: 71px;
    display: flex;
    align-items: center;
    .img1{
      margin-right: 80px;
      margin-left: 74px;
    }
    .img2{
      margin-right: 63px;
    }
  }
}
</style>