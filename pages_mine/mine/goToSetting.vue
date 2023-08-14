<template>
	<view class="">
		<view class="wrap" @click="toSizeSetting">
			<text class="font-size">字体大小</text>
			<u-icon name="arrow-right" color="#333333" size="34"></u-icon>
		</view>
		<view class="bottom-wrap" @click="logout">
			<text class="logout">退出登录</text>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			
		}
	},
	onLoad() {
		
	},
	methods: {
		// 退出登录
		logout(){
			uni.clearStorage()
			// 触发logout事件
			uni.$emit('logout',false)
			this.$u.vuex('vuex_user', {})
			uni.showToast({
				title: '已退出登录',
				icon:'success'
			})
			setTimeout(()=>{
				uni.navigateTo({
					url: '/pages/mine/index'
				})
			},1000)
		},
		toSizeSetting(){
			uni.navigateTo({
				url: '/pages_mine/mine/setting'
			})
		}
		
	}
}
</script>

<style lang="scss" scoped>
.wrap{
	margin: 50rpx 40rpx 0 40rpx;
	height: 90rpx;
	border-radius: 30rpx;
	background-color: #f2f2f2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
	.font-size{
		padding-left:25rpx;
		color: #555555;
		font-size: 30rpx;
		font-family: 'Arial';
	}
}
.bottom-wrap{
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #7573e6;
	height: 90rpx;
	width: 650rpx;
	margin: 0 50rpx 0 50rpx;
	position: fixed;
	bottom: 50rpx;
	right: 0;
	border-radius: 25rpx;
	.logout{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-family: '等线';
		font-size: 35rpx;
	}
	
	
}
</style>