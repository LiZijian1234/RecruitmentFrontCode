<template>
	<page-meta :root-font-size="`${baseFontSize}px`"></page-meta>
	<view class="" style="position: relative;">
<!-- 		<view class="top-view">
			
		</view> -->
<!-- 		搜索框
		<view class="search-wrap">
			<view class="search-wrap-view" @click="goSearch">
				<u-search placeholder="搜索职位/公司" 
				v-model="keyword" shape="round" :disabled="true"
				:show-action="false"
				placeholder-color="#6a696c"
				bg-color="#fff"
				height="75"
				input-align="center"
				border-color="#a2a2a2"
				search-icon-color="#797979"
				:input-style="searchStyle"
				></u-search>
			</view>
		</view> -->
		<view class="page-wrap">
			<!-- 上面的轮播图部分 -->
			<view class="swiper-wrap">
				<u-swiper :list="imgList" name="img" height="300" img-mode="aspectFill" border-radius="30" @click="toSwiperPage()"></u-swiper>
			</view>
			<!-- 中间的轮播 -->
			<view class="recommend">

				<view class="recommend-top">
					<view class="">
						<text class="iconfont icon-huobao" style="color: #9473ef; font-size: 50rem;"></text>
						<text class="word-size">日结热招</text>
					</view>
					<view class="" @click="morePartTimeJob">
						<text class="more">更多</text>
					</view>
				</view>
				<view class="">
					<swiper :autoplay="true" :interval="3000" :duration="1000"
					 display-multiple-items="4" 
					:circular="true" class="swiper">
						<swiper-item v-for="(item,index) in swiperList" @click="toPartTime(item,index)"
						 class="swiper-item" :key="index">
							<view class="img-item">
								<u-image width="80rem" height="80rem" :src="item.icon"
								mode="scaleToFill"></u-image>
							</view>
							<view class="swiper-item-word">{{item.name}}</view>
						</swiper-item>
					</swiper>
				</view>

			</view>
			<!-- 搜索框 -->
			<view class="search-wrap">
				<view class="search-wrap-view" @click="goSearch()">
					<u-search placeholder="搜索职位/公司" 
					v-model="keyword" shape="round" :disabled="true"
					:show-action="false"
					placeholder-color="#6a696c"
					bg-color="#fff"
					:height="serachHeight"
					input-align="center"
					border-color="#fff"
					search-icon-color="#797979"
					:input-style="searchStyle"
					></u-search>
				</view>
			</view>

		</view>
		<!-- 下面的职位中心 -->
		<view class="job-center">
			<!-- tabs -->
			<view class="tabs">
				<view class="inner-tabs">
					<view class="flex1" v-for="(item,index) in tabList" :key="index">
						<view :class="currentTab == index ? 'selectedTab' : ''" class="word" 
						@click="changeTab(index)">
							<text class="item-text">{{item.name}}</text>
						</view>
					</view>
				</view>
				<view class="u-flex" @click="toChoose">
					<text class="choose">筛选</text>
					<text class="iconfont icon-shaixuan" style="font-size: 42rem;margin-right: 50rpx; color: #9473ef;
					"></text>
				</view>
			</view>
			
			
				
				<view class="u-flex-col" 
				v-for="(item,index) in JobList" :key="index" @click="toJobDetail(index)">
					<jobitem :item="item" :index="index" :TaghasValueNum="TaghasValueNum"></jobitem>
				
				</view>	
		</view>
		
		<u-popup v-model="showPopUp" mode="bottom" height="500" :closeable="true">
			<view class="">
				
				<view class="">
					<view class="city-word u-m-t-30">
						区县
					</view>
					<view class="u-m-20">
						<u-field
							v-model="city"
							placeholder="请选择区县"
							:disabled="true"
							@click="showPicker"
						>
						</u-field>
					</view>
				</view>
				<view class="city-word">
					薪资
				</view>
				<view class="u-m-20" style="display: flex;align-items: center;padding-left: 159rpx;">
					<view class="" style="">
<!-- 						<u-field
							v-model="salary"
							placeholder="请输入具体数字"
						>
						</u-field> -->
						<input placeholder="请输入具体数字" v-model="salary" class="inputstyle"/>
					</view>
					<text>元</text>
				</view>
				<!-- 上传按钮 -->
				<view class="btn-wrap">
					<u-button shape="circle" :custom-style="btnStyle" @click="submit">
						<text class="save">保存</text>
					</u-button>
				</view>
			</view>
		</u-popup>
		
				
		<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
		

	</view>
</template>

<script>
const app = getApp();

	export default {
		data() {
			return {
				
				show: false,
				list: [
				{
					value: 12,
					label: '蓝田县',
					children: [
						{
							value: 13,
							label: '安村镇'
						},
						{
							value: 14,
							label: '焦岱镇'
						},
						{
							value: 15,
							label: '蓝桥镇'
						},
						{
							value: 16,
							label: '汤峪镇'
						},
						{
							value: 17,
							label: '玉山镇'
						},
						{
							value: 18,
							label: '前卫镇'
						},
						{
							value: 19,
							label: '华胥镇'
						},
						{
							value: 20,
							label: '孟村镇'
						},
						{
							value: 21,
							label: '普化镇'
						},
						{
							value: 22,
							label: '三里镇'
						},
						{
							value: 23,
							label: '小寨镇'
						},
						{
							value: 24,
							label: '葛牌镇'
						},
						{
							value: 25,
							label: '辋川镇'
						},
						{
							value: 26,
							label: '灞源镇'
						},
						{
							value: 27,
							label: '厚镇'
						},
						{
							value: 28,
							label: '泄湖镇'
						},
					]
				},
				{
					value: 29,
					label: '周至县',
					children: [
						{
							value: 30,
							label: '尚村镇'
						},
						{
							value: 31,
							label: '集贤镇'
						},
						{
							value: 32,
							label: '楼观镇'
						},
						{
							value: 33,
							label: '司竹镇'
						},
						{
							value: 34,
							label: '马召镇'
						},
						{
							value: 35,
							label: '四屯镇'
						},
						{
							value: 36,
							label: '富仁镇'
						},
						{
							value: 37,
							label: '哑柏镇'
						},
						{
							value: 38,
							label: '终南镇'
						},
						{
							value: 39,
							label: '九峰镇'
						}
					]
				},
				{
					value: 1,
					label: '莲湖区',
					children: []
					
				},{
					value: 2,
					label: '碑林区',
					children: []
				},
				{
					value: 3,
					label: '雁塔区',
					children: []
				},
				{
					value: 4,
					label: '新城区',
					children: []
				},
				{
					value: 5,
					label: '未央区',
					children: []
				},
				{
					value: 6,
					label: '长安区',
					children: []
				},
				{
					value: 7,
					label: '阎良区',
					children: []
				},
				{
					value: 8,
					label: '灞桥区',
					children: []
				},
				{
					value: 9,
					label: '临潼区',
					children: []
				},
				{
					value: 10,
					label: '高陵区',
					children: []
				},
				{
					value: 11,
					label: '鄂邑区',
					children: []
				}
				],
				
				JobList: [],//下面岗位的数据
				TaghasValueNum: [],//数据data中的postTag进行了重新修改数据
				city: '',//筛选的城市
				salary: '',//筛选的薪资
				showPopUp: false,
				// 提交按钮的样式
				btnStyle: {
					backgroundColor: '#7573e6'
				},
				tabList: [
					{
						name: '推荐'
					},{
						name: '最新'
					}
				],
				page:  1,
				currentTab: 0,//当前tab选中的
				// tabStyle:{
				// 	backgroundColor: '#9473ef',
				// 	borderRadius: '30rpx',
				// 	height: '80rpx',
					
				// 	fontSize: '30rpx'
				// },
				keyword:'',
				searchStyle:{
					width: '550rpx',
					height: '60rpx',
					// fontWeight: '500',
					// fontSize: '30rpx',
					// fontFamily: '微软雅黑',
					// // borderRadius: '40rpx'
					// // boxShadow: '5rpx 5rpx 5rpx #f0f0f0'
				},
				imgList: [
					{
						img: 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/24/7a2361e2-ceff-417c-b601-02da73341b20.bmp',
						title: '阿里巴巴招聘'
					},{
						img: 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/24/7e991199-923d-46f7-be53-b333603f3c5b.png',
						title: '中国移动招聘'
					},{
						img: 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/24/1bdc55a3-c34c-4e43-93e2-d910048f3ed3.png',
						title: '字节跳动招聘'
					}
					
				],
				swiperList: [{
					name:'销售经理',
					icon: 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/22/a4edc6d9-31ca-4ac1-ad39-ce76b9ae3f78.png',
					idUseless: '1596372486701'
					},{
					name: '产品设计',
					icon: 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/22/c2803952-6614-4332-9f2f-f6ec0efa13a5.png',
					idUseless: '1596372486704'
					},
					{
						name:'项目经理',
						icon: 'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/22/3f96f787-18d3-471e-93fe-a5851a0221b9.jpg',
						idUseless: '1596372486710'
						},{
						name:'机修技师',
						icon:'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/22/8f1f910c-1afd-4abd-af54-a555f07fdc3d.gif',
						idUseless: '1596372486720'
						},{
						name:'出纳员',
						icon:'https://wen-second.oss-cn-hangzhou.aliyuncs.com/file/2022/06/22/3be56037-5273-41f6-aaa7-988f92ebbf76.jpg',
						idUseless: '1596372486732'
						}
						// {name:'字节',
						// icon:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.comrc.com.cn%2Frepository%2Fimage%2FzsE29YY4Sbi8A76NDpTCRA.png_%7Bi%7Dxaf.png&refer=http%3A%2F%2Fwww.comrc.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655802132&t=a22a9e70ac49761fb1b7656c67bdbf4c',
						// }
						],
				dropDownValue1: 1,
				dropDownOptions1: [
					{
						label: '全部',
						value: 1,
					},
					{
						label: '北京',
						value: 2,
					},
					{
						label: '上海',
						value: 3,
					},
					{
						label: '广州',
						value: 4,
					},
					{
						label: '深圳',
						value: 5,
					},
					{
						label: '西安',
						value: 6,
					},
					{
						label: '杭州',
						value: 7,
					},
					],
				dropDownValue2: 1,
				dropDownOptions2: [{
						label: 'IT/互联网',
						value: 1,
					},{
						label: '通信/电子/半导体',
						value: 2,
					},{
						label: '教育/培训/科研',
						value: 3,
					},{
						label: '政府/机构/组织',
						value: 4,
					},{
						label: '制造业',
						value: 5,
					},{
						label: '医疗/医药',
						value: 6,
					},],
				dropDownValue3: 1,
				dropDownOptions3: [{
					label: '5000以下',
					value: 1,
				},{
					label: '5000-10000',
					value: 2,
				},{
					label: '10000-20000',
					value: 3,
				},{
					label: '30000以上',
					value: 4,
				}],
			}
		},
		computed:{
			baseFontSize() {
			    return this.vuex_fontScale * 0.5
			},
			serachHeight(){
				if(this.vuex_fontScale == 1)
				{
					return 75
				}else{
				return this.vuex_fontScale  * 50
				}
			}
		},
		onLoad() {
			this.getJob()
			// 消息界面登录
			// console.log('用户的模块',app.globalData.userInfo.userSig);
			// console.log(wx.getStorageSync('token').userInfo.userSig);
			// 消息用户的登录
			if(this.vuex_user.openid){
				const SDKAppID = app.globalData.SDKAppID;
				let userInfo = wx.getStorageSync('token').userInfo;
				if(userInfo.userSig){
					uni.$TUIKit.login({//用户登录需要userID和userSig
						userID: userInfo.userID,
						userSig: userInfo.userSig
					}).then(() => {
						console.log('用户登录成功');
						uni.$aegis.reportEvent({
						    name: 'login',
						    ext1: 'login-success',
						    ext2: 'uniTuikitExternal',
						    ext3: `${SDKAppID}`,
						})
					}).catch((error) => {
						uni.$aegis.reportEvent({
						    name: 'login',
						    ext1: `login-failed#error:${error}`,
						    ext2: 'uniTuikitExternal',
						    ext3: `${SDKAppID}`,
						})
					})
				}
			}

			// if(){
			// 	console.log('用户消息模块登录了');
			// }
		},
		onReachBottom() {
			this.page = this.page + 1
			this.getJob()
		},
		methods: {
			// 跳转到轮播图的页面
			toSwiperPage(index){
				console.log('index页面',index);
				this.$u.route({
					url: `pages_message/message/swiperDetail`,
					params: {
						index: index
					}
					// params: {
					// 	iduseless: item.idUseless
					// }
				})
			},
			// 日结图片的跳转
			toPartTime(item,index){
				this.$u.route({
					url: 'pages/index/jobDetail',
					params: {
						iduseless: item.idUseless
					}
				})
			},
			// 点击跳转到更多页面
			morePartTimeJob(){
				uni.navigateTo({
					url: '/pages_message/message/morePartTimeJob'
				})
			},
			// picker点击确定
			confirm(e){
				console.log(e);
				if(e[1].label == null){
					e[1].label = ''
				}
				this.city = e[0].label + e[1].label
			},
			// 点击显示picker
			showPicker(){
				this.show = true
			},
			// 获取所有岗位，这个所有岗位用来展示推荐下面的岗位
			async getJob(){
				uni.showLoading({title:'加载中'})
				//TODO  如果有期望薪资就调用薪资的api，没有期望薪资就调用所有数据的api
				const params = {
					pageCurrent: this.page,
					pageSize: 10
				}
				let res = {}
				if(this.currentTab ==0){
					res = await this.$u.api.getAllJob(params)
				}
				else if(this.currentTab == 1){
					res = await this.$u.api.getNewJob(params)
				}
				uni.hideLoading()
				console.log(res.data);
				res.data.rows.forEach((item,index)=>{
					if(res.data.rows[index].postWelfare != '' && res.data.rows[index].postWelfare != null && res.data.rows[index].postWelfare != ' '){
						res.data.rows[index].postWelfare = JSON.parse(res.data.rows[index].postWelfare)
						if(res.data.rows[index].postWelfare.length > 3){
							res.data.rows[index].postWelfare = res.data.rows[index].postWelfare.slice(0,3)
						}
					}
					console.log('改变为对象之后的数据',res.data.rows[index].postWelfare);
				})
				this.JobList = [...this.JobList,...res.data.rows]
				
				// this.changePostTag(res.data.rows)
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
			// 改变tab
			async changeTab(index){
				if(this.currentTab == index)return
				this.currentTab = index
				// 下面请求currentTab下的数据
				this.JobList = []
				this.page = 1
				this.TaghasValueNum = []
				this.getJob()
				// if(this.currentTab == 0){
				// 	//请求推荐的数据
				// 	this.getRecommendJob()
				// }
				// else if(this.currentTab == 1){
				// 	// 请求最新的数据
				// 	this.page = 1
				// 	this.JobList = []
				// 	this.TaghasValueNum = []
					
				// 	const res = await this.$u.api.getNewJob({
				// 		pageCurrent: this.page,
				// 		pageSize: 10
				// 	})
					
				// 	this.JobList = [...this.JobList,...res.data.rows]
					
				// 	this.changePostTag(res.data.rows)
				// 	this.page = this.page + 1
				// }
			},
			// 点击搜索
			goSearch(){
				this.$u.route({
					url: 'pages/index/search'
				})
			},
			// 点击筛选
			toChoose(){
				this.showPopUp = true
				
			},
			// 筛选后点击保存的函数
			async submit(){
				// 没有填写完整
				if(!this.city || !this.salary){
					uni.showToast({
						title: '请填写完整~',
						icon:"error"
					});
					return
				}
				
				this.showPopUp = false//关闭弹出层
				let params = {
					city: "西安-" + this.city,
					monthSalary: this.salary
				}
				// 向后端请求更新数据
				const res = await this.$u.api.getFilterData(params)
				res.data.forEach((item,index)=>{
					if(res.data[index].postWelfare != '' && res.data[index].postWelfare != null && res.data[index].postWelfare != ' '){
						res.data[index].postWelfare = JSON.parse(res.data[index].postWelfare)
						if(res.data[index].postWelfare.length > 3){
							res.data[index].postWelfare = res.data[index].postWelfare.slice(0,3)
						}
					}
					console.log('改变为对象之后的数据',res.data[index].postWelfare);
				})
				console.log(res);
				
				this.JobList = res.data
				this.page = 1
				// this.changePostTag()
			},
			changeItem(index){
				console.log('点击了',index);
			},
			
			closeDropdown(){
				this.$refs.uDropdown.close();
			},
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

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.inputstyle{
	width: 209rpx;
	height: 91rpx;
}
// /deep/.data-v-1c764f86{
// 	width: 210rpx !important;
// }
	.img{
		width: 60rpx;
		border-radius: 50%;
	}
.top-view{
	width: 750rpx;
	height: 35rpx;
	background-color: #7573e6;
}
.search-wrap{
	// position: absolute;
	display: flex;
	justify-content: center;
	// margin-bottom: 120rpx;
	// top: 0rpx;
	// width: 100%;
	margin: 0 0 40rpx 0;
	// box-shadow:20rpx 25rpx 20rpx #939393;
	// border-radius: 50%;
	.search-wrap-view{
		// box-shadow: 5rpx 5rpx 5rpx #f0f0f0;
		// border-radius: 40rpx;
	}
}
.swiper-wrap{
	padding-top: 30rpx;
}
.recommend{
	margin-top: 20rpx;
	height: 250rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	// align-items: center;
	.more{
		font-family: Arial;
		font-size: 28rpx;
		
	}
	.recommend-top{
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.word-size{
		font-family: Arial, Helvetica, sans-serif;
		font-size: 32rem;
	}
	
}
.page-wrap{
	margin: 0 50rpx 0 50rpx;
}
.job-center{
	background-color: #fff;
	
	width: 100%;
	.tabs{
		z-index: 999 !important;
		width: 100%;
		height: 80rem;
		background-color: #f9f9f9;
		display: flex;
		justify-content: space-between;
		border: 1rpx solid #c1c1c1;
		.inner-tabs{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-around;
			align-items: center;
			width: 300rpx;
			margin-left: 50rpx;
			.flex1{
				.item-text{
					font-size: 26rem;
				}
			}
			.selectedTab{
				background-color: #bcbbf1;
				border-radius: 30rpx;
				
			}
			.word{
				display: flex;
				justify-content: center;
				align-items: center;
				line-height: 50rpx;
				color: #333333;
				width: 90rem;
				height: 50rem;
				font-family: Arial, Helvetica, sans-serif;
				font-size: 28rpx
			}
		}
		.choose{
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 60rpx;
			color: #333333;
			padding-right: 20rpx;
			height: 60rpx;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 28rem
		}
	}
	// .job-ground{
	// 	padding: 0 40rpx 0 40rpx;
	// 	.job-item{
	// 		border-bottom: 1rpx solid #c1c1c1;
	// 		padding-bottom: 50rpx;
	// 	}
	// 	.job-item-top{
	// 		padding-bottom: 30rpx;
	// 		padding-top: 30rpx;
	// 		display: flex;
	// 		justify-content: space-between;
	// 		.job-item-name{
	// 			font-size: 32rpx;
	// 			font-family: "Microsoft Yahei";
	// 			font-weight: 600;
	// 		}
	// 		.job-item-salary{
	// 			color: #9473EF;
	// 			font-size: 30rpx;
				
	// 		}
	// 	}
	// 	.job-item-middle{
	// 		display: flex;
	// 	}
	// 	.job-item-bottom-wrap{
	// 		display: flex;
	// 		justify-content: flex-start;
	// 		.icon-24gf-building2{
	// 			color:#9473ef;
	// 			font-size: 40rpx;
	// 		}
	// 		.company-name{
	// 			margin-left: 10rpx;
	// 			font-family: Arial, Helvetica, sans-serif;
	// 			font-size: 30rpx;
	// 			color: #333333;
				
	// 		}
	// 	}
	// }
}
.swiper{
	display: flex;
	height: 170rem;
	justify-content: center;
	align-items: center;
}
.swiper-item{
	// height: 120rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.swiper-item-word{
	text-align: center;
	padding-top: 30rpx;
	font-size: 28rem;
}
.img-item{
	padding-top: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.city-word{
	font-family: Arial;
	font-size: 32rpx;
	font-weight: bold;
	margin-left: 120rpx;
}
.btn-wrap{
	margin: 50rpx 250rpx 0 250rpx;
	width: auto;
	height: 60rpx;
	.save{
		color: #060400;
	}
}
// 用于搜索框自定义样式
/deep/ .u-content.data-v-4c556b40{
	box-shadow:20rpx 10rpx 20rpx #939393 !important;
	background-color: #f2f2f2;
}
/deep/ .u-placeholder-class{
	font-family: '等线';
	font-weight: bold;
	font-size: 34rem;
}
// /deep/ .u-clear-icon{
	
// }
</style>
