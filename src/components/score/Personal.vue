<template>
	<div class="score">
			<Header></Header>
			<div class="personal-contain">
				<el-card class="box-card">
					<h3 style="margin: 0px;">个人资料</h3>
					 <el-divider></el-divider>
					 <el-form :model="editForm"
					 				 label-width="100px" 
					 				 class="reg_form">
						 <el-form-item label="用户id">
							 <el-input v-model="editForm.userid" disabled></el-input>
						 </el-form-item>
					   <el-form-item label="用户名称">
					     <el-input v-model="editForm.username"></el-input>
					   </el-form-item>
					 	<el-form-item label="性别">
					 	 <el-input v-model="editForm.sex"></el-input>
					 	</el-form-item>
					 	<el-form-item label="年龄">
					 	  <el-input v-model="editForm.age"></el-input>
					 	</el-form-item>
					 	<el-form-item label="生日">
					 	  <el-input v-model="editForm.birthday"></el-input>
					 	</el-form-item>
					 	<el-form-item label="邮箱">
					 	  <el-input v-model="editForm.email"></el-input>
					 	</el-form-item>
					 	<el-form-item label="手机">
					 	  <el-input v-model="editForm.phone"></el-input>
					 	</el-form-item>
						<el-form-item label="感兴趣类别">
								<el-checkbox-group 
										v-model="editForm.tag"
										:min="1"
										:max="3">
										<el-checkbox :label="item" name="tag" v-for="item in tag"></el-checkbox>
								</el-checkbox-group>
						</el-form-item>
					   <el-form-item class="btns">
					     <el-button type="primary"
					   						 @click="editUser"><i class="el-icon-edit"></i>修改资料</el-button>
					   </el-form-item>
					 </el-form>
				</el-card>
			</div>
			<Footer></Footer>
	</div>
	
</template>

<script>
	import Header from '../home/Header.vue'
	import Footer from '../home/Footer.vue'
	export default{
		name:'Personal',
		components:{Header,Footer},
		data(){
			return{
				tag:['哲学','经济','管理','建筑','投资','文学','诗歌','小说','美食','生活','人工智能','产科','健康','买房',
				'家居','决策','高效','推理','犯罪','古典','量化','金融','菜谱','中国','国学','传记','历史','商业','三国','思维','散文','随笔','政治'],
				editForm:{
					userid:'',
					username:'',
					sex:'',
					age:'',
					birthday:'',
					email:'',
					phone:'',
					type:'用户',
					tag:[],
				}
			}
		},
		created() {
				this.selcet()
		},
		methods:{
			async selcet(){
				// let userid = this.$qs.stringify(window.sessionStorage.userid);
				const result=await this.$axios.get("personal?"+"userid="+window.sessionStorage.userid);
				const data=result.data[0]
				this.editForm.userid=data.userid
				this.editForm.username=data.username
				this.editForm.sex=data.sex
				this.editForm.age=data.age
				this.editForm.birthday=data.birthday
				this.editForm.email=data.email
				this.editForm.phone=data.phone
				this.editForm.type=data.type
				if(data.tag1){
					this.editForm.tag.push(data.tag1)
				}
				if(data.tag2){
					this.editForm.tag.push(data.tag2)
				}
				if(data.tag3){
					this.editForm.tag.push(data.tag3)
				}
				console.log(this.editForm)
			},
			async editUser(){
				let editForm = this.$qs.stringify(this.editForm);
				const result=await this.$axios.get("editUser?"+editForm);
				// console.log(result)
				const data = result.data
				console.log(data)
				if(data.meta !== 400){return this.$message.error('修改失败,'+data.msg) }
				this.$message.success('修改成功')
				this.selcet()
			}
		},
	}
</script>

<style scoped>
	.score{
		width: 100%;
		height: 100%;
		background: #f4f5f5;
	}
	.personal-contain{
		width: 50%;
		margin: 0 auto;
	}
	.box-card{
		margin: 20px;
	}
	.el-divider{
		margin: 10px 0px;
	}
	.el-col{
		font-size: 14.4px;
	}
	.btns{
		/* Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
		设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。 */
		display: flex;
		/* 各项周围留有空白：项目位于容器的结尾。 */
		justify-content: flex-end;
	}
</style>
