<template>
	<view class="">
		<view class="">
			<view class="item-wrap" v-for="(item,index) in jobInfo" :key="index" @click="goToNewPage(index)">
				<text>{{item.postName}}</text>
				<u-icon size="30" name="arrow-right" color="#b3b3b3"></u-icon>
			</view>
			
		<!-- 	<u-cell-group>
				<view class="wrap1 u-p-r-10 u-p-l-10 u-m-b-20">
					<u-cell-item icon="" :title-style="titleStyle" title="职位1"
					 @click="goToNewPage" index="0"></u-cell-item>
				</view>
			</u-cell-group>
			
			<u-cell-group>
				<view class="wrap1 u-p-r-10 u-p-l-10 u-m-b-20">
					<u-cell-item icon="" :title-style="titleStyle" title="职位2"
					  @click="goToNewPage" index="1"></u-cell-item>
				</view>
			</u-cell-group>
			
			<u-cell-group>
				<view class="wrap1 u-p-r-10 u-p-l-10 u-m-b-20">
					<u-cell-item icon="" :title-style="titleStyle" title="职位3"
					  @click="goToNewPage" index="2"></u-cell-item>
				</view>
			</u-cell-group> -->
		</view>
<!-- 		<view class="btn-wrap u-m-t-50">
			<view class="btn-submit" >
				<u-button :ripple="true" ripple-bg-color="#bba7f3" 
				:custom-style="customStyle" @click="addJob">
					<text class="login">
						添加职位
					</text>
				</u-button>
			</view>
		</view> -->
		
		<view class="btn-bottom"  @click="addJob">
			<text class="bottom-word1">添加职位</text>
		</view>
		
	
		
<!-- 		<view class="btn-submit1">
			<u-button :ripple="true" ripple-bg-color="#909399" shape="circle"
			:custom-style="customStyle1" @click="submit">
				<text class="login">
					发布职位
				</text>
			</u-button>
		</view> -->
		
	</view>
</template>

<script>
export default{
	data(){
		return {
			page: 1,
			jobInfo: [],//岗位的list
			// 标题样式
			titleStyle: {
				fontSize: '32rpx',
				fontFamily: 'Arial',
				color: '#333333'
			},
			// 点击上面按钮样式
			customStyle: {
				height: '80rpx',
				width: '250rpx',
				backgroundColor: '#b7a2f4'
				// background: 'linear-gradient(to right, #b7a2f4, #ebebeb 50%, #b7a2f4)'
			},
			// 点击下面按钮样式
			customStyle1: {
				height: '120rpx',
				width: '750rpx',
				background: 'linear-gradient(to right, #b7a2f4, #ebebeb 50%, #b7a2f4)'
			},
		}
	},
	onLoad() {

	},
	async onShow() {
		this.getJobList()
	},
	async onReachBottom() {
		this.page = this.page + 1
		const res = await this.$u.api.getJobByHrid({
			id: this.vuex_user.openid,
			pageCurrent: this.page,
			pageSize: 10
		})
		this.jobInfo = [...this.jobInfo,...res.data.rows]
	},
	methods: {
		async getJobList(){
			const res = await this.$u.api.getJobByHrid({
				id: this.vuex_user.openid,
				pageCurrent: this.page,
				pageSize: 10
			})
			this.jobInfo = res.data.rows
		},
		// 点击职位跳转到职位页面
		goToNewPage(index){
			// 根据index判断跳转到职位详细页面
			this.$u.route({
				url: 'pages_HR/HR/job/JobDetail',
				params: {
					index: index,
					data: this.jobInfo[index].idUseless
				}
			})
		},
		// 点击添加职位
		addJob(){
			// 根据index判断跳转到职位详细页面
			this.$u.route({
				url: 'pages_HR/HR/job/JobDetail',
			})
		},
		// // 发布职位
		// submit(){
		// 	// 先进行后端数据发送
			
		// 	uni.showToast({
		// 		title: '发布成功',
		// 		icon:"success"
		// 	});
		// }
	}
}
</script>


<style lang="scss" scoped>
	.btn-bottom{
		// position: fixed;
		margin: 0 100rpx 0 100rpx;
		height: 100rpx;
		// bottom: 50rpx;
		// width: 100%;
		width: 550rpx;
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
.btn-wrap{
	display: flex;
	justify-content: center;
	align-items: center;
	.btn-submit{
		// border-radius: ;
		background: linear-gradient(to right, #b7a2f4, #fff 50%, #b7a2f4);
		display: flex;
		justify-content: center;
		align-items: center;
		.login{
			font-size: 40rpx;
			color: #fff;
			font-weight: 500;
		}
	}
}
.btn-submit1{
	position: fixed;
	
	width: 750rpx;
	background: linear-gradient(to right, #b7a2f4, #fff 50%, #b7a2f4);
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 0rpx;
	.login{
		font-size: 40rpx;
		color: #fff;
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