<template>
	<div id="pua-404">
        <img src="../../assets/img/404.png" />
		<div class="ops-left">
			<h1>您访问的页面不见了</h1>
			<p>HTTP 404......</p>
			<p>{{ second }} s后您将</p>
			<el-button type="warning">前往首页</el-button>
		</div>
	</div>
</template>

<script>
const interval = null;
export default {
	data() {
		return {
			second: 5,
			clientHeght: 0,
			interval,
		};
	},
	mounted() {
		this.interval = setInterval(() => {
			if (this.second > 0) {
				this.second--;
			} else {
				clearInterval(this.interval);
				this.$router.replace("/layout");
			}
		}, 1000);
	},
};
</script>

<style scoped>
#pua-404 {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
    gap:10%;
    margin: 13% auto;
	justify-content: center;
	font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.ops-left h1 {
	font-size: 2rem;
}

.ops-left > p:first-of-type {
	font-size: 1.3rem;
}

img {
	width: 35%;
}

img:hover {
	animation: shakeImg 2s ease-in-out;
	cursor: pointer;
}

@keyframes shakeImg {
	10%,
	90% {
		transform: translate3d(0, -2px, 0);
	}
	20%,
	80% {
		transform: translate3d(0, +1px, 0);
	}
	30%,
	70% {
		transform: translate3d(0, -3px, 0);
	}
	40%,
	60% {
		transform: translate3d(0, +3px, 0);
	}
	50% {
		transform: translate3d(0, -3px, 0);
	}
}
</style>
