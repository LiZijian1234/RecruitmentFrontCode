<template>
	<view class="">
		<view class="candidate-filter u-p-10 u-m-10" >
			<view class="">
				<text class="filter-word">候选人过滤器</text>
				<text class="iconfont icon-shaixuan" style="padding-left: 15rpx;font-size: 42rpx;margin-right: 50rpx; color: #9473ef;
				"></text>
			</view>
			<view class="" style="width: 100%;padding-bottom: 12rpx;display: flex;justify-content: space-around;margin-top: 22rpx;">
				<view class="" @click="this.showAge = true">
					<text>年龄筛选</text>
					<u-icon name="arrow-down"></u-icon>
				</view>
				<view class="" style="" @click="this.showExper = true">
					<text>经验筛选</text>
					<u-icon name="arrow-down"></u-icon>
				</view>
				<view class="" style="" @click="this.showDegree = true">
					<text>学历筛选</text>
					<u-icon name="arrow-down"></u-icon>
				</view>
			</view>
			
			
		</view>
<!-- 		<view class="batch-operate u-p-10  ">
			<text class="batch-word">批量操作</text>
		</view> -->
		<view class="candidate-person  u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10" 
		v-for="(item,index) in newResumeInfo" :key="index" hover-class="hover-class" 
		hover-stay-time="200" @click="toCandidate(index)">
			<view class="u-flex">
				<text class="candidate-word u-p-r-20">{{item.realname}}</text>
				<text class="candidate-word u-p-r-20">{{item.education}}</text>
				<text class="candidate-word">{{item.age}}岁</text>
			</view>
			<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
		</view>
		
		<u-action-sheet :list="AgeList" v-model="showAge" @click="changeDropDown1"></u-action-sheet>
		<u-action-sheet :list="ExperList" v-model="showExper" @click="changeDropDown2"></u-action-sheet>
		<u-action-sheet :list="DegreeList" v-model="showDegree" @click="changeDropDown3"></u-action-sheet>
	</view>
</template>

<script>
export default{
	data(){
		return {
			showAge:false,
			showExper: false,
			showDegree: false,
			AgeList: [
				{
					text: '18~25岁',
					min: 18,
					max: 25,
				},{
					text: '25~35岁',
					min: 25,
					max: 35,
				},{
					text: '35~45岁',
					min: 35,
					max: 45,
				},{
					text: '45~55岁',
					min: 45,
					max: 55,
				},{
					text: '55岁以上',
					min: 55,
					max: 100,
				}
			],
			ExperList: [
				{
					text: '无'
				},{
					text: '1-3年'
				},{
					text: '3-5年'
				},{
					text: '5年以上'
				}
			],
			DegreeList: [
				{
					text: '无'
				},{
					text: '小学'
				},{
					text: '初中'
				},{
					text: '高中'
				},{
					text: '中专'
				},{
					text:'大专'
				},{
					text:'本科'
				},{
					text:'硕士'
				},{
					text:'博士'
				}
			],
			jobIdUseless: '',//岗位的iduseless
			resumeId: [],//申请这个岗位的简历id
			degreeList:[
				'无', '小学','初中','高中', '中专', '大专','本科','硕士','博士'
			],
			resumeInfo: [],//申请的简历的信息
			age: [],//候选人的年龄
			changedAge: [],
			newResumeInfo: []
		}
	},
	async onLoad(options) {
		let nowYear = new Date().getFullYear()
		this.jobIdUseless = options.jobIdUseless
		
		//考虑将下面的代码放到onshow里面
		//获取简历的id即res.data
		const res = await this.$u.api.getResumeByPostIdUseless(this.jobIdUseless)
		console.log(res.data)
		this.resumeId = res.data
		this.resumeId.forEach(async(value,index,array) =>{
			// 获取每个简历的具体信息
			let res1 = await this.$u.api.getResumeOnline(value)
			res1.data.education = this.degreeList[parseInt(res1.data.education)]
			res1.data.age = nowYear - parseInt(res1.data.bornYear)
			if(res1.data.workTime == "10"){
				res1.data.workTime = "无"
			}else if(res1.data.workTime == "11"){
				res1.data.workTime = "1-3年"
			}else if(res1.data.workTime == "12"){
				res1.data.workTime = "3-5年"
			}else if(res1.data.workTime == "13"){
				res1.data.workTime = "5年以上"
			}
			this.resumeInfo.push(res1.data)
			this.newResumeInfo.push(res1.data)
			// this.age.push(nowYear - parseInt(res1.data.bornYear))
		})
		
	},
	
	methods: {
		changeDropDown1(index){
			console.log(this.AgeList[index].text);
			let min = this.AgeList[index].min
			let max = this.AgeList[index].max
			this.newResumeInfo = this.resumeInfo.filter((item,index)=>{
				if(item.age <= max && item.age >= min){
					return item
				}
			})
		},
		changeDropDown2(index){
			console.log(this.ExperList[index].text);
			let exper = this.ExperList[index].text
			this.newResumeInfo = this.resumeInfo.filter((item,index)=>{
				if(item.workTime == exper){
					return item
				}
			})
		},
		changeDropDown3(index){
			console.log(this.DegreeList[index].text);
			let edu = this.DegreeList[index].text
			this.newResumeInfo = this.resumeInfo.filter((item,index)=>{
				if(item.education == edu){
					return item
				}
			})
		},
		// 点击跳转到候选人详情
		toCandidate(index){
			console.log(111);
			console.log(index);
			this.$u.route({
				url: 'pages_HR/HR/candidate/candidateDetail',
				params: {
					index: index,
					resumeId: this.resumeId[index],
					jobIdUseless: this.jobIdUseless,
					age: this.resumeInfo[index].age
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.candidate-filter{
	height: 137rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-bottom: 2rpx solid #797979;
	.filter-word{
		font-family: Arial;
		font-size: 32rpx;
		line-height: 40rpx;
	}
}
.batch-operate{
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 2rpx solid #797979;
	.batch-word{
		font-family: Arial;
		font-size: 32rpx;
		line-height: 40rpx;
	}
}
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
}
.hover-class{
	background-color: #f7f7f7;
}
</style>