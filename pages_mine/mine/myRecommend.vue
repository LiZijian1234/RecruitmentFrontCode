<template>
	<view class="">
		<view class="item-wrap" v-for="(item,index) in data" :key="index">
			<view class="top-name">
				<view class="">
					<u-avatar :src="item.headPortrait != null ? item.headPortrait : ''" size="100"></u-avatar>
				</view>
				<view class="name-time">
					<text class="name">{{item.realname}}</text>
					<text class="time">{{item.addTime}}推荐</text>
				</view>
<!-- 				<view class="" style="display: flex;flex-direction: column;padding-left: 160rpx;">
					<text>积分+{{item.itemWithDrawCash}}</text>
					<view class="withBtn" @click="withDrawCash(item,index)">提现</view>
				</view> -->
			</view>
			<view class="bottom-info">
				<view class="left-label" style="">
					<text class="label-job">应聘职位:</text>
					<text class="label-job">负责HR:</text>
					<text class="label-job">状态:</text>
					<!-- <text class="label-job">状态变更时间:</text> -->
				</view>
				
				<view class="right-label" style="">
					<text class="label-job">{{item.postName}}</text>
					<text class="label-job">{{item.corporationName}}</text>
					<text class="label-job">{{item.resumeState}}</text>
					<!-- <text class="label-job">2022-05-12</text> -->
				</view>
			</view>
		</view>
	</view>

</template>

<script>
export default{
	// 只有被推荐人点击了申请投递才会显示这个信息
	data(){
		return{
			Imgsrc: '',
			info: [],//数据
			data: []
		}
	},
	async onLoad() {
		const res = await this.$u.api.getRecommendResumeInfo(this.vuex_user.openid)
		console.log(res)
		this.info = res.data
		for (let index = 0; index < this.info.length; index++) {
			let obj = {}
			obj.resumeId = this.info[index].resumeId
			obj.resumeStatus = this.info[index].resumeStatus
			if(this.info[index].resumeStatus == '1'){
				obj.itemWithDrawCash = 10
			}else if(this.info[index].resumeStatus == '20'){
				obj.itemWithDrawCash = 10
			}else if(this.info[index].resumeStatus == '21'){
				obj.itemWithDrawCash = 15
			}
			
			obj.addTime = this.info[index].addtime.slice(0,10)
			const res2 = await this.$u.api.getJobDetailByIdUseless(this.info[index].postIduseless)
			console.log('每个item的岗位信息',res2.data[0]);
			obj.postName = res2.data[0].postName
			
			const res3 = await this.$u.api.getResumeOnline(this.info[index].resumeId)
			console.log('每个item的简历信息',res3.data);
			obj.realname = res3.data.realname
			obj.headPortrait = res3.data.headPortrait
			
			const res4 = await this.$u.api.getCompInfo(this.info[index].hrId)
			console.log('每个item的公司信息',res4.data[0])
			obj.corporationName = res4.data[0].corporationName
			
			let resumeState = ''
			if(this.info[index].resumeStatus == "0"){
				resumeState = "未投递"
			}else if(this.info[index].resumeStatus == "1"){
				resumeState = "已投递待HR审核"
			}else if(this.info[index].resumeStatus == "20"){
				resumeState = "HR审核未通过"
			}else if(this.info[index].resumeStatus == "21"){
				resumeState = "审核通过等待HR消息"
			}
			obj.resumeState = resumeState
			// this.info[index].resumeState = resumeState
			this.data.push(obj)
			// this.$forceUpdate()
		}
		// console.log('this.info',this.info);
		this.$forceUpdate()
		// this.info.forEach(async (item,index)=>{
			// const res1 = await this.$u.api.getUserInfo(item.resumeId)
			// console.log('每个item的用户信息',res1.data);
			
			// const res2 = await this.$u.api.getJobDetailByIdUseless(this.info[index].postIduseless)
			// console.log('每个item的岗位信息',res2.data[0]);
			// this.info[index].postName = res2.data[0].postName
			
			// const res3 = await this.$u.api.getResumeOnline(this.info[index].resumeId)
			// console.log('每个item的简历信息',res3.data);
			// this.info[index].realname = res3.data.realname
			// this.info[index].headPortrait = res3.data.headPortrait
			
			// const res4 = await this.$u.api.getCompInfo(this.info[index].hrId)
			// console.log('每个item的公司信息',res4.data[0])
			// this.info[index].corporationName = res4.data[0].corporationName
			
			// let resumeState = ''
			// if(this.info[index].resumeStatus == "0"){
			// 	resumeState = "未投递"
			// }else if(this.info[index].resumeStatus == "1"){
			// 	resumeState = "已投递待HR审核"
			// }else if(this.info[index].resumeStatus == "20"){
			// 	resumeState = "HR审核未通过"
			// }else if(this.info[index].resumeStatus == "21"){
			// 	resumeState = "审核通过等待HR消息"
			// }
			// this.info[index].resumeState = resumeState
		// })
		
	},
	methods: {
		// 提现
		async withDrawCash(item,index){
			const that = this
				uni.showModal({
					content:`金额为${item.itemWithDrawCash}元，请确定是否要提现`,
					success: async function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								const res1 = await that.$u.put(`/referrer/creatWithdrawCash
								?recommendMemberId=${item.resumeId}&withdrawCash=${item.itemWithDrawCash}&referrerId=${this.vuex_user.openid}`)
								console.log(res1)
								uni.showToast({
									icon:"success",
									title:'提现成功!'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
					}
				})

				// 提现过哪个人了需要进行判断，已经提现过了的话就不能再次提现（后端做）
			
		}
	}
}
</script>

<style lang="scss" scoped>
	.withBtn{
		height: 48rpx;
		width: 95rpx;
		display: flex;
		background-color: #efeef4;
		border-radius: 10rpx;
		justify-content: center;
		align-items: center;
	}
.item-wrap{
	margin: 40rpx 40rpx 0 40rpx;
	padding: 0 20rpx 40rpx 20rpx;
	border-bottom: 1rpx solid #797979;
	display: flex;
	flex-direction: column;
}
.top-name{
	display: flex;
	.name-time{
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		.name{
			color: #333333;
			font-weight: bold;
			font-size: 30rpx;
			
		}
		.time{
			margin-top: 20rpx;
			color: #9b9b9c;
			font-size: 28rpx;
			font-family: Arial;
		}
	}
}
.bottom-info{
	margin-top: 30rpx;
	display: flex;
	flex-direction: row;
	.left-label{
		display: flex;
		flex-direction: column;
		width: 200rpx;
		justify-content: center;
		align-items: flex-start;
		margin-right: 20rpx;
	}
	.label-job{
		font-family: Arial;
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}
	.right-label{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		
	}
}
</style>