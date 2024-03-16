<template>
  <div id="app">
    <router-view></router-view>
    
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
        bannerImg:[
          require( '@/assets/banner1.webp'),
          require( '@/assets/banner2.webp'),
          require( '@/assets/banner3.webp'),
          require( '@/assets/banner4.webp'),
        ],
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
    methods: {
      deliagClose() {
       this.dialogVisible=false
      },
      openLogin() {
        this.$router.push('/other')
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

</style>
