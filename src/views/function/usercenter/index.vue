<template>
  <div class="content">
    <sideNav />
    <div class="company">
      <p>{{ companyName }}</p>
      <button @click="loginout">退出登录</button>
    </div>
    <div class="demo-input-suffix">
      <div class="avatar"><img src="@/assets/avatar.png" alt=""></div>
      <div class="nickname">{{ phone.substring(0,3)+'****'+phone.substring(7) }}</div>
    </div>
    <div class="history">
      <p></p>
      <div class="record"></div>
      <div class="record"></div>
      <div class="record"></div>
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  name: 'UserCenter',
    data() {
      return {
        companyName: '欣善怡有限公司',
       }
  },
  created() {
  },
  computed:mapState({
    phone:'phone'
  }) ,
  methods: {
    loginout() {
      this.$store.commit('removePhone')
      this.$router.push('/login')
    }
  }
}
</script>


<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  background-image: url(@/assets/usercenterbgi.png); 
  width: 100%;   
  height: 100vh;  
  position: absolute;  
  background-repeat: no-repeat;     
  background-size: 100% 100%;
  // background-color: #0c234d;
  padding:20px;
  .company{
    display: flex;
    justify-content: space-between;
    p{
      color: #fff;
      margin-left: 100px;
      height: 70px;
      font-size: 26px;
      font-weight: bolder;
      line-height: 54px;
    }
    button{
      width: 80px;
      height: 40px;
      border-radius: 5px;
      background-color: #4375b0;
      border: none;
      color:#fff;
    }
  }
  .demo-input-suffix{
    .avatar{
      width: 98px;
      height: 98px;
      border-radius:49px;
      overflow: hidden;
      background: linear-gradient(132.37deg, rgba(1, 255, 255, 1) 0%, rgba(1, 202, 255, 1) 53.88%, rgba(1, 90, 255, 1) 100%);
      box-shadow:inset 2px 2px 4px  rgba(0, 254, 254, 1);
      margin:0 auto;
      margin-bottom: 20px;
      img{
        width: 99px;
        height: 97px;
      }
    }
    .nickname{
      margin:0 auto;
      width: 200px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background: linear-gradient(180deg, rgba(1, 90, 255, 1) 0%, rgba(1, 221, 255, 0) 100%);
    }
    margin-bottom: 60px;
  }
  .history{
    margin: 0 auto;
    width: 1492px;
    height: 541px;
    background-image: url(@/assets/kuangbgi.png);
    p{
      height: 60px;
      margin:46px 0 27px 0;
    }
    .record{
      width: 1192px;
      height: 104px;
      border: 1px solid rgba(12,91,238,1);
      margin-bottom: 27px;
      margin-left: 140px;
    }
  }
}
</style>