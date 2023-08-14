<template>
	<view class="">
		<view class="candidate-person  u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10"
		v-for="(item,index) in JobList" :key="index" hover-class="hover-class" 
		hover-stay-time="200" @click="toCandidate(index,item.idUseless)">
			<view class="u-flex">
				<text class="candidate-word">{{item.postName}}</text>
				<text class="job-location-wrod u-p-l-30">{{item.postLocationCity}}</text>
			</view>
			<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
		</view>
		
		<view class="" style="margin-top: 400rpx;width: 100%;display: flex;justify-content: center; " 
		v-if="JobList.length == 0">
			<text style="font-size: 30rpx; font-family: Arial;">暂未发布岗位~</text>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			JobList: [],//HR显示现在上过的岗位种类
			page:1,
		}
	},
	onReachBottom() {
		this.page = this.page + 1
		this.getJobData()
	},
	async onLoad() {
		this.getJobData()
		// this.JobList.push(res.data.rows)
		// let num = Math.floor(res.data.total / 10 )
		// for (let i = 0; i < num; i++) {
		// 	const res1 = await this.$u.api.getJobByHRId({
		// 		id: this.vuex_user.openid,
		// 		pageCurrent: i + 2,
		// 		pageSize: 10
		// 	})
		// 	this.JobList.push(res1.data.rows)
		// }
		
		// if(res.msg = '根据ID批量查询岗位信息成功!'){
		// 	console.log(res)
		// 	this.JobList = res.data
		// }
	},
	methods:{
		async getJobData(){
			uni.showLoading({title:'加载中'})
			const res = await this.$u.api.getJobByHrid({
				id: this.vuex_user.openid,
				pageCurrent: this.page,
				pageSize: 10
			})
			uni.hideLoading()
			
			this.JobList = [...this.JobList,...res.data.rows]
			
		},
		// 点击跳转到候选人详情
		toCandidate(index,idUseless){
			console.log(111);
			console.log(index);
			this.$u.route({
				url: 'pages_HR/HR/candidate/HRcandidate',
				params: {
					index: index,
					jobIdUseless: idUseless
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.candidate-person{
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 2rpx solid #797979;
	.candidate-word{
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: Arial;
		font-size: 32rpx;
		line-height: 40rpx;
	}
	.job-location-wrod{
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: Arial;
		font-size: 28rpx;
		color: #555555;
	}
}
.hover-class{
	background-color: #f7f7f7;
}
</style>