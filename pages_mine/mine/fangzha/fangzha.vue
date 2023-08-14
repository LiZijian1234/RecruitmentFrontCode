<template>
	<view>
		<image class="" :src="src" :style="[{width: screenWidth + 'px',height: pciHeight +'px', marginTop: marginTop + 'px', marginBottom: marginTop + 'px'}]"></image>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				marginTop: 0,
				marginBottom: 0,
				pciHeight: 0,
				screenWidth: 0,
				screenHeight: 0,
				src:'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/27/235b2487-916c-427d-b472-f3b3c0c3cdc5.jpg'
			}
		},	
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					this.screenWidth = res.windowWidth
					this.screenHeight = res.windowHeight //将px 转换rpx
					this.pciHeight = this.screenWidth * (1056.883365200776 / 750)
					this.marginTop = (this.screenHeight - this.pciHeight) / 2
				}
			});
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.image{
	width: 750rpx;
	height: 1056.883365200776rpx;
}
</style>