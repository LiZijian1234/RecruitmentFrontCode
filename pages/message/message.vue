<template>
	<page-meta :root-font-size="`${0.5 * baseFontSize}px`"></page-meta>
	<view class="message top-box">
		<view class="" style="display: flex;	justify-content: space-around;padding-top: 50rpx;background-color: #efeffc">
			<view class="send" @tap="toPostReply">
				<view class="circle-wrap1">
					<text class="iconfont icon-wodetoudi"></text>
				</view>
				<text class="u-m-t-30 word">投递记录</text>
			</view>
			<view class="messages" @tap="toMessageList">
				<view class="circle-wrap2">
					<text class="iconfont icon-shouye"></text>
				</view>
				<text  class="u-m-t-30 word">信息</text>
			</view>
			<view class="notify" @tap="toKeFu">
				<view class="circle-wrap3">
					<text  class="iconfont icon-kefu"></text>
				</view>
				<text class="u-m-t-30 word">联系客服</text>
			</view>
		</view>
		
		<view class="top-box-inner">
			
		</view>


		
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			baseFontSize() {
			    return this.vuex_fontScale
			}
		},
		methods: {
			toKeFu(){
				console.log('点击跳转到kefu');
				uni.navigateTo({
					url: '/pages_message/message/kefu'
				});
			},
			// 跳转到投递反馈
			toPostReply(){
				console.log('点击跳转到postreply');
				//不登录就跳转
				if(!this.vuex_user.openid){
					this.$u.utils.goToLogin()
					return
				}
				if(!this.vuex_user.hasResume){
					uni.showToast({
						icon:'error',
						title:'请先填写在线简历'
					})
					return
				}
				uni.navigateTo({
					// url: `../../TUI-Chat/chat?conversationID=C2C${this.hriduseless}`
					// url: `/pages/message/TUI-Chat/chat?conversationID=C2C${this.hriduseless}`
					url: '/pages_mine/mine/postReply'
				});
			},
			// 跳转到信息列表
			toMessageList(){
				//不登录就跳转
				if(!this.vuex_user.openid){
					this.$u.utils.goToLogin()
					return
				}
				uni.navigateTo({
					// url: `../../TUI-Chat/chat?conversationID=C2C${this.hriduseless}`
					// url: `/pages/message/TUI-Chat/chat?conversationID=C2C${this.hriduseless}`
					url: '/pages_message/message/conversation/conversation'
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
		    .top-box {
		        overflow: hidden;
		        /* 因为内部伪元素width:140%,必然超出屏幕，所以要溢出隐藏 */
		    }
		
		    .top-box-inner {
		        position: relative;
		        width: 100%;
		        height: 200rpx;
		        /* 定位 */
		    }
		
		    .top-box-inner:after {
		        /* 这个伪类的作用就是一个圆弧的背景色 */
		        width: 140%;
		        height: 200rpx;
		        position: absolute;
		        left: -20%;
		        /* 之所以left:20%,是因为width:140%，宝贝可以是是别的值，例如width:160%，那么left:30%才能水平居中，可以发现规律的 */
		        top: 0;
		        z-index: -1;
		        /*层叠顺序，最底层显示*/
		        content: '';
		        border-radius: 0 0 50% 50%;
		        /*分别对应 左上 右上 右下 左下*/
		        background-color: #efeffc;
		        /* 将这个伪类水平居中 */
		    }
.message{
	display: flex;
	flex-direction: column;
	// margin: 50rpx;
	justify-content: space-around;
	.word{
		font-size: 30rem;
		font-family: Arial, Helvetica, sans-serif;
		color: #333333;
	}
	.send{
		display: flex;
		flex-direction: column;
		align-items: center;
		.circle-wrap1{
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			border: 1rpx dotted #AAAAAA;
			background-color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-wodetoudi{
				color: #9473ef;
				font-size: 60rpx;
			}
		}
	}
	.messages{
		display: flex;
		flex-direction: column;
		align-items: center;
		.circle-wrap2{
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			border: 1rpx dotted #AAAAAA;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-shouye{
				color: #9473ef;
				font-size: 75rpx;
				
			}
		}
	}
	.notify{
		display: flex;
		flex-direction: column;
		align-items: center;
		.circle-wrap3{
			width: 110rpx;
			height: 110rpx;
			border: 1rpx dotted #AAAAAA;
			border-radius: 50%;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-kefu{
				color: #9473ef;
				font-size: 75rpx;
			}
		}
	}
}
</style>
