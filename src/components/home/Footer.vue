<template>
	<div class="footer-wrapper">
		<div class="footer">
			<el-row class="info-list">
				<el-col :span="7" :offset="1">
					<h5>图书推荐系统</h5>
					<p>帮你找到你想要的书籍</p>
					<p><span>7000</span>多本书籍</p>
					<p><span>76,000</span>次阅读量</p>
				</el-col>
				<el-col :span="7" :offset="1">
					<h5>关于我们</h5>
					<p>隐私政策 商标声明</p>
					<p>网站平台服务协议</p>
					<p>加入我们</p>
				</el-col>
				<el-col :span="7" :offset="1">
					<h5> </h5>
					<p>@2019-2020</p>
					<p>201615210529</p>
					<p>计科165-29洪善君</p>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default{

	}
</script>

<style scoped>
		.footer-wrapper{
			background: #333;
			color: #CCCCCC;
			width: 100%;
		}
		.footer{
			padding-top: 30px;
			margin: 0 auto;
			width: 80%;
		}
		.info-list h5{
				font-weight: normal;
				font-size: 16px;
				margin-bottom: 10px;
			}
		.info-list	p{
				font-size: 12px;
				line-height: 1.8;
				}
				
		.info-list	span{
					color:orange;
				}
				
		.licence{
			border-top: 1px #666 solid;
			margin-top: 20px;
			padding: 50px 0px;
			text-align: center;
			font-size: 12px;
		}
</style>
