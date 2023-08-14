<template>
	<view class="wrap">
		<image class="image" :src="src"></image>
		
	</view>
</template>

<script>
export default{
	data(){
		return{
			src: 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/24/a78ba96d-ac8b-412f-a912-9a1dbe05ccba.jpg'
		}
	},
	onLoad() {
		
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.wrap{
	margin: 200rpx auto;
	width: 600rpx;
	height: 590.791027154rpx;
	background-color: #efeef4;
	border: 1rpx solid #797979;
	.erweicode{
		font-family: Arial;
		font-size: 30rpx;
		color: #333333;
	}
	.image{
		width: 600rpx;
		height: 100%;
	}
}
</style>