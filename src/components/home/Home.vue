<template>
		<el-container class="home-container">
			<!-- 头部区域 -->
		  <el-header>
				<div class="header-left">
					<img src="../../assets/br.png" alt="">
					<span style="margin-left: 15px;">图书推荐系统</span>
				</div>
				<el-button type="info"
									 @click="logout">
					退出
				</el-button>
			</el-header>
			<!-- 用户页面主体内容 -->
		  <el-container>
				<!-- 用户侧边栏 -->
		    <el-aside width="200px">
					<!-- 侧边栏菜单区域 -->
					<el-menu
					font-size="15px"
								router
					      background-color="#333744"
					      text-color="#fff"
					      active-text-color="#ffd04b">
								<!-- 一级菜单 -->
					      <el-menu-item index="/newbook">
									<!-- 图标 -->
					        <i class="iconfont icon-shu"></i>
									<!-- 文本 -->
					        <span>新书速递</span>
					      </el-menu-item>   
					      <el-menu-item index="/popularbook">
					        <i class="iconfont icon-rementuijian"></i>
					        <span slot="title">热门图书</span>
					      </el-menu-item>
					      <el-menu-item index="/newbook">
					        <i class="iconfont icon-cainixihuan"></i>
					        <span slot="title">猜你喜欢</span>
					      </el-menu-item>
					    </el-menu>
				</el-aside>
				<!-- 右侧内容主体 -->
		    <router-view></router-view>
		  </el-container>
		</el-container>
</template>

<script>
	export default {
		name: 'Home',
		data () {
			return {
				classiFicationList:{
					'125':'iconfont icon-users',
					'103':'iconfont icon-tijikongjian-xianxing',
					'101':'iconfont icon-shangpingouwudai',
					'102':'iconfont icon-danju-tianchong',
					'145':'iconfont icon-baobiao2'	
				}
			} 
		},
		methods: {
			logout() {
				// 清空token
				window.sessionStorage.clear()
				// 跳转到login页面中
				this.$router.push('/login')
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
	}
	.header-left{
		display: flex;
		align-items: center;
	}
	.el-aside{
		background-color: #333744;
	}
	.el-main{
		background-color: #B3C0D1;
	}
	.home-container{
		height: 100%;
	}
	.iconfont{
		margin-right: 10px;
	}
</style>
