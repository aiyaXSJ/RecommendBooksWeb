<template>
	<div class="index1" style="background:#EEEEEE;">
		<Header></Header>
		<div>
			<router-view></router-view>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from './Header.vue'
	import Footer from './Footer.vue'
	export default {
		name: 'Index',
		components:{Header,Footer},
}
</script>

<style scoped>
</style>
