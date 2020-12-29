<!--
 * @LastEditTime: 2020-04-16 16:46:36
 * @Description: 
 * @Date: 2020-04-16 15:30:37
 * @Author: @虾哔哔
 -->
<template>
	<div>
		home
	</div>
</template>

<script>
	export default {
		mounted() {
			this.getIssuesDetails();
		},
		methods: {
			getIssuesDetails() {
				let params = {
					number: 1
				};
				this.$store.dispatch("getIssuesDetails", params).then(res => {
					console.log(res.data);
				});
			}
		}
	};
</script>

<style lang="less" scoped>
</style>