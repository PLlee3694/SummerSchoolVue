<template>
	<div class="home">
		<!--    <globalHeader/>-->
		<div class="word" style="position: absolute;margin-top: 200px">
			<div style="margin-left: 0px;position: absolute;margin-top: -100px">欢迎使用</div>
			<div>汽车大数据平台</div>
		</div>
		<div class="log">
			<el-form class="login-container" label-position="left" label-width="0px">
				<div v-if="this.vis=='true'">
					<h3 class="login_title">用户登录</h3>
					<el-form-item>
						<el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号">
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
					<el-form-item>
						<el-form-item style="width: 100%">
							<el-button type="primary" style="width: 100%;background: #505458;border: none"
								v-on:click="toRegister">注册</el-button>
						</el-form-item>
					</el-form-item>
				</div>
				<div v-else>
					<h3 class="login_title">用户注册</h3>
					<el-form-item>
						<el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-input type="password" v-model="loginForm.con" auto-complete="off" placeholder="确认密码">
						</el-input>
					</el-form-item>
					<el-form-item style="width: 100%">
						<el-button type="primary" style="width: 100%;background: #505458;border: none"
							v-on:click="register">注册</el-button>
					</el-form-item>
					<el-form-item style="width: 100%">
						<el-button type="primary" style="width: 100%;background: #505458;border: none"
							v-on:click="toLogin">返回登陆</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>请输入相同密码</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		methods: {
			toLogin() {
				location.reload()
			},
			toRegister() {
				this.vis = false
			},
			register() {
				if (this.loginForm.password.length < 6) {
					this.$alert('密码必须大于六位', '提示', {
						confirmButtonText: '确定'
					})
				} else {
					var _this = this
					if (this.loginForm.password == this.loginForm.con) {
						this.$axios
							.post(this.$url + '/user/register', {
								username: this.loginForm.username,
								password: this.loginForm.password,
							})
							.then(resp => {
								console.log(resp)
								if (resp.data === true) {
									this.$alert('注册成功', '提示', {
										confirmButtonText: '确定'
									})
									location.reload()
								} else {
									this.$alert('用户已存在', '提示', {
										confirmButtonText: '确定'
									})
								}
							})
							.catch(failResponse => {})
					} else {
						this.dialogVisible = true
					}
				}
			},
			login() {

				this.$axios
					.post(this.$url + '/user/login', {
						username: this.loginForm.username,
						password: this.loginForm.password
					})
					.then(successResponse => {
						console.log(successResponse)
						if (successResponse.data == 200) {
              localStorage.setItem('username', this.loginForm.username)
							this.$router.push('/carGuide')
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
				vis: "true",
				loginForm: {
					username: '',
					password: '',
					con: ''
				},
			}
		},
		name: 'HomeView',
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
