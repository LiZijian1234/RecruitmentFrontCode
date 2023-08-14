<template>
	<view class="">
		<view class="">
<!-- 			<u-cell-group>
				<view class="wrap1 u-p-r-10 u-p-l-10 u-m-b-20">
					<u-cell-item icon="" :title-style="titleStyle" title="编辑公司介绍"
					 @click="goToNewPage" index="0"></u-cell-item>
				</view>
			</u-cell-group> -->
			
			<view class="item-wrap" v-for="(item,index) in list" @click="goToNewPage(index)" :key="index">
				<text>{{item}}</text>
				<u-icon size="30" name="arrow-right" color="#b3b3b3"></u-icon>
			</view>
			
			
<!-- 			<u-cell-group>
				<view class="wrap1 u-p-r-10 u-p-l-10 u-m-b-20">
					<u-cell-item icon="" :title-style="titleStyle" title="岗位介绍"
					  @click="goToNewPage" index="1"></u-cell-item>
				</view>
			</u-cell-group> -->
			
<!-- 			<u-cell-group>
				<view class="wrap1 u-p-r-10 u-p-l-10 u-m-b-20">
					<u-cell-item icon="" :title-style="titleStyle" title="剩余招聘人数"
					  @click="goToNewPage" index="2"></u-cell-item>
				</view>
			</u-cell-group> -->
			
		</view>
		
		<view class="btn-bottom"  style="bottom: 260rpx;" @click="Delete" v-if="jobIduseless" 
		>
			<text class="bottom-word1">删除职位</text>
		</view>
		
		<view class="btn-bottom" style="bottom: 156rpx;" @click="viewJob" v-if="getmsgfromIntro">
			<text class="bottom-word1">预览职位</text>
		</view>
		
		<view class="btn-bottom"  style="bottom: 50rpx;" @click="submit" v-if="getmsgfromIntro">
			<text class="bottom-word1">发布职位</text>
		</view>
		
<!-- 		<view class="btn-submit2" 
		:style="[{bottom: (getmsgfromIntro ? '140rpx' : '0rpx')}]"  @click="Delete()" v-if="jobIduseless">
			<text class="login">
				删除职位
			</text>
		</view> -->
		
<!-- 		<view class="btn-submit1" style="bottom: 140rpx;" @click="viewJob" v-if="getmsgfromIntro">
				<text class="login">
					预览职位
				</text>
		</view> -->
		
<!-- 		<view class="btn-submit1" @click="submit" v-if="getmsgfromIntro">

				<text class="login">
					发布职位
				</text>
			
		</view> -->
		
	</view>
</template>

<script>
export default{
	data(){
		return {
			list: ['岗位介绍','剩余招聘人数'],
			JobInfo: {},
			jobIduseless: '',
			alreadyhasJobInfo: false,
			getmsgfromIntro: false,
			remainNum: '',
			// 标题样式
			titleStyle: {
				fontSize: '32rpx',
				fontFamily: 'Arial',
				color: '#333333'
			},
			customStyle: {
				height: '100rpx',
				backgroundColor: '#'
			},
		}
	},
	// computed: {
	// 	Style: {
	// 		bottom: this.getmsgfromIntro ? '120rpx' : '0rpx'
	// 	}
	// },
	async onLoad(options) {
		// let index = parseInt(options.index) +1
		uni.setNavigationBarTitle({
			title: '职位信息'
		});
		if(options.data){
			this.jobIduseless = options.data
			const res = await this.$u.api.getJobDetailByIdUseless(this.jobIduseless)
			console.log(res);
			if(res.data[0].remainRecruitmentMember != null && res.data[0].remainRecruitmentMember != ''){
				this.remainNum = res.data[0].remainRecruitmentMember
			}
		}
		console.log(111)

		
	},
	onShow() {
		let that = this
		// 监听自定义事件
		uni.$on('jobInfo',function(data){
			that.getmsgfromIntro = true
			console.log(data)
			that.alreadyhasJobInfo = data.alreadyhasJobInfo
			console.log(that.alreadyhasJobInfo)
			that.JobInfo = data.params
		})
		uni.$on('remainNum',function(data){
			that.getmsgfromIntro = true
			console.log('接收到的data',data);
			that.remainNum = data.remainNum
		})
		
	},
	onUnload(){
		uni.$off('jobInfo')
		uni.$off('remainNum')
	},
	methods: {
		// 点击预览职位
		viewJob(){
			console.log(11);
			if(this.remainNum == '' || this.remainNum == null){
				uni.showToast({
					icon:"error",
					title:'请输入剩余人数'
				})
				return
			}
			this.JobInfo.remainRecruitmentMember = this.remainNum
			// let that = this
			// uni.$emit('viewJob',{
			// 	params: that.JobInfo
			// })
			let item = encodeURIComponent(JSON.stringify(this.JobInfo))
			uni.navigateTo({
				url: '/pages_HR/HR/job/viewJob?item=' + item
			})
		},
		goToNewPage(index){
			console.log(index);
			if(index == 0){
				// 跳转到岗位介绍
				
				this.$u.route({
					url: 'pages_HR/HR/job/jobIntro',
					params:{
						jobIduseless: this.jobIduseless
					}
				})
			}
			else if(index == 1){
				

				this.$u.route({
					url: 'pages_HR/HR/job/remainJobNum',
					params:{
						remainNum: this.remainNum
					}
				})
			

				

			}
		},
		// 点击发布
		async submit(){
			console.log('是already吗',this.alreadyhasJobInfo);
			if(this.remainNum == '' || this.remainNum == null){
				uni.showToast({
					icon:"error",
					title:'请输入剩余人数'
				})
				return
			}
			this.JobInfo.remainRecruitmentMember = this.remainNum
			console.log('用于提交的info',this.JobInfo);
			// 有信息了，用put
			if(this.alreadyhasJobInfo){
				
				const res = await this.$u.api.putJobByJobIdUseless(this.JobInfo)
				uni.showToast({
					icon:"success",
					title:'修改发布成功'
				})
			}else{
				console.log(this.JobInfo)
				const res1 = await this.$u.api.postJobByHrId(this.JobInfo)
				uni.showToast({
					icon:"success",
					title:'发布成功'
				})
			}
		},
		// 点击删除岗位
		async Delete(){
			if(this.jobIduseless){
				const res = await this.$u.api.deleteJobByIduseless(this.jobIduseless)
				console.log(res)
				console.log('已经删除成功');
				if(res.data == true){
					uni.showToast({
						icon:"success",
						title:'删除成功'
					})
				}else if(res.data == false){
					uni.showToast({
						icon:"error",
						title:'删除失败'
					})
				}
			}
		}
	}
}
</script>
<style>
	
</style>
<style lang="scss" scoped>
	.btn-bottom{
		position: fixed;
		margin: 0 50rpx 0 50rpx;
		height: 100rpx;
		bottom: 50rpx;
		// width: 100%;
		width: 650rpx;
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
.wrap1{
	background-color: #ffffff;
}

.btn-submit1{
	position: fixed;
	width: 750rpx;
	background: linear-gradient(to right, #b7a2f4, #fff 50%, #b7a2f4);
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 0rpx;
	height: 120rpx;
	.login{
		font-size: 40rpx;
		color: #c6c6c6;
		// color: #;
		font-weight: 500;
	}
}
.btn-submit2{
	position: fixed;
	width: 750rpx;
	background: linear-gradient(to right, #b7a2f4, #fff 50%, #b7a2f4);
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 120rpx;
	height: 120rpx;
	.login{
		font-size: 40rpx;
		color: #c6c6c6;
		// color: #;
		font-weight: 500;
	}
}
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