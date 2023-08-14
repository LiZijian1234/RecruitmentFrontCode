<template>
	<view>
		<view class="top-box">
			<view class="u-m-t-40" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
				<text class="big-word">城市营长</text>
				<text class="big-word">火热招募中</text>
			</view>
			<view class="" style="display: flex;margin-bottom: 60rpx;">
				<text class="bottom-word u-m-r-20">高提成</text>
				<text class="bottom-word u-m-r-20">零投入</text>
				<text class="bottom-word">无押金</text>
			</view>
		</view>
		
		<!-- 下方填写 -->
		<view class="bottom-wrap">
			<view class="" style="display: flex;align-items: center;">
				<text class="label">手机号</text>
				<view class="right-input-box">
					<input  type="number" placeholder="请输入手机号" placeholder-class="placeholder-class" />
					<view class="btn">
						<text class="getcode-word">获取验证码</text>
					</view>
				</view>
			</view>
			<view class="u-m-t-40" style="display: flex;">
				<text class="label">验证码</text>
				<view class="right-input-box">
					<input  type="number" placeholder="请输入验证码"  placeholder-class="placeholder-class"/>
				</view>
			</view>
			<view class="u-m-t-40" style="display: flex;">
				<text class="label">地区</text>
				<view class="right-input-box">
					<input  type="number" placeholder="请输入所在地区" placeholder-class="placeholder-class" />
				</view>
			</view>
			
			<view class="btn-bottom" @click="toYingZhangPage">
				<text class="bottom-word1">立即报名成为营长</text>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	onLoad() {
		
	},
	methods: {
		toYingZhangPage(){
			uni.navigateTo({
				url: '/pages_mine/mine/yingZhang'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.placeholder-class{
	font-family: Arial;
	font-size: 34rpx;
	padding-left: 15rpx;
}
.top-box{
	margin: 60rpx 45rpx 60rpx 45rpx;
	height: 480rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: #7573e6;
	border-radius: 20rpx;
	
}
.big-word{
	font-family: Arial;
	font-size: 60rpx;
	color:#fff;
	
}
.bottom-word{
	font-family: Arial;
	font-size: 47rpx;
	color:#fff;
}
.bottom-wrap{
	margin: 0 20rpx 80rpx 20rpx;
	height: 650rpx;
	padding: 20rpx 10rpx 20rpx 10rpx;
	
}
.label{
	width: 150rpx;
	font-family: Arial;
	font-size: 34rpx;
	padding-right: 20rpx;
	height: 90rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	// width: 60rpx;
}
.right-input-box{
	background-color: #f2f2f2;
	border-radius: 20rpx;
	height: 90rpx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.btn{
	width: 170rpx;
	height: 70rpx;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10rpx;
}
.getcode-word{
	font-family: Arial;
	font-size: 32rpx;
	
}
.btn-bottom{
	margin: 40rpx 50rpx 0 50rpx;
	height: 100rpx;
	// width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #7573e6;
	border-radius: 25rpx;
}
.bottom-word1{
	font-family: Arial;
	color:#fff;
	font-size: 40rpx;
	
}
</style>