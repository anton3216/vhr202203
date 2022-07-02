<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="loginContainer">
      <h1 class="loginTitle">
        用户登录页面
      </h1>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住密码</el-checkbox>
      <el-button type="primary" @click="submitForm('ruleForm')" class="loginbutton">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        ruleForm: {
          username: 'admin',
          password: '123'
        },
        checked : false,
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.postKeyValueRequest('/doLogin',this.$data.ruleForm).then(resp => {
                if(resp){
                  window.sessionStorage.setItem('user',JSON.stringify(resp.obj));
                  this.$store.commit('initRoutes',[]);
                  this.$router.push('/home');
                }
            })
          } else {
            this.$message.error('请输入完整信息!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .loginbutton {
    width: 100%;
  }

  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .loginTitle {
    margin: 15px auto 10px auto;
    text-align: center;
    color: #505458;
  }

  .loginRemember {
    text-align: left;
    margin: 0px 0px 15px 35px;
    padding-top: 15px;
  }
</style>
