<template>
	<div class="score">
			<Header></Header>
			<Contain></Contain>
			<Footer></Footer>
	</div>

</template>

<script>
	import Header from './home/Header.vue'
	import Contain from './score/Contain.vue'
	import Footer from './home/Footer.vue'
	export default{
		name:'Score',
		components:{Header,Contain,Footer},
	}
</script>

<style scoped>
	.score{
		width: 100%;
		height: 100%;
		background: #ccc;
	}
</style>
