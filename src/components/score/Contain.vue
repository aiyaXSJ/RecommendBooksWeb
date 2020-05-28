<template>
	<div class="score-contain">
		<el-card class="box-card">
			<!-- 面包屑导航 -->
		  <div slot="header" class="clearfix">
				<el-breadcrumb separator="|">
				  <el-breadcrumb-item><el-link href="/newbook">新书速递</el-link></el-breadcrumb-item>
				  <el-breadcrumb-item><el-link href="/popularbook">热门排行</el-link></el-breadcrumb-item>
				  <el-breadcrumb-item><el-link href="/guessbook">猜你喜欢</el-link></el-breadcrumb-item>
					<el-breadcrumb-item><el-link href="/recommendbook">推荐书籍</el-link></el-breadcrumb-item>
					<el-breadcrumb-item></el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="clearfix">
				<router-view></router-view>
			</div>
			<el-divider></el-divider>
			<div class="block">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:'Contain',
	}
</script>

<style>
	.score-contain{
		width: 80%;
		margin: 0 auto;
	}
	.box-card{
		margin: 20px;
	}
</style>
