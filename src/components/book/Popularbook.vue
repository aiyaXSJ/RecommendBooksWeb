<template>
	<div class="popular">
		<h1 style="margin: 0px;" class="section-title">
			<i class="iconfont icon-lunkuodasan-" style="font-size: 20px;color: #f26522;"></i>人气榜单
		</h1>
		<div v-for="(item,xxx)  in popularBook">
			<div>
				<table>
					<tr @click="testReadnum(item.id,item.cataory)">
						<td class="tdimg">
						<img :src="item.bookimg" alt="" >
						</td>
						<td style="font-size: 13px;">
							<ul>
								<li @click="open(item.id,item.tag)" style="cursor: pointer;">书名：{{item.bookname}} <span style="font-size: 10px;color: #EE9900;">{{item.score}}</span></li>
								<li>作者：{{item.author}}</li>
								<li>标签：{{item.tag}}</li>
								<li>出版日期：{{item.pubtime}}</li>
								<li><i class="iconfont  icon-yanjing" style="font-size: 18px;color: #EE9900;"> </i> {{item.viewcount}}</li>
							</ul>
						</td>
						</tr>
				</table>
			</div>
			<!-- 饿了么组件中的分割线组件 -->
			<el-divider content-position="right">{{item.bookname}}</el-divider>
		</div>
		<!-- 给书籍评分的对话框 -->
		<el-dialog
		  title="评分"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <el-rate
					allow-half
		      v-model="pingf"
		      :colors="colors"
					show-text
					>
		    </el-rate>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button type="primary" @click="testScore()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	
</template>

<script>
	export default{
		name:'Popularbook',
		data(){
			return {
				max:5,
				value:8,
				dialogVisible: false,
				popularBook:[],
				score:[],
				colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
					pingf:0,
					// 书籍id
					scoreId:0,
					booktag:'',
			}
		},
		created() {
			this.getPopular()
		},
		methods:{
			cancel(){
				this.dialogVisible = false
				this.pingf=0
			},
			async getPopular(){
				const result = await this.$axios.get("getPopular");
				const data=result.data;
				this.popularBook=data;
				this.total=this.popularBook.length;
			},
			async addReadnum(userid,bookid,category){
				const addResult = await this.$axios.get("addReadnum?userid="+userid+"&bookid="+bookid+"&category="+category);
				const data=addResult.data
				console.log(data)
			},
			async insertReadnum(userid,bookid,category){
				const  insertResult = await this.$axios.get("insertReadnum?userid="+userid+"&bookid="+bookid+"&category="+category);
				const data=insertResult.data
				console.log(data)
			},
			open(id,tag){
					this.scoreId=id;
					this.booktag=tag;
					// console.log(this.scoreId,this.booktag)
					this.dialogVisible=true;
			},
			async testScore(){
				var userid=window.sessionStorage.getItem("userid")
				
				var bookid=this.scoreId
				var bookScore=this.pingf
				var tag=this.booktag
				console.log(userid,bookid,bookScore,tag)
				if(userid){
						const result = await this.$axios.get("testScore?userid="+userid+"&bookid="+bookid);
						const data=result.data
						console.log(data)
						if(data.meta == 201){
							this.addScore(userid,bookid,bookScore,tag)
						}
						else{
							this.updateScore(userid,bookid,bookScore,tag)
						}
				}
				else{
					this.$message.error('您还没有登录，不能进行评分')
					this.pingf=0
				}
			},
			async addScore(userid,bookid,bookScore,tag){
				const addResult = await this.$axios.get("addScore?userid="+userid+"&bookid="+bookid+"&score="+bookScore+"&tag="+tag);
				const data=addResult.data
				console.log(data)
				this.pingf=0
				this.dialogVisible=false
			},
			async updateScore(userid,bookid,bookScore,tag){
				const addResult = await this.$axios.get("updateScore?userid="+userid+"&bookid="+bookid+"&score="+bookScore+"&tag="+tag);
				const data=addResult.data
				console.log(data)
				this.pingf=0
				this.dialogVisible=false
			},
			handleClose(done) {
			  this.$confirm('确认关闭？')
			    .then(_ => {
			      done();
			    })
			    .catch(_ => {});
			},
			async testReadnum(bookid,cataory){
				var category=cataory;
				var userid=window.sessionStorage.getItem("userid")
				if(userid){
						const result = await this.$axios.get("testReadnum?userid="+userid+"&bookid="+bookid+"&category="+category);
						const data=result.data;
						if(data.meta == 400){
							 this.addReadnum(userid,bookid,category)
						}
						else{
							this.insertReadnum(userid,bookid,category)
						}
				}
				else{
					console.log("用户还没登录，点击事件错误")
				}
			},
		},
	}
</script>

<style scoped>
	.section-title{
		font-size: 22px;
		height: 24px;
		line-height: 24px;
		color: #444;
		border-left: 8px solid #f26522;
		padding-left: 14px;
		margin-right: 33px;
	}
	.time {
	   font-size: 13px;
	   color: #999;
	 }
	 .bottom {
	   margin-top: 13px;
	   line-height: 12px;
	 }
		
	 .button {
	   padding: 0;
	   float: right;
	 }
		.tdimg img{
			width: 90px;
		}
	 .image {
	   width: 100%;
	   display: block;
	 }
	 .clearfix:before,
	 .clearfix:after {
	     display: table;
	     content: "";
	 }
	 
	 .clearfix:after {
	     clear: both
	 }
	 ul{
		 list-style: none;
	 }
	 li{
		 margin: 10px 0px;
	 }
	 .el-divider{
		 margin:0px 50px 0px 0px;
	 }
	 .block{
		 margin: 20px 0px;
	 }
</style>
