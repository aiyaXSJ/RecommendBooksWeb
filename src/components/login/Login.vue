<template>
	<div class="login_container">
		<div class="login_box">
			<!-- 头像区域 -->
			<div class="avatar_box">
				<img src="../../assets/tou.png" alt="">
			</div>
			<!-- 登录表单区域 :rules是表单验证规则-->
			<el-form :model="loginForm"  
								label-width="0px"
								ref="loginFromRef"
								class="login_form" 
								:rules="loginFormRules">
				<!-- 用户名 -->
			  <el-form-item prop="username">
					<!-- v-model绑定的是loginForm对象中的username -->
			    <el-input v-model="loginForm.username" 
										prefix-icon="el-icon-user-solid"></el-input>
			  </el-form-item>
				<!-- 密码 -->
				<el-form-item prop="userpwd">
					<!-- v-model绑定的是loginForm对象中的password   -->
					<!-- 点击回车键触发函数@keydown.13.native="login" -->
				  <el-input  v-model="loginForm.userpwd" 
										 prefix-icon="el-icon-lock"
										 show-password
										 @keydown.13.native="login"></el-input>
				</el-form-item>
				
				<el-form-item prop="username">
						<el-radio v-model="loginForm.type" label="1">用户</el-radio>
					  <el-radio v-model="loginForm.type" label="2">管理员</el-radio>
				</el-form-item>
				<!--  按钮区 -->
				<el-form-item class="btns">
					还没有账号？<el-button type="text" @click="register">立刻注册</el-button>
				  <el-button type="primary"
										 @click="login">登录</el-button>
				  <el-button type="info"
										 @click="resetLoginFrom">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	// 每一个组件都要有export default
	export default {
		name: 'Login',
		data() {
		      return {
						type:'1',
						// 登录表单的数据绑定对象
		        loginForm: {
		          username: 'xiaom',
		          userpwd: '123',
							type:'1',
		        },
						// 表单的验证规则对象
						loginFormRules: {
							// 验证用户名是否合法
							username:[
								{ required: true, message: '请输入登录用户名称', trigger: 'blur' },
								{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
							],
							userpwd:[
								{ required: true, message: '请输入登录密码', trigger: 'blur' },
							]
						}
		      }
		    },
		methods:{
			//点击重置按钮，重置登录表单 
			resetLoginFrom() {
				// console.log(this)
				this.$refs.loginFromRef.resetFields();
			},
			register(){
				this.$router.push('/register')
			},
			async login() {

					let loginForm = this.$qs.stringify(this.loginForm);
					const result=await this.$axios.get("login?"+loginForm);
				  
					const data=result.data
					console.log(data)
					if(data.length == 0){
						return this.$message.error('登录失败，用户名/密码错误')
					}
					this.$message.success('登录成功')
					// window.sessionStorage.setItem("userid",data[0].userid);
					// window.sessionStorage.setItem("username",data[0].username);
					// window.sessionStorage.setItem("email",data[0].email);
					window.sessionStorage.setItem("userid",data[0].userid);
					window.sessionStorage.setItem("username",data[0].username);
					window.sessionStorage.setItem("sex",data[0].sex);
					window.sessionStorage.setItem("age",data[0].age);
					window.sessionStorage.setItem("birthday",data[0].birthday);
					window.sessionStorage.setItem("email",data[0].email);
					window.sessionStorage.setItem("phone",data[0].phone);
					window.sessionStorage.setItem("type",data[0].type);
					window.sessionStorage.setItem("tag1",data[0].tag1);
					window.sessionStorage.setItem("tag2",data[0].tag2);
					window.sessionStorage.setItem("tag3",data[0].tag3);
					window.sessionStorage.setItem("isNoLogin",false);
					window.sessionStorage.setItem("isYesLogin",true);
					// 2 通过编程式导航跳转到后台页面，路由地址是/index
					if(this.loginForm.type == 1){
						this.$router.push('/index')
					}
					else if(this.loginForm.type == 2){
						this.$router.push('/management')
					}
			}
		}
	}
</script>

<style lang="less" scoped>
	.login_container{
		background: #2b4b6b;
		height: 50%;
	}
	.login_box{
		width: 450px;
		height: 350px;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.avatar_box{
		height: 130px;
		width: 130px;
		/* 边框样式 */
		border: 1px solid #eee;
		border-radius: 50%;
		padding:10px;
		/* 边框阴影 */
		box-shadow: 0 0 10px #ddd;
		position: absolute;
		left: 50%;
		/* 百分比是根据高度宽度修改的  结合transform进行了位移*/
		transform: translate(-50%,-50%);
		background-color: #fff;
		img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background-color: #eee;
		}
	}
	.login_form{
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		/* 规定两个并排的带边框的框：
		 为元素设定的宽度和高度决定了元素的边框盒。
		 就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
		 通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。
		 */
		box-sizing: border-box;
	}
	.btns{
		/* Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
		设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。 */
		display: flex;
		/* 各项周围留有空白：项目位于容器的结尾。 */
		justify-content: flex-end;
	}
</style>
