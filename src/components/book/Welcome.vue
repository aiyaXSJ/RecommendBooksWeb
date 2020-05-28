<template>
		<div class="index-main">
			<el-card class="box-card">
				<!-- 面包屑导航 -->
			  <div slot="header" class="clearfix">
					<el-breadcrumb separator="|">
					  <el-breadcrumb-item index="1" :to="{ path: '/newbook' }">新书速递</el-breadcrumb-item>
					  <el-breadcrumb-item index="2" :to="{ path: '/popularbook' }">人气榜单</el-breadcrumb-item>
					  <el-breadcrumb-item index="3" :to="{ path: '/recommendbook' }">高分图书</el-breadcrumb-item>
						<el-breadcrumb-item index="4" :to="{ path: '/guessbook' }">猜你喜欢</el-breadcrumb-item>
						<el-breadcrumb-item  :to="{}"></el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="clearfix">
					<router-view></router-view>
				</div>
			</el-card>
		</div>
</template>

<script>
	export default{
		name:'Welcome',
		data(){
				return{
					// 控制用户对话框的显示与隐藏
					editDialogVisible:false,
				}
			},
		  methods: {
			async showEditDialog(){
				this.editDialogVisible=true
			},
		},
	}
</script>
<style scoped>
	.index-main{
		height: 100%;
		width: 80%;
		margin: 0 auto;
	}
	.box-card{
		margin:20px;
	}
	.clearfix:before,
	  .clearfix:after {
	    display: table;
	    content: "";
	  }
	  .clearfix:after {
	    clear: both
	  }
</style>


