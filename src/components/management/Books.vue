<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/#/users">书籍管理</a></el-breadcrumb-item>
		  <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 用户列表搜索内容 -->
		<el-card class="box-card">
			<!-- 搜索与添加区 gutter是el-col之间的边距-->
		 <el-row :gutter="20">
		   <el-col :span="8">
				 <el-input placeholder="请输入查找的书籍/作者" v-model="queryInfo.bookname">
				     <el-button slot="append" icon="el-icon-search"></el-button>
				 </el-input>
			 </el-col>
		   <el-col :span="4">
				 <el-button type="primary" @click="getSearch()">查找书籍</el-button>
			 </el-col>
		 </el-row>
		
		 
		 <!-- 书籍列表展示 prop是bookList对象的数据 height="500px"-->
		 <el-table
		     :data="bookList"
		     border
				 stripe
		     style="width: 100%">
		     <el-table-column
		       prop="id"
		       label="书本id"
					 width="70px"
		     >
		     </el-table-column>
		     <el-table-column
		       prop="bookname"
		       label="书名"
		       >
		     </el-table-column>
		     <el-table-column
		       prop="author"
		       label="作者"
					 >
		     </el-table-column>
				 <el-table-column
				   prop="tag"
				   label="标签"
					 >
				 </el-table-column>
				 <el-table-column
				   prop="viewcount"
				   label="阅读次数"
					 width="60px"
					 >
				 </el-table-column>
				 <el-table-column
				   prop="pubtime"
				   label="出版时间">
				 </el-table-column>
				 <el-table-column
				   prop="score"
				   label="评分"
					 width="50px"
					 >
				 </el-table-column>
				 <el-table-column
				   prop="cataory"
				   label="分类"
					 >
				 </el-table-column>
				 <el-table-column
				   label="操作">
					 <template slot-scope="scope">
						<el-button type="primary"  icon="el-icon-edit" size="mini" @click="showBook(scope.row.id)"></el-button>
					 	<el-button type="danger"  icon="el-icon-delete" size="mini" @click="open(scope.row.id)"></el-button>
					 </template>
				 </el-table-column>
		   </el-table>
			 <div style="font-size: 10px;color: red;padding-bottom: 20px;">
			 			 * 修改书籍的出版时间即可修改新书速递模块、修改书籍的阅读次数即可修改人气榜单模块、修改书籍的评分即可修改高分图书模块、
			 </div>
			 
			 <!-- 修改书籍资料对话框 -->
			 <el-dialog
			   title="修改书籍信息"
			   :visible.sync="editDialogVisble"
			   width="30%"
			   :before-close="handleClose">
			   <el-form :model="editForm"  label-width="100px" class="demo-ruleForm">
			     <el-form-item label="书籍id" >
			       <el-input v-model="editForm.id" disabled></el-input>
			     </el-form-item>
					 <el-form-item label="书籍名称" >
					   <el-input v-model="editForm.bookname"></el-input>
					 </el-form-item>
					 <el-form-item label="书籍作者" >
					   <el-input v-model="editForm.author"></el-input>
					 </el-form-item>
					 <el-form-item label="书籍标签" >
					   <el-input v-model="editForm.tag"></el-input>
					 </el-form-item>
					 <el-form-item label="阅读次数" >
					   <el-input v-model="editForm.viewcount"></el-input>
					 </el-form-item>
					 <el-form-item label="出版时间" >
					   <el-input v-model="editForm.pubtime"></el-input>
					 </el-form-item>
					 <el-form-item label="书籍评分" >
					   <el-input v-model="editForm.score"></el-input>
					 </el-form-item>
					 <el-form-item label="书籍分类" >
					   <el-input v-model="editForm.cataory"></el-input>
					 </el-form-item>
			   </el-form>
			   <span slot="footer" class="dialog-footer">
			     <el-button @click="editDialogVisble = false">取 消</el-button>
			     <el-button type="primary" @click="editBookById(editForm.id)">修 改</el-button>
			   </span>
			 </el-dialog>
			 <!-- 分页区域 @size-change切换每页显示多少条数据的绑定事件    -->
			 <el-pagination
			       @size-change="handleSizeChange"
			       @current-change="handleCurrentChange"
						:current-page="queryInfo.pagenum"
			       :page-sizes="[5, 10, 20, 50]"
			       :page-size="queryInfo.pagesize"
			       layout="total, sizes, prev, pager, next, jumper"
			       :total="total">
			     </el-pagination>
		</el-card>
		
	</div>
</template>

<script>
	export default{
		name:'Books',
		data(){
			return {
				// 获取书籍列表的参数对象
				queryInfo:{
					query:'',
					// 当前的页数
					pagenum:1,
					// 当前每页显示多少条
					pagesize:10,
					bookname:'',				
									},
				bookList:[],
				total:0,
				editDialogVisble:false,
				editForm:{},
				
			}
		},
		created(){
			// 在实例创建完成后被立即调用
			this.getBookLength()
			this.getBookList()
			
		},
		methods:{
			async  getSearch(bookname){
				if(this.queryInfo.bookname){
					const result = await this.$axios.get('users/getBookByName',{params:this.queryInfo});
					console.log(result)
					const data=result.data;
					this.bookList=data;
				}
				else{
					this.getBookList()
				}
				
			},
			// 得到书籍的数量
			async getBookLength() {
				const result = await this.$axios.get('users/getBookList');
				const data=result.data;
				this.total=data.length
			},
			async getBookList() {
				const result = await this.$axios.get('users/getBookByC',{params:this.queryInfo});
				const data=result.data;
				this.bookList=data;
				// this.total=data.length
			},
			// 根据id删除书籍 
			async removeBookById(id){
				const result = await this.$axios.get("/deleteBook?bookid="+id);
				const data=result.data;
				// console.log(data)
				this.getBookList()
			},
			async showBook(id){
				this.editDialogVisble =true
				const result = await this.$axios.get("/getBookById?bookid="+id);
				const data=result.data;
				this.editForm=data[0]
			},
			async editBookById(id){
				var editFrom="?id="+this.editForm.id+"&bookname="+this.editForm.bookname+"&author="+this.editForm.author+"&viewcount="+this.editForm.viewcount+"&tag="+this.editForm.tag+"&pubtime="+this.editForm.pubtime+"&score="+this.editForm.score+"&cataory="+this.editForm.cataory
				const result = await this.$axios.get("/editBookById"+editFrom);
				const data = result.data
				console.log(data)
				this.editDialogVisble =false
				this.getBookList()
			},
			// 监听每页显示多少条的触发事件
			async handleSizeChange(val) {
				this.queryInfo.pagesize=val
				const result = await this.$axios.get('users/getBookByName',{params:this.queryInfo});
				const data=result.data;
				this.bookList=data;
			},
			// 监听页码值改变的事件
			async handleCurrentChange(val) {
				this.queryInfo.pagenum=val
				const result = await this.$axios.get('users/getBookByName',{params:this.queryInfo});
				const data=result.data;
				this.bookList=data;
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			open(id) {
				 this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
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
