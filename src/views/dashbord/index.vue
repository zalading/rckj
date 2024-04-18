<template>
  <div class="content">
    <div class="one">
    <div class="header">
        <div><img src="@/assets/shouye/logo.png" alt="" class="logo"></div>
        <!-- 导航栏 -->
        <div class="nav" @mouseenter="enter" @mouseleave="leave">
          <ul>
            <li class="nav-item active">首页</li>
            <li class="nav-item" @click="gobusiness">事业中心</li>
            <li class="nav-item" @click="gotechnology">技术实力</li>
            <li class="nav-item" @click="goabout">关于苒辰</li>
            <li class="nav-item" @click="gonews">新闻中心</li>
            <li class="nav-item" @click="gorelate">联系苒辰</li>
          </ul>
        </div>
        <!-- <img src="@/assets/shouye/loginicon.png" alt="" @click="openLogin" class="loginicon"> -->
        <img src="@/assets/shouye/loginicon.png"  @click="openLogin" class="loginicon">
    </div>
    <div class="ranchen">
      <!-- <div class="line"></div> -->
      <div><p>苒辰控价  &nbsp;专为品牌方处理低价乱价链接而生</p>
      <h4>因为专注，所以专业！</h4>
      </div>
      <!-- <div class="line"></div> -->
    </div>
    <div class="info">
      <!-- <div class="moreinfo">
        <span>了解更多</span>
        <img src="@/assets/shouye/single.png" alt="">
      </div> -->
      <div class="moreinfo" @click="goabout">
        <span class="infospan">了解苒辰</span>
        <img src="@/assets/shouye/single2.png" alt="">
      </div>
    </div>
    </div>
    <div class="two">
      <h3>我们的优势</h3>
      <div class="blueline"></div>
      <div class="number">
        <div class="numberitem">
          <p>6<i>年</i></p>
          <h4>技术经验</h4>
        </div>
        <div class="numberitem">
          <p>2000<span class="span1">+</span></p>
          <h4>服务客户</h4>
        </div>
        <div class="numberitem">
          <p>150<span class="span2">+</span></p>
          <h4>公司团队</h4>
        </div>
      </div>
      <div class="text">
        <h5>1.多个国内外合作品牌处理经验，沉淀6年的处理反馈流程和客户服务经验，迅速解决客户的问题并提出最优结局方案。</h5>
        <div class="line"></div>
        <p>2.全网多个处理品牌，全面覆盖主流电商渠道，保证您最全最优的解决方案。</p>
        <div class="line"></div>
        <p>3.全面服务模式,全程跟踪服务，数据分析，给您最省心的服务体验。</p>
      </div>
    </div>
    <div class="six">
      <h3>部分服务平台</h3>
      <div class="blueline"></div>
      <ul>
        <li><img src="@/assets/pinpai/ping1.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping2.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping3.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping10.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping4.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping5.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping6.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping11.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping7.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping8.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping9.png" alt="" ></li>
        <li><img src="@/assets/pinpai/ping12.png" alt="" ></li>
      </ul>
    </div>
    <div class="three">
      <h3>部分合作品牌</h3>
      <div class="blueline"></div>
      <ul>
        <li><img src="@/assets/pinpai/f1.png" alt="" class="img1"></li>
        <li><img src="@/assets/pinpai/f2.png" alt="" class="img2"></li>
        <li><img src="@/assets/pinpai/f3.png" alt="" class="img3"></li>
        <li><img src="@/assets/pinpai/f4.png" alt="" class="img4"></li>
        <li><img src="@/assets/pinpai/f5.png" alt="" class="img5"></li>
        <li><img src="@/assets/pinpai/f6.png" alt="" class="img6"></li>
        <li><img src="@/assets/pinpai/f7.png" alt="" class="img7"></li>
        <li><img src="@/assets/pinpai/f8.png" alt="" class="img8"></li>
        <li><img src="@/assets/pinpai/f9.png" alt="" class="img9"></li>
        <li><img src="@/assets/pinpai/f10.png" alt="" class="img10"></li>
        <li><img src="@/assets/pinpai/f11.png" alt="" class="img11"></li>
        <li><img src="@/assets/pinpai/f12.png" alt="" class="img12"></li>
        <li><img src="@/assets/pinpai/f13.png" alt="" class="img13"></li>
        <li><img src="@/assets/pinpai/f14.png" alt="" class="img14"></li>
        <li><img src="@/assets/pinpai/f15.png" alt="" class="img15"></li>
        <li><img src="@/assets/pinpai/f16.png" alt="" class="img16"></li>
      </ul>
    </div>
    <div class="four">
      <h3>部分合作案例</h3>
      <div class="blueline"></div>
      <div class="cooperate">
        <div class="left"><img src="@/assets/shouye/cooperate1.png" alt="" ></div>
        <div class="right">
          <p>美的集团电商和法务部领导2022年来我司探讨深度合作细节，合作之前全网低价乱价链接上万条交给我司控价后，再经过一年的维护处理后低价链接清除90%，并且提前续签下一年合作。</p>
          <img src="@/assets/shouye/cooperate2.png" alt="">
        </div>
      </div>
    </div>
    <div class="five">
      <h3>联系我们</h3>
      <div class="blueline"></div>
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

     <!-- 登录弹窗 -->
    <el-dialog
      center
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      >
      <div class="heder">
        <img src="@/assets/shouye/close.png" alt="" @click="deliagClose" class="close">
        <div class="contact">
        <img src="@/assets/shouye/phone.png" alt="">
        <p>苒辰科技咨询热线</p>
        </div>
        <h2>15372004152</h2>
        <div class="line"></div>
      </div>
      <div class="phone">
        <p>您也可以留下您的电话号码，我们会最快时间联系您</p>
        <input type="phone" placeholder="请输入您的电话号码" v-model="phone" :disabled="true"><button @click="submit">提交</button>
        <div class="protect">
        <img src="@/assets/shouye/lock.png" alt=""><span>信息保护中请放心填写</span>
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
        // navopen:false,
        phone: '',
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
      gobusiness() {
        this.$router.push('/business')
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
        this.$router.push('/login').catch(()=>{this.drawer=false})
      },
      login() {
        if (this.formData.password.length>=6) {
          this.$message('登录成功')
          this.dialogVisible=false
        } else {
          this.$message('手机号或密码不正确，请重新输入')
        }
      },
      //客户提交电话号码
      submit() {
        // let regExp = /^1[3456789]\d{9}$/
        // if (regExp.test(this.phone)) {
        //   this.$message({
        //     message: '提交成功！',
        //     type: 'success'
        //   })
        //   this.dialogVisible=false
        // } else {
        //   this.$message('手机号格式不正确')
        // }
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
.content{
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 0;
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
  .ranchen{
    background-image: url(@/assets/shouye/RANCHEN.png);
    width: 1550px;
    height: 464px;
    background-repeat: no-repeat;
    background-size: center;
    margin-top: 181px;
    margin-left: 10vw;
    display: flex;
    justify-content: center;
    margin-bottom: 108px;
    .line{
      width: 155px;
      height: 2px;
      background-color: #fff;
      margin-top: 230px;
    }
    p{
      font-size: 66px;
      font-weight: 600;
      padding: 182px 36px 0 36px;
      color:#fff;
    }
    h4{
      font-size: 66px;
      font-weight: 600;
      padding: 10px 36px 0 36px;
      color:#fff;
      margin-left: 2em;
    }
  }
  .info{
    display: flex;
    margin-left: 1550px;
    .moreinfo{
      width: 202px;
      height: 61px;
      border: 2px solid  rgba(204, 204, 204, 1);
      display: flex;
      margin-right: 51px;
      color: rgb(204,204,204);
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 137px;
        height: 57px;
        line-height: 69px;
        border-right: 2px solid rgba(204, 204, 204, 1);
        font-size: 24px;
      }
      .infospan{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 137px;
        height: 57px;
        line-height: 69px;
        border-right: 2px solid rgba(4, 22, 44, 1);
        font-size: 24px;
      }
      img{
        width: 37px;
        height: 32px;
        margin-top: 12px;
        margin-left: 16px;
      }
      &:last-child{
        color: rgba(4, 22, 44, 1);
        background: rgba(204, 204, 204, 1);
      }
    }
  }






.blank{
  height: 160px;
  background-color: #f5f6f7;
}


.el-input{
  width: 90%;
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
  .number{
    width: 693px;
    height: 169px;
    background: rgba(6, 40, 86, 1);
    display: flex;
    justify-content: space-around;
    margin-bottom: 164px;
    .numberitem{
      color: #fff;
      width: 160px;
      text-align: center;
      p{
        position: relative;
        font-size: 60px;
        margin-right: 6px;
        margin-top: 50px;
      }
      i{
        font-size: 24px;
        font-style: normal;
      }
      .span1{
        position: absolute;
        top: -21px;
        right: -22px;
        font-size: 46px;
      }
      .span2{
        position: absolute;
        top: -21px;
        right: -2px;
        font-size: 46px;
      }
      h4{
        width: 160px;
        text-align: center;
        font-size: 21px;
        font-weight: 400;
      }
    }
  }
  .text{
    display: flex;
    h5{
      width: 430px;
      height: 373px;
      margin-left: 299px;
      font-weight: normal;
      font-size: 43px;
    }
    .line{
      width: 3px;
      height: 258px;
      background-color: rgba(171, 171, 171, 1);
      margin-left: 37px;
      margin-top: 15px;
    }
    p{
      margin:0 50px;
      width: 344px;
      height: 312px;
      font-size: 43px;
    }
  }
}
.six{
  background-image: url(@/assets/shouye/twobgi.png);
  width: 100%;
  height: 1080px;
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
    flex-wrap: wrap;
    margin-top: 135px;
    padding-left: 300px;
    li{
      width: 282px;
      height: 173px;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 95px;
      margin-bottom: 70px;
      &:nth-child(4n){
        margin-right: 0;
        img{
          width: 269px;
        height: 146px;
        }
      }
      img{
        width: 169px;
        height: 169px;
      }
      img:hover{
        margin-bottom: 10px;
        margin-right: 10px;
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
    width: 1637px;
    height: 820px;
    background-color: rgba(204, 204, 204, 0.43);
    display: flex;
    flex-wrap: wrap;
    // align-items: center;
    margin-top: 38px;
    margin-left: 141px;
    padding: 20px 40px 0 40px;
    li{
      list-style: none;
      width: 342px;
      height: 200px;
      margin-right: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:nth-child(4n){
        margin-right: 0;
      }
      img:hover{
        margin-right: 10px;
        margin-bottom: 10px;
      }
      .img1{
        width: 148px;
        height: 165px;
      }
      .img2{
        width: 224px;
        height: 173px;
      }
      .img3{
        width: 307px;
        height: 153px;
      }
      .img4{
        width: 137px;
        height: 101px;
      }
      .img5{
        width: 239px;
        height: 193px;
      }
      .img6{
        width: 276px;
        height: 134px;
      }
      .img7{
        width: 304px;
        height: 170px;
      }
      .img8{
        width: 284px;
        height: 134px;
      }
      .img9{
        width: 322px;
        height: 142px;
      }
      .img10{
        width: 311px;
        height: 127px;
      }
      .img11{
        width: 283px;
        height: 170px;
      }
      .img12{
        width: 275px;
        height: 134px;
      }
      .img13{
        width: 321px;
        height: 133px;
      }
      .img14{
        width: 326px;
        height: 85px;
      }
      .img15{
        width: 288px;
        height: 137px;
      }
      .img16{
        width: 342px;
        height: 129px;
      }
    }
  }
}
.four{
  background-image: url(@/assets/shouye/twobgi.png);
  width: 100%;
  height: 1080px;
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
    background-color: rgba(6, 40, 86, 1);
  }
  .cooperate{
    margin-top: 62px;
    margin-left: 93px;
    display: flex;
    .left img{
      width: 505px;
      height: 674px;
    }
    .right{
      p{
        margin-top: 102px;
        width: 790px;
        font-size: 36px;
        text-indent:2em;
        margin-left: 40px;
      }
      img{
        width: 628px;
        height: 353px;
        margin-left: 584px;
        margin-top: 30px;
      }
    }
  }
}
.five{
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
    margin-top: 300px;
  }
}
::v-deep .el-dialog{
  width: 425px;
  background-image: url(@/assets/shouye/dialog.png);
  background-size: cover;
  background-color: transparent;
  height: 250px;
  margin-top: 40vh !important;
  box-shadow: none;
}
::v-deep .el-dialog--center .el-dialog__body{
  
padding: 0;
.heder{
  position: relative;
  padding: 0 40px;
  .close{
    position: absolute;
    top: -8px;
    right: 23px;
    font-size: 30px;
  }
  .contact{
    display: flex;
    align-items: center;
    img{
      width: 11px;
      height: 11px;
      margin-right: 5px;
      color: #000;
    }
  }
  h2{
    font-size: 35px;
    color: rgba(9, 53, 84, 1);
    margin-left: 57px;
  }
  .line{
    width: 120px;
    height: 1px;
    background-color: #000;
    margin-left: 115px;
    margin-top: 10px;
  }
}
.phone{
  // background-color: #f3f4f6;
  padding: 5px 40px;
  p{
    color: #666666;
    padding: 10px 0;
    font-size: 14px;
  }
  input{
    width: 270px;
    height: 40px;
    border: none;
    padding-left: 10px;
    outline: none;
    :focus{
      border: none;
    }
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
  img{
    vertical-align: text-top;
    margin-right: 5px;
  }
}
}

}
</style>
