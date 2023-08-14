<template>
	<view class="" style="background-color: #fff;">
		<view class="u-m-t-20">
			<view class="item-wrap" v-for="(item,index) in list" :key="index" @click="goToNewPage(index)">
				<text>{{item}}</text>
				<u-icon size="30" name="arrow-right" color="#b3b3b3"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			list: [
			 	'我的奖励', '我的推荐','联系客服'
			],
			// 标题的样式
			titleStyle:{
				fontSize: '32rpx',
				fontFamily: 'Arial',
				color: '#333333'
			}
		}
	},
	onLoad() {
		
	},
	methods: {
		goToNewPage(index){
			console.log(index);
			if(index == 0){
				uni.navigateTo({
					url: './myReward'
				})
			}
			else if(index == 1){
				uni.navigateTo({
					url: './myRecommend'
				})
			}
			else if(index == 2){
				// 跳转到HR中心
				// this.$u.route({
				// 	url: './center/HRcenter'
				// })
				uni.navigateTo({
					url: './callService'
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.item-wrap{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100rpx;
	margin: 20rpx 35rpx 20rpx 35rpx;
	padding: 20rpx;
	font-family: Arial;
	color: #555555;
	background-color: #f2f2f2;
	border-radius: 10rpx;
	font-size: 34rpx;
}
</style>