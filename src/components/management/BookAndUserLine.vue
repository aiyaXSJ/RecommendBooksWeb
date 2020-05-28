<template>
	<div class="blog-user-chart">
		<div ref="blogUserCharts" style="height: 100%;width: 100%;">
		</div>
	</div>
</template>

<script>
	import echarts from "echarts"
	require("echarts/theme/macarons")

	export default {
		data() {
			return {
				echarts: echarts,
				categoryList:[],
				categoryData:[],
			}
		},
		methods: {
			/**
			 * 初始化报表曲线图
			 */
			initBlogUserCharts() {
				// 基于准备好的dom，初始化echarts实例
				var myChart = this.echarts.init(this.$refs.blogUserCharts,"macarons");

				var option = {
						title: {
								text: '书籍各个分类数量',
								subtext: '书籍各个分类数量',
								left: 'center'
						},
						tooltip: {
								trigger: 'item',
								formatter: '{a} <br/>{b} : {c} ({d}%)'
						},
						legend: {
								orient: 'vertical',
								left: 'left',
								data: this.categoryList,
						},
						series: [
								{
										name: '书籍分类',
										type: 'pie',
										radius: '55%',
										center: ['50%', '60%'],
										data: this.categoryData,
										emphasis: {
												itemStyle: {
														shadowBlur: 10,
														shadowOffsetX: 0,
														shadowColor: 'rgba(0, 0, 0, 0.5)'
												}
										}
								}
						]
				};
		

				// 绘制图表
				myChart.setOption(option);
			},
			async getCateNum(){
				const result = await this.$axios.get("getCateNUm");
				const data=result.data;
				for(var i=0;i<data.length;i++){
					// console.log(data[i].cataory)
					this.categoryList.push(data[i].name)
					this.categoryData.push(data[i])
				}
				this.initBlogUserCharts();
			},
		},
		mounted() {
			this.getCateNum()
		}
	}
</script>

<style scoped>
	.blog-user-chart {
		width: 100%;
		height: 300px;
		background: #fff;
		margin-top: 30px;
	}
</style>
