<template>
	<view class="u-m-l-30 u-m-r-30 u-m-t-20">
		<view class="u-m-l-30">
			<u-avatar size="110" :src="vuex_user.headPortrait"></u-avatar>
		</view>
		<view class="u-m-t-30 u-m-b-30 u-flex u-row-around">
			<view class="u-flex u-flex-col">
				<text class="number">{{jobNum}}</text>
				<text class="word">发布数量</text>
			</view>
			<view class="u-flex u-flex-col">
				<text class="number">{{unHandledResumeNum}}</text>
				<text class="word">待处理简历数</text>
			</view>
			<view class="u-flex u-flex-col">
				<text class="number">{{resumeNum}}</text>
				<text class="word">收到简历总数</text>
			</view>
		</view>
		<view class="card u-p-l-30 u-p-r-30">
			<view class="u-flex u-row-between u-p-t-30">
				<text class="card-top">职位加速</text>
				<text class="card-top">立即开通</text>
			</view>
			<view class="card-middle u-m-t-20">
				<text>新用户专享：首月88元</text>
			</view>
			<view class="u-flex u-row-around u-m-t-40">
				<view class="card-bottom">大量曝光</view>
				<view class="card-bottom">职位美化</view>
				<view class="card-bottom">虚拟会场</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			jobNum: 0,
			unHandledResumeNum:0,
			resumeNum: 0
		}
	},
	async onLoad() {
		const {data} = await this.$u.api.getcountUnhandleResumeByHrId(this.vuex_user.openid)
		this.unHandledResumeNum = data
		const job = await this.$u.api.getJobByHrid({
			id: this.vuex_user.openid,
			pageCurrent:1,
			pageSize: 10
		})
		this.jobNum = job.data.total
		const resume = await this.$u.api.getResumeIdByHrId(this.vuex_user.openid)
		this.resumeNum = resume.data.length
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.number{
	padding-bottom: 20rpx;
	font-size: 30rpx;
	font-family: Arial;
}
.word{
	font-size: 30rpx;
	font-family: Arial;
}
.card{
	background-color: #f4e3b7;
	height: 300rpx;
	width: 100%;
	.card-top{
		color: #333333;
		font-size: 30rpx;
		font-weight: 600;
	}
	.card-middle{
		font-size: 28rpx;
		color: #EC808D;
	}
	.card-bottom{
		font-size: 28rpx;
		color: #7F7F7F;
	}
}
</style>