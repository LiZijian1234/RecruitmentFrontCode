<template>
	<page-meta :root-font-size="`${0.5 * baseFontSize}px`"></page-meta>
	<view class="">
		<view class="search-wrap">
			<u-search placeholder="请输入您想要找的招聘" 
			v-model="keyword" shape="round"
			:show-action="true" action-text="搜索" 
			:animation="false" :action-style="actionStyle"
			placeholder-color="#9C9BA0"
			bg-color="#efeef4"
			:height="serachHeight"
			input-align="left"
			border-color="#797979"
			search-icon-color="#9C9BA0"
			:input-style="searchStyle"
			@search="search"
			@custom="search"
			></u-search>
		</view>
		<view class="u-m-l-30 u-m-b-20  history-middle">
			<text class="histroy-record">历史记录</text>
			<text class="history-clear" @click="clearHistory">清除记录</text>
		</view>
		<view class="u-m-30 history-wrap">
			<text v-for="(item,index) in searchHistoryList" :key="index" @click="search(item)"
				class="item-word">{{item}}</text>
		</view>
		
		<view class="tab">
			<view class="intro-wrap" @click="changeTab(1)">
				<text class="intro-word" :class="currentTab == 1 ? 'selected' : ''">按岗位名称</text>
			</view>
			<view class="job-wrap"  @click="changeTab(2)">
				<text class="job-word" :class="currentTab == 2 ? 'selected' : ''">按发布公司</text>
			</view>
		</view>
		
		<view class="u-m-20 intro-wraps" v-if="currentTab == 1">
			<view class="" v-if="JobList.length !== 0">
				<view class="u-flex-col"
				v-for="(item,index) in JobList" :key="index" @click="toCompanyDetail(index)">
					<jobitem :item="item" :index="index" :TaghasValueNum="TaghasValueNum"></jobitem>
				</view>
			</view>
			<view class="u-m-l-20 u-m-t-40" v-else>
				<text style="font-size: 26rem;">暂时没有相关岗位，请换个关键词搜索一下吧~</text>
			</view>
		</view>
		
		<view class="u-m-20" v-else>
			<view class="" v-if="compList.length !== 0">
				<view class="u-flex-col u-m-20">
					<view class="" v-for="(item,index) in compList" :key="index" @click="toCompany(item)"
					style="height: 100rem;border-bottom: 1rpx solid #c1c1c1;display: flex;align-items: center;justify-content: flex-start;">
						<text style="font-size: 30rem;display: flex;align-items: center;margin-left: 30rem;">{{item}}</text>
					</view>
				</view>
			</view>
			<view class="u-m-l-20 u-m-t-40" v-else>
				<text style="font-size: 26rem;">暂时没有相关公司，请换个关键词搜索一下吧~</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				compList: [],//公司list
				JobList: [],
				TaghasValueNum: [],//数据data中的postTag进行了重新修改数据
				currentTab: 1,//当前tab
				keyword:'',
				searchHistoryList: [],//历史记录
				searchStyle:{
					height: '60rpx'
					// fontWeight: '500',
					// fontSize: '30rpx',
					// fontFamily: '微软雅黑',
					// // borderRadius: '40rpx'
					// // boxShadow: '5rpx 5rpx 5rpx #f0f0f0'
				},
				actionStyle: {
					fontSize: '28rem',
					width: '80rem'
				}
			}
		},
		computed:{
			baseFontSize() {
			    return this.vuex_fontScale
			},
			serachHeight(){
				if(this.vuex_fontScale == 1)
				{
					return 80
				}else{
				return this.vuex_fontScale  * 60
				}
			}
		},
		
		onLoad(){
			
		},
		onShow() {
			this.searchHistoryList = JSON.parse(uni.getStorageSync('searchList') || '[]')
			console.log('onshow', this.searchHistoryList)
		},
		methods: {
			// 公司跳转
			async toCompany(item){
				const res = await this.$u.api.getCompInfoByCompName(item)
				this.$u.route({
					url: 'pages/index/compDetail',
					params: {
						HRid: res.data.id
					}
				})
			},
			// 点击跳转岗位
			toCompanyDetail(index){
				this.$u.route({
					url: 'pages/index/jobDetail',
					params: {
						iduseless: this.JobList[index].idUseless
					}
				})
			},
			// // 改变数据内部的PostTag函数
			// changePostTag(){
			// 	let TaghasValueNum = []
			// 	this.JobList.forEach((item,index,array)=>{
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
			// 	this.TaghasValueNum = TaghasValueNum
			// },
			// 改变Tab
			changeTab(index){
				if(this.currentTab == index){
					return
				}
				this.currentTab = index
			},
			// 用户搜索时触发
			async search(keyword){
					if (keyword == '') {
						uni.showModal({
							title: '搜索内容不能为空'
						});
						return
					} else {
				//判断数组里面是否有重复的搜索内容，有的话就删除之前的，把现在搜索的放在数组的前面
						if (this.searchHistoryList.includes(keyword)) {
							let i = this.searchHistoryList.indexOf(keyword);
							
							this.searchHistoryList.splice(i, 1);
							//把现在搜索的放在数组的前面
							this.searchHistoryList.unshift(keyword)
						} else {
							this.searchHistoryList.unshift(keyword)
						}
						if(this.searchHistoryList.length > 8){
							this.searchHistoryList.pop();
						}
						uni.setStorageSync('searchList',JSON.stringify(this.searchHistoryList))
						//关键词是岗位时
						const res = await this.$u.api.getJobByName(keyword)
						console.log('岗位',res);
						// 操作数组
						res.data.forEach((item,index)=>{
							if(res.data[index].postWelfare != '' && res.data[index].postWelfare != null && res.data[index].postWelfare != ' '){
								res.data[index].postWelfare = JSON.parse(res.data[index].postWelfare)
								if(res.data[index].postWelfare.length > 3){
									res.data[index].postWelfare = res.data[index].postWelfare.slice(0,3)
								}
							}
							console.log('改变为对象之后的数据',res.data[index].postWelfare);
						})
						// console.log(res.data);
						this.JobList = res.data
						// this.changePostTag()
						
						//关键词是公司名时
						const res1 = await this.$u.api.getCompByName(keyword)
						console.log('公司',res1);
						this.compList = res1.data
						
						// if(res.data){
						// 	this.JobList = res.data
						// 	this.changePostTag()
						// }else{
					}		
						// }

						// // 进行路由跳转
						// setTimeout(()=>{
						// 	this.$u.route({
						// 		url: "pages/index/jobList",
						// 		params: {
						// 			data: JSON.stringify(res.data)
						// 			}
						// 	})
						// },800)
					
							
				// const res = await this.$u.api.getJobByName(value)
				// // console.log(res.data);
				// // 进行路由跳转
				// setTimeout(()=>{
				// 	this.$u.route({
				// 		url: "pages/index/jobList",
				// 		params: {
				// 			data: JSON.stringify(res.data)
				// 			}
				// 	})
				// },800)
			},
			// 清除记录
			clearHistory(){

				uni.removeStorage({
					key: 'searchList'
				});
				
				this.searchHistoryList = [];
				uni.showToast({
					title: '已清空'
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #ffffff;
	}
</style>
<style lang="scss" scoped>
.search-wrap{
	background-color: #fff;
	padding: 20rpx 30rpx 20rpx 30rpx;
}
.history-middle{
	display: flex;
	justify-content: space-between;
	.histroy-record{
		font-size: 30rem;
	}
	.history-clear{
		font-size: 28rem;
	}
}
.history-wrap{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.item-word{
	background-color: #efeef4;
	border: 1rpx solid #797979;
	height: 50rem;
	font-size: 28rem;
	border-radius: 30rpx;
	padding: 10rpx 20rpx 10rpx 20rpx;
	margin: 10rpx;
	display: flex;
	justify-content: center;
	align-items: center;
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
		
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20rem 0 20rem 0;
		.intro-word{
			font-family: '等线';
			font-size: 32rem;
			color: #000000;
		}
		border-right: 1rpx solid #a5a5a5;
	}
	.job-wrap{
		width: 50%;
		
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20rem 0 20rem 0;
		.job-word{
			font-family: '等线';
			font-size: 32rem;
			color: #000000;
		}
	}


}
</style>
