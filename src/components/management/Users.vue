<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/#/users">用户管理</a></el-breadcrumb-item>
		  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 用户列表搜索内容 -->
		<el-card class="box-card">
			<!-- 搜索与添加区 gutter是el-col之间的边距-->
		 <el-row :gutter="20">
		   <el-col :span="8">
				 <el-input placeholder="请输入你想查找的用户id/用户名" v-model="searchuser" @keyup.enter.native="searchUser">
				     <el-button slot="append" icon="el-icon-search"></el-button>
				 </el-input>
			 </el-col>
		   <el-col :span="4">
				 <el-button type="primary" @click="searchUser">查找用户</el-button>
			 </el-col>
		 </el-row>
		 
		 
		 <!-- 用户列表展示 prop是userList对象的数据 stripe 是隔行换色的属性-->
		 <el-table
		     :data="userList"
					border
		     stripe>
		 		<!-- label是标题 prop是绑定的数据 -->
		 		<el-table-column type="index" label="#" ></el-table-column>
		     <el-table-column
		       prop="userid"
		       label="用户ID"
					 width="70px">
		     </el-table-column>
		     <el-table-column
		       prop="username"
		       label="姓名"
		     >
		     </el-table-column>
		     <el-table-column
		       prop="sex"
		       label="性别"
					  width="60px"
		 			>
		     </el-table-column>
		 		<el-table-column
		 		  prop="age"
		 		  label="年龄"
					 width="60px"
		 			>
		 		</el-table-column>
		 		<el-table-column
		 		  prop="email"
		 		  label="邮箱"
		 		>
		 		</el-table-column>
		 		<el-table-column
		 		  prop="phone"
		 		  label="手机"
		 			>
		 		</el-table-column>
		 		<el-table-column
		 		  prop="birthday"
		 		  label="生日">
		 		</el-table-column>
				<el-table-column
				  prop="type"
				  label="角色"
					>
					<template slot-scope="scope">
						<el-tag :type="scope.row.type == 1 ? 'primary' : 'warning'"  disable-transitions>
							{{scope.row.type == 1 ? '用户' : '管理员'}}
						</el-tag>
					</template>
				</el-table-column>
		 		<el-table-column
		 		  label="操作">
					<!-- scope.row 代表的就是这一列的数据 -->
		 			<template slot-scope="scope">
						<el-button type="primary"  icon="el-icon-edit" size="mini" @click="showUser(scope.row.userid)"></el-button>
						<el-button type="danger"  icon="el-icon-delete" size="mini" @click="open(scope.row.userid)"></el-button>
		 			</template>
		 		</el-table-column>
		   </el-table>
		</el-card>
		
		
		
		<!-- 修改用户资料对话框 -->
		<el-dialog
		  title="修改书籍信息"
		  :visible.sync="editDialogVisble"
		  width="30%"
		  :before-close="handleClose">
		  <el-form :model="editForm"  label-width="100px" class="demo-ruleForm">
		    <el-form-item label="用户id" >
		      <el-input v-model="editForm.userid" disabled></el-input>
		    </el-form-item>
							 <el-form-item label="用户名" >
							   <el-input v-model="editForm.username"></el-input>
							 </el-form-item>
							 <el-form-item label="性别" >
							   <el-input v-model="editForm.sex"></el-input>
							 </el-form-item>
							 <el-form-item label="年龄" >
							   <el-input v-model="editForm.age"></el-input>
							 </el-form-item>
							 <el-form-item label="生日" >
							   <el-input v-model="editForm.birthday"></el-input>
							 </el-form-item>
							 <el-form-item label="邮箱" >
							   <el-input v-model="editForm.email"></el-input>
							 </el-form-item>
							 <el-form-item label="手机" >
							   <el-input v-model="editForm.phone"></el-input>
							 </el-form-item>
							 <el-form-item label="角色" >
							   <el-input v-model="editForm.type"></el-input>
							 </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="editDialogVisble = false">取 消</el-button>
		    <el-button type="primary" @click="editUserById(editForm.userid)">修 改</el-button>
		  </span>
		</el-dialog>
	</div>
	
	
	
</template>

<script>
	export default{
		name:'Users',
		data(){
			return {
				// 获取用户列表的参数对象
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:2
				},
				searchuser:'',
				userList:[],
				total:0,
				editForm:{},
				editDialogVisble:false,
			}
		},
		created(){
			// 在实例创建完成后被立即调用
			this.getUserList()
		},
		mounted() {
			if(this.searchuser){
				this.getUserList()
			}
		},
		methods:{
			async getUserList() {
				const result = await this.$axios.get("users/getUserList");
				const data=result.data;
				// list1 = list2.subList(start, end); start,end分别是第几个到第几个。
				this.userList=data;
			},
			// 根据id或者是名称获取用户
			async searchUser(){
				var id=this.searchuser
				const result = await this.$axios.get("/personal?userid="+id);
				const data=result.data;
				this.userList=data;
			},
			
			// 根据id展示用户资料
			async showUser(id){
				this.editDialogVisble =true
				const result = await this.$axios.get("/personal?userid="+id);
				const data=result.data;
				this.editForm=data[0]
			},
			// 根据id修改用户资料
			async editUserById(id){
				var editFrom="?userid="+this.editForm.userid+"&username="+this.editForm.username+"&sex="+this.editForm.sex+"&age="+this.editForm.age+"&birthday="+this.editForm.birthday+"&email="+this.editForm.email+"&phone="+this.editForm.phone+"&type="+this.editForm.type
				const result = await this.$axios.get("/editUserById"+editFrom);
				const data = result.data
				console.log(data)
				this.editDialogVisble =false
				this.getUserList()
			},
			// 根据id删除用户
			async removeUserById(id){
				const result = await this.$axios.get("/deleteUser?userid="+id);
				const data=result.data;
				// console.log(data)
				this.getUserList()
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
		 open(id) {
		        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
							this.removeUserById(id)
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
						}
		}
	}
</script>

<style lang="less" scoped>
	.el-table{
		margin:20px  0px;
	}
</style>
