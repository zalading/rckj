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
            <li class="nav-item" @click="gotechnology">技术实力</li>
            <li class="nav-item active">关于苒辰</li>
            <li class="nav-item" @click="gonews">新闻中心</li>
            <li class="nav-item" @click="gorelate">联系苒辰</li>
          </ul>
        </div>
        <img src="@/assets/shouye/loginicon.png" alt="" @click="openLogin" class="loginicon">
      </div>
      <img src="@/assets/shouye/aboutimg.png" alt="">
    </div>
    <div class="two">
      <h3>公司介绍</h3>
      <div class="blueline"></div>
      <div class="company">
        <div class="left">
          <h4>苒辰科技有限公司</h4>
          <p>成立于2018年，是一家专注于品牌服务的企业，创始团队成员均是深耕于品牌企业客户服务多年的资深专家，主营业务
            涵盖了品牌维护，电商大数据和品牌内容营销，品牌一体化解决方案提供商，多服务于头部品牌企业客户，长年累计多家
            品牌企业。</p>
        </div>
        <div class="right">
          <img src="@/assets/shouye/aboutlogo.png" alt="">
        </div>
      </div>
    </div>
    <div class="three">
      <h3>公司愿景</h3>
      <div class="blueline"></div>
      <div class="footer1">
        <div class="box1">愿景</div>
        <p>为我们的客户提供口碑相传的服务</p>
      </div>
      <div class="footer2">
        <div class="box2">使命</div>
        <p>为品牌企业提供优质的产品和服务</p>
      </div>
      <div class="footer3">
        <div class="box3">价值观</div>
        <p>以客户利益出发，以结果为导向</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutIndex',
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
      gotechnology() {
        this.$router.push('/technology')
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
      margin-top: 54px;
      margin-left: 50px;
      width: 191px;
      height: 191px;
    }
    .nav{
      width: 1370px;
      height: 57px;
      ul{
        display: flex;
        margin-top: 53px;
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
      margin-top: 54px;
      margin-right: 25px;
    }
  }
  img{
    margin-top: 5vh;
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
  .company{
    display: flex;
    .left{
      margin-top: 108px;
      margin-left: 152px;
      h4{
        width: 434px;
        height: 104px;
        line-height: 104px;
        font-size: 48px;
        font-weight: 400;     
        text-align: center;
        background-color:  rgba(13, 55, 107, 1);
        color: #fff;
      }
      p{
        font-size: 43px;
        font-weight: 400;
        margin-top: 39px;
        margin-left: 134px;
        width: 698px;
      }
    }
    .right{
      margin-left: 164px;
      margin-top: 160px;
      img{
        width: 630px;
        height: 540px;
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
  .footer1{
    display: flex;
    align-items: center;
    margin-top: 96px;
    color: #fff;
    .box1{
      width: 154px;
      height: 154px;
      line-height: 154px;
      text-align: center;
      border-radius: 77px;
      background-color: rgba(121, 166, 217, 1);
      margin-right: 49px;
      margin-left: 494px;
      font-size: 48px;
    }
    p{
      font-size: 48px;
      font-weight: 400; 
    }
  }
  .footer2{
    display: flex;
    align-items: center;
    margin-top: 6px;
    color: #fff;
    .box2{
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      border-radius: 60px;
      background-color:  rgba(224, 128, 150, 1);
      margin-right: 49px;
      margin-left: 367px;
      font-size: 48px;
    }
    p{
      font-size: 48px;
      font-weight: 400; 
    }
  }
  .footer3{
    display: flex;
    align-items: center;
    margin-top: 36px;
    color: #fff;
    .box3{
      width: 182px;
      height: 182px;
      line-height: 182px;
      text-align: center;
      border-radius: 91px;
      background-color:   rgba(0, 186, 173, 1);
      margin-right: 49px;
      margin-left: 475px;
      font-size: 48px;
    }
    p{
      font-size: 48px;
      font-weight: 400; 
    }
  }
}
</style>