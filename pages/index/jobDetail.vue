<template>
	<page-meta :root-font-size="`${baseFontSize}px`"></page-meta>
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
									
									<text class="text111" style="font-size: 28rem;">{{isFavorite ? '已收藏' : '收藏'}}</text>
								</view>
							</view> -->
						</view>
						<view class="" style="display: flex; justify-content:space-between; ">
							<view class="" style="display:flex; flex-wrap: wrap;margin-bottom: 20rpx;width: 520rpx;">
								<view class="" 
		style="display:flex; flex-wrap:wrap; padding: 5rpx 8rpx 5rpx 8rpx;background-color: #e5e5e5;margin-right: 15rpx;margin-top:15rpx;border-radius: 10rpx;" 
								v-for="(item,index) in tagList" :key="index">
									{{item}}
								</view>
							</view>
							<!-- <text  class="job-postWelfare u-m-b-30"  v-for="(item,index) in test">{{item}} </text> -->
							<!-- <text class="job-postWelfare u-m-b-30">{{test.postWelfare}}</text> -->
							<text class="job-salary u-m-b-30" v-if="isWork">{{data.monthSalary ? data.monthSalary : ''}}元/月</text>
							<text class="job-salary u-m-b-30" v-if="!isWork">{{data.daySalary ? data.daySalary : ''}}元/天</text>
						</view>
					</view>
					<text class="job-salary-down-word u-m-b-30">
						<text>经验{{data.workExperienceRequirement != null ?  data.workExperienceRequirement : ''}}</text>
						<text class="u-p-l-10 u-p-r-10">|</text>
						<text>学历{{data.educationRequirement != null ?  data.educationRequirement : ''}}</text>
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
				<u-image :src="compInfo.corporationPicture1" mode="scaleToFill" width="120rem" height="120rem" border-radius="10"></u-image>
			</view>
			
			
			<view class="job-detail-wrap u-flex u-flex-col ">
				<view class="top-wrap-discript">
					<text class="job-detail u-m-b-30 u-m-t-30">职位描述</text>
					<view class="">
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
							
							<text class="text111" style="font-size: 28rem;">{{isFavorite ? '已收藏' : '收藏'}}</text>
						</view>
					</view>
				</view>

				<text class="job-content job-mid-word" style="font-weight: bold;">工作内容:</text>
				<text class="job-content job-mid-word u-p-l-10" style="display: block;margin-left: 17rpx;">{{data.postTask != null ? data.postTask : ''}}</text>
				
				<text class="skillRequirement job-mid-word" style="font-weight: bold;padding-top: 23rpx">职位要求：</text>
				<text class="skillRequirement job-mid-word " style="display: block;margin-left: 17rpx;">{{data.skillRequirement != null ? data.skillRequirement : ''}}</text>
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
		
		<view class="bottom-fix">
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
		</view>
		
		
		<!-- popup弹出 -->
		<u-popup v-model="showPopUp" mode="center" width="500rpx" height="250rpx" border-radius="30">
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
		</u-popup>
	</view>
</template>

<script>
export default {
	data(){
		return {
			isWork: true,
			test: [],
			showPopUp: false,//显示弹出层
			sharerId: '',//分享人的id
			tagList: [],//标签的list
			data: [],//请求的数据
			hrid: '',//hr的id
			hriduseless:'',
			TaghasValueNum: [],
			compInfo: {},//公司信息
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
	computed:{
		baseFontSize() {
		    return this.vuex_fontScale * 0.5
		},
		iconfontsize(){
			if(this.vuex_fontScale == 1){
				return 25
			}else{
				return 40 * this.vuex_fontScale * 0.5
			}
		}
	},
	async onLoad(options) {
		
		console.log(options);
		// options如果不是空对象的话，就请求数据
		if(JSON.stringify(options) !== '{}'){
			// 获取是谁分享的
			if(options.shareid != undefined && options.shareid != '' && options.shareid != null){
				console.log('用户点击分享获取分享人的id',options.shareid);
				
				this.sharerId = options.shareid
				// 存储到vuex里面
				this.$u.vuex('vuex_sharerId', this.sharerId)
			}
			
			this.jobIdUseless = options.iduseless
			const res = await this.$u.api.getJobDetailByIdUseless(options.iduseless)
			this.data = res.data[0]
			this.hrid = res.data[0].id
			
			if(this.data.hiringTime == '日结'){
				this.isWork = false
			}
			
			//用于标签的taglist
			if(res.data[0].postWelfare != null && res.data[0].postWelfare != '' && res.data[0].postWelfare != ' '){
				this.tagList = JSON.parse(res.data[0].postWelfare)
				
			}
			// 获取公司信息
			const res1 = await this.$u.api.getCompInfo(this.hrid)
			this.compInfo = res1.data[0]
			console.log(this.hrid)
			console.log(this.data)
			// this.changePostTag()
			// 获取HR的iduseless,用于和HR聊天
			const { data } = await this.$u.api.getUserIdUseless(this.hrid)
			this.hriduseless = data.idUseless
			
			// uni.request({
			// 	url: 'http://101.42.168.114:50000/postPublicated/iduseless/1596372486701',
			// }).then(res1=>{
			// 	console.log(res1);
			// 	console.log('test的res',res1[1].data.data[0].postWelfare);
			// 	this.test = JSON.parse(res1[1].data.data[0].postWelfare)
			// 	console.log(this.test);
			// 	console.log('第一个',this.test[0]);
			// })
			// let test1 = "[五险一金,年终奖金,绩效奖金]"
			// // 一个用户只能评价一个公司一次，进入填写之前要先判断一下有没有评价过
			// // let afterjson = JSON.parse(test1);
			
			// // console.log('afterjson',afterjson);
			// console.log('test1',test1);
		}
		console.log('onLoad');
		
		//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
		wx.showShareMenu({
			withShareTicket:true,
			menus:["shareAppMessage","shareTimeline"]
		})
		// if(this.vuex_user.openid){
		// 	const res = await this.$u.api.getFavJbo(this.vuex_user.idUseless)
				
		// 	for(let value of res.data){
		// 		if(value == this.jobIdUseless){
		// 			console.log('目前已经收藏过了')
		// 			this.isFavorite = true
		// 		}
		// 	}
		// }
	},
	//发送给朋友
	async onShareAppMessage(res) {
		  if(!this.vuex_user.openid){
		  	console.log('openid1',this.vuex_user.openid);
		  	await this.$u.utils.goToLogin()
		  	return
		  }
	      return {
	            title: this.data.postName,  
	            path: `pages/index/jobDetail?iduseless=${this.jobIdUseless}&shareid=${this.vuex_user.openid}`
			}
	},
	async onShow() {
		if(this.vuex_user.openid){
			const res = await this.$u.api.getFavJbo(this.vuex_user.idUseless)
			for(let value of res.data){
				if(value == this.jobIdUseless){
					console.log('目前已经收藏过了')
					this.isFavorite = true
				}
			}
		}
	},
	methods: {
		// 复制电话到剪切板
		copy(){
			if(this.compInfo.corporationConnectionPhone != null && this.compInfo.corporationConnectionPhone != ''){
				uni.setClipboardData({
				   data: this.compInfo.corporationConnectionPhone,//要被复制的内容
				   success:()=>{//复制成功的回调函数
						uni.showToast({//提示
					   title:"复制"+ '电话' +"成功"
					 })
				   }
				})
			}else {
				uni.showToast({
					icon:"none",
					title:'该公司未添加电话'
				})
			}

		},
		// // 点击分享
		// share(){
		// 	if(!this.vuex_user.openid){
		// 		console.log('openid1',this.vuex_user.openid);
		// 		this.$u.utils.goToLogin()
		// 		return
		// 	}
		// 	console.log('openid',this.vuex_user.openid);
		// 	this.onShareAppMessage()
		// },
		// 点击聊天
		toChat(){
			if(!this.vuex_user.openid){
				this.$u.utils.goToLogin()
				return
			}
			console.log('进入聊天的界面');
			console.log('hr的iduseless为',this.hriduseless);
			if(this.vuex_user.idUseless == this.hriduseless){
				uni.showToast({
					icon:"none",
					title: '身份相同，进入聊天失败'
				})
				return
			}
			uni.navigateTo({
				// url: `../../TUI-Chat/chat?conversationID=C2C${this.hriduseless}`
				// url: `/pages/message/TUI-Chat/chat?conversationID=C2C${this.hriduseless}`
				url: `/pages_message/message/TUI-Chat/chat?conversationID=C2C${this.hriduseless}`
				// url: `/pages_message/message/TUI-Chat/chat?conversationID=C2C1`
			});
		},
		// 点击申请职位
		submitJob(){
			//不登录就跳转
			if(!this.vuex_user.openid){
				this.$u.utils.goToLogin()
				return
			}
			// 没有简历也不行，就跳转
			if(!this.vuex_user.hasResume){w
				this.$u.utils.goToResume()
				return
			}
			// if(this.vuex_user.openid = ''){
				
			// }
			this.$u.post(`/hrResumeUser/submitResume?hrId=${this.hrid}&postIduseless=
			${this.jobIdUseless}&resumeId=${this.vuex_user.openid}`)
			.then(res=>{
				console.log(1224763)
				console.log(res)
				if(res.code == 206021){
					if(this.vuex_sharerId != ''){
						
						//下面的是HR不能点击投递其他人分享的页面
						// if(this.vuex_user.identity == 1){
						// 	uni.showToast({
						// 		icon:"none",
						// 		title: 'HR不能投递分享简历哦'
						// 	})
						// 	return 
						// }
						console.log('this.vuex_sharerId',this.vuex_sharerId);
						console.log('this.vuex_user.openid',this.vuex_user.openid);
						console.log('进入给营长添加的操作');
						this.$u.post(`/referrer/creatRecommendedMember
						?referrerId=${this.vuex_sharerId}&recommendMemberId=${this.vuex_user.openid}&recommendedPostiduseless=${this.jobIdUseless}`)
						.then(res=>{
							uni.showToast({
								icon:"success",
								title:'营长推荐成功'
							})
							console.log('成功给营长添加了一个推荐');
							console.log('添加推荐之后的res',res);
							//把推荐人设置为空
							this.$u.vuex('vuex_sharerId', '')
						})
					}else{
						uni.showToast({
							icon:"success",
							title:'投递简历成功!'
						})
					}

				}
				else if(res.code == 206011){
					uni.showToast({
						icon:"error",
						title:'您已经投过简历!'
					})
				}
			})
		},
		// 登录方法
		// async goLogin(){
		// 	await this.$u.utils.ToLogin()
		// 	const res = await this.$u.api.getFavJbo(this.vuex_user.idUseless)
			
		// 	for(let value of res.data){
		// 		if(value == this.jobIdUseless){
		// 			return this.isFavorite = true
		// 		}
		// 	}
		// 	return
			
		// },  
		// 点击收藏
		async goTOFavorite(){
			if(!this.vuex_user.openid){
				this.$u.utils.goToLogin()
				return
			}
			
			if(this.isFavorite == true){
				this.$u.delete(`/userFavoritePost?
				userIduseless=${this.vuex_user.idUseless}&postIduseless=${this.jobIdUseless}`)
				.then((res)=>{
					if(res.data == true){
						uni.showToast({
							icon:"success",
							title:"取消收藏成功"
						})
						this.isFavorite = false
					}
				})
			}
			else if (this.isFavorite == false){
				// 进行数组循环，先判断当前岗位是否收藏，收藏的话就设置为true，然后根据true或者false调用响应方法
				this.$u.post(`/userFavoritePost/createUserFavoritePost?
				userIduseless=${this.vuex_user.idUseless}&postIduseless=${this.jobIdUseless}`)
				.then(res =>{
					console.log(res)
					if(res.data == false){
						uni.showToast({
							icon:"success",
							title:"收藏成功"
						})
						this.isFavorite = true
						console.log(5555);
					}
				})
			}

		},	
		// 点击跳转到企业详情
		compDetail(){
			this.$u.route({
				url: 'pages/index/compDetail',
				params: {
					HRid: this.data.id
				}
			})
		},
		// 改变数据内部的PostTag函数
		// changePostTag(){
		// 	let TaghasValueNum = []
		// 	for (let i = 1; i <= 6; i++) {
		// 		let key = 'postTag' + i
		// 		// console.log(key);
		// 		// console.log(item);
		// 		if(this.data[key] !== null){
		// 			TaghasValueNum[i-1] = this.data[key]
		// 		}
		// 	}
		// 	this.TaghasValueNum = TaghasValueNum
		// 	console.log(this.TaghasValueNum);
		// },
	}
}
</script>

<style lang="scss" scoped>
/deep/.data-v-6e15e680{
	background-color: #7573e6 !important;
}
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
		font-size: 40rem;
		// line-height: 36rem;
	}
	.comp-detail{
		font-family: '等线';
		color:#555555;
		font-size: 28rem;
		line-height: 35rem;
	}
}
	.job-salary-down-word{
		font-family: Arial;
		color: #333333;
		font-size: 28rem;
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
			font-size: 36rem;
			
		}
		.u-flex222{
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.icon-shoucang1{
				font-size: 40rem;
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
		font-size: 32rem;
		display: flex;
		flex-wrap: nowrap;
		// width: 150rpx;
	}
	
	.job-postWelfare{
		font-family: Arial;
		color: #333333;
		font-size: 28rem;
		margin-right: 80rpx;
		background-color: #e5e5e5;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.meal-warp{
		height: 50rem;
		border: 1rpx solid #797979;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		.icon-liwu{
			color: #b7a2f4;
			font-size: 36rem;
		}
		.meal-word{
			font-size: 28rem;
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
		font-size: 36rem;
		line-height: 34rem;
	}
	.job-mid-word{
		padding-left: 10rpx;
		font-family: Arial;
		color: #333333;
		font-size: 30rem;
		line-height: 50rem;
	}
}
.btn-wrap{
	margin: 50rpx 70rpx 0rpx 70rpx;
	width: auto;
	height: 150rpx;
	.save{
		color: #FFFFFF;
		font-size: 30rem;
	}
}
.bottom-wrap{
	
	align-items: flex-start;
	.comp-detail{
		font-family: Arial;
		font-weight: 700;
		font-size: 36rem;
		line-height: 34rem;
	}

	.auth-wrap{
		height: 50rem;
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
			font-size: 28rem;
		}
		.auth-company{
			color: #333333;
			font-size: 28rem;
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
		font-size: 30rem;
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
			font-size: 30rem;
		}
	}

}
</style>