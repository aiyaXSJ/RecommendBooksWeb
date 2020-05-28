<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/#/users">热门排行管理</a></el-breadcrumb-item>
		  <el-breadcrumb-item>热门排行列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 用户列表搜索内容 -->
		<el-card class="box-card">
			<!-- 搜索与添加区 gutter是el-col之间的边距-->
		 <el-row :gutter="20">
		   <el-col :span="8">
				 <el-input placeholder="请输入内容">
				     <el-button slot="append" icon="el-icon-search"></el-button>
				 </el-input>
			 </el-col>
		   <el-col :span="4">
				 <el-button type="primary">添加书籍</el-button>
			 </el-col>
		 </el-row>
		</el-card>
		<!-- 用户列表展示 prop是userList对象的数据-->
		<el-table
		    :data="userList"
		    stripe
		    style="width: 100%;text-align: center;">
		    <el-table-column
		      prop="userid"
		      label="用户ID"
		      width="200px">
		    </el-table-column>
		    <el-table-column
		      prop="username"
		      label="姓名"
		      width="200px">
		    </el-table-column>
		    <el-table-column
		      prop="sex"
		      label="性别"
					width="200px">
		    </el-table-column>
				<el-table-column
				  prop="age"
				  label="年龄"
					width="200px">
				</el-table-column>
				<el-table-column
				  prop="email"
				  label="邮箱"
					width="200px">
				</el-table-column>
				<el-table-column
				  prop="phone"
				  label="手机"
					width="200px">
				</el-table-column>
				<el-table-column
				  prop="birthday"
				  label="生日">
				</el-table-column>
				<el-table-column
				  prop=""
				  label="操作">
				</el-table-column>
		  </el-table>
	</div>
</template>

<script>
	export default{
		name:'Hot',
		data(){
			return {
				// 获取用户列表的参数对象
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:2
				},
				userList:[],
				total:0,
			}
		},
		created(){
			// 在实例创建完成后被立即调用
			this.getUserList()
		},
		methods:{
			async getUserList() {
				const result = await this.$axios.get("users/getUserList");
				const data=result.data;
				// list1 = list2.subList(start, end); start,end分别是第几个到第几个。
				this.userList=data;
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>
