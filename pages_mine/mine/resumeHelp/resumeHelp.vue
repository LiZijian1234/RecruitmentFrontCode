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
				src: 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/27/ce0c0c11-fc1b-406c-9bfb-474ba8af5d87.jpg'
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					this.screenWidth = res.windowWidth
					this.screenHeight = res.windowHeight //将px 转换rpx
					this.pciHeight = this.screenWidth * (1063.95348837 / 750)
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
	height: 1063.95348837rpx;
}
</style>
