<template>
	<view class="" style="background-color: #fff;">
		<view class="u-m-t-20">
			<view class="item-wrap" v-for="(item,index) in list" @click="goToNewPage(index)" :key="index">
				<text>{{item}}</text>
				<u-icon size="30" name="arrow-right" color="#b3b3b3"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			list: [
			 	'公司介绍', '职位管理','候选人管理','HR中心'
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
			if(index == 1){
				// 跳转到职位管理
				// this.$u.route({
				// 	url: './job/HRJobManage'
				// })
				uni.navigateTo({
					url: './job/HRJobManage'
				})
			}
			else if(index == 2){
				// 跳转到候选人管理
				// this.$u.route({
				// 	url: './candidate/JobList'
				// })
				uni.navigateTo({
					url: './candidate/JobList'
				})
			}
			else if(index == 3){
				// 跳转到HR中心
				// this.$u.route({
				// 	url: './center/HRcenter'
				// })
				uni.navigateTo({
					url: './center/HRcenter'
				})
			}
			else if(index == 0){
				// 跳转到公司介绍
				// this.$u.route({
				// 	url: './corporInfo'
				// })
				uni.navigateTo({
					url: './corporInfo'
				})
			}
		}
	}
}
</script>
<style>
/* 	page{
		background-color: #f2f2f2;
	} */
</style>

<style lang="scss" scoped>
// .wrap1{
// 	// background-color: #f2f2f2;
// 	height: 100rpx;
// }
// /deep/ .data-v-65423b64{
// 	background-color: #f2f2f2 !important;
// }
.item-wrap{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80rpx;
	margin: 20rpx 35rpx 40rpx 35rpx;
	padding: 20rpx;
	font-family: Arial;
	color: #555555;
	background-color: #f2f2f2;
	border-radius: 10rpx;
	font-size: 34rpx;
}
</style>