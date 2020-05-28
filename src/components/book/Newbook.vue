<template>
	<div>
		<div>
			<el-row :gutter="30">
			  <el-col :span="6" v-for="(item,xxx)  in newBook" >
					<el-card :body-style="{ padding: '15px' ,height:'400px'}" >
								<img :src="item.bookimg" class="image"  @click="testReadnum(item.id,item.cataory)">
					      <div style="padding-top: 15px;">
					        <span style="font-size: 14px;cursor: pointer; " @click="open(item.id,item.tag)">
										书名：{{ item.bookname }}
										</span>
					        <div class="bottom clearfix">
					          <div class="time">作者：{{item.author}}</div>
										<div class="time">标签：{{item.tag}}</div>
					        </div>
					      </div>
					    </el-card>
				</el-col>
			</el-row>
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
		name:'Newbook',
		data(){
			return {
				newBook:[],
				dialogVisible: false,
				colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
					pingf:0,
					// 书籍id
					scoreId:0,
					booktag:'',
			}
		},
		created() {
			this.getNew()
		},
		methods:{
			cancel(){
				this.dialogVisible = false
				this.pingf=0
			},
			async getNew(){
				// console.log("nihao")
				const result = await this.$axios.get("getNew");
				const data=result.data;
				// console.log(data)
				this.newBook=data.slice(0, 24);
			},
			async addReadnum(userid,bookid,category){
				const addResult = await this.$axios.get("addReadnum?userid="+userid+"&bookid="+bookid+"&category="+category);
				const data=addResult.data
				console.log(data)
			},
			async insertReadnum(userid,bookid,category){
				const  insertResult = await this.$axios.get("insertReadnum?userid="+userid+"&bookid="+bookid+"&category="+category);
				const data=insertResult.data
				// console.log(data)
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
	.el-col{
		padding: 10px;
	}
	.time {
	    font-size: 13px;
	    color: #999;
			padding-top: 10px;
	  }
	.bottom {
	    margin-top: 13px;
	    line-height: 12px;
	  }
	.button {
	    padding: 0;
	    float: right;
	  }
	.image {
	    width: 100%;
			height: 300px;
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
</style>
