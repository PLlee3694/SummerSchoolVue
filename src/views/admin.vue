<template>
  <div class="home">
    <!--    <globalHeader/>-->
    <div class="word" style="position: absolute;margin-top: 200px">
      <div style="margin-left: 0px;position: absolute;margin-top: -100px">欢迎使用</div>
      <div>汽车大数据平台</div>
    </div>
    <div class="log">
      <el-form class="login-container" label-position="left" label-width="0px">
          <h3 class="login_title">管理员登录</h3>
          <el-form-item>
            <el-input type="text" v-model="loginForm.adminname" auto-complete="off" placeholder="账号">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码">
            </el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none"
                       v-on:click="login">登录</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$axios
          .post(this.$url + '/admin/login', {
            name: this.loginForm.adminname,
            password: this.loginForm.password
          })
          .then(successResponse => {
			  console.log(successResponse)
            if (successResponse.data == true) {
              localStorage.setItem('adminname', this.loginForm.adminname)
              this.$router.push('/carUser')
            } else {
              this.$alert(successResponse.data.message, '登陆失败', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {})
    }
  },
  data() {
    return {
      dialogVisible: false,
      loginForm: {
        username: '',
        password: '',
        con: ''
      },
    }
  },
  name: 'admin',
}
</script>
<style>
.log {
  position: relative;
  /* display: inline-block; */
  justify-content: center;
  align-items: center;
  /*设置card的大小*/
  float: right;
  width: 45%;
  height: 99.9%;
  /* margin-left: 51%; */
  /*设置阴影*/
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  /*设置圆角*/
  /* border-radius:15px; */
  /*设置上边界和左边界亮纹，使card有一种层次感*/
  border-top: 0px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);

  /*设置背景样式*/
  background: rgba(255, 255, 255, 0.1);
  /*让透过card的底部元素模糊化,达到毛玻璃效果*/
  backdrop-filter: blur(5px);
}

.login-container {
  position: relative;
  border-radius: 15px;
  background-clip: padding-box;
  width: 290px;
  padding: 35px 35px 15px 35px;
  margin: 20% auto;
  background: white;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

::-webkit-scrollbar {
  width: 10px;

}

::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 100px;
}

.word {
  font-family: '';
  font-size: 100px;
  font-weight: normal;
  font-style: normal;
  color: white;

}

body {
  margin: 0;
  padding: 0;
}

.home {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-image: url("../assets/home.jpg");
  background-size: cover;
}
</style>
