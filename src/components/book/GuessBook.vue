<template>
<div>
		<div>
			<el-row :gutter="30">
			  <el-col :span="6" v-for="(item,xxx)  in cateBook" >
					<el-card :body-style="{ padding: '15px' ,height:'400px'}">
								<img :src="item.bookimg" class="image"  @click="testReadnum(item.id,item.cataory)">
					      <div style="padding-top: 15px;">
					        <span style="font-size: 14px;">书名：
								{{ item.bookname }}</span>
					        <div class="bottom clearfix">
					          <div class="time">作者：{{item.author}}</div>
										<div class="time">标签：{{item.tag}}</div>
					        </div>
					      </div>
					    </el-card>
				</el-col>
			</el-row>
		</div>
		<el-divider></el-divider>
		<!-- <div class="block">
		    <el-pagination
		          @size-change="handleSizeChange"
		          @current-change="handleCurrentChange"
		    			:current-page="queryInfo.pagenum"
		          :page-sizes="[5, 10, 20, 50]"
		          :page-size="queryInfo.pagesize"
		          layout="total, sizes, prev, pager, next, jumper"
		          :total="total">
		        </el-pagination>
		  </div> -->
	</div>
</template>

<script>
	export default{
		name:'Guessbook',
		data(){
			return{
			cateBook:[],
			total:0,
			queryInfo:{
				query:'',
				// 当前的页数
				pagenum:1,
				// 当前每页显示多少条
				pagesize:20
			},
			}
		},
		created() {
			this.getScoreNum()
		},
		// mounted() {
		// 	this.getTag()
			
		// },
		methods:{
			// 监听每页显示多少条的触发事件
			async handleSizeChange(val) {
				 this.queryInfo.pagesize=val
				const result = await this.$axios.get('getEconomicByC',{params:this.queryInfo});
				const data=result.data;
				this.socialBook=data;
			},
			// 监听页码值改变的事件
			async handleCurrentChange(val) {
				this.queryInfo.pagenum=val
				const result = await this.$axios.get('getEconomicByC',{params:this.queryInfo});
				const data=result.data;
				this.socialBook=data;
			},
			//得到当前用户的评分次数，若少于50次则按照用户注册时候或者是修改用户资料的时候选择的感兴趣的书籍列表
				async getScoreNum(){
					var userid=window.sessionStorage.getItem("userid")
					if(userid){
					const result = await this.$axios.get("getScoreNum?userid="+userid);
					var scoreNum=result.data[0].num
						if(scoreNum>30){
							var userVector=[];
							console.log('用户点击次数多于30次,按照用户的评分推荐书籍')
							// 获取评分最高的tag1标签getHighestTag
							const result1 = await this.$axios.get("getHighestTag1?userid="+userid+"&tag=tag1");
							const tag1=result1.data.tag1;
							userVector.push(userid,result1.data.fenshu)
							const result2 = await this.$axios.get("getHighestTag2?userid="+userid+"&tag=tag2");
							const tag2=result2.data.tag2;
							userVector.push(result2.data.fenshu)
							const result3 = await this.$axios.get("getHighestTag3?userid="+userid+"&tag=tag3");
							const tag3=result3.data.tag3;
							userVector.push(result3.data.fenshu)
							const guessBook=await this.$axios.get("getGuessBook?tag1="+tag1+"&tag2="+tag2+"&tag3="+tag3+
							"&userid="+userid+"&fs1="+result1.data.fenshu+"&fs2="+result2.data.fenshu+"&fs3="+result3.data.fenshu);
							console.log(guessBook.data);
							this.getBookByID(guessBook.data)
						}
						else{
							console.log('用户评分次数少于30次，按照用户的感兴趣列表推荐书籍')
							const result=await this.$axios.get("personal?userid="+userid);
							const tag1=result.data[0].tag1;
							const tag2=result.data[0].tag2;
							const tag3=result.data[0].tag3;
							this.selectTag(tag1,tag2,tag3)
						}
					}
					else{
						const result = await this.$axios.get("getPopular");
						const data=result.data;
						this.cateBook=data.splice(0,48)
						this.total=this.cateBook.length
					}
			},
			//得到当前用户的喜好书籍分类
			async getGuess(){
				var userid=window.sessionStorage.getItem("userid")
				const result = await this.$axios.get("cateReadnum?userid="+userid);
				const data=result.data;
				// console.log(this.cateBook)
				for(var i=1;i<data.length;i++){     //第一轮循环表示循环的轮数
								for(var j=0;j<data.length-i;j++){  //这轮的for循环指的是每次循环的次数
										if(data[j].readnum<data[j+1].readnum){
												var temp=data[j];
												data[j]=data[j+1];
												data[j+1]=temp;
										}
								}
				}
				// console.log(data)
			},
			// async getTag(){
			// 	var userid=window.sessionStorage.getItem("userid")
			// 	if(userid){	
			// 		const result=await this.$axios.get("personal?userid="+userid);
			// 		const tag1=result.data[0].tag1;
			// 		const tag2=result.data[0].tag2;
			// 		const tag3=result.data[0].tag3;
			// 		this.selectTag(tag1,tag2,tag3)
			// 	}
			// 	else{
			// 		const result = await this.$axios.get('users/getBookList');
			// 		const data=result.data;
			// 		this.cateBook=data.splice(0,48)
			// 		this.total=this.cateBook.length
			// 	}
			// },
			async selectTag(tag1,tag2,tag3){
				const result=await this.$axios.get("searchTag?tag1="+tag1+"&tag2="+tag2+"&tag3="+tag3);
				const data=result.data;
				console.log(data.length)
				this.total=data.length
				this.cateBook=data.splice(0,48)
				console.log(this.cateBook)
			},
			// 通过余弦相似度获得书籍id来获取书籍书籍
			async getBookByID(guessBook){
				for (var i=0;i<guessBook.length;i++) {
					var bookid=guessBook[i];
					const result=await this.$axios.get("getBookById?bookid="+bookid);	
					this.cateBook.push(result.data[0])
				}
				console.log(this.cateBook)
			}
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
