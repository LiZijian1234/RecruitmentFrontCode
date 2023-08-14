<template>
	<view class="out" style="background-color: #f2f2f2;padding-top: 20rpx;">
		<view class="out-wrap" v-for="(user,index) in EvaluateList" :key="index" >
			<view class="top-wrap">
				<u-avatar :src="user.headPortrait" size="90"></u-avatar>
				<view class="top-name u-m-l-20">
					<view class="top-top">
						<text class="u-m-b-15" style="font-size: 32rpx;font-family: Arial;">{{user.nickName}}</text>
						<view class="u-m-l-20" style="display: flex;">
							<view   class="u-p-l-2 u-p-r-2"
							 v-for="(item1,index1) in user.starList" :key="index1">
								<text v-if="item1" class="iconfont icon-a-ziyuan676" style="color: #7573e6;font-size: 34rpx;"></text>
								<text v-else class="iconfont icon-xingjibie" style="color: #cccccc;font-size: 34rpx;"></text>
							</view>
							<text>{{user.userScore}}分</text>
						</view>
					</view>
					<text class="" style="color: #b8b8bd;font-size: 28rpx;">{{user.addEvaluatetime}}</text>
				</view>
			</view>
			<!-- 中间的评价详细内容 -->
			<view class="middle-wrap u-m-t-20 u-m-b-20 u-m-l-20 u-m-r-20" style="display: flex; flex-direction: column;align-items: flex-start;">
				<text class="u-m-b-20 u-m-l-10" style="font-size: 32rpx;font-family: Arial; ">{{user.userEvaluate}}</text>
				<view class="" style="display: flex;justify-content: space-around;">
					<view class="" v-if="user.picture1">
						<u-image width="170rpx" height="170rpx" :src="user.picture1" mode="scaleToFill"></u-image>
					</view>
					<view class="" v-if="user.picture2">
						<u-image width="170rpx" height="170rpx" :src="user.picture2" mode="scaleToFill"></u-image>
					</view>
					<view class="" v-if="user.picture3">
						<u-image width="170rpx" height="170rpx" :src="user.picture3" mode="scaleToFill"></u-image>
					</view>
				</view>
				
				<view class="" style="display: flex;">
					<view class="" v-if="user.picture4">
						<u-image width="170rpx" height="170rpx" :src="user.picture4" mode="scaleToFill"></u-image>
					</view>
					<view class="" v-if="user.picture5">
						<u-image width="170rpx" height="170rpx" :src="user.picture5" mode="scaleToFill"></u-image>
					</view>
					<view class="" v-if="user.picture6">
						<u-image width="170rpx" height="170rpx" :src="user.picture6" mode="scaleToFill"></u-image>
					</view>
				</view>
				
				<view class="" style="display: flex;">
					<view class="" v-if="user.picture7">
						<u-image width="170rpx" height="170rpx" :src="user.picture7" mode="scaleToFill"></u-image>
					</view>
					<view class="" v-if="user.picture8">
						<u-image width="170rpx" height="170rpx" :src="user.picture8" mode="scaleToFill"></u-image>
					</view>
					<view class="" v-if="user.picture9">
						<u-image width="170rpx" height="170rpx" :src="user.picture9" mode="scaleToFill"></u-image>
					</view>
				</view>
				
			</view>
			<!-- 下面的内容 -->
			<view class="bottom-wrap">
				<view class="bottom5">
					<text class="iconfont icon-dianzan" @click="changeToLike(user,index)"
					v-if="!user.alreadyLike" style="color: #3c3c3c;font-size: 40rpx;"></text>
					<text class="iconfont icon-dianzan_kuai" v-else  @click="changeToLike(user,index)" style="color: #7573e6;font-size: 40rpx;"></text>
					<text class="u-p-l-10">{{user.likeNum}}</text>
				</view>
				<view class="bottom5">
					<text class="iconfont icon-cai" v-if="!user.alreadyDislike" @click="changeToDislike(user,index)"
					  style="color: #3c3c3c;font-size: 32rpx;"></text>
					<text class="iconfont icon-cai1" v-else  @click="changeToDislike(user,index)" style="color: #7573e6;font-size: 40rpx;"></text>
					<text class="u-p-l-10">{{user.dislikeNum}}</text>
				</view>
			</view>
		</view>
		
		<view class="fixed" @click="toWriteEvaluate">
			<text class="iconfont icon-tianjia_huaban" style="color: #fff;font-size: 70rpx;"></text>
		</view>
	</view>
</template>

<script>
export default {
	data(){
		return{
			hrid:'',
			dataList: [],//所有评价
			EvaluateList: [],//以评价用户为item的list
			
		}
	},
	async onLoad(options) {
		console.log('options的hrid为',options.hrid);
		this.hrid = options.hrid
		// 获得公司所有评价
		const res = await this.$u.api.getAllEvaluateByHrid(this.hrid)
		console.log('公司所有评价',res.data);
		if(res.data.length == 0){
			return
		}
		this.dataList = res.data
		this.dataList.forEach(async (item,index)=>{
			//获取评价人的信息
			const userinfo =  await this.$u.api.getUserInfo(item.userId)
			// 设计每个评价的对象
			let userInfo = userinfo.data
			userInfo.starList = [false, false, false, false, false]
			let integerScore = Math.round(item.userScore)
			console.log('四舍五入之后',integerScore);
			for (let i = 0; i < integerScore; i++) {
				userInfo.starList[i] = true;
			}
			userInfo.compId = item.corporationId
			userInfo.userEvaluate = item.userEvaluate
			userInfo.evaluateIdUseless = item.idUseless
			userInfo.userScore = item.userScore
			userInfo.addEvaluatetime = item.addtime
			userInfo.picture1 = item.picture1
			userInfo.picture2 = item.picture2
			userInfo.picture3 = item.picture3
			userInfo.picture4 = item.picture4
			userInfo.picture5 = item.picture5
			userInfo.picture6 = item.picture6
			userInfo.picture7 = item.picture7
			userInfo.picture8 = item.picture8
			userInfo.picture9 = item.picture9
			// 统计某个评价的点赞数
			const like = await this.$u.api.getEvaluateLike({
				evaluateOwner: item.idUseless,
				evaluateCorporation: item.corporationId
			})
			console.log('统计某个评价的点赞数',like);
			
			userInfo.likeNum = like.data
			const dislike = await this.$u.api.getEvaluateDislike({
				evaluateOwner: item.idUseless,
				evaluateCorporation: item.corporationId
			})
			console.log('统计某个评价的踩数',dislike);
			userInfo.dislikeNum = dislike.data
			// 判断是否已经点赞过了
			const isLike = await this.$u.api.isLike({
				evaluateOwner: item.idUseless,
				oprationer:  this.vuex_user.openid,
				evaluateCorporation:  item.corporationId
			})
			console.log('判断是否已经点赞过了',isLike);
			
			// 默认设置alreadyLike和alreadyDislike为false
			userInfo.alreadyLike = false
			userInfo.alreadyDislike = false
			if(isLike.code == 211021){
				userInfo.alreadyLike = true
			}else if(isLike.code == 211031){
				userInfo.alreadyDislike = true
			}
			
			this.EvaluateList.push(userInfo)
		})
		

	},
	methods:{
		// 点击变化为喜欢的
		changeToLike(item,index){
			// 如果alreadyLike为false，代表现在没有点赞,点击之后点赞，调用点赞接口
			if(!item.alreadyLike){
						// item.alreadyLike = true
						// item.alreadyLike = false
				this.$u.put(`/evaluateLikeDislike/like
				?evaluateOwner=${item.evaluateIdUseless}&oprationer=${this.vuex_user.openid}&evaluateCorporation=${item.compId}`)
				.then((res)=>{
					console.log(res)
					if(res.code == 211061){
						item.alreadyLike = true
						item.likeNum  = item.likeNum + 1
						item.alreadyDislike = false
						console.log('alreadyLike点赞之后现在是',item.alreadyLike);
						uni.showToast({
							icon:"success",
							title:'点赞成功'
						})
						
					}
				})
			}
			//现在是点赞状态,要取消点赞
			else if(item.alreadyLike){
						// item.alreadyLike = false
				this.$u.put(`/evaluateLikeDislike/cancelLike
				?evaluateOwner=${item.evaluateIdUseless}&oprationer=${this.vuex_user.openid}&evaluateCorporation=${item.compId}`)
				.then((res)=>{
					console.log(res)
					if(res.code == 211081){
						item.alreadyLike = false
						item.likeNum  = item.likeNum - 1
						console.log('alreadyLike点赞之后现在是',item.alreadyLike);
						uni.showToast({
							icon:"success",
							title:'取消点赞成功'
						})
					}
				})
			}
		},
		changeToDislike(item,index){
			// 如果alreadyDislike为false，代表现在没有踩,点击之后踩，调用点赞接口
			if(!item.alreadyDislike){
				item.alreadyDislike = true
				item.alreadyLike = false
				this.$u.put(`/evaluateLikeDislike/dislike
				?evaluateOwner=${item.evaluateIdUseless}&oprationer=${this.vuex_user.openid}&evaluateCorporation=${item.compId}`)
				.then((res)=>{
					console.log(res)
					if(res.code == 211051){
						item.alreadyDislike = true
						item.dislikeNum = item.dislikeNum + 1
						item.alreadyLike = false
						console.log('alreadyLike点赞之后现在是',item.alreadyLike);
						uni.showToast({
							icon:"success",
							title:'踩成功'
						})
						
					}
				})
			}
			//现在是踩状态,要取消踩
			else if(item.alreadyDislike){
				item.alreadyDislike = false
				this.$u.put(`/evaluateLikeDislike/cancelDislike
				?evaluateOwner=${item.evaluateIdUseless}&oprationer=${this.vuex_user.openid}&evaluateCorporation=${item.compId}`)
				.then((res)=>{
					console.log(res)
					if(res.code == 211071){
						item.alreadyDislike = false
						item.dislikeNum = item.dislikeNum - 1
						console.log('alreadyLike点赞之后现在是',item.alreadyLike);
						uni.showToast({
							icon:"success",
							title:'取消踩成功'
						})
					}
				})
			}
		},
		toWriteEvaluate(){
			if(!this.vuex_user.openid){
				this.$u.utils.goToLogin()
				return
			}
			console.log('点击跳转到填写评价页面');
			uni.navigateTo({
				url: `/pages_message/message/WriteEvaluate?hrid=${this.hrid}`
			})
		}
	}
}
</script>
<style>
page{
	background-color: #f0efeb;
}
</style>

<style lang="scss" scoped>
.out-wrap{
	display: flex;
	border-radius: 20rpx;
	background-color: #fff;
	flex-direction: column;
	margin: 20rpx 30rpx 20rpx 30rpx;
	box-shadow: 10rpx 10rpx 5rpx #fff;
	.top-wrap{
		padding: 20rpx 0 0 20rpx;
		display: flex;
		.top-name{
			display: flex;
			flex-direction: column;
			.top-top{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				justify-content: center;
			}
		}
	}
	.bottom-wrap{
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 60rpx;
		padding: 10rpx 0 10rpx 0;
		border-top: 2rpx solid #f2f2f2;
	}
}
.fixed{
	position: fixed;
	bottom: 300rpx;
	right: 40rpx;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50rpx;
	background-color: #7573e6;
	display: flex;
	justify-content: center;
	align-items: center;
}
.bottom5{
	display: flex;
	justify-content: center;
	align-items: center;
	
}
</style>