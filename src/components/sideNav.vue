<template>
  <div class="hello">
    <i class="el-icon-s-fold" @click="drawer = true"></i>
      <!-- 左侧导航栏 -->
      <el-drawer
        :visible.sync="drawer"
        direction="ltr"
        :before-close="handleClose"
        :withHeader="false"
        size="260">
        <div class="title">
          <i class="el-icon-close" @click="drawer=false"></i>
        </div>
        <ul>
          <li @click="nav1">
            <img src="@/assets/sidenav11.png" alt="" class="icon1">
            <img src="@/assets/sidenav12.png" alt="" class="icon2">
            <span>数据展示</span>
          </li>
          <li @click="nav2">
            <img src="@/assets/sidenav21.png" alt="" class="icon1">
            <img src="@/assets/sidenav22.png" alt="" class="icon2">
            <span>数据大屏</span>
          </li>
          <li @click="nav3">
            <img src="@/assets/sidenav31.png" alt="" class="icon1">
            <img src="@/assets/sidenav32.png" alt="" class="icon2">
            <span>产品列表</span>
          </li>
          <li @click="nav4">
            <img src="@/assets/sidenav41.png" alt="" class="icon1">
            <img src="@/assets/sidenav42.png" alt="" class="icon2">
            <span>商家列表</span>
          </li>
          <li @click="nav5">
            <img src="@/assets/sidenav51.png" alt="" class="icon1">
            <img src="@/assets/sidenav52.png" alt="" class="icon2">
            <span>关键词管理</span>
          </li>
          <!-- <li @click="nav6">
            <img src="@/assets/sidenav61.png" alt="" class="icon1">
            <img src="@/assets/sidenav62.png" alt="" class="icon2">
            <span>用户管理</span>
          </li> -->
          <li @click="nav7">
            <img src="@/assets/sidenav71.png" alt="" class="icon1">
            <img src="@/assets/sidenav72.png" alt="" class="icon2">
            <!-- <span>个人中心</span> -->
            <span>退出登录</span>
          </li>
        </ul>
      </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
export default {
  name: 'SideNav',
  data() {
    return {
      drawer: false,
    }
  },
  computed:mapState({
    phone:'phone',
  }) ,
  methods: {
    handleClose(done) {
      done()
    },
    //跳转到大屏
    nav1() {
      this.$router.push('/map').catch(()=>{this.drawer=false})
    },
    nav2() {
      this.$router.push('/dataScreen').catch(()=>{this.drawer=false})
    },
    nav3() {
      this.$router.push('/goodsAlayse').catch(()=>{this.drawer=false})
    },
    //跳转到销售分析
    nav4() {
      this.$router.push('/shoplist').catch(()=>{this.drawer=false})
    },
    nav5() {
      this.$router.push('/keyword').catch(()=>{this.drawer=false})
    },
    nav6() {
      this.$router.push('/usermanage').catch(()=>{this.drawer=false})
    },
    nav7() {
      // console.log(phone.substring(7));
      // this.$router.push('/usercenter').catch(()=>{this.drawer=false})
      this.$confirm(`用户${store.getters.phone.substring(7)}确认退出？`).then(() => {
        console.log('退出成功');
        this.$store.commit('removeToken')
        this.$router.push('/login')
        this.$store.commit('removePhone')
        this.$store.commit('removeId')
        this.$store.commit('removeCompanyName')
        this.$store.commit('removeKeywordAll')
        this.$store.commit('removeKeywordPrice')
      }).catch(()=>{})
    },
  }
}
</script>

<style scoped lang="scss">
.hello{
  .el-icon-s-fold{
      position: absolute;
      top: 33px;
      left: 30px;
      font-size: 30px;
      color: rgb(181,211,245);
    }
  ::v-deep .el-drawer__body{
      width: 185px;
      background-color: #111727;
      .title{
        padding: 15px 15px 0 13px;
        color: #ccc;
        display: flex;
        justify-content: end;
        margin-bottom: 30px;
      }
      ul{
        padding-left: 0;
        li{
          list-style: none;
          height: 40px;
          line-height: 40px;
          padding-left: 15px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #fff;
          &:hover{
            // color: #1d99c1;
            background-color: #364252;
            border-radius: 5px;
            
            .icon1{
              display: none;
            }
            .icon2{
              display: block;
            }
          }
          img{
            width: 14px;
            height: 16px;
            vertical-align: text-bottom;
          }
          .icon1{
            display: block;
          }
          .icon2{
            display: none;
          }
          span{
            width: 130px;
            text-align: center;
            display: inline-block;
            font-size: 16px;
          }
        }
      }
    }
}
</style>
