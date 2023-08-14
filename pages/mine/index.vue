<template>
	<page-meta :root-font-size="`${0.5 * baseFontSize}px`"></page-meta>
	<view class="content">
		<view class="top-background">
			<button @click="getUserprofile" v-if="!isLoginIn">登录</button>
			<view class="top-wrap" v-if="isLoginIn">
				<view class="">
					<u-avatar size="110" :src="vuex_user.headPortrait"></u-avatar>
				</view>
				<view class="right-wrap">
					<!-- <text id="text3"> {{vuex_user.nickName ? vuex_user.nickName : ''}}</text> -->
					<text id="text1" @click="toResume">创建简历</text>
					<text id="text2">在线简历</text>
				</view>
			</view>
		</view>
		<view class="middle-wrap" style="position: relative;">
			<view class="inner-warp">
				<text class="myservice">我的服务</text>
				<view class="inner-bottom-wrap">
					<view class="u-flex-col" @click="upLoadResume()">
						<text class="iconfont icon-resume size"></text>
						<text  class="center">上传简历</text>
					</view>
					<view class="u-flex-col" @click="postReply()">
						<text class="iconfont icon-a-youjianchakanyoujianfasongyoujianshouyoujian-07 size"></text>
						<text  class="center">投递反馈</text>
					</view>
					<view class="u-flex-col" @click="myFavorite">
						<text class="iconfont icon-shoucang size"></text>
						<text  class="center">我的收藏</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-wrap">
			<text class="myservice">了解更多</text>
			<view class="botton-inner-top">
				<view class="u-flex-col" @tap="toResumeHelp">
					<text class="iconfont icon-jianli size"></text>
					<text class="center">简历辅导</text>
				</view>
				<view class="u-flex-col" @tap="toSkillTrain">
					<text class="iconfont icon-boshimao size"></text>
					<text  class="center">技能培训</text>
				</view>
				<view class="u-flex-col" @tap="toFangzha">
					<text class="iconfont icon-police size"></text>
					<text  class="center">防诈宣传</text>
				</view>
			</view>
			<view class="botton-inner-bottom">
				<view class="u-flex-col" @tap="toLawConsult">
					<text class="iconfont icon-tianping size"></text>
					<text  class="center">法律咨询</text>
				</view>
				<view class="u-flex-col" @click="hirePeople()">
					<text class="iconfont icon-zhaopin size"></text>
					<text  class="center">我要招人</text>
				</view>
				<view class="u-flex-col" @click="setting()">
					<text class="iconfont icon-shezhi size"></text>
					<text  class="center">设置中心</text>
				</view>
			</view>
			<view class="third-row">
				<view class="u-flex-col" @click="toYingzhang()">
					<text class="iconfont icon-zu132 size"></text>
					<text  class="center">成为营长</text>
				</view>
			</view>
		</view>
		
		<!-- <button @click="logout">退出登录</button> -->
<!-- 		<view class="" @click="chooseImg" v-if="vuex_resume_img !== ''">
			<u-avatar  slot="addBtn" :src="vuex_resume_img" size="150"></u-avatar>
		</view>
		<view v-else>
			<text class="iconfont icon-camera" @click="chooseImg"></text>
		</view> -->

		
<!-- 		<u-avatar  
		src="https://wen-second.oss-cn-hangzhou.aliyuncs.com/img/2022/06/01/0ba51830-78bf-46ee-95b3-75aab7cc3aa6.png" 
		size="150"></u-avatar> -->
<!-- 		<view class="u-m-t-30 u-m-r-30 u-m-l-30 options-box">
			<u-cell-group>
				<u-cell-item icon="order" icon-size="40" :icon-style="iconStyle" title="填写简历" :title-style="titleStyle" @click="goPaper"></u-cell-item>
				<u-cell-item icon="star-fill" icon-size="40" :icon-style="iconStyle" title="我的帖子" :title-style="titleStyle"></u-cell-item>
				<u-cell-item icon="chat" icon-size="40" :icon-style="iconStyle" title="联系我们" :title-style="titleStyle"></u-cell-item>
				<u-cell-item icon="account" icon-size="40" :icon-style="iconStyle" title="客服中心" :title-style="titleStyle"></u-cell-item>
				<u-cell-item icon="edit-pen" icon-size="40" :icon-style="iconStyle" title="关于我们" :title-style="titleStyle"></u-cell-item>
			</u-cell-group>
		</view> -->
	</view>
</template>

<script>
// import { setTokenStorage } from '../../utils/token';//设置存储
import { setTokenStorage } from '@/utils/token.js';//设置存储
// import logger from '../../utils/logger';//日志
import logger from '@/utils/logger.js';//日志
import { genTestUserSig } from '@/debug/GenerateTestUserSig.js';
// import { genTestUserSig } from '../../debug/GenerateTestUserSig.js';//返回的sdkappid和usersig
// const { getTokenStorage } = require('../../utils/token.js');//获取存储storage
const { getTokenStorage } = require('@/utils/token.js');//获取存储storage
const app = getApp();

	export default {
		data() {
			return {
				userIDs: '',
				userID: '',
				isSDKReady: false,
				isLoginIn : false,
				// iconStyle:{
				// 	color: '#007be5'
				// },
				// titleStyle:{
				// 	fontSize: '30rpx',
				// 	fontFamily: '微软雅黑'
				// }
			}
		},
		computed:{
			baseFontSize() {
			    return this.vuex_fontScale
			}
		},
		onLoad() {
			if(this.vuex_user.openid){
				this.isLoginIn = true
			}
			// 执行this.$u.utils.isLogin()，为false就是没有登录，就显示登录的btn
			const openid = this.vuex_user.openid
			console.log("onLoad时的openid为",openid);
			// if(!openid){
			// 	this.showLoginBtn = true
			// }

			// 监听退出登录事件
			uni.$on('logout',data =>{
				console.log('监听到事件来自 logout ，携带参数 为：' + data);
				this.isLoginIn = false
			})
		},
		methods: {
			// 点击成为营长
			async toYingzhang(){
				if(!this.vuex_user.openid){
					await this.$u.utils.goToLogin()
					return 
				}else{
					console.log('进入营长认证');
					this.$u.route({
						url: 'pages_mine/mine/yingZhangAuth'
					})
					return
				}
			},
			// 退出登录
			logout(){
				uni.clearStorage()
				this.isLoginIn = false
				console.log(this.vuex_user.openid == true);
			},
			// chooseImg(){
			// 	const _this = this
			// 	uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album'], //从相册选择
			// 		success: (res) => {
			// 			 const tempFilePaths = res.tempFilePaths;
			// 			 const uploadTask = uni.uploadFile({
			// 				  url : 'https://101.42.168.114/OSSOpration/upload/img',
			// 				  filePath: tempFilePaths[0],
			// 				  name: 'file',
			// 				  success: uploadFileRes=> {
			// 				   console.log('uploadfile的返回结果',JSON.parse(uploadFileRes.data).data);
			// 				   let imgsrc = JSON.parse(uploadFileRes.data).data
			// 				   _this.imgSrc = imgsrc
			// 				   _this.$u.vuex('vuex_resume_img',imgsrc)
			// 				  }
			// 			 });
			// 		},
   //              });
			// },
			// 点击登录
			async getUserprofile(){
				await this.$u.utils.ToLogin()
				const res = await this.$u.api.getResumeOnline(this.vuex_user.openid)
				console.log('简历的data',res.data);
				if(res.data != null){
					console.log(res.data.realname != null);
					let obj = this.vuex_user
					obj.hasResume = true
					this.$u.vuex('vuex_user',obj)
				}
				
				console.log(this.vuex_user);
				// 设置消息模块需要的
				this.userIDs = this.vuex_user.idUseless.toString()
				const userID = this.userIDs;
				const userSig = genTestUserSig(userID).userSig;
				const SDKAppID = app.globalData.SDKAppID;
				logger.log(`TUI-login | login  | userSig:${userSig} userID:${userID}`);
				
				uni.$aegis.reportEvent({
				    name: 'platform',
				    ext1: 'platform-MP-WEIXIN',
				    ext2: 'uniTuikitExternal',
				    ext3: `${SDKAppID}`,
				})
				
				app.globalData.userInfo = {
					userSig,
					userID
				};
				setTokenStorage({
					userInfo: app.globalData.userInfo
				});
				
				wx.setStorageSync(`TIM_${getApp().SDKAppID}_isTUIKit`, true);
				// 用户登录
				uni.$TUIKit.login({//用户登录需要userID和userSig
					userID: userID,
					userSig: userSig
				}).then(() => {
					
					// // 监听isSDKReady事件，接收数据
					// uni.$on('isSDKReady', value => {
					// 	this.isSDKReady = value.isSDKReady;
					// });
					// 更新用户消息的头像和名字

					
					uni.$aegis.reportEvent({
					    name: 'login',
					    ext1: 'login-success',
					    ext2: 'uniTuikitExternal',
					    ext3: `${SDKAppID}`,
					})
					
					this.isLoginIn = true
					
					
				}).catch((error) => {
					uni.$aegis.reportEvent({
					    name: 'login',
					    ext1: `login-failed#error:${error}`,
					    ext2: 'uniTuikitExternal',
					    ext3: `${SDKAppID}`,
					})
				})
				
			},
			// 设置中心
			async setting(){
				if(!this.vuex_user.openid){
					await this.$u.utils.goToLogin()
					
					return 
				}else{
					this.$u.route({
						url: 'pages_mine/mine/goToSetting'
					})
					return
				}
			},
			// 我的收藏
			async myFavorite(){
				if(!this.vuex_user.openid){
					await this.$u.utils.goToLogin()
					// this.$u.route({
					// 	url: 'pages_mine/mine/myFavorite'
					// })
					return 
				}else if(this.vuex_user.hasResume == undefined || this.vuex_user.hasResume == false || this.vuex_user.hasResume == null){
					uni.showToast({
						icon: 'error',
						title: '请填写在线简历'
					})
					return
				}else{
					this.$u.route({
						url: 'pages_mine/mine/myFavorite'
					})
				}
			},
			// 点击上传文件简历
			async upLoadResume(){
				
				if(!this.vuex_user.openid){
					await this.$u.utils.goToLogin()
					
					return 
				}else if(!this.vuex_user.hasResume){
					uni.showToast({
						icon:'error',
						title:'请先填写在线简历'
					})
					return
				}
				this.$u.route({
					url: 'pages_mine/mine/resumeUpload'
				})
			},
			// 点击上传在线简历
			async toResume(){
				if(!this.vuex_user.openid){
					await this.$u.utils.goToLogin()
					// this.$u.route({
					// 	url: 'pages_mine/mine/resumeOnline'
					// })
					return 
				}else{
					this.$u.route({
						url: 'pages_mine/mine/resumeOnline'
					})
					return
				}
			},
			// 点击我要招人，跳转到HR界面
			async hirePeople(){
				if(!this.vuex_user.openid){
					await this.$u.utils.goToLogin()
					return 
					// 如果HR已经认证过了并且后台人员审核通过了，
					// 就直接调到HR管理界面.
					// 没有审核通过,HR想要修改公司内容也要跳转到认证页面,跳转到认证页面之后,填写页面之后不能直接跳转
					// 而是要发给后台审核.
				}
				
				const {data} = await this.$u.api.getHRAuth(this.vuex_user.openid)
				
				if(data.length != 0 && data[0].status == 1){
					this.$u.route({
						// url: 'pages/HR/HRAuth'
						url: 'pages_HR/HR/HRBackManage'
					})
					return
				}
				else if(data.length == 0 || data[0].status == 0){
					uni.showModal({
						title: '提示',
						content: '显示您未进行公司认证，请确定是否要进行认证',
						success: (confirm,cancel)=>{
							if(confirm){
								console.log('用户点击确定了');
								// 后台还没有审核通过时跳转
								this.$u.route({
									// url: 'pages/HR/HRAuth'
									url: 'pages_HR/HR/HRAuth'
								})
							}
							if(cancel){
								console.log('用户点击取消了');
							}
						},
					})
					return
				}

			},
			// 投递反馈
			async postReply(){
				if(!this.vuex_user.openid){
					await this.$u.utils.goToLogin()
					// this.$u.route({
					// 	url: 'pages_mine/mine/myFavorite'
					// })
					return 
				}else if(this.vuex_user.hasResume == undefined || this.vuex_user.hasResume == false || this.vuex_user.hasResume == null){
					uni.showToast({
						icon: 'error',
						title: '请填写在线简历'
					})
					return
				}else{
					this.$u.route({
						url: 'pages_mine/mine/postReply'
					})
				}

			},
			toResumeHelp(){
				uni.navigateTo({
					url: '/pages_mine/mine/resumeHelp/resumeHelp'
				})
			},
			toSkillTrain(){
				uni.navigateTo({
					url: '/pages_mine/mine/skillTrain/skillTrain'
				})
			},
			toFangzha(){
				uni.navigateTo({
					url: '/pages_mine/mine/fangzha/fangzha'
				})
			},
			toLawConsult(){
				uni.navigateTo({
					url: '/pages_mine/mine/lawConsult/lawConsult'
				})
			}
		}
	}
</script>
<style>
page{
	background-color: #f8f8f8;
}
</style>

<style lang="scss" scoped>
	.icon-camera{
		color: #b7a2f4;
		font-size: 55rpx;
	}
.avatar{
	position: absolute;
	width: 150rpx;
	height: 150rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: #fff;
	border: 1rpx solid #797979;
	bottom: -75rpx;
	left: 300rpx;

}
		// .top-wrap{
		// 	height: 300rpx;
		// 	width: 100%;
		// 	background-color: #9473ef;
		// 	display: flex;
		// 	justify-content: center;
		// 	align-items: center;
		// 	.login-btn{
		// 		width: 350rpx;
		// 		margin-top: 80rpx;
		// 	}
		// }
		// .white-box{
		// 	background-color: #ffffff;
		// 	border-radius: 20rpx;
		// 	display: flex;
		// 	flex-direction: column;
		// 	align-items: flex-start;
		// 	margin: 0 30rpx 0 30rpx;
		// 	height: 200rpx;
		// 	.my-job-text{
		// 		padding-left: 30rpx;
		// 		padding-top: 30rpx;
		// 	}
		// 	.options-wrap{
		// 		width: 100%;
		// 		display: flex;
		// 		justify-content: space-around;
		// 		view{
		// 			margin-top: 50rpx;
		// 		}
		// 	}
		// }
		// .options-box{
		// 	border-radius: 20rpx;
		// }
	.top-background{
		display: flex;
		align-items: center;
		width: 100%;
		height: 400rpx;
		background-color: #7573e6;
		
	}
	.top-wrap{
		margin-left: 100rpx;
		display: flex;
		.right-wrap{
			display: flex;
			flex-direction: column;
			margin-left: 60rpx;
			color: #FFFFFF;
			#text3{
				font-family: 'Arial';
				font-size: 20rem;
			}
			#text1{
				margin-bottom: 30rpx;
				font-family: 'Arial';
				font-weight: bold;
				font-size: 42rem;
			}
			#text2{
				font-size: 28rem;
				font-family: 'Arial';
			}
		}
	}
	.middle-wrap{
		margin-bottom: 220rem;
		.inner-warp{
			position: absolute;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			height: 230rem;
			width: 650rpx;
			margin: 0 50rpx 40rpx 50rpx;
			top: -50rpx;
			left: 0;
			border-radius: 30rpx;
			border: 1rpx solid #D7D7D7;
			.myservice{
				font-family: 'Arial';
				color: #333333;
				display: block;
				margin: 20rpx 0 22rpx 50rpx;
				font-weight: 600;
				font-size: 29rem;
			}
			.inner-bottom-wrap{
				display: flex;
				justify-content: space-around;
			}
		}
	}
	.bottom-wrap{
		width: 650rpx;
		margin: 0 50rpx 40rpx 50rpx;
		height: 520rem;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border: 1rpx solid #D7D7D7;
		border-radius: 30rpx;
		.myservice{
			font-family: 'Arial';
			color: #333333;
			display: block;
			margin: 20rpx 0 22rpx 50rpx;
			font-weight: 600;
			font-size: 29rem;
		}
		.botton-inner-top{
			display: flex;
			justify-content: space-around;
		}
		.botton-inner-bottom{
			display: flex;
			justify-content: space-around;
		}
	}
	.size{
		color: #9473ef;
		font-size: 60rem;
		text-align: center;
	}
	.center{
		text-align: center;
		margin-top: 20rem;
		margin-bottom: 30rem;
		color: #333333;
		font-family: "Arial";
		font-size: 28rem;
	}
.third-row{
	display: flex;
	justify-content: flex-start;
	margin-left: 50rpx;
}
</style>
