<template>
	<view class="u-m-l-40 u-m-r-40 u-m-t-30 wrap">
		<view class="left-box">
			<text class="reward-word">可提现金额</text>
			<text class="reward-word">￥{{remainCash}}</text>
		</view>
		<view class="right-wrap">
			<view class="btn-wrap">
				<text class="money-word" @click="toWithDrawCash">立即提现</text>
			</view>
			<text class="viewmoney" @click="showCashRecord">查看提现记录</text>
		</view>
		<!-- <u-modal v-model="show" :content="content"></u-modal> -->
		<u-popup v-model="show" mode="center" border-radius="14">
			
			<view style="" class="top-wrap123">请输入提现金额</view>
			<view class="input-class">
				<input placeholder="请输入纯数字" v-model="number" />
			</view>
			<view class="" style="width: 500rpx;display: flex;justify-content: center;align-items: center;">
				<view class="btn" @click="ToWithDraw">
					提现
				</view>
			</view>

			
		</u-popup>
	</view>
</template>

<script>
export default{
	data(){
		return{
			number: '',
			show: false,
			remainCash: 0,
			alreadyCash: ''
		}
	},
	async onLoad() {
		const res = await this.$u.api.getSelectRemainedWithdrawCash(this.vuex_user.openid)
		console.log(res);
		this.remainCash = res.data
	},
	methods: {
		// 点击提现
		async ToWithDraw(){
			
			const res = await this.$u.put(`/referrer/creatWithdrawCash
			?withdrawCash=${this.number}&referrerId=${this.vuex_user.openid}`)
			console.log(res);
		},
		// 点击提现
		toWithDrawCash(){
			
			this.show = true
			
			
			// uni.showModal({
			// 	content: `请输入提现金额`,
			// 	editable: true,
			// 	placeholderText: '请输入提现金额',
			// 	showCancel: false,
			// 	success: async(res)=>{
			// 		if (res.confirm) {
			// 			console.log('用户点击确定');
			// 			const res = await this.$u.api.
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	}
			// })
		},
		async showCashRecord(){
			const res = await this.$u.api.getSelectAlreadyWithdrawCash(this.vuex_user.openid)
			console.log(res);
			this.alreadyCash = res.data + ''
			uni.showModal({
				content: `您已提现${this.alreadyCash }元`,
				showCancel: false
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	/deep/.data-v-17becaea{
		width: 500rpx !important;
		height: auto !important;
	}
	.top-wrap123{
		    margin-bottom: 20rpx;
		    width: 500rpx;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    margin-top: 40rpx;
		    font-size: 30rpx;
	}
	.btn{
		margin-top: 20rpx;
		width: 123rpx;
		height: 60rpx;
		color: #fff;
		background-color: #7573e6;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
.input-class{
    width: 500rpx;
    height: 99rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrap{
	display: flex;
	height: 280rpx;
	background-color: #7573e6;
	justify-content: space-between;
	.left-box{
		height: 100%;
		display: flex;
		padding-left: 20rpx;
		flex-direction: column;
	}
	.right-wrap{
		height: 100%;
		display: flex;
		flex-direction: column;
		padding-right: 20rpx;
	}
}
.reward-word{
	font-size: 38rpx;
	font-family: Arial;
	color: #fff;
	margin-top: 40rpx;
	margin-left: 20rpx;
}
.btn-wrap{
	background-color: #EFEEF4;
	width: 140rpx;
	height: 60rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 80rpx;
	margin-right: 60rpx;
	border-radius: 35rpx;
	.money-word{
		font-family: Arial;
		font-size: 28rpx;
		color: #333333;
		
	}
}
.viewmoney{
	font-family: Arial;
	font-size: 30rpx;
	color:#FFFFFF;
	margin-top: 88rpx;
	margin-right: 30rpx;
}
</style>