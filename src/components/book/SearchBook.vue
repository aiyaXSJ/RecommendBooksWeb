<template>
	<div>
		<div>
			<el-row :gutter="30">
			  <el-col :span="6" v-for="(item,xxx)  in searchBook" >
					<el-card :body-style="{ padding: '15px' ,height:'400px'}">
					      <img :src="item.bookimg" class="image" >
					      <div style="padding-top: 15px;">
					        <span style="font-size: 14px;">书名：{{ item.bookname }}</span>
					        <div class="bottom clearfix">
					          <div class="time">作者：{{item.author}}</div>
										<div class="time">标签：{{item.tag}}</div>
					        </div>
					      </div>
					    </el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Newbook',
		data(){
			return {
				searchBook:[]
			}
		},
		mounted() {
			this.getSearch()
		},
		methods:{
			async  getSearch(){
				// console.log("nihao")
				var bookname=window.sessionStorage.getItem("bookname")
				const result=await this.$axios.get("search?"+"bookname="+bookname+"&author="+bookname);
				// const result = await this.$axios.post("getPostCate",this.bookname);
				const data = result.data
				this.searchBook=data
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
