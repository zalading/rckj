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
            <li class="nav-item" @click="gonews">新闻中心</li>
            <li class="nav-item active">联系苒辰</li>
          </ul>
        </div>
        <img src="@/assets/shouye/loginicon.png" alt="" @click="openLogin" class="loginicon">
      </div>
      <div class="ours">
        <div class="left">
          <div class="callus">
            <div class="number">
              <img src="@/assets/shouye/relatephone.png" alt="">
              <p>联系电话：15372004152</p>
            </div>
            <div class="number">
              <img src="@/assets/shouye/email.png" alt="">
              <p>联系邮箱：ranchenkeji@hanzghou.com</p>
            </div>
            <div class="number">
              <img src="@/assets/shouye/address.png" alt="">
              <p>联系地址：杭州运河万科中心B2幢8楼801</p>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="navbottom">
            <h4>首页</h4>
            <p>我们的优势</p>
            <p>服务范围</p>
            <p>案例合作</p>
          </div>
          <div class="navline"></div>
          <div class="navbottom">
            <h4>事业中心</h4>
            <p>负责板块</p>
            <p>内容营销</p>
          </div>
          <div class="navline"></div>
          <div class="navbottom">
            <h4>技术与实力</h4>
            <p>我们的技术</p>
            <p>我们的实力</p>
          </div>
          <div class="navline"></div>
          <div class="navbottom">
            <h4>新闻中心</h4>
          </div>
        </div>
      </div>
       <!-- 底部版权 -->
      <div class="footer">
        <div class="botText"> <span style="margin-right: 32px;"> 备案号：浙ICP备2024070257号</span> Copyright @
            2024. All rights reserved.苒辰科技 版权所有
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelateIndex',
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
    gonews() {
      this.$router.push('/news')
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
  .ours{
    display: flex;
    margin-top: 113px;
    padding: 0 111px;
    .left{
      .callus{
        color: #fff;
        .number{
          display: flex;
          margin-bottom: 10px;
          font-size: 36px;
          img{
            margin-right: 35px;
          }
        }
      }
    }
    .right{
      display: flex;
      padding-left: 160px;
      padding-top: 130px;
      .navbottom{
        width: 176px;
        color: #fff;
        text-align: center;
        h4{
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 37px;
        }
        p{
          font-size: 18px;
          margin-bottom: 53px;
        }
      }
      .navline{
        width: 1px;
        height: 238px;
        background-color: rgba(201, 201, 201, 1);
        margin-top: 20px;
      }
    }
  }
  .footer{
    color: #fff;
    font-size: 24px;
    margin-left: 499px;
    margin-top: 210px;
  }
}
</style>