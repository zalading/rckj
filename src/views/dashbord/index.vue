<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <div class="header">
        <img src="../../assets/logo.png" alt="">
        <i class="el-icon-user" @click="openLogin"></i>
      <!-- <button @click="openLogin">Login</button> -->
    </div>
    <!-- 导航栏 -->
    <div class="nav" @mouseenter="enter" @mouseleave="leave">
      <ul>
        <li class="nav-item">关于苒辰</li>
        <li class="nav-item">事业中心</li>
        <li class="nav-item">技术实力</li>
        <li class="nav-item">服务场景</li>
        <li class="nav-item">新闻中心</li>
        <li class="nav-item">联系苒辰</li>
      </ul>
      <div class="navup" v-show="navopen">
        <div class="two">
        <p>企业介绍</p>
        <p>渠道中心</p>
        <p>技术分类</p>
        <p>服务场景</p>
        <p>新闻中心</p>
        <p>联系我们</p>
      </div>
      <div class="two">
        <p>企业介绍</p>
        <p>渠道中心</p>
        <p>技术分类</p>
        <p>服务场景</p>
        <p>新闻中心</p>
        <p>联系我们</p>
      </div>
      <div class="two">
        <p>企业介绍</p>
        <p>渠道中心</p>
        <p>技术分类</p>
        <p>服务场景</p>
        <p>新闻中心</p>
        <p>联系我们</p>
      </div>
      </div>
    </div>

    <div class="blank"></div>
    <!-- 图片展示 -->
    <div class="show">
      <div class="jieshao">
        <div class="conpany">
          <h4>公司介绍</h4>
          <p>公司于2018年06月15日成立</p>
          <p>经营范围:</p>
          <p>技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；
            版权代理；社会经济咨询服务；品牌管理；信息咨询服务（不含许可类信息咨询服务）；
            商标代理；市场营销策划；咨询策划服务；科技中介服务；网络技术服务；软件开发；
            专业设计服务；平面设计；计算机系统服务；信息系统集成服务；知识产权服务（专利代理服务除外）；</p>
        </div>
      </div>
      <img src="../../assets/banner2.webp" alt="">
      <img src="../../assets/banner3.webp" alt="">
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel :interval="4000"  height="200px">
        <el-carousel-item v-for="(item,index) in bannerImg" :key="index">
          <img :src="items" v-for="items in item" :key="items" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <!-- 底部版权 -->
    <div class="bottem">
      <div class="one">
        <h3>关于苒辰</h3>
        <h3>事业中心</h3>
        <h3>技术实力</h3>
        <h3>服务场景</h3>
        <h3>新闻中心</h3>
        <h3>联系苒辰</h3>
      </div>
      <div class="two">
        <p>企业介绍</p>
        <p>渠道中心</p>
        <p>技术分类</p>
        <p>服务场景</p>
        <p>新闻中心</p>
        <p>联系我们</p>
      </div>
      <div class="two">
        <p>企业介绍</p>
        <p>渠道中心</p>
        <p>技术分类</p>
        <p>服务场景</p>
        <p>新闻中心</p>
        <p>联系我们</p>
      </div>
      <div class="two">
        <p>企业介绍</p>
        <p>渠道中心</p>
        <p>技术分类</p>
        <p>服务场景</p>
        <p>新闻中心</p>
        <p>联系我们</p>
      </div>
      <div class="line" />
      <div class="callus">
        <div class="number">
          <i class="el-icon-phone"></i>
          <p>053-87654321</p>
        </div>
        <div class="number">
          <i class="el-icon-location"></i>
          <p>杭州运河万科中心B2幢8楼801</p>
        </div>
        <div class="number">
          <i class="el-icon-message"></i>
          <p>ranchenkeji@hanzghou.com</p>
        </div>
      </div>
      <div class="botText"> <span style="margin-right: 32px;color: #666;"> 备案号：浙ICP备XXXXXXXX号</span> Copyright @
          2023.
          All rights reserved.苒辰科技 版权所有.
    </div>
    </div>

    <!-- 登录弹窗 -->
    <el-dialog
      center
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="deliagClose">
  <div class="heder">
    <div class="contact">
      <i class="el-icon-phone"></i>
      <p>苒辰科技咨询热线</p>
    </div>
    <h2>XXXX-XXXXXXXX</h2>
  </div>
  <div class="phone">
    <p>您也可以留下您的电话号码，我们会最快时间联系您</p>
    <input type="phone" placeholder="请输入您的电话号码"><button>提交</button>
    <div class="protect">
      <i class="el-icon-lock"></i><span>信息保护中请放心填写</span>
    </div>
  </div>
</el-dialog>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
      return {
        dialogVisible: false,
        navopen:false,
        //轮播图本地图片
        // bannerImg:[
        //   require( '@/assets/banner1.webp'),
        //   require( '@/assets/banner2.webp'),
        //   require( '@/assets/banner3.webp'),
        //   require( '@/assets/banner4.webp'),
        //   require( '@/assets/banner5.webp'),
        //   require( '@/assets/banner6.webp'),
        //   require( '@/assets/banner7.webp'),
        //   require( '@/assets/banner8.webp'),
        // ],
        bannerImg: [
          [
          require('@/assets/banner1.webp'),
          require('@/assets/banner2.webp'),
          require('@/assets/banner3.webp'),
          require('@/assets/banner4.webp')
          ],
          [
          require('@/assets/banner5.webp'),
          require('@/assets/banner6.webp'),
          require('@/assets/banner7.webp'),
          require('@/assets/banner8.webp')
       ]],
        formData: {
          phone: '',
          password:''
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern:/^[1][3,4,5,7,8,9][0-9]{9}$/, message:'请输入正确的手机号',trigger:'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
  },
  mounted() {
    setTimeout(() => {
      this.dialogVisible=true
    },10000)
    },
    methods: {
      deliagClose() {
       this.dialogVisible=false
      },
      openLogin() {
        this.$router.push('/login')
        // this.dialogVisible=true
      },
      login() {
        if (this.formData.password.length>=6) {
          this.$message('登录成功')
          this.dialogVisible=false
        } else {
          this.$message('手机号或密码不正确，请重新输入')
        }
      },
      //导航栏下面的显示和隐藏
      enter() {
       this.navopen=true
      },
      leave() {
        this.navopen=false
      },
  },
  
}
</script>

<style  scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app{
  width: 100%;
  height: 100%;
  .header{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
  width: 100%;
  height: 65px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  img{
    margin-top: 5px;
    width: 105px;
    height: 60px;
  }
  i{
    height: 65px;
    line-height: 65px;
    font-size: 24px;
  }
  button{
    height: 30px;
    width: 80px;
    line-height: 27px;
    font-size: 24px;
    font-family: fangsong;
    margin-top: 10px;
    background-color: transparent;
    border: none;
    color: #cecece;
  }
}
.nav{
  position: fixed;
  left: 0;
  top: 65px;
  width: 100%;
  height: 57px;
  background-color: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  ul{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  }
  .nav-item{
    padding: 0 20px 20px 20px;
    // padding-bottom: 20px;
    margin-right: 30px;
    border-bottom: 2px solid transparent;
    list-style: none;
    font-size: 26px;
    font-weight: bolder;
    &:hover{
      border-color: rgb(87, 194, 244);
    }
  }
  &::last-child{
    margin-right: 0;
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
.blank{
  height: 160px;
  background-color: #f5f6f7;
}
.show{
  margin-bottom: 20px;
  .jieshao{
    width: 100%;
    height: 1000px;
    background-image: url('@/assets/banner6.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
    .conpany{
      width: 500px;
      height: 400px;
      margin-left: 1100px;
      padding-top: 100px;
      h4{
        font-size: 26px;
        color: #7fcceb;
        margin-bottom: 10px;
      }
      p{
        font-size: 22px;
        margin-bottom: 5px;
        color: #5b8cb7;
      }
    }
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.banner{
  margin-bottom: 20px;
  .el-carousel__item  {
    width: 100%;
    height: 100%;
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    img{
      width: 24%;
      height: 100%;
      margin-right: 15px;
      &::last-child{
        margin-right: 0;
      }
    }
  }
  
}
.bottem{
  position: relative;
  width: 100%;
  height: 450px;
  background-color: black;
  color: #fff;
  padding: 50px 300px;
  .one{
    display: flex;
    // justify-content: center;
    h3{
      width: 140px;
      margin-bottom: 20px;
    }
  }
  .two{
    display: flex;
    // justify-content: center;
    p{
      width: 140px;
      margin-bottom: 15px;
    }
  }
  .line{
    width: 100%;
    height: 30px;
    margin-bottom: 30px;
    border-bottom: 1px dashed #fff;
  }
  .callus{
    .number{
      display: flex;
      margin-bottom: 10px;
      i{
        font-size: 24px;
        margin-right: 15px;
      }
    }
  }
  .botText {
    position: absolute;
    bottom: 30px;
    left: 100px;
    font-size: 12px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    bottom: 24px;
    left: 0;
    right: 0;
    z-index: 77;
  }
}
.el-input{
  width: 90%;
}
::v-deep .el-dialog--center .el-dialog__body{
  padding: 0;
  .heder{
    padding: 0 30px;
    .contact{
      display: flex;
      align-items: center;
      i{
        margin-right: 5px;
      }
    }
    h2{
      font-size: 30px;
      color: #3f95d2;
    }
  }
  .phone{
    background-color: #f3f4f6;
    padding: 20px 30px;
    p{
      color: #666666;
      padding: 10px 0;
    }
    input{
      width: 270px;
      height: 40px;
      border: none;
      padding-left: 10px;
    }
    button{
      width: 70px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #3f95d2;
      color: #fff;
      border: none;
    }
    .protect{
      margin-top: 10px;
      i.el-icon-lock{
        color: #4ec649;
        margin-right: 5px;
      }
      span{
        color: #666;
      }
    }
  }
}
}

</style>
