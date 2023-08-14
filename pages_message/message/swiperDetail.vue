<template>
	<view class="">
		<image class="image" :src="src" v-if="index == '0'"></image>
		<image class="image2" :src="src" v-if="index == '1'"></image>
		<image class="" :src="src" v-if="index == '2'" 
		:style="[{width: screenWidth + 'px',height: pciHeight +'px', marginTop: marginTop + 'px', marginBottom: marginTop + 'px'}]"
		></image>
	</view>
</template>

<script>
export default{
	data(){
		return {
			marginTop: 0,
			marginBottom: 0,
			pciHeight: 0,
			screenWidth: 0,
			screenHeight: 0,
			src: '',
			index: '9',
			
		}
	},
	onLoad(options){
		this.index = options.index
		console.log('index',this.index);
		if(this.index == '0'){
			this.src = 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/24/39fef8a9-6771-4284-8689-1ef71ccfc7fd.jpg'
		}else if(this.index == '1'){
			this.src = 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/24/77e6f11f-5e40-4b8d-a72d-7ab6485be70a.jpg'
		}else if(this.index == '2'){
			this.src = 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/24/ac173e41-da9a-4749-9eaa-d6857b8e57cb.png'
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					this.screenWidth = res.windowWidth
					this.screenHeight = res.windowHeight //将px 转换rpx
					this.pciHeight = this.screenWidth * (890.97222 / 750)
					this.marginTop = (this.screenHeight - this.pciHeight) / 2
				}
			});
		}
		
	},
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>
.image{
	width: 750rpx;
	height: 4146.97265626rpx;
}
.image2{
	width: 750rpx;
	height: 1631.25rpx;
}
.image3{
	width: 750rpx;
	height: 1631.25rpx;
}
.image3{
	width: 750rpx;
	height: 890.97222rpx;
}
</style>