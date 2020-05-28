<template>
	<div>
		<!-- 数字滚动 -->
		<el-row :gutter="20">
		  <el-col :span="6">
				<div class="grid-content bg-purple">
					<el-card class="box-card">
						<!-- <div class="card-panel-iconf-div" style="float: left;"> -->
							<span class="iconfont icon-users" style="font-size: 50px;"></span>
							<div class="card-panel-desc" style="float: right;padding-right: 50px;">
								<div class="title">用户数量</div>
								<countTo :startVal='0' :endVal='2019' :duration='3000'></countTo>
							</div>
						<!-- </div> -->
					</el-card>
				</div>
			</el-col>
		  <el-col :span="6">
		  	<div class="grid-content bg-purple">
		  		<el-card class="box-card">
		  			<span class="iconfont icon-users" style="font-size: 50px;"></span>						
		  			<div class="card-panel-desc" style="float: right;">
		  				<div class="title">书籍数量</div>
		  				<countTo :startVal='0' :endVal='8913' :duration='3000'></countTo>
		  			</div>
		  		</el-card>
		  	</div>
		  </el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-card class="box-card">
						<span class="iconfont icon-users" style="font-size: 50px;"></span>
						<div class="card-panel-desc" style="float: right;">
							<div class="title">浏览人数</div>
							<countTo :startVal='0' :endVal='7000' :duration='3000'></countTo>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-card class="box-card">
						<span class="iconfont icon-users" style="font-size: 50px;"></span>
						<div class="card-panel-desc" style="float: right;">
							<div class="title">阅读总数</div>
							<countTo :startVal='0' :endVal='6666' :duration='3000'></countTo>
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row>
		
			<BookAndUserList></BookAndUserList>
		
	</div>
</template>

<script>
	import countTo from 'vue-count-to'
	import BookAndUserList from './BookAndUserLine.vue'
	 export default{
		 name:'Report',
		 components:{countTo,BookAndUserList},
		 data(){
			 return {
				 booknum:'',
				 usernum:'',
			 }
		 },
		 created(){
			 this.getBookList()
			 this.getUserList()
		 },
		 methods:{
		 	async getBookList() {
		 		const result = await this.$axios.get("users/getBookList");
		 		const data=result.data;
		 		// list1 = list2.subList(start, end); start,end分别是第几个到第几个。
		 		// console.log(data)
		 		this.booknum=data.length
		 	},
			async getUserList() {
				const result = await this.$axios.get("users/getUserList");
				const data=result.data;
				// list1 = list2.subList(start, end); start,end分别是第几个到第几个。
				this.usernum=data.length;
			},
		 },
	 }
</script>

<style scoped>
	.box-card{
		width: 100%;
		margin: 0px;
	}
	.title{
		font-size: 20px;
	}
</style>
