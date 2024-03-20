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
            <li class="nav-item" @click="goabout">关于苒辰</li>
            <li class="nav-item active">新闻中心</li>
            <li class="nav-item" @click="gorelate">联系苒辰</li>
          </ul>
        </div>
        <img src="@/assets/shouye/loginicon.png" alt="" @click="openLogin" class="loginicon">
      </div>
      <img src="@/assets/shouye/newsimg.png" alt="">
    </div>
    <div class="two">
      <h3>新闻中心：</h3>
      <div class="newsbox">
        <img src="@/assets/shouye/newsright.png" alt="">
      </div>
      <div class="newsbox">
        <img src="@/assets/shouye/newsright.png" alt="">
      </div>
      <div class="newsbox">
        <img src="@/assets/shouye/newsright.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsIndex',
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
    gotechnology() {
      this.$router.push('/technology')
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
    font-weight: 400;
    padding-top: 135px;
    margin-left: 200px;
  }
  .newsbox{
    position: relative;
    width: 1527px;
    height: 227px;
    background-color: rgba(204, 204, 204, 1);
    margin-top: 40px;
    margin-left: 200px;
    img{
      position: absolute;
      width: 37px;
      height: 19px;
      right: 47px;
      bottom: 13px;
    }
  }
  
}
</style>