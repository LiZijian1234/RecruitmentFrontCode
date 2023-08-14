<template>
	<page-meta :root-font-size="`${0.5 * baseFontSize}px`"></page-meta>
	<view class="u-m-l-50 u-m-r-50 u-m-t-30">
		<view class="">
			<text class="person-file">个人资料</text>
			<text class="person-file u-p-l-20">完善简历：非必填</text>
		</view>
		<view class="person-infomation-wrap u-flex u-m-t-30">
			<view class="avatar-wrap">
				<view class="" v-if="headPortrait !== ''">
					<u-avatar   :src="headPortrait" size="130"></u-avatar>
				</view>
				<view v-else>
					<text class="iconfont icon-gerentouxiang"></text>
				</view>
				<!-- <image src="" mode=""></image> -->
			</view>
			<view class="u-flex-col u-m-l-30">
				<view class="u-flex">
					<text class="name">{{name}}</text>
					<view class="age-wrap u-flex u-row-center u-col-center u-m-l-20">
						<text class="age">♂{{age}}</text>
					</view>
				</view>
				<view class="u-m-t-30">
					<text class="u-m-r-50 black-word">{{degree}}</text>
					<text class="u-m-r-50 black-word">{{workTime}}</text>
					<text class="black-word">{{tel}}</text>
				</view>
			</view>
		</view>
		<view class="u-m-t-40 u-m-b-50">
			<view class="expect-job u-flex u-row-center u-col-center">
				<u-input :clearable="false" v-model="expectJob" input-align="center"
				@focus="this.placeholderJob=''" @blur="this.placeholderJob='期望职位'"
				:placeholder="placeholderJob" :placeholder-style="placeHolderStyle"
				 :custom-style="customStyle" 
				></u-input>
			</view>
			<view class="expect-job u-flex u-row-center u-col-center">
				<u-input :clearable="false" v-model="expectSalary" input-align="center" 
				@focus="this.placeholderSalary=''" @blur="this.placeholderSalary='期望薪资'"
				:placeholder="placeholderSalary" :placeholder-style="placeHolderStyle" 
				:custom-style="customStyle" 
				></u-input>
			</view>
			<view class="expect-job u-flex u-row-center u-col-center">
				<u-input :clearable="false" v-model="expectArea" input-align="center" @focus="this.placeholderArea=''"
				@blur="this.placeholderArea='求职城市'"
				:placeholder="placeholderArea" :placeholder-style="placeHolderStyle" :custom-style="customStyle" 
				></u-input>
			</view>
			<view class="expect-job">
<!-- 				<view class="" v-if="skill == false">
					<u-input :clearable="false" :disabled="true" @click="goToSkillPage" v-model="expectArea" input-align="center"
					placeholder="技能与工作经历" :placeholder-style="placeHolderStyle" :custom-style="customStyle" 
					></u-input>
				</view> -->
<!-- 				<view class="skill-wrap " >
					<text class="skill-word u-line-1">{{skill}}</text>
				</view> -->
				<u-input :clearable="false" v-model="skill" input-align="center"
				 @focus="this.placeholderArea=''"
				@blur="this.placeholderArea='技能与工作经历'"
				:placeholder="placeholderArea" :disabled="true" @click="goToSkillPage"
				:placeholder-style="placeHolderStyle" :custom-style="customStyle" 
				></u-input>
			</view>
		</view>
		<!-- 上传按钮 -->
		<view class="btn-wrap">
			<u-button :custom-style="btnStyle" @click="submit">
				<text class="save">创建简历</text>
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				headPortrait: '',
				name: '',//姓名
				age: 0,//年龄
				degree: '',//学历
				workTime: '',//工作时间
				tel: '',//电话
				expectJob: '',//期望工作
				expectSalary: '',//期望薪资
				expectArea: '',//求职区域
				skill: '技能与工作经历',
				hasResumeInfo: false,//之前是否提交过下面那四行数据
				placeholderJob: '期望职位',
				placeholderSalary: '期望薪资',
				placeholderArea: "求职城市",//求职区域的placeholder
				placeHolderStyle: "font-family: Arial;font-weight: normal;font-size: 32rem;color: #555555",
				// 姓名的style
				customStyle: {
					fontFamily: 'Arial',
					color: '#555555',
					width: '650rpx',
					height: '90rem',
					fontSize: '34rem',
					border: '1rpx solid #D7D7D7',
					borderRadius: '20rpx',
					backgroundColor: '#f2f2f2'
				},
				// 提交按钮的样式
				btnStyle: {
					backgroundColor: '#7c92d0'
				},
			}
		},
		computed:{
			baseFontSize() {
			    return this.vuex_fontScale
			}
		},
		onLoad(options) {
			// options如果不是空对象的话，就赋值
			if(JSON.stringify(options) !== '{}'){
				let nowYear = new Date().getFullYear();
				this.name = options.name
				this.degree = options.degree
				if(options.workTime == "10"){
					this.workTime = "无"
				}else if(options.workTime == "11"){
					this.workTime = "1-3年"
				}else if(options.workTime == "12"){
					this.workTime = "3-5年"
				}else if(options.workTime == "13"){
					this.workTime = "5年以上"
				}
				// this.workTime = options.workTime
				this.tel = options.tel
				this.age = nowYear - parseInt(options.bornYear)
				this.headPortrait = options.headPortrait
			}
			this.getResumeComplete()
		},
		onShow() {
			// 触发用户点击上传技能与工作经历按钮
			uni.$once('updateSkill', (res) => {
				console.log(res);
				this.skill = res.data
			})
		},
		methods: {
			// 获取下面蓝色的那四行数据
			async getResumeComplete(){
				let params = this.vuex_user.openid ? this.vuex_user.openid : ''
				const res = await this.$u.api.getResumeOnline(params)
				console.log(res.data);
				if(res.data.expectedPost != null){
					this.expectJob = res.data.expectedPost
					this.expectSalary = res.data.expectedSalary
					this.expectArea = res.data.expectedWorkCity
					this.skill = res.data.skillAndWorkExperience
					this.hasResumeInfo = true
				}
			},
			// 点击跳转到填写技能页面
			goToSkillPage(){
				
				
				console.log('点击跳转到填写技能页面');
				this.$u.route({
					url: 'pages_mine/mine/skillWrite',
					params:{
						skill: this.skill !== '技能与工作经历' ? this.skill : ''
					}
				})
			},
			// 点击创建简历提交
			async submit(){
				console.log('点击创建简历提交');
				console.log(this.expectJob == false);
				
				if(this.expectJob == false 
				|| this.expectSalary == false || this.expectArea == false || this.skill == '技能与工作经历' || this.skill == '')
				{return uni.showToast({
					icon:"error",
					title:"请填写完善简历~",
				})}
				//上传只上传下面这四个给后端数据
				const params = {
					id: this.vuex_user.openid,
					expectedPost : this.expectJob,
					expectedSalary: this.expectSalary,
					expectedWorkCity: this.expectArea,
					skillAndWorkExperience: this.skill
				}
				
				const res = await this.$u.api.putResumeOnline(params)
				uni.showToast({
					title: '保存成功',
					icon:"success"
				});
				setTimeout(()=>{
					this.$u.route({
						url: 'pages/mine/index',
						type: 'switchTab'
					})
				},1500)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.person-file{
	color: #AAAAAA;
	font-size: 26rem;
}
.avatar-wrap{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 130rpx;
	height: 130rpx;
	background-color: #f9f9f9;
	border-radius: 50%;
	border: 1rpx solid #AAAAAA;
	.icon-gerentouxiang{
		font-size: 140rpx;
		color: #9473ef;
	}
}
.person-infomation-wrap{
	.name{
		font-family: '微软雅黑';
		font-size: 40rem;
		font-weight: bold;
	}
	.age-wrap{
		width: 70rem;
		height: 40rem;
		background-color: #dadaff;
		.age{
			line-height: 50rem;
			font-size: 30rem;
		}
	}
	.black-word{
		color: #AAAAAA;
		font-size: 28rem;
	}
}
.expect-job{
	margin: 0 0 20rpx 0;
	width: 100%;
	// border-bottom: 1rpx solid #b7a2f4;
	height: 130rem;
	display: flex;
	justify-content: center;
	// flex-direction: column;
	align-items: center;
}
.expect-salary{
	border-bottom: 1rpx solid #B7A2F4;
	height: 120rpx;
}
.expect-area{
	border-bottom: 1rpx solid #B7A2F4;
	height: 120rpx;
}

	.skill-wrap{
		display: flex;
		justify-content: center;
		width: 300rpx;
		.skill-word{
			font-family: Arial;
			font-weight: normal;
			font-size: 32rem;
			color: #02A7F0;
		}
	}

.btn-wrap{
	margin: 80rpx 70rpx 0 70rpx;
	width: auto;
	height: 150rpx;
	
	.save{
		color: #060400;
		font-size: 30rem;
	}
}
</style>