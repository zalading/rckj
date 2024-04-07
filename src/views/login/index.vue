<template>
  <div class="content">
    
   <div class="form">
    <h4>欢迎登录</h4>
     <!-- 输入手机号和密码 -->
     <div class="phone">
      <img src="@/assets/phone.png" alt="">
      <input type="phone" placeholder="请输入账号" v-model="formData.phone">
     </div>
     <div class="password">
      <img src="@/assets/password.png" alt="">
      <input type="password" placeholder="请输入密码" v-model="formData.password">
     </div>
     <p>修改密码</p>
     <button @click="login">登录</button>
   </div>
  </div>
</template>

<script>
import {loginApi} from '@/apis/user'
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
    async login() {
      let regExp = /^1[3456789]\d{9}$/
      if (this.formData.password.length > 0 && regExp.test(this.formData.phone)) {

        const res = await loginApi({
          phone:this.formData.phone,
          password:this.formData.password
        })
          // this.$message({
          //   message: '登录成功！',
          //   type:'success'
        // })
          console.log('token,id',res);
          this.$store.commit('savePhone', this.formData.phone)
          this.$store.commit('saveToken', res.token)
          this.$store.commit('saveId', res.id)
        this.$router.push('/map').catch(()=>{this.drawer=false})
          
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

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  width: 100%;
  height: 100%;
  background-image: url(@/assets/loginbgi.png);
  position: fixed;
  .form{
    background-image: url(@/assets/loginform.png);
    width: 772px;
    height: 495px;
    margin-top: 206px;
    margin-left: 948px;
    padding: 67px 196px;
    h4{
      font-size: 27px;
      font-weight: 400;
      color: #fff;
      display: flex;
      justify-content: center;
      margin-bottom: 22px;
    }
    .phone{
      width: 388px;
      height: 56px;
      background: rgba(12, 63, 128, 1);
      padding: 15px;
      margin-bottom: 50px;
      img{
        width:35px;
        height:32px;
        margin-right: 9px;
        vertical-align: middle;
      }
      input{
        background-color: transparent;
        border: none;
        height: 100%;
        width: 270px;
        color: #fff;
        &::placeholder{
          color: rgba(184, 184, 184, 1);
          font-size: 14px;
        }
        &:focus{
          border-color: initial;
          outline: none;
        }
      }
    }
    .password{
      width: 388px;
      height: 56px;
      background: rgba(12, 63, 128, 1);
      padding: 15px;
      margin-bottom: 16px;
      img{
        width:35px;
        height:32px;
        margin-right: 9px;
        vertical-align: middle;
      }
      input{
        background-color: transparent;
        border: none;
        height: 100%;
        width: 270px;
        color: #fff;
        &::placeholder{
          color: rgba(184, 184, 184, 1);
          font-size: 14px;
        }
        &:focus{
          border-color: initial;
          outline: none;
        }
      }
    }
    p{
      color: #fff;
      text-align: right;
      font-size: 14px;
      margin-bottom: 32px;
    }
    button{
      width: 225px;
      height: 56px; 
      line-height: 56px;
      text-align: center;
      background: rgba(21, 97, 193, 1);
      margin-left: 82px;
      font-size: 18px;
      border:none;
      outline: none;
      color: #fff;
      &:focus{
        background-color: #4c8eae;
      }
    }
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