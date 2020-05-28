<template>
		<el-container class="home-container">
			<!-- 头部区域 -->
		  <el-header>
				<div class="header-left">
					图书推荐系统后台管理
				</div>
				<el-button type="info"
									 @click="logout">
									 <i class="el-icon-switch-button"></i>
									 <span>退出</span>
				</el-button>
			</el-header>
			<!-- 后台管理页面主体内容 -->
		  <el-container>
				<!-- 后台管理侧边栏 -->
		    <el-aside :width="isCollapse ? '64px': '150px'">
					<div class="toggle-button" @click="toggleCollapse">
						<i class="el-icon-s-fold"></i>
					</div>
					<!-- 后台管理侧边栏菜单区域中的一级菜单 -->
					<!-- collapse属性是水平折叠菜单属性
							collapse-transition是折叠时发生的动画
							unique-opened是否只保持一个子菜单的展开，这种写法是一种简写方式，不写的时候默认是false 写上了表示为true 
							router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 上面的unique-opened是简写
							active-text-color是点击菜单项是菜单项的字体颜色
					 -->
					<el-menu
								:default-active="activePath"
								:collapse="isCollapse"
								style="border-right: none;"
								unique-opened
								:router="true"
					      background-color="#333744"
					      text-color="#fff"
								:collapse-transition="false"
					      active-text-color="#409EFF">
								<el-menu-item :index="'/' + item.path"
															v-for="item in menulist" 
															:key="item.id"
															@click="saveNavState('/'+ item.path)">
									<template slot="title">
									  <i :class="iconsList[item.id]"></i>
									  <span>{{item.authName}}</span>
									</template>
								</el-menu-item>
					     
					    </el-menu>
				</el-aside>
				<!-- 右侧内容主体 -->
		    <el-main>
					<!-- 路由占位符 -->
					<router-view></router-view>
				</el-main>
		  </el-container>
		</el-container>
</template>

<script>
	export default {
		name: 'Management',
		data() {
			return {
				// 是否折叠
				isCollapse:false,
				// 左侧菜单数据
				menulist:[
					{id:125,authName:'用户管理',path:'users'},
					// {id:103,authName:'角色管理',path:'roles'},
					{id:104,authName:'书籍管理',path:'books'},
					// {id:104,authName:'新书速递管理',path:'express'},
					// {id:102,authName:'热门推荐管理',path:'hot'},
					{id:145,authName:'数据报表',path:'report'},
				],
				// 被激活的链接地址
				activePath:'/users',
				iconsList:{
					'125':'iconfont icon-users',
					'103':'iconfont icon-tijikongjian-xianxing',
					'101':'iconfont icon-shangpingouwudai',
					'102':'iconfont icon-danju-tianchong',
					'145':'iconfont icon-baobiao2'	,
					'104':'iconfont icon-danju-tianchong',
				}
			}
		},
		created() {
			this.getMenuList()
			// this.activePath = window.sessionStorage.getItem('activePath')
		},
		methods: {
			logout() {
				// 清空token
				window.sessionStorage.clear()
				// 跳转到login页面中
				this.$router.push('/index')
			},
			// 保存链接激活状态
			saveNavState(activePath){
				window.sessionStorage.setItem('activePath',activePath)
				this.activePath = activePath
			},
			// 点击按钮，切换菜单的折叠与展开
			toggleCollapse(){
				this.isCollapse = ! this.isCollapse
			},
			// 获取所有的菜单
			async getMenuList(){
				// const result = await this.$axios.get('menus')
				// const res=result.data;
				// // 等于const {data:res} =await this.$axios.get('menus')
				// if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
				// this.menulist=res.data
				// console.log(res)
			}
		}
	}
</script>

<style scoped>
	.el-header{
		/* background: #475669; */
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		/* 让图片居中 */
		align-items: center;
		color: #333333;
		font-size: 20px;
		background: #2B2D36;
	}
	.header-left{
		color: #f2f2f2;
		display: flex;
		align-items: center;
		height: 100%;
	}
	.el-aside{
		background-color: #333744;
	}
	.el-main{
	}
	.home-container{
		height: 100%;
	}
	.toggle-button{
		background: #333744;
		font-size: 20px;
		/* 上下居中 */
		line-height: 24px;
		color: #FFFFFF;
		/* 左右居中 */
		text-align: center;
		/* 三条竖线之间的距离 */
		letter-spacing: 0.2em;
		/* 鼠标移到此处变成小手 */
		cursor: pointer;
	}
	.iconfont{
		margin-right: 10px;
	}
</style>
