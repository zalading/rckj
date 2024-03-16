<template>
  <div class="content">
    <div class="logo">
      <img src="../../assets/logo2.jpg" alt="">
    </div>
    <p>Sign in to RanChen</p>
   <div class="form">
     <!-- 输入手机号和密码 -->
    <el-form :model="formData" status-icon :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="phone">
        <el-input type="phone" v-model="formData.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

      <div class="dialog-footer">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data() {
    return{
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
    login() {
        if (this.formData.password.length>=6) {
          this.$message({
            message: '登录成功！',
            type:'success'
          })
          this.$router.push('/map')
          this.$store.commit('savePhone', this.formData.phone)
          this.$store.commit('savePassword',this.formData.password)
        }
        else if(!this.formData.phone&&!this.formData.password){
          this.$message({
            message: '手机号或密码不能为空！',
            type:'warning'
          })
        }
        else {
          this.$message.error('手机号或密码不正确，请重新输入！')
          
        }
      },
  }
}
</script>

<style lang="scss" >
.content{
  .logo{
    margin:0 auto;
    padding-top: 150px;
    padding-bottom: 10px;
    width: 80px;
    height: 70px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  p{
    display: flex;
    justify-content: center;
    font-size: 22px;
    color:#a7a8a8;
    font-weight: 300;
  }
  .form{
    margin: auto;
    padding:5px 16px 0 16px;
    width: 276px;
    height: 214px;
    border: 1px solid #ccc;
    border-radius: 5px;
    .el-input__inner{
      height: 30px;
    }
    .el-form--label-top .el-form-item__label{
      padding: 0 !important;
    }
    .el-form-item{
      margin-bottom: 8px !important;
    }
    .el-form-item__content{
      line-height: 30px;
    }
    .dialog-footer{
      margin-top: 18px;
      .el-button--primary{
        width: 278px;
        height: 33px;
        line-height: 8px;
      }
    }
  }
}
</style>