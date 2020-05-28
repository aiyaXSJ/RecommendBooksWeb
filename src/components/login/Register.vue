<template>
	<div class="body">
		<div class="container">
				<el-container>
				  <el-header>
						<div>
							<h2>图书推荐系统用户注册</h2>
						</div>
							<el-button type="text" @click="login">已有账号，去登录</el-button>
					</el-header>
					<el-divider></el-divider>
				  <el-main>
						<div class="">
							<!-- ref="regFormRef"
											 :rules="regFormRules"  -->
							<el-form :model="regForm" 
											 :rules="regFormRules"
											 ref="regFormRef"
											 label-width="100px" 
											 class="reg_form">
							  <el-form-item label="用户名称" prop="username">
							    <el-input v-model="regForm.username"></el-input>
							  </el-form-item>
								<el-form-item label="用户密码" prop="userpwd">
								  <el-input v-model="regForm.userpwd"></el-input>
								</el-form-item>
								<el-form-item label="确认密码" prop="cpassword">
								  <el-input v-model="regForm.cpassword"></el-input>
								</el-form-item>
								<el-form-item label="性别" prop="sex">
								 <el-input v-model="regForm.sex"></el-input>
								</el-form-item>
								<el-form-item label="年龄" prop="age">
								  <el-input v-model="regForm.age"></el-input>
								</el-form-item>
								<el-form-item label="生日" prop="birthday">
								  <el-input v-model="regForm.birthday"></el-input>
								</el-form-item>
								<el-form-item label="邮箱" prop="email">
								  <el-input v-model="regForm.email"></el-input>
								</el-form-item>
								<el-form-item label="手机" prop="phone">
								  <el-input v-model="regForm.phone"></el-input>
								</el-form-item>
								<el-form-item label="感兴趣的书籍类别(最少可选择1个标签,最多可选择3个标签)" label-width="400px">
								</el-form-item>
								<el-form-item>
								    <el-checkbox-group v-model="regForm.type" :min="1" :max="3">
								      <el-checkbox :label="item" name="type" v-for="item in tag"></el-checkbox>
								    </el-checkbox-group>
								</el-form-item>
							  <el-form-item class="btns">
							    <el-button type="primary"
							  						 @click="addUser">立即注册</el-button>
							    <el-button type="info"
							  						 @click="resetRegFrom">重置</el-button>
							  </el-form-item>
							</el-form>
						</div>						
					</el-main>
				</el-container>
		</div>
	</div>
	
</template>

<script>
	// 每一个组件都要有export default
	export default {
		name: 'Register',
		data(){
			return {
				regForm:{
					username: 'xiaom',
					userpwd:'123',
					cpassword:'123',
					sex:'男',
					age:'18',
					birthday:'1997-02-19',
					email:'13414@163.com',
					phone:'13414707510',
					type:[],
				},
				tag:['哲学','经济','管理','建筑','投资','文学','诗歌','小说','美食','生活','人工智能','产科','健康','买房','政治',
				'家居','决策','高效','推理','犯罪','古典','量化','金融','菜谱','中国','国学','传记','历史','商业','三国','思维','散文','随笔'],
			regFormRules:{
					username:[
						{ required: true, message: '请输入注册用户名称', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					userpwd:[
						{ required: true, message: '请输入注册用户密码', trigger: 'blur' },
						{ min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
					],
					cpassword:[
						{ required: true, message: '请再一次输入用户密码', trigger: 'blur' },
						{ min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
					],
					sex:[
						{ required: true, message: '请输入注册用户性别', trigger: 'blur' },
					],
					age:[
						{ required: true, message: '请输入注册用户年龄', trigger: 'blur' },
					],
					brithday:[
						{ required: true, message: '请输入注册用户生日', trigger: 'blur' },
						{ min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
					],
					email:[
						{ required: true, message: '请输入注册用户邮箱', trigger: 'blur' },
					],
					phone:[
						{ required: true, message: '请输入注册用户手机', trigger: 'blur' },
					],
				}
				}
		},
		methods:{
			//点击重置按钮，重置登录表单
			resetRegFrom() {
				// console.log(this)
				this.$refs.regFormRef.resetFields();
			},
			login(){
				this.$router.push('/login')
			},
			async addUser(){
					if(this.regForm.userpwd == this.regForm.cpassword){
						let regForm = this.$qs.stringify(this.regForm);
						const result=await this.$axios.get("register?"+regForm);
						const data = result.data
						 console.log(data)
						 if(data.meta !== 201){return this.$message.error('注册失败,'+data.msg) }
						 this.$message.success('注册成功')
						window.sessionStorage.setItem("username",this.regForm.username);
						window.sessionStorage.setItem("userid",data.userid);
						window.sessionStorage.setItem("email",data.email);
						window.sessionStorage.setItem("isNoLogin",false);
						window.sessionStorage.setItem("isYesLogin",true);
						// 2 通过编程式导航跳转到后台页面，路由地址是/index
						this.$router.push('/index')
					}
					else{
						this.$message.error('注册失败,两次密码不相同')
					}
			},
		}
	}
</script>

<style lang="less" scoped>
	.body{
		background: #2b4b6b;
		width: 100%;
		height: 50%;
	}
	.container{
		width: 80%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background: #fff;
	}
	.el-divider--horizontal {
		margin: 0px;
	}
	.container .el-header{
		display: flex;
		justify-content: space-between;
	}
	.btns{
		/* Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
		设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。 */
		display: flex;
		/* 各项周围留有空白：项目位于容器的结尾。 */
		justify-content: flex-end;
	}
</style>
