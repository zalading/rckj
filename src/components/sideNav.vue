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
            <i class="el-icon-s-platform"></i>
            <span>数据展示</span>
          </li>
          <li>
            <i class="el-icon-menu"></i>
            <span>商品类目</span>
          </li>
          <li @click="nav3">
            <i class="el-icon-s-goods"></i>
            <span>产品分析</span>
          </li>
          <li @click="nav4">
            <i class="el-icon-s-marketing"></i>
            <span>销量分析</span>
          </li>
          <li @click="nav5">
            <i class="el-icon-share"></i>
            <span>关键词管理</span>
          </li>
          <li @click="nav6">
            <i class="el-icon-s-custom"></i>
            <span>用户管理</span>
          </li>
          <li @click="nav7">
            <i class="el-icon-s-home"></i>
            <span>个人中心</span>
          </li>
        </ul>
      </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'SideNav',
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    currentPath(){
      // console.log('this.$route.path' ,this.$route.path);
      return this.$route.push
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    getPath() {
      this.currentPath()
      console.log('currentPath',this.currentPath);
    },
    //跳转到大屏
    nav1() {
      this.$router.push('/map').catch(()=>{this.drawer=false})
    },
    nav3() {
      this.$router.push('/goodsAlayse').catch(()=>{this.drawer=false})
    },
    //跳转到销售分析
    nav4() {
      // this.$router.push('/saleAlayse').catch(()=>{this.drawer=false})
    },
    nav5() {
      this.$router.push('/keyword').catch(()=>{this.drawer=false})
    },
    nav6() {
      this.$router.push('/userlist').catch(()=>{this.drawer=false})
    },
    nav7() {
      this.$router.push('/usermanage').catch(()=>{this.drawer=false})
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
      width: 155px;
      .title{
        padding: 15px 15px 0 13px;
        color: #ccc;
        display: flex;
        justify-content: end;
      }
      ul{
        padding-left: 0;
        li{
          list-style: none;
          height: 30px;
          line-height: 30px;
          margin-left: 25px;
          margin-bottom: 10px;
          cursor: pointer;
          &:hover{
            color: #1d99c1;
          }
          i{
            margin-right: 10px;
          }
        }
      }
    }
}
</style>
