<template>
	<div class="tag-group">
	  <el-tag
			class="tag"
	    v-for="item in items"
	    :key="item.label"
	    effect="plain">
	    {{ item.label }}
	  </el-tag>
	</div>
</template>


<script>
  export default {
		name:'Tag',
    data() {
      return {
        items: [
          { label: '标签一' },
          { label: '标签二' },
          { label: '标签三' },
          { label: '标签四' },
          { label: '标签五' }
        ]
      }
    }
  }
</script>

<style scoped>
	.tag-group{
		width: 80%;
		margin: 0 auto;
	}
	.tag{
		margin: 10px;
	}
</style>
