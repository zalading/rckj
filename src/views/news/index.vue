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
      <img src="@/assets/shouye/newsimg.png" alt="" class="image">
    </div>
    <div class="two">
      <h3>新闻中心：</h3>
      <div class="newsbox">
        <a href="https://baijiahao.baidu.com/s?id=1792855845398717979&wfr=spider&for=pc" target="_blank">杭州苒辰科技：助力电商控价，让品牌“价”驭有道！</a>
        <p>电商市场存在着低价乱价、假货等现象，它需要企业具备强大的市场洞察力和管理能力，管控得当才能维护市场价格稳定，保障消费者权益，保证品牌的声誉和形象。
          在此背景下，杭州苒辰科技于2019年正式开始品牌服务,将战略重点转向价格管控，力求通过大数据系统研发进行渠道结构优化、渠道制度梳理、渠道流程推进以及渠道评价数据的输出，帮助客户更好的维护品牌形象和声誉，提升产品价值。通过整合母婴、食品、化妆品、服装、电器、成人用品、 乐器、药品、宠物用品、教育书籍、
          家装、3C等类目，制定合理的价格体系，运用科技手段实时监控价格，并与经销商合作共同维护市场秩序，保护消费者权益。</p>
          <p>杭州苒辰科技在金融、电商、软件开发等领域都有卓越成就，如今团队已经达150余人，90%以上本科学历，研发团队、处理团队120余人，集团旗下...</p>
        <a href="https://baijiahao.baidu.com/s?id=1792855845398717979&wfr=spider&for=pc" target="_blank"><img src="@/assets/shouye/newsright.png" alt="" ></a>
      </div>
      <i>精彩进行中......</i>
      <!-- <div class="newsbox">
        <img src="@/assets/shouye/newsright.png" alt="">
      </div>
      <div class="newsbox">
        <img src="@/assets/shouye/newsright.png" alt=""> 
      </div>-->
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
      // this.$router.push('/login')
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
    font-weight: 400;
    padding-top: 135px;
    margin-left: 200px;
  }
  .newsbox{
    position: relative;
    width: 1527px;
    height: 227px;
    background-color: rgba(204, 204, 204, 1);
    border-radius: 10px;
    padding: 20px 40px;
    margin-top: 40px;
    margin-left: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    a{
      // color: #000;
      font-size: 28px;
    }
    p{
      font-size: 20px;
      text-indent: 2em;
      margin-top: 10px;
    }
    img{
      position: absolute;
      width: 37px;
      height: 19px;
      right: 47px;
      bottom: 13px;
    }
  }
  i{
    color: #8f8d8d;
    display: block;
    margin-left: 900px;
    margin-top: 100px;
  }
  
}
</style>