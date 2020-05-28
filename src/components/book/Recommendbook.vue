<template>
	<div class="popular">
		<h1 style="margin-left:10%"> 评分TOP50排行榜</h1>
		<div v-for="(item,xxx)  in popularBook" style="width: 80%;margin: 0 auto;">
			<table>
				<tr >
					<td class="tdimg" @click="testReadnum(item.id,item.cataory)">
					<img :src="item.bookimg" alt="" >
					</td>
					<td style="font-size: 13px;" width="65%">
						<ul>
								<li @click="open(item.id,item.tag)" style="cursor: pointer;">书名：{{item.bookname}}</li>
							<li>作者：{{item.author}}</li>
							<li>标签：{{item.tag}}</li>
							<li>出版日期：{{item.pubtime}}</li>
						</ul>
					</td>
					<td style="font-size: 13px;">
						<ul>
							<li style="font-size: 40px;margin: 0px 30px;">{{item.score}}</li>
							<li><el-rate
										disabled
										:max="max"
								    v-model="item.score/2">
								</el-rate></li>
							<li style="text-align: center;"><countTo :startVal='0' :endVal='item.viewcount' :duration='6000'></countTo>人评分</li>
						</ul>
					</td>
					</tr>
			</table>
			<!-- <el-divider content-position="right">{{item.bookname}}</el-divider> -->
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
	import countTo from 'vue-count-to'
	
	export default{
		name:'Recommendbook',
		components:{countTo},
		data(){
			return {
				max:5,
				value:8,
				popularBook:[],
				score:[],
				dialogVisible: false,
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
				
				// console.log("nihao")
				const result = await this.$axios.get("getScore");
				const data=result.data;
				this.popularBook=data.slice(0, 50);
				this.total=this.popularBook.length;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
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
		},
	}
</script>

<style scoped>
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
		 margin:10px 50px 10px 10px;
	 }
	 .block{
		 margin: 20px 0px;
	 }
</style>
