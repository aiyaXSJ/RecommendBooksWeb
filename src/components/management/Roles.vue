<template>
	<div>
		<el-row :gutter="20">
		  <el-col :span="6">
				<div class="grid-content bg-purple">
					<el-card class="box-card">
						<div class="title">用户数量</div>
						<countTo :startVal='0' :endVal='6666' :duration='3000'></countTo>
					</el-card>
				</div>
			</el-col>
		  <el-col :span="6">
		  	<div class="grid-content bg-purple">
		  		<el-card class="box-card">
		  			fsg
		  		</el-card>
		  	</div>
		  </el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-card class="box-card">
						fsg
					</el-card>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-card class="box-card">
						fsg
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import countTo from 'vue-count-to'
	
	 export default{
		 name:'Report',
		 components:{countTo}
	 }
</script>

<style scoped>
	.box-card{
		width: 100%;
		margin: 0px;
	}
</style>
