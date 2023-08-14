<template>
	<page-meta :root-font-size="`${0.5 * baseFontSize}px`"></page-meta>
	<view class="">
		<view class="top_backgound">
			<view class="avatar">
				<view class="" @click="chooseImg" v-if="headPortrait !== ''">
					<u-avatar  slot="addBtn" :src="headPortrait" size="150"></u-avatar>
				</view>
				<view v-else>
					<text class="iconfont icon-camera" @click="chooseImg"></text>
				</view>
			</view>
		</view>
		<view class="avatar-word">
			<u-input :clearable="false"  input-align="center"  :disabled="true"
			placeholder="上传头像" :placeholder-style="placeHolderStyle" :custom-style="customStyle" 
			 @click="chooseImg"
			></u-input>
			<!-- <text class="upload-avatar">上传头像</text> -->
		</view>
		<view class="gender-wrap">
			<u-input :clearable="false" v-model="name" input-align="center" maxlength="6" 
			placeholder="真实姓名" :placeholder-style="placeHolderStyle" :custom-style="customStyle" 
			></u-input>
		</view>
		<view class="gender-wrap">
<!-- 			<u-input :clearable="false" v-model="sex" input-align="center" maxlength="1"
			placeholder="性别" :placeholder-style="placeHolderStyle" :custom-style="customStyle" :disabled="true"
			></u-input> -->
			<picker mode="selector" :range="sexList" @change="bindSexChange">
				<!-- <view v-if="sex==''" class="sex-box">性别</view> -->
				<view class="sex-box" v-if="sex != ''">{{sex}}</view>
				<view class="sex-box" v-else>选择性别</view>
			</picker>
			
<!-- 			<text class="gender">性别</text>
			<view class="gender-choice">
				<view v-if="chooseGender == 0 || chooseGender == 1" class="female" hover-class="hover-class" hover-stay-time="200" @click="chooseFemale">
					<text class="iconfont icon-nan"></text>
					<text class="female-word">男</text>
				</view>
				<view  v-if="chooseGender == 0 || chooseGender == 2" class="male" hover-class="hover-class" hover-stay-time="200" @click="chooseMale">
					<text class="iconfont icon-nan"></text>
					<text class="male-word">女</text>
				</view>
			</view> -->
		</view>
		<view class="tel-wrap">
<!-- 			<text class="tel-word">输入手机号</text>
			<u-input :clearable="false" v-model="tel" input-align="center"
			:placeholder="placeholderTel" :custom-style="customTelStyle" height="60"
			></u-input> -->
			<u-input :clearable="false" v-model="tel" input-align="center"
			placeholder="输入手机号" :placeholder-style="placeHolderStyle" :custom-style="customStyle" 
			></u-input>
		</view>
		<view class="bottom-wrap">
			<view class="year-wrap u-flex u-flex-col u-row-center">
				<text class="year u-m-b-20">出生年份</text>
				<picker mode="date" :value="year" @change="bindYearChange"
				:start="startYear" :end="endYear" fields="year">
					<view class="choose-year">{{year}}</view>
				</picker>
			</view>
			<view class="" style="border-left: 2rpx solid #797979;width: 1rpx; height: 100rem;">
				
			</view>
			<view class="degree-wrap u-flex u-flex-col u-row-center">
				<text class="degree u-m-b-20">最高学历</text>
				<picker mode="selector" :range="degreeList" @change="bindDegreeChange">
					<view class="choose-degree">{{degree}}</view>
				</picker>
			</view>
			<view class="" style="border-left: 2rpx solid #797979;width: 1rpx; height: 100rem;">
				
			</view>
			<view class="work-time-wrap u-flex u-flex-col u-row-center">
				<text class="work-time u-m-b-20">工作时间</text>
				<picker mode="selector" value="1" :range="workTimeList" @change="bindDegreeWorkTime">
					<view class="choose-worktime">{{workTime}}</view>
				</picker>
			</view>

		</view>
		<!-- 上传按钮 -->
		<view class="btn-wrap">
			<u-button :custom-style="btnStyle" @click="submit">
				<text class="save">保存</text>
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				sexList: [
					'男','女'
				],
				
				hasResumeInfo: false,//是否之前填写过简历信息
				headPortrait: '',//头像地址
				chooseGender: 0,//性别，为0代表没选择，1代表选择了男，2代表女
				name:'',//姓名
				tel: '',//电话
				sex: '',
				year: '1999',//出生日期
				degree: '小学',//学历表单
				workTime: '1-3年',//工作时间表单
				startYear: '1940',
				endYear: '2022',
				// 学历的List
				degreeList:[
					'无', '小学','初中','高中', '中专', '大专','本科','硕士','博士'
				],
				// workTimeContent: [{
				// 	index: 10,
				// 	name: '无'
				// },{
					
				// }],
				// 工作时间的List
				workTimeList:[
					'无','1-3年','3-5年','5年以上'
				],
				// 提交按钮的样式
				btnStyle: {
					backgroundColor: '#7c92d0'
				},
				// 姓名的style
				customStyle: {
					fontFamily: 'Arial',
					width: '668rpx',
					height: '90rem',
					fontSize: '34rem',
					border: '1rpx solid #D7D7D7',
					borderRadius: '20rpx'
				},
				// 姓名的placeholder
				placeHolderStyle: "font-family: Arial;font-weight: normal;font-size: 32rem",
				// 电话的style
				customTelStyle: {
					fontFamily: 'Arial',
					marginBottom: '0rpx',
					fontSize: '30rem'
				},
				placeholder: '姓名',//姓名的placeholder
				placeholderTel: '电话',//电话的placeholder
			}
		},
		computed:{
			baseFontSize() {
			    return this.vuex_fontScale
			}
		},
		onLoad() {
			// 从后台获取简历信息
			this.getResumeOnli()
			// this.hasResumeInfo = false
		},
		methods: {
			//点击选择照片
			chooseImg(){
				const _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						 const tempFilePaths = res.tempFilePaths;
						 const uploadTask = uni.uploadFile({
							  url : 'https://jxnckj.cn/OSSOpration/upload/file',
							  filePath: tempFilePaths[0],
							  name: 'files',
							  success: uploadFileRes=> {
							   console.log('uploadfile的返回结果',JSON.parse(uploadFileRes.data).data);
							   let imgsrc = JSON.parse(uploadFileRes.data).data[0]
							   // _this.imgSrc = imgsrc
							   // _this.$u.vuex('vuex_resume_img',imgsrc)
							   _this.headPortrait = imgsrc
							  }
						 });
					},
			    });
			},
			// // 选择男性
			// chooseFemale(){
			// 	setTimeout(()=>{
			// 		// chooseGender = 1表示选择为男
			// 		this.chooseGender = 1
			// 	},200)
			// },
			// // 选择女性
			// chooseMale(){
			// 	setTimeout(()=>{
			// 		// chooseGender = 2表示选择为女
			// 		this.chooseGender = 2
			// 	},200)
			// },
			bindSexChange(e){
				console.log('sex的picker');
				console.log(e);
				this.sex = this.sexList[e.detail.value]
			},
			// 点击改变出生年份
			bindYearChange(e){
				this.year = e.detail.value
			},
			// 点击选择学历
			bindDegreeChange(e){
				console.log(e);
				this.degree = this.degreeList[e.detail.value]
			},
			// 点击选择工作时间
			bindDegreeWorkTime(e){
				this.workTime = this.workTimeList[e.detail.value]
			},
			// 页面加载时获取在线简历内容
			async getResumeOnli(){
				if(this.vuex_user.openid){
					const res = await this.$u.api.getResumeOnline(this.vuex_user.openid)
					console.log(res.data);
					if(res.data !== null){
						this.sex = res.data.sex
						this.name = res.data.realname
						this.tel = res.data.telephone
						this.year = res.data.bornYear
						
						this.degree = this.degreeList[parseInt(res.data.education)]
						if(res.data.workTime == "10"){
							this.workTime = this.workTimeList[0]
						}else if(res.data.workTime == "11"){
							this.workTime = this.workTimeList[1]
						}else if(res.data.workTime == "12"){
							this.workTime = this.workTimeList[2]
						}else if(res.data.workTime == "13"){
							this.workTime = this.workTimeList[3]
						}
						this.hasResumeInfo = true //之前已经有了简历信息
						this.headPortrait = res.data.headPortrait
						// let obj = this.vuex_user
						// obj.hasResume = true
						// this.$u.vuex('vuex_user',obj)
					}
				}

				
			},
			// 点击提交
			async submit(){
				// 没有填写完整
				if(!this.name ||  !this.sex || !this.tel || ! this.headPortrait){
					uni.showToast({
						title: '请填写完整哦',
						icon:"error"
					});
					return
				}
				// let sex = this.chooseGender == 1 ? '男' : '女'
				let index = -1//教育的数字
				this.degreeList.forEach((item,index1)=>{
					if(item == this.degree){
						index = index1
						// console.log('dengyu');
					}
				})
				if(this.workTime == '无'){
					this.workTime = '10'
				}else if(this.workTime == '1-3年'){
					this.workTime = '11'
				}else if(this.workTime == '3-5年'){
					this.workTime = '12'
				}else if(this.workTime == '5年以上'){
					this.workTime = '13'
				}
				let params = {
					'id': this.vuex_user.openid,
					'realname': this.name,
					// 这里的头像地址也要传
					'sex': this.sex,
					'telephone': this.tel,
					'education': index,
					'bornYear': this.year,
					'workTime': this.workTime,
					'headPortrait': this.headPortrait
				}
				if(this.vuex_user.hasResume !== undefined){
					console.log('用put方法提交');
					//put方法提交用户信息
					const res = await this.$u.api.putResumeOnline(params)
				}else{
					console.log('用post方法提交');
					// 这里post方法提交用户信息
					const res = await this.$u.api.postResumeOnline(params)
					// 点击提交后才把用户的vuex_user下面这个hasResume设置为true
					let obj = this.vuex_user
					obj.hasResume = true
					this.$u.vuex('vuex_user',obj)
				}

				this.showToast().then(()=>{
					console.log(123);
					this.$u.route({
						url: 'pages_mine/mine/completeResume',
						type: 'redirect',
						params: {
							name: this.name,
							bornYear: this.year,
							degree: this.degree,
							workTime: this.workTime,
							tel: this.tel,
							headPortrait: this.headPortrait
							// avatarurl: this.vuex_resume_img
							// 头像通过vuex传
						}
					})
				})
			},
			// 点击保存之后显示的toast
			showToast(){
				return new Promise((resolve,reject)=>{
					//TODO  这里显示什么内容需要后端返回的res的msg提供一下
					uni.showToast({
						title: '保存成功',
						icon:"success"
					});
					setTimeout(()=>{
						resolve()
					},1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.sex-box{
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Arial';
	width: 668rpx;
	height: 90rem;
	font-size: 34rem;
	border: 1rpx solid #D7D7D7;;
	border-radius: 20rpx;
}
.top_backgound{
	width: 100%;
	height: 150rpx;
	background-color: #7573e6;
	position: relative;
	display: flex;
	justify-content: center;
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
		.icon-camera{
			color: #b7a2f4;
			font-size: 55rpx;
		}
	}
}
.avatar-word{
	margin: 100rpx 40rpx 20rpx 40rpx;
	// border-bottom: 1rpx solid #b7a2f4;
	height: 130rem;
	display: flex;
	justify-content: center;
	align-items: center;
	// .upload-avatar{
	// 	color: #b7a2f4;
	// 	font-size: 30rem;
		
	// }
}
.name-wrap{
	margin: 0 40rpx 20rpx 40rpx;
	width: 100%;
	// border-bottom: 1rpx solid #b7a2f4;
	height: 130rem;
	display: flex;
	justify-content: center;
	// flex-direction: column;
	align-items: center;
	// .true-name{
	// 	color: #b7a2f4;
	// 	font-size: 30rem;
	// 	margin-bottom: 10rpx;
	// }
}
.gender-wrap{
	margin: 0 40rpx 20rpx 40rpx;
	// border-bottom: 1rpx solid #b7a2f4;
	height: 130rem;
	display: flex;
	justify-content: center;
	// flex-direction: column;
	align-items: center;
	// .gender{
	// 	color: #b7a2f4;
	// 	font-size: 30rem;
	// 	margin-bottom: 0rpx;
	// }
	// .gender-choice{
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	padding-top: 10rem;
	// 	padding-bottom: 10rem;
	// 	.hover-class{
	// 		background-color: #b7a2f4;
	// 		.female-word{
	// 			color: #fff;
	// 		}
	// 		.icon-nan{
	// 			color: #fff;
	// 		}
	// 		.male-word{
	// 			color: #fff;
	// 		}
	// 	}
	// 	.icon-nan{
	// 		color: #b7a2f4;
	// 		font-size: 34rem;
	// 	}
	// 	.female-word{
	// 		color: #b7a2f4;
	// 		font-size: 28rem;
	// 	}
	// 	.male-word{
	// 		color: #b7a2f4;
	// 		font-size: 28rem;
	// 	}
	// 	.female{
	// 		margin-right: 20rem;
	// 		height: 50rem;
	// 		width: 116rem;
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 		border: 1rpx solid #afafaf;
	// 		border-radius: 25rem;

	// 	}
	// 	.male{
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 		height: 50rem;
	// 		width: 116rem;
			
	// 		border: 1rpx solid #afafaf;
	// 		border-radius: 25rem;

	// 	}
	// }
}
.tel-wrap{
	margin: 0 40rpx 40rpx 40rpx;
	// border-bottom: 1rpx solid #b7a2f4;
	height: 130rem;
	display: flex;
	justify-content: center;
	// flex-direction: column;
	align-items: center;
	// .tel-word{
	// 	color: #D9001B;
	// 	font-size: 30rem;
	// 	font-weight: 500;
	// 	margin-bottom: 10rpx;
	// }
}
.bottom-wrap{
	display: flex;
	margin: 0 30rpx 50rpx 30rpx;
	justify-content: space-around;
	.year-wrap{
		height: 100rem;
		width: 200rpx;
		// padding-right: 20rpx;
		// padding-left: 20rpx;
		.year{
			font-size: 28rem;
			width: 200rpx;
			text-align: center;
		}
		.choose-year{
			color: #000;
			font-family: '微软雅黑';
			font-weight: 600;
			font-size: 32rem;
			width: 100%;
			height: 50rpx;
			text-align: center;
			// border-bottom: 1rpx solid #797979;
		}
	}
	.degree-wrap{
		// padding-left: 50rpx;
		height: 100rem;
		width: 200rpx;
		// border-left: 2rpx solid #797979;
		// padding-right: 20rpx;
		.degree{
			display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;
			font-size: 28rem;
			width: 200rpx;
		}
		.choose-degree{
			color: #000;
			font-family: '微软雅黑';
			font-weight: 600;
			font-size: 32rem;
			width: 100%;
			height: 50rpx;
			text-align: center;
		}
	}
	.work-time-wrap{
		// padding-left: 20rpx;
		width: 200rpx;
		height: 100rem;
		.work-time{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rem;
			width: 200rpx;
		}
		.choose-worktime{
			color: #000;
			font-family: '微软雅黑';
			font-weight: 600;
			font-size: 32rem;
			width: 100%;
			height: 50rpx;
			text-align: center;
		}
	}
}
.btn-wrap{
	margin: 0 100rpx 0 100rpx;
	width: auto;
	height: 150rpx;
	.save{
		color: #060400;
		font-size: 28rem;
	}
}
</style>