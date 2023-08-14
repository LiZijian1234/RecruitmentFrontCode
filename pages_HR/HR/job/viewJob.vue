<template>
	<view class="">
		<view class="u-m-50">
			<view class="u-flex u-flex-col job-top-trap">
				<view class="" style="display: flex; flex-direction: column; width: 100%;">
					<view class="top-wrap1" style="display: flex;flex-direction: column;">
										
						<view class="left-box" style="display: flex;justify-content: space-between;">
							<text class="job-name u-m-b-30">{{data.postName}}</text>
							<view class="">
								<text style="font-size: 34rpx;font-weight: bold;font-family: Arial;">剩余数量: {{data.remainRecruitmentMember != null ? data.remainRecruitmentMember: '无'}}</text>
							</view>
<!-- 							<view class="">
								<view class="position-fixed" @click="goTOFavorite">
									<text class="iconfont icon-shoucang1" v-if="!isFavorite"
									style="font-size: 40rpx;
									color: #9473ef;
									:color: isFavorite ? #9473ef : #ef8e76
									display: flex;
									 justify-content: center;"></text>
									 
									 <text class="iconfont icon-shoucang1" v-if="isFavorite"
									 style="font-size: 40rpx;
									 color: #ef8e76;
									 display: flex;
									  justify-content: center;"></text>
									
									<text class="text111" style="font-size: 28rpx;">{{isFavorite ? '已收藏' : '收藏'}}</text>
								</view>
							</view> -->
						</view>
						<view class="" style="display: flex; justify-content:space-between; ">
							<view class="" style="display:flex; flex-wrap: wrap;margin-bottom: 20rpx;">
								<view class="" 
		style="border-radius: 10rpx;display:flex; flex-wrap:wrap; padding: 5rpx 8rpx 5rpx 8rpx;background-color: #e5e5e5;margin-right: 15rpx;margin-top:15rpx;" 
								v-for="(item,index) in data.postWelfare" :key="index">
									{{item}}
								</view>
							</view>
							<!-- <text  class="job-postWelfare u-m-b-30"  v-for="(item,index) in test">{{item}} </text> -->
							<!-- <text class="job-postWelfare u-m-b-30">{{test.postWelfare}}</text> -->
							<text class="job-salary u-m-b-30" v-if="data.hiringTime == '长期'">{{data.monthSalary}}元/月</text>
							<text class="job-salary u-m-b-30" v-if="data.hiringTime == '日结'">{{data.monthSalary}}元/天</text>
						</view>
					</view>
					<text class="job-salary-down-word u-m-b-30">
						<text>经验{{data.workExperienceRequirement != null ?  data.workExperienceRequirement : ''}}</text>
						<text class="u-p-l-10 u-p-r-10">|</text>
						<text>学历{{data.educationRequirpxent != null ?  data.educationRequirpxent : ''}}</text>
						<text  class="u-p-l-10 u-p-r-10">|</text>
						<text>招聘{{data.recruitmentMember != null ? data.recruitmentMember : ''}}</text>
						
					</text>
				</view>

				
<!-- 				<view class="meal-warp  u-m-b-30 u-m-t-30" v-for="(item1,index1) in TaghasValueNum" 
				:key="index1">
					<text class="iconfont icon-liwu"></text>
					<text class="meal-word">
						{{item1}}
					</text>
				</view> -->
			</view>
			
			<view class="comp-wrap" @click="compDetail">
				<view class="" style="display: flex; flex-direction:column">
					<text class="comp-name">{{compInfo.corporationName}}</text>
					<view class="comp-detail">
						<text>{{compInfo.corporationNature}}</text>
						<text class="u-p-l-10 u-p-r-10">|</text>
						<text >{{compInfo.corporationEmployees}}</text>
						<text class="u-p-l-10 u-p-r-10">|</text>
						<text>{{compInfo.corporationIndustry}}</text>
					</view>

				</view>
<!-- 				<u-avatar :src="compInfo.corporationPicture1" 
				mode="square" size="120"></u-avatar> -->
				<u-image :src="compInfo.corporationPicture1" mode="scaleToFill" width="120rpx" height="120rpx"></u-image>
			</view>
			
			
			<view class="job-detail-wrap u-flex u-flex-col ">
				<view class="top-wrap-discript">
					<text class="job-detail u-m-b-30 u-m-t-30">职位描述</text>
					<view class="">
						<view class="position-fixed" >
							<text class="iconfont icon-shoucang1" v-if="!isFavorite"
							style="font-size: 40rpx;
							color: #9473ef;
							:color: isFavorite ? #9473ef : #ef8e76
							display: flex;
							 justify-content: center;"></text>
							 
							 <text class="iconfont icon-shoucang1" v-if="isFavorite"
							 style="font-size: 40rpx;
							 color: #ef8e76;
							 display: flex;
							  justify-content: center;"></text>
							
							<text class="text111" style="font-size: 28rpx;">{{isFavorite ? '已收藏' : '收藏'}}</text>
						</view>
					</view>
				</view>

				<text class="job-content job-mid-word" style="font-weight: bold;">工作内容:</text>
				<text class="job-content job-mid-word u-p-l-10" style="display: block;margin-left: 17rpx;">{{data.postTask != null ? data.postTask : ''}}</text>
				
				<text class="skillRequirpxent job-mid-word" style="font-weight: bold;padding-top: 23rpx">职位要求：</text>
				<text class="skillRequirpxent job-mid-word " style="display: block;margin-left: 17rpx;">{{data.skillRequirement != null ? data.skillRequirement : ''}}</text>
				<text class="job-time job-mid-word" style="font-weight: bold;">工作时间: </text>
				<text class="job-time job-mid-word u-p-l-10" style="display: block; padding-bottom: 150rpx;margin-left: 17rpx;">{{data.sapareDayMonth != null ? data.sapareDayMonth : '无'}}</text>
				<!-- <text class="job-money job-mid-word">福利待遇: {{data.postWelfare}}</text> -->
			</view>
			<!-- 上传按钮 -->
<!-- 			<view class="btn-wrap">
				<u-button :custom-style="btnStyle" @click="submitJob">
					<text class="save">马上申请</text>
				</u-button>
			</view> -->
			<!-- 公司详情 -->
<!-- 			<view class="bottom-wrap u-flex u-flex-col">
				<text class="comp-detail u-m-b-30" @click="compDetail">公司详情</text>
				<view class="auth-wrap">
					<text class="iconfont icon-shoucang"></text>
					<text class="auth-company">认证企业</text>
				</view>
			</view> -->
		</view>
		
<!-- 		<view class="bottom-fix">
			<view class="u-flex u-flex-col shareBtn-wrap" >
				<text class="iconfont icon-fenxiang" :style="{'fontSize': iconfontsize + 'px' }"></text>
				<text class="bottom-word">分享</text>
				<u-button id="shareBtn" open-type="share"></u-button>
			</view>
			<view class="u-flex u-flex-col" @tap="toChat">
				<text class="iconfont icon-liaotianduihua" :style="{'fontSize': iconfontsize + 'px' }"></text>
				<text class="bottom-word">聊一聊</text>
			</view>
			<view class="u-flex u-flex-col" @tap="this.showPopUp = true">
				<text class="iconfont icon-dianhua" :style="{'fontSize': iconfontsize + 'px' }"></text>
				<text class="bottom-word">打电话</text>
			</view>
			<view class="apply-wrap">
				<u-button :custom-style="btnStyleApply" @click="submitJob" shape="square">
					<text class="apply-job">申请职位</text>
				</u-button>
			</view>
		</view> -->
		
		
		<!-- popup弹出 -->
<!-- 		<u-popup v-model="showPopUp" mode="center" width="500rpx" height="250rpx" border-radius="30">
			<view style="padding: 15rpx;display: flex;justify-content: space-around;align-items: center;width: 100%;height: 160rpx;">
				<text style="font-size: 30rpx;font-family: '等线';">电话：</text>
				<text style="font-size: 30rpx;font-family: '等线';">{{compInfo.corporationConnectionPhone != null ? compInfo.corporationConnectionPhone : '无电话'}}</text>
				<view class="view-class"  hover-class="hover-type" @click="copy()">
					<text>复制</text>
				</view>
			</view>
			<view class="" @click="this.showPopUp=false" style="width: 100%; height: 90rpx;  border-top: 1rpx solid #a2a2a2;color:#a2a2a2;display: flex;justify-content: center;align-items: center;">
				确认
			</view>
		</u-popup> -->
	</view>
</template>

<script>
export default {
	data(){
		return {
			test: [],
			showPopUp: false,//显示弹出层
			sharerId: '',//分享人的id
			tagList: [],//标签的list
			data: {},//请求的数据
			compInfo: {},//公司信息
			hrid: '',//hr的id
			hriduseless:'',
			TaghasValueNum: [],
			isFavorite: false,
			jobIdUseless: '',//工作的iduseless
			// 提交按钮的样式
			btnStyleApply: {
				backgroundColor: '#8080ff',
				width: '250rpx'
			},
			btnStyle: {
				backgroundColor: '#b7a2f4',
			}
		}
	},
	async onLoad(options) {
		this.data = JSON.parse(decodeURIComponent(options.item));
		const res = await this.$u.api.getCompInfo(this.vuex_user.openid)
		
		this.compInfo = res.data[0]
		
		
		
		
		this.data.postWelfare = JSON.parse(this.data.postWelfare)
		
		
		// let that = this
		// uni.$on('viewJob',data => {
		// 	console.log('接收到的data',data);
		// 	that.data = data.params
		// })
	},
	onUnload(){
		// uni.$off('viewJob',)
	},
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>
	.top-wrap-discript{
		width: 650rpx;
		align-items: center;
		display: flex;
		justify-content: space-between;
		
	}
.comp-wrap{
	    margin: 0rpx 0 20rpx 0;
	// height: 250rpx;
	border: 3rpx solid #D7D7D7;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 28rpx;
	border-radius: 16rpx;
	.comp-name{
		padding-left: 10rpx;
		font-family: '等线';
		font-weight: bold;
		padding-bottom: 13rpx;
		color: #000000;
		font-size: 40rpx;
		line-height: 36rpx;
	}
	.comp-detail{
		font-family: '等线';
		color:#555555;
		font-size: 28rpx;
		line-height: 35rpx;
	}
}
	.job-salary-down-word{
		font-family: Arial;
		color: #333333;
		font-size: 28rpx;
	}	
.position-fixed{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 150rpx;
	height: 30rpx;
	.text111{
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 5rpx;
	}
}
.job-top-trap{
	align-items: flex-start;
	.top-wrap1{
		justify-content: space-between;
		width: 100%;
	}
		.job-name{
			font-family: '等线';
			font-weight: 700;
			font-size: 36rpx;
			
		}
		.u-flex222{
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.icon-shoucang1{
				font-size: 40rpx;
				color: #9473ef;
				
			}
			.word-1111{
				font-size: 28rpx;
				font-family: Arial;
				
			}
		}
		
	
	.job-salary{
		font-family: Arial;
		color: #D9001B;
		line-height: 44rpx;
		font-size: 32rpx;
		display: flex;
		flex-wrap: nowrap;
		// width: 150rpx;
	}
	
	.job-postWelfare{
		font-family: Arial;
		color: #333333;
		font-size: 28rpx;
		margin-right: 80rpx;
		background-color: #e5e5e5;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.meal-warp{
		height: 50rpx;
		border: 1rpx solid #797979;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		.icon-liwu{
			color: #b7a2f4;
			font-size: 36rpx;
		}
		.meal-word{
			font-size: 28rpx;
			color: #0000FF;
		}
	}
}
.job-detail-wrap{
	// margin-bottom: 400rpx;
	align-items: flex-start;
	.job-detail{
		font-family: Arial;
		font-weight: 700;
		font-size: 36rpx;
		line-height: 34rpx;
	}
	.job-mid-word{
		padding-left: 10rpx;
		font-family: Arial;
		color: #333333;
		font-size: 30rpx;
		line-height: 50rpx;
	}
}
.btn-wrap{
	margin: 50rpx 70rpx 0rpx 70rpx;
	width: auto;
	height: 150rpx;
	.save{
		color: #FFFFFF;
		font-size: 30rpx;
	}
}
.bottom-wrap{
	
	align-items: flex-start;
	.comp-detail{
		font-family: Arial;
		font-weight: 700;
		font-size: 36rpx;
		line-height: 34rpx;
	}

	.auth-wrap{
		height: 50rpx;
		border: 1rpx solid #797979;
		border-radius: 30rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-bottom: 300rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon-shoucang{
			color: #b7a2f4;
			font-size: 28rpx;
		}
		.auth-company{
			color: #333333;
			font-size: 28rpx;
		}
	}
}
.bottom-fix{
	display: flex;
	position: fixed;
	bottom: 0rpx;
	width: 100%;
	background-color: #fff;
	justify-content: space-between;
	padding: 0 40rpx 0 40rpx;
	.icon-fenxiang{
		color: #9473ef;
		// font-size: 50rpx;
	}
	.icon-liaotianduihua{
		color: #9473ef;
		font-size: 50rpx;
	}
	.icon-dianhua{
		color: #9473ef;
		font-size: 50rpx;
	}
	.shareBtn-wrap{
		position: relative;
	}
	.bottom-word{
		font-size: 30rpx;
		color: #333333;
		font-family: Arial;
	}
	#shareBtn{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
	.apply-wrap{
		display: flex;
		justify-content: center;
		align-items: center;
		.apply-job{
			color: #FFF;
			font-size: 30rpx;
		}
	}

}
</style>