<template>
	<div id="app">
		<login></login>
	</div>
</template>

<script>
import Login from './pages/system/Login.vue';
export default {
	name: "App",
	components: {Login}
};
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
