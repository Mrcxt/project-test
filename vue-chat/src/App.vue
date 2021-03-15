<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: "app"
	};
</script>

<style>
	::-webkit-scrollbar {
		display: none;
		width: 0;
	}
	* {
		/* box-sizing: border-box; */
	}
	html,
	body {
		width: 100%;
		height: 100%;
	}
	body {
		/* 适配齐刘海*/
		/* padding-top: constant(safe-area-inset-top); */
		/* 适配底部黑条*/
		padding-bottom: constant(safe-area-inset-bottom);
	}
	#app {
		display: flex;
		overflow: hidden;
		flex: 1;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: #2c3e50;
		font-family: "Avenir", Helvetica, Arial, sans-serif;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
