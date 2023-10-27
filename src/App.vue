<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "App"
}
</script>

<style>
body {
	margin: 0;
}
#app {
	height: 100vh;
	width: 100vw;
	font-family: Fira Code, Helvetica, Arial, sans-serif;
	padding: 0;
	margin: 0;
}
</style>
