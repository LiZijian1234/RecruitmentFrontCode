<template>
	<page-meta :root-font-size="`${baseFontSize}px`"></page-meta>
	<view class="u-p-20 u-m-t-20">
		<view class="top-title">
			<view class="comp-name-wrap">
				<text class="comp-name">{{compDetail.corporationName}}</text>
			</view>
			<view class="image-wrap">
				<u-image width="120rem" height="120rem" :src="compDetail.corporationPicture1" mode="scaleToFill"></u-image>
				
			</view>
		</view>
		<view class="comp-type">
			<text class="comp-type-word">{{compDetail.corporationNature}}丨{{compDetail.corporationEmployees}}丨{{compDetail.corporationIndustry}}</text>
		</view>
		<view class="address-wrap">
			<text class="address-word">{{compDetail.corporationHeadquarters}}</text>
		</view>
		
		<view class="" style="margin: 30rpx;display: flex;justify-content: space-between;align-items: center;"> 
			<view class="" style="display: flex;flex-direction: column;justify-content: flex-start;"> 
				<text style="font-size: 32rpx;">公司评价</text>
				<view class="u-m-l-40 u-m-t-10" style="display: flex;">
					<view   class="u-p-l-5 u-p-r-5"
					 v-for="(item,index) in star_list" :key="index">
<!-- 						<view v-if="item" class="starIcon">
							&#xe601;
						</view> -->
						<text v-if="item" class="iconfont icon-a-ziyuan676" style="color: #7573e6;font-size: 34rpx;"></text>
<!-- 						<view v-else class="starIcon">
							&#xe602;
						</view> -->
						<text v-else class="iconfont icon-xingjibie" style="color: #cccccc;font-size: 34rpx;"></text>
					</view>
					<text>{{score}}分</text>
				</view>
			</view>
			<view class="" @tap="toEvaluate">
				<text>详情</text>
				<u-icon name="arrow-right" size="26" color="#8b8b8b"></u-icon>
			</view>
		</view>
		
		<view class="tab">
			<view class="intro-wrap" @click="changeTab(1)">
				<text class="intro-word" :class="currentTab == 1 ? 'selected' : ''">公司介绍</text>
			</view>
			<view class="job-wrap"  @click="changeTab(2)">
				<text class="job-word" :class="currentTab == 2 ? 'selected' : ''">在招职位</text>
			</view>
		</view>
		
		<view class="u-m-40 intro-wraps" v-if="currentTab == 1">
			<text class="intro-content">{{compDetail.corporationIntroduction}}</text>
		</view>
		
		<view class="u-m-t-30" v-if="currentTab == 2">
			<view class="u-flex-col"
			v-for="(item,index) in JobList" :key="index" @click="toJobDetail(index)">
				<jobitem :item="item" :index="index" :TaghasValueNum="TaghasValueNum"></jobitem>
					
			</view>
		</view>
		
		<!-- popup弹出 -->
		
			
		
	</view>
</template>

<script>
export default{
	data(){
		return{
			score: "",
			star_list: [false, false, false, false, false],
			hrid: '',//HR的id，也就是公司的唯一凭证
			JobList: [],//公司也就是hr对应的岗位
			compDetail: {},//公司信息
			page:1,
			currentTab: 1,
			// src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.comrc.com.cn%2Frepository%2Fimage%2FzsE29YY4Sbi8A76NDpTCRA.png_%7Bi%7Dxaf.png&refer=http%3A%2F%2Fwww.comrc.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655802132&t=a22a9e70ac49761fb1b7656c67bdbf4c',
			TaghasValueNum: []
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
		this.hrid = options.HRid
		const res = await this.$u.api.getCompInfo(this.hrid)
		this.compDetail = res.data[0]
		const res1 = await this.$u.api.getAverageScore(this.hrid)
		console.log('res1',res1.data);
		
		// console.log('用户的分数',res1.data.userScore);
		this.score = res1.data + ''
		this.showStar()
	},
	onReachBottom() {
		this.page = this.page + 1
		this.getJobData()
	},
	methods: {
		// 点击进入评价页面
		toEvaluate(){
			console.log('跳转到评价页面');
			uni.navigateTo({
				url:`/pages_message/message/EvaluateList?hrid=${this.hrid}`
			})
		},
		// 获取星级分数
		showStar(){
			let integerScore = Math.round(this.score)
			console.log('四舍五入之后',integerScore);
			for (let i = 0; i < integerScore; i++) {
				this.star_list[i] = true;
			}
		},
		// 获取岗位数据
		async getJobData(){
			uni.showLoading({title:'加载中'})
			// let res1 = []
			const res = await this.$u.api.getJobByHrid({
				id: this.hrid,
				pageCurrent: this.page,
				pageSize:10
			})
			res.data.rows.forEach((item,index)=>{
				if(res.data.rows[index].postWelfare != '' && res.data.rows[index].postWelfare != null && res.data.rows[index].postWelfare != ' '){
					res.data.rows[index].postWelfare = JSON.parse(res.data.rows[index].postWelfare)
				}
				console.log('改变为对象之后的数据',res.data.rows[index].postWelfare);
			})
			// res1.push(res.data.rows)
			uni.hideLoading()
			this.JobList = [...this.JobList,...res.data.rows]
			// this.changePostTag(res.data.rows)
		},
		// 改变Tab
		changeTab(index){
			if(this.currentTab == index){
				return
			}
			this.currentTab = index
			if(index == 2){
				this.getJobData()
			}
		},
		// 改变数据内部的PostTag函数
		// changePostTag(List){
		// 	let TaghasValueNum = []
		// 	List.forEach((item,index,array)=>{
		// 		TaghasValueNum[index] = []
		// 		for (let i = 1; i <= 6; i++) {
		// 			let key = 'postTag' + i
		// 			// console.log(key);
		// 			// console.log(item);
		// 			if(item[key] !== null){
		// 				TaghasValueNum[index][i-1] = item[key]
		// 			}
		// 		}
		// 	})
		// 	this.TaghasValueNum = [...this.TaghasValueNum,...TaghasValueNum]
		// },
		// 点击跳转到公司具体内容
		toJobDetail(index){
			this.$u.route({
				url: 'pages/index/jobDetail',
				params: {
					iduseless: this.JobList[index].idUseless
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.view-class{
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		width: 100rpx;
		height: 60rpx;
		background-color: #a2a2a2;
	}
	.hover-type{
		background-color: #007Aff;
	}
.top-title{
	display: flex;
	justify-content: flex-start;
	.comp-name-wrap{
	margin-right: 20rpx;	
		
		.comp-name{
			font-family: '等线';
			font-size: 46rem;
			font-weight: 700;
		}
	}
	.image-wrap{
		width: 120rem;
		height: 120rem;
		border: 1rpx solid #D7D7D7;
	}
}	
	.comp-type{
		margin: 0 0 10rpx 0;
		.comp-type-word{
			font-family: '等线';
			font-size: 28rem;
			color: #555555;
		}
	}
.address-wrap{
	margin: 20rem 0 20rem 0;
	.address-word{
		font-family: '等线';
		font-size: 28rem;
		color: #000000;
	}
}
.tab{
	border-top: 1rpx solid #F2F2F2;
	border-bottom: 1rpx solid #F2F2F2;
	width: 100%;
	height: 90rpx;
	display: flex;
	.selected{
		color: #b7a2f4 !important;
		font-weight: 600;
	}
	.intro-wrap{
		width: 50%;
		height:100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.intro-word{
			font-family: '等线';
			font-size: 32rem;
			color: #000000;
		}
	}
	.job-wrap{
		width: 50%;
		height:100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.job-word{
			font-family: '等线';
			font-size: 32rem;
			color: #000000;
		}
	}


}
	.intro-wraps{
		line-height: 50rpx;
		display:flex; 
		flex-wrap:wrap;
		.intro-content{
			display: block;
			color: #555555;
			font-size: 30rem;
			font-family: Arial;
		}
		
	}
</style>