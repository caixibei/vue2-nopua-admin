<template>
	<div class="el-canvas" @click="throttleDraw">
		<canvas
			:ref="canvasId"
			:width="canvasWidth"
			:height="canvasHeight"
		></canvas>
	</div>
</template>

<script>
import _ from "loadsh";
export default {
	name: "code-canvas",
	props: {
		canvasId: {
			type: String,
			require: true,
		},
		canvasWidth: {
			type: String,
			require: false,
			default: "100",
		},
		canvasHeight: {
			type: String,
			require: false,
			default: "50",
		},
	},
	data() {
		return {
			codeText: "",
		};
	},
	mounted() {
		let _this = this;
		_this.$nextTick(function () {
			_this.throttleDraw();
		});
	},
	methods: {
		randomColor: function () {
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return "rgb(" + r + "," + g + "," + b + ")";
		},
		throttleDraw: _.throttle(
			function () {
				let _this = this;
				_this.draw([]);
			},
			3000,
			{ leading: false }
		),
		draw: function (show_num) {
			let _this = this;
			_this.codeText = "";
			var canvas_width = _this.canvasWidth;
			var canvas_height = _this.canvasHeight;
			var canvas = _this.$refs[_this.canvasId];
			var context = canvas.getContext("2d");
			canvas.width = canvas_width;
			canvas.height = canvas_height;
			var sCode =
				"a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
			var aCode = sCode.split(",");
			var aLength = aCode.length;
			// 验证码文本内容
			for (var i = 0; i < 4; i++) {
				var j = Math.floor(Math.random() * aLength);
				var deg = Math.random() - 0.5; //产生一个随机弧度
				var txt = aCode[j]; //得到随机的一个内容
				show_num[i] = txt.toLowerCase();
				var x = 10 + i * 20; //文字在canvas上的x坐标
				var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
				context.font = "bold 23px Fira Code,STSong";
				context.translate(x, y);
				context.rotate(deg);
				context.fillStyle = this.randomColor();
				context.fillText(txt, 0, 0);
				context.rotate(-deg);
				context.translate(-x, -y);
				_this.codeText += "" + txt;
			}
			//验证码上显示线条
			for (let i = 0; i <= 5; i++) {
				context.strokeStyle = this.randomColor();
				context.beginPath();
				context.moveTo(
					Math.random() * canvas_width,
					Math.random() * canvas_height
				);
				context.lineTo(
					Math.random() * canvas_width,
					Math.random() * canvas_height
				);
				context.stroke();
			}
			//验证码上显示小点
			for (let i = 0; i <= 30; i++) {
				context.strokeStyle = this.randomColor();
				context.beginPath();
				let x = Math.random() * canvas_width;
				let y = Math.random() * canvas_height;
				context.moveTo(x, y);
				context.lineTo(x + 1, y + 1);
				context.stroke();
			}
			_this.$emit("draw-code", _this.codeText);
		},
	},
};
</script>

<style scoped>
.el-canvas {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
