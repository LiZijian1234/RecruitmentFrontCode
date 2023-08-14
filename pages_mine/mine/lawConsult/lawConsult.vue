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
				src:'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/27/753fe648-e483-48f5-9ce4-2f69b50b2074.jpg'
			}
		},	
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					this.screenWidth = res.windowWidth
					this.screenHeight = res.windowHeight //将px 转换rpx
					this.pciHeight = this.screenWidth * (981.4453125 / 750)
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
	height: 981.4453125rpx;
}
</style>
