<template>
	<page-meta :root-font-size="`${0.5 * baseFontSize}px`"></page-meta>
	<view class="">
		<u-tabs :list="tabList" :is-scroll="true" 
		:current="currentTab" @change="change"  bar-width="80" :font-size="30*baseFontSize"
		inactive-color="#555555" active-color="#7573E6" 
		></u-tabs>
		
		<view class="" v-if="currentTab == 0" @click="toJob0">
			<view class="" style="text-align: center;" v-if="jobInfo0.length == 0">
				<view  class="recore-wrap">
					<!-- <text>暂时没有投递记录哦...</text> -->
					暂时没有投递记录哦...
				</view>
			</view>

			<view class="" v-else>
				<view class="candidate-person  u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10"
				v-for="(item,index) in jobInfo0" :key="index" hover-class="hover-class" 
				hover-stay-time="200"  @click="toJob0(index)">
					<view class="u-flex">
						<text class="candidate-word u-p-r-20">{{item.postName}}</text>
						<text class="candidate-word u-p-r-20">{{compInfo0[index].corporationName}}</text>
						<!-- <text class="candidate-word">{{age[index]}}岁</text> -->
					</view>
					<u-icon name="arrow-right" color="#888888" :size="30*baseFontSize"></u-icon>
				</view>
			</view>

		</view>
		
		<view class="" v-else-if="currentTab == 1" @click="toJob1">
			<view class="" style="text-align: center;" v-if="jobInfo1.length == 0">
				<view  class="recore-wrap">
					<!-- <text>暂时没有投递记录哦...</text> -->
					暂时没有投递记录哦...
				</view>
			</view>
			<view class="" v-else>
				<view class="candidate-person  u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10"
				v-for="(item,index) in jobInfo1" :key="index" hover-class="hover-class" 
				hover-stay-time="200"  @click="toJob1(index)">
					<view class="u-flex">
						<text class="candidate-word u-p-r-20">{{item.postName}}</text>
						<text class="candidate-word u-p-r-20">{{compInfo1[index].corporationName}}</text>
						<!-- <text class="candidate-word">{{age[index]}}岁</text> -->
					</view>
					<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
				</view>
			</view>

		</view>
		
		<view class="" v-else-if="currentTab == 2" @click="toJob2">
			<view class="" style="text-align: center;" v-if="jobInfo2.length == 0">
				<view  class="recore-wrap">
					<!-- <text>暂时没有投递记录哦...</text> -->
					暂时没有投递记录哦...
				</view>
			</view>
			<view class="" v-else>
				<view class="candidate-person  u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10"
				v-for="(item,index) in jobInfo2" :key="index" hover-class="hover-class" 
				hover-stay-time="200"  @click="toJob2(index)">
					<view class="u-flex">
						<text class="candidate-word u-p-r-20">{{item.postName}}</text>
						<text class="candidate-word u-p-r-20">{{compInfo2[index].corporationName}}</text>
						<!-- <text class="candidate-word">{{age[index]}}岁</text> -->
					</view>
					<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
				</view>
			</view>

		</view>

		<view class="" v-else-if="currentTab == 3" >
			<view class="" style="text-align: center;" v-if="jobInfo3.length == 0">
				<view  class="recore-wrap">
					<!-- <text>暂时没有投递记录哦...</text> -->
					暂时没有投递记录哦...
				</view>
			</view>
			<view class="" v-else>
				<view class="candidate-person  u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10"
				v-for="(item,index) in jobInfo3" :key="index" hover-class="hover-class" 
				hover-stay-time="200"  @click="toJob3(index)">
					<view class="u-flex">
						<text class="candidate-word u-p-r-20">{{item.postName}}</text>
						<text class="candidate-word u-p-r-20">{{compInfo3[index].corporationName}}</text>
						<!-- <text class="candidate-word">{{age[index]}}岁</text> -->
					</view>
					<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
				</view>
			</view>

		</view>
		
		<view class="" v-else-if="currentTab == 4" >
			<view class="" style="text-align: center;" v-if="jobInfo4.length == 0">
				<view  class="recore-wrap">
					<!-- <text>暂时没有投递记录哦...</text> -->
					暂时没有投递记录哦...
				</view>
			</view>
			<view class="">
				<view class="candidate-person  u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10"
				v-for="(item,index) in jobInfo4" :key="index" hover-class="hover-class" 
				hover-stay-time="200"  @click="toJob4(index)">
					<view class="u-flex">
						<text class="candidate-word u-p-r-20">{{item.postName}}</text>
						<text class="candidate-word u-p-r-20">{{compInfo4[index].corporationName}}</text>
						<!-- <text class="candidate-word">{{age[index]}}岁</text> -->
					</view>
					<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			jobIdUseless: [],//岗位的iduseless
			codeList: [],//code的list
			compInfo: [],//公司信息
			compInfo0: [],
			compInfo1: [],
			compInfo2: [],
			compInfo3: [],
			compInfo4: [],
			jobInfo: [],//岗位 的信息
			jobInfo0: [],//岗位信息
			jobInfo1: [],//岗位信息
			jobInfo2: [],//岗位信息
			jobInfo3: [],//岗位信息
			jobInfo4: [],//岗位信息
			currentTab: 0,
			tabList: [{
				name: '已投递'
			},{
				name: '被查看'
			},{
				name: '待面试'
			},{
				name: '已录用'
			},{
				name: '不合适'
			}]
		}
	},
	computed:{
		baseFontSize() {
		    return this.vuex_fontScale
		}
	},
	async onLoad() {
		const res = await this.$u.api.getJobIdByResumeId(this.vuex_user.openid)
		console.log(res.data)
		this.jobIdUseless = res.data
		this.jobIdUseless.forEach(async(value,index)=>{
			// 获取code的list
			let params = {
				postIduseless: value,
				resumeId: this.vuex_user.openid
			}
			const res1 = await this.$u.api.getJobCode(params)
			// console.log(res1)
			this.codeList.push(res1.data[0])
			//获取岗位信息的list
			const res2 = await this.$u.api.getJobDetailByIdUseless(value)
			const res3 = await this.$u.api.getCompInfo(res2.data[0].id)//得到公司信息
			if(res1.data[0] == 1){
				console.log('123');
				this.jobInfo0.push(res2.data[0])
				this.compInfo0.push(res3.data[0])
			}else if(res1.data[0] == 21){
				console.log(456);
				this.jobInfo2.push(res2.data[0])
				this.compInfo2.push(res3.data[0])
			}
			else if(res1.data[0] == 20){
				console.log(789);
				this.jobInfo4.push(res2.data[0])
				this.compInfo4.push(res3.data[0])
			}
		})
	},
	methods: {
		// 改变tab标签
		change(index){
			this.currentTab = index
		},
		toJob0(index){
			this.$u.route({
				url: 'pages/index/jobDetail',
				params: {
					iduseless: this.jobInfo0[index].idUseless
				}
			})
		},
		toJob1(index){
			this.$u.route({
				url: 'pages/index/jobDetail',
				params: {
					iduseless: this.jobInfo1[index].idUseless
				}
			})
		},
		toJob2(index){
			this.$u.route({
				url: 'pages/index/jobDetail',
				params: {
					iduseless: this.jobInfo2[index].idUseless
				}
			})
		},
		toJob3(index){
			this.$u.route({
				url: 'pages/index/jobDetail',
				params: {
					iduseless: this.jobInfo3[index].idUseless
				}
			})
		},
		toJob4(index){
			this.$u.route({
				url: 'pages/index/jobDetail',
				params: {
					iduseless: this.jobInfo4[index].idUseless
				}
			})
		},
		
		
	}
}
</script>

<style lang="scss" scoped>
.recore-wrap{
	font-family: Arial;
	font-size: 30rem;
	color:#333333;
	margin-top: 40vh;
	display: inline-block;
	
}
.candidate-person{
	height: 130rem;
	display: flex;
	justify-content: space-between;
	border-bottom: 2rpx solid #797979;
	.candidate-word{
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: Arial;
		font-size: 32rem;
		line-height: 40rem;
	}
}
</style>