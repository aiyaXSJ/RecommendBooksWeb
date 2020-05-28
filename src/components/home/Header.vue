<template>
	<div class="index-nav">
		<div class="container">
			<div class="container-left">
				<ul>
					<li><el-link  style="font-size: 1.5rem;" :underline="false" href="/#/index">图书推荐系统</el-link></li>
					<li><el-link :underline="false" href="/#/index">首页</el-link></li>
					<li><el-link type="info" disabled>话题</el-link></li>
					<li><el-link type="info" disabled>活动</el-link></li>
					<li>
						<el-input
						    placeholder="书名/作者" v-model="bookname" @keyup.enter.native="searchBook">
						    <i slot="prefix" class="el-input__icon el-icon-search" ></i>
						</el-input>
					</li>
					<li style="margin-right: 10px;">
						<el-button type="primary" @click="searchBook">查找书籍</el-button>
					</li>
				</ul>	
			</div>
			<div class="container-right">
				<ul>
					<li v-show="isYesLogin">{{username}}</li>
					<li v-show="isYesLogin">
						<el-dropdown>
						  <span class="el-dropdown-link">
						    个人中心<i class="el-icon-arrow-down el-icon--right"></i>
						  </span>
						  <el-dropdown-menu slot="dropdown" split-button>
								<el-dropdown-item @click.native="personal">我的主页</el-dropdown-item>
								<el-dropdown-item @click.native="histScore" disabled >历史评分</el-dropdown-item>
						    <el-dropdown-item divided  @click.native="logout">退出</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</li>
					<li v-show="isNoLogin" @click="login">登录</li>
					<li v-show="isNoLogin" @click="register">注册</li>
				</ul>
			</div>
		</div>
		<el-divider></el-divider>
		<div class="category" >
			    <span v-for="(item,xxx)  in items" class="categoryitem">
						<el-link :underline="false" :href="item.path" style="font-size: 15px;color:#3377AA">{{ item.name}}</el-link>
					</span>
		</el-tag>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data(){
			return{
				username:'',
				email:'',
				mobile:'',
				bookname:'',
				isYesLogin:false,
				isNoLogin:true,
				items: [
					{name:'人文社科',path:'/#/social'},
					{name:'历史传记',path:'/#/history'},
					{name:'小说文学',path:'/#/novel'},
					{name:'学习教育',path:'/#/study'},
					{name:'经济管理',path:'/#/economic'},
					{name:'生活时尚',path:'/#/life'},
					{name:'励志成功',path:'/#/success'},
					{name:'英文原版',path:'/#/original'},
					],
			}
		},
		mounted() {
			if(window.sessionStorage.getItem("username")){
				this.username=window.sessionStorage.getItem("username")
				this.isNoLogin=false
				this.isYesLogin=true
			}	
		},
	  methods: {
			cate(item){
				console.log(item)
			},
		searchBook(){
			  if(this.bookname){
					window.sessionStorage.setItem("bookname",this.bookname)
					window.sessionStorage.setItem("author",this.author)
				 
				// console.log(this.bookList)	
				this.$router.push('/searchbook')
			}
			else{
				return this.$message.error('输入你想查找的书籍吧~') 
			}
		},
		register(){
			this.$router.push('/register')
		},
		classTag(item){
			 console.log(item)
		},
		histScore(){
			this.$router.push('/histScore')
		},
		personal(){
			this.$router.push('/personal')
		},
		login(){
			this.$router.push('/login')
		},
		logout() {
			// 清空token
			window.sessionStorage.clear()
			// window.sessionStorage.setItem("token",'');
			// window.sessionStorage.setItem("username",'');
			// window.sessionStorage.setItem("mobile",'');
			// window.sessionStorage.setItem("email",'');
			// window.sessionStorage.setItem("isNoLogin",'true');
			// window.sessionStorage.setItem("isYesLogin",'false');
			// 跳转到login页面中
			this.$router.push('/index')
			this.isNoLogin=true
			this.isYesLogin=false
			this.bookname=''
		},
	},
}
</script>

<style scoped>
	.index-nav{
		background: #fff;
	  border-bottom: 1px solid #f1f1f1;
	  color: #909090;
	  /* height: 5rem; */
	}
	.container{
		display: flex;
		justify-content: space-between;
		-webkit-box-align: center;
		align-items: center;
		height: 100%;
		width: 80%;
		margin: 0 auto;
	}
	.container ul{
		list-style: none;
		align-items: center;
		margin-bottom: 0px;
	}
	.container li{
		display: inline-block;
		/* 鼠标移到此处变成小手 */
		cursor: pointer; 
		margin: 10px;
	}
	.el-link{
		font-size: 20px;
		color: #606266;
	}
	.el-divider{
		margin:0px;
	}
	.category{
		width: 75%;
		margin: 0 auto;
		cursor: pointer; 
		height: 30px;
	}
	.categoryitem{
		padding: 10px;
	}
	.el-tag{
		border: 0;
		font-size: 15px;
		color: #606266;
		padding: 0px 15px;
	}
</style>