<template>
	<view class="">
		<view class="u-p-20 wrap">
			<text class="label">姓名:</text>
			<view class="name-wrap1">
				<text class="name">{{resumeInfo.realname}}</text>
			</view>
		</view>
		
		<view class="u-p-20 wrap">
			<text class="label">投递职位:</text>
			<view class="name-wrap1">
				<text class="name">{{jobName}}</text>
			</view>
		</view>
		<view class="u-p-20 wrap">
			<text class="label">性别:</text>
			<view class="name-wrap1">
				<text class="name">{{resumeInfo.sex}}</text>
			</view>
		</view>
		<view class="u-p-20 wrap">
			<text class="label">年龄:</text>
			<view class="name-wrap1">
				<text class="name">{{age}}</text>
			</view>
		</view>
<!-- 	<view class="u-p-20 wrap">
			<text class="label">院校:</text>
			<text class="name"></text>
		</view> -->
		<view class="u-p-20 wrap">
			<text class="label">学历:</text>
			<view class="name-wrap1">
				<text class="name">{{resumeInfo.education}}</text>
			</view>
		</view>
<!-- 		<view class="u-p-20 wrap">
			<text class="label">专业:</text>
			<text class="name"></text>
		</view> -->
<!-- 		<view class="u-p-20 wrap">
			<text class="label">投递时间:</text>
			<text class="name"></text>
		</view> -->
		<view class="u-p-20 wrap">
			<text class="label">联系方式:</text>
			<view class="name-wrap1">
				<text class="name">{{resumeInfo.telephone}}</text>
			</view>
		</view>
		<view class="u-p-20 wrap" :class="resumeInfo.expectedSalary == null ? 'wrap-last' : ''">
			<text class="label">工作经验:</text>
			<view class="name-wrap1">
				<text class="name">{{resumeInfo.workTime}}</text>
			</view>
		</view>
		<view class="u-p-20 wrap" v-if="resumeInfo.expectedSalary !== null">
			<text class="label">期望薪资:</text>
			<view class="name-wrap1">
				<text class="name">{{resumeInfo.expectedSalary}}</text>
			</view>
			
		</view>
		
		<view class="u-p-20 wrap wrap-last" v-if="resumeInfo.skillAndWorkExperience !== null">
			<text class="label-textarea">技能与经历</text>
<!-- 			<view class="textarea name">
				{{resumeInfo.skillAndWorkExperience}}
			</view> -->
			<textarea v-model="resumeInfo.skillAndWorkExperience" 
			 class="textarea1" :auto-height="false"
			maxlength="-1" :disabled="true"/>
		</view>
		
		<view class="" style="margin-bottom: 40rpx;">
			<view class="item-box" v-for="(item,index) in list" @click="toOperate(index)" :key="index">
				<text class="white-word">{{item}}</text>
			</view>
		</view>
		
<!-- 		<view :class="[switchClass(index)]" class="btn-submit" v-for="(item,index) in List" :key="index">
			<u-button :ripple="true" ripple-bg-color="#909399" 
			:custom-style="customStyle" @click="submit(index)">
				<text class="login">
					{{item.word}}
				</text>
			</u-button>
		</view> -->
		
		
	</view>
</template>

<script>
export default{
	data(){
		return {
			list: ['简历通过','简历不通过','联系TA','下载简历'],
			resumeId: '',//简历的id
			resumeInfo: {},//简历的具体信息
			jobIdUseless: '',//岗位的jobIdUseless
			userIdUseless: '',//用户的iduseless用于聊天
			jobName: '',//岗位的名称
			age: '',//年龄
			// 下面的按钮的样式
			customStyle: {
				height: '100rpx',
				width: '750rpx',
				background: 'linear-gradient(to right, #b7a2f4, #ebebeb 50%, #b7a2f4)'
			},
			degreeList:[
				'无', '小学','初中','高中', '中专', '大专','本科','硕士','博士'
			],
			List:[
				{
					word: '简历通过',
				},
				{
					word: '简历不通过',
				},
				{
					word: '联系ta',
				},
				{
					word: '下载简历',
				}
			]
		}
	},
	async onLoad(options) {
		console.log(options);
		// 根据候选人动态设置标题
		let index = parseInt(options.index) +1
		uni.setNavigationBarTitle({
			title: '候选人' + index
		});
		this.age = options.age
		// 确定简历id
		this.resumeId = options.resumeId
		this.jobIdUseless = options.jobIdUseless
		
		//根据简历的iduseless获取申请者的iduseless，用于聊天
		const userData = await this.$u.api.getUserIdUseless(this.resumeId)
		this.userIdUseless = userData.data.idUseless
		
		// 根据jobIdUseless查询岗位的信息
		const res = await this.$u.api.getJobDetailByIdUseless(this.jobIdUseless)
		this.jobName = res.data[0].postName
		// //根据简历id查询简历具体信息
		// const res1 = await this.$u.api.getResumeOnline(this.resumeId)
		// this.resumeInfo = res1.data

	},
	async onShow() {
		//根据简历id查询简历具体信息
		const res1 = await this.$u.api.getResumeOnline(this.resumeId)
		res1.data.education = this.degreeList[parseInt(res1.data.education)]
		this.resumeInfo = res1.data
		if(res1.data.workTime == "10"){
			this.resumeInfo.workTime = "无"
		}else if(res1.data.workTime == "11"){
			this.resumeInfo.workTime = "1-3年"
		}else if(res1.data.workTime == "12"){
			this.resumeInfo.workTime = "3-5年"
		}else if(res1.data.workTime == "13"){
			this.resumeInfo.workTime = "5年以上"
		}
	},
	methods: {
		async toOperate(index){
			if(index == 0){
				console.log('进入请求简历通过接口');
				const res = await this.$u.put(`/hrResumeUser/passResumeStatusByPostIduseless?postIduseless=
				${this.jobIdUseless}&resumeId=${this.resumeId}`)
				console.log('简历通过的res',res)
				if(res.code == 206111){
					uni.showToast({
						icon:"success",
						title:'简历通过'
					})
				}
			}
			else if(index == 1){
				console.log('进入请求简历不通过接口');
				// 简历不通过
				const res1 = await this.$u.put(`/hrResumeUser/rejectResumeStatusByPostIduseless?postIduseless=
				${this.jobIdUseless}&resumeId=${this.resumeId}`)
				console.log('简历不通过的res1',res1)
				if(res1.code == 206121){
					uni.showToast({
						icon:"success",
						title:'简历不通过'
					})
				}
			}
			else if(index == 2){
				console.log('进入请求联系TA接口');
				
				
				
				uni.navigateTo({
					// 把最后一个1换为this.userIdUseless
					// url: `../../TUI-Chat/chat?conversationID=C2C${this.hriduseless}`
					// url: `/pages_message/message/TUI-Chat/chat?conversationID=C2C${this.userIdUseless}`
					url: `/pages_message/message/TUI-Chat/chat?conversationID=C2C${this.userIdUseless}`
				});
			}
			else if(index == 3){
				console.log('进入请求下载简历接口');
				console.log('下载url地址为',this.resumeInfo.resumeFile);
				if(this.resumeInfo.resumeFile == null || this.resumeInfo.resumeFile == '' || this.resumeInfo.resumeFile == ' '){
					uni.showToast({
						icon:"none",
						title:'该候选人未上传文件简历~'
					})
					return
				}
				this.Download(this.resumeInfo.resumeFile)
			}
		},
		//签订合同下载
		Download(URL) {
			uni.downloadFile({
				url: URL,//下载地址接口返回
				success: (data) => {
					if (data.statusCode === 200) {
						//文件保存到本地
						uni.saveFile({
							tempFilePath: data.tempFilePath, //临时路径
							success: function(res) {
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '文件已保存：' + res.savedFilePath, //保存路径
									duration: 3000,
								});
								setTimeout(() => {
									//打开文档查看
									uni.openDocument({
										filePath: res.savedFilePath,
										success: function(res) {
											// console.log('打开文档成功');
										}
									});
								}, 2000)
							}
						});
					}
				},
				fail: (err) => {
					console.log(err);
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '失败请重新下载',
					});
				},
			});
		}

		// // 用户点击下面的按钮
		// async submit(index){
		// 	if(index == 0){
		// 		// 简历通过
		// 		// const res = await this.$u.api.passResume(params)
		// 		const res = await this.$u.put(`/hrResumeUser/passResumeStatusByPostIduseless?postIduseless=
		// 		${this.jobIdUseless}&resumeId=${this.resumeId}`)
		// 		console.log(res)
		// 		if(res.data == true){
		// 			uni.showToast({
		// 				icon:"success",
		// 				title:'简历通过'
		// 			})
		// 		}
		// 		console.log(12345)
		// 	}
		// 	else if(index == 1){

		// 	}
		// 	else if(index == 2){
		// 		// 联系他
		// 	}
		// 	else if(index == 3){
		// 		// 下载简历
		// 	}
		// },
		
		// 判断下面的按钮是哪个class
		// switchClass(index){
		// 	let className = ''
		// 	switch (index){
		// 		case 0:
		// 			className = 'btn-submit0'
		// 			break;
		// 		case 1:
		// 			className = 'btn-submit1'
		// 			break;
		// 		case 2:
		// 			className = 'btn-submit2'
		// 			break;
		// 		case 3:
		// 			className = 'btn-submit3'
		// 	}
		// 	return className
		// },
		
	}
}
</script>

<style lang="scss" scoped>
	.white-word{
		font-family: '等线';
		font-size: 36rpx;
		color: #fff;
		font-weight: bold;
	}
	.item-box{
		 margin: 22rpx 86rpx 22rpx 80rpx;
		height: 72rpx;
		background-color: #7573e6;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
		
	}
.name-wrap1{
	width: 500rpx;
	border-radius: 14rpx;
	border: 1rpx solid #D7D7D7;
	// height: 85rpx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.textarea1{
	height: 150rpx;
	width: 500rpx;
	padding-right: 20rpx;
	// height: 250rpx;
	font-size: 32rpx;
	font-family: Arial;
	padding-left: 40rpx;
}
.label{
	display: block;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 70rpx;
	width: 183rpx;
	font-weight: 600;
	font-size: 32rpx;
	font-family: Arial;
	padding-left: 20rpx;
}
.label-textarea{
	// height: 100rpx;
	display: block;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 183rpx;
	font-weight: 600;
	font-size: 32rpx;
	font-family: Arial;
}
.wrap{
	display: flex;
	// border-bottom: 2rpx solid #b7a2f4;
}
.name{
	display: flex;
	align-items: center;
	font-size: 32rpx;
	font-family: Arial;
	padding-left: 40rpx;
}
.wrap-last{
	margin-bottom: 60rpx;
}
// .btn-submit{
// 	margin: 0rpx 25rpx 0rpx 25rpx;
// 	position: fixed;
// 	width: 700rpx;
// 	background: linear-gradient(to right, #b7a2f4, #ebebeb 50%, #b7a2f4);
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	.login{
		
// 		font-size: 44rpx;
// 		color: #333333;
// 		font-weight: 500;
// 	}
// }
// .btn-submit0{
// 	bottom: 300rpx;
// }
// .btn-submit1{
// 	bottom: 200rpx;
// }
// .btn-submit2{
// 	bottom: 100rpx;
// }
// .btn-submit3{
// 	bottom: 0rpx;
// }
</style>