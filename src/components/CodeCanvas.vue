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
		/**
		 * get random "RGB" colors
		 */
		randomColor: function () {
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return "rgb(" + r + "," + g + "," + b + ")";
		},
		/**
		 * generate a captcha of length ${digit}
		 * @param {array} show_num
		 * @param {number} digit
		 */
		draw: function (show_num, digit) {
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
			// captcha text content
			for (var i = 0; i < digit; i++) {
				var j = Math.floor(Math.random() * aLength);
                //generate a random radian
				var deg = Math.random() - 0.5;
                //get a random text content of length 1
				var txt = aCode[j];
				show_num[i] = txt.toLowerCase();
                //the x-coordinate of the text on the canvas
				var x = 10 + i * 20;
                //the y-coordinate of the text on the canvas
				var y = 20 + Math.random() * 8;
				context.font = "bold 23px Fira Code,STSong";
				context.translate(x, y);
				context.rotate(deg);
				context.fillStyle = this.randomColor();
				context.fillText(txt, 0, 0);
				context.rotate(-deg);
				context.translate(-x, -y);
				_this.codeText += "" + txt;
			}
			// a line appears on the verification code
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
			// a small dot appears on the verification code
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
        /**
         * The verification code generation is throttled, 
         * and the verification code generation function 
         * is called only once within a certain time range
         */
		throttleDraw: _.throttle(
			function () {
				let _this = this;
				_this.draw([], 4);
			},
			1000,
			{ leading: true, trailing: false }
		),
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
