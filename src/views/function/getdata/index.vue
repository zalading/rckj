<template>
  <div class="content">
    <sideNav />
    <div class="box">京东：<input type="text" placeholder="请输入" v-model="value1"><button @click="submit">启动</button></div> 
    <div class="box">淘宝：<input type="text" placeholder="请输入" v-model="value2"><button >启动</button></div> 
    <div class="box">天猫：<input type="text" placeholder="请输入" v-model="value3"><button >启动</button></div> 
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'GetData',
  data() {
    return {
      site:'',
      value1:'',
      value2:'',
      value3:'',
    }
  },
  methods: {
    async submit() {
      console.log(this.value1);
      // if (num === 1) {
        this.site = 'Jd'
        const res= await axios({
          url: 'http://192.168.1.84:9977',
          method: 'post',
          data:{site:this.site,keyword:this.value1}
        })
        console.log(res);
      // } 
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  padding: 70px;
  .box{
    margin-bottom: 20px;
    input{
      height: 30px;
    }
    button{
      margin-left: 20px;
      width: 70px;
      height: 30px;
      background-color: skyblue;
      border: none;
    }
  }
}
</style>