<template>
	<page-meta :root-font-size="`${0.5*baseFontSize}px`"></page-meta>
	<view id="font-scale">
		
		<view class="btn-box">
			<view class="btn" @click="onBtnFinishedClicked()">
				<text class="btn-word">完成</text>
			</view>
		</view>
		
		<view class="man">
			<view class="review-box">
				<text class="review">预览字体大小</text>
			</view>
			<u-image width="60rem" height="60rem" :src="manSrc"
			mode="scaleToFill"></u-image>
		</view>
		
		<view class="hr">
			<u-image width="80rem" height="80rem" :src="hrSrc"
			mode="scaleToFill"></u-image>
			<view class="instru-box">
				<text class="instru">拖动下面的滑块可以设置字体大小</text>
			</view>
		</view>
		

		
		
		
		<view class="slider-box">
			<view class="top-wrap">
				<view>
					<text style="font-size: 28rpx;">A</text>
				</view>
				<view class="">
					<text style="font-size: 28rem;">A</text>
				</view>
			</view>
			<view class="slider-container">
				<slider
					min="1.0"
					max="1.75"
					:value="fontScale"
					@change="sliderChange"
					show-value
					step="0.25"
				/>
			</view>

		</view>
		
		<view class="slider-label-container">
			<view class="label-text" style="font-size:30rpx">标准</view>
			<view class="label-text" style="font-size:35rpx">中等</view>
			<view class="label-text" style="font-size:40rpx">较大</view>
			<view class="label-text" style="font-size:45rpx">特大</view>
		</view>
		
		<u-modal v-model="showModal" :content="content" @confirm="confirmModal" 
		show-cancel-button></u-modal>
	</view>
</template>

<script>

    export default {
        data() {
            return {
				hrSrc:'/static/hr.png',
				manSrc: '/static/man.png',
				showModal: false,
                fontScale: 1.0,
				content: '确定修改字体大小？',
            };
        },
        onLoad() {
            //this.fontScale = this.$store.state.commonModule.$fontScale;
			console.log('vuex_fontScale:',this.vuex_fontScale)
            this.fontScale = this.vuex_fontScale
			console.log(this.fontScale);
            if(!this.fontScale) {
                this.fontScale = 1.0;
            }
			
        },
        computed: {
            baseFontSize() {
                return this.fontScale;
            }
        },
        methods: {
			// 滑块改变
            sliderChange(e) {
                console.log('value 发生变化：' + e.detail.value);
                this.fontScale = e.detail.value;
            },
			// 弹出框点击确定
			confirmModal(){
				console.log('this.fontscale',this.fontScale);
				this.$u.vuex('vuex_fontScale',this.fontScale)
				console.log('vuex_fontScale:',this.vuex_fontScale);
				this.$u.route({
					url: './setting',
					type: 'reLaunch'
				})
			},
			// 点击完成后出现弹窗
            onBtnFinishedClicked() {
				this.showModal = true
				
				// console.log('1',this.vuex_user);
				// let that = this
                //如果修改了字体大小，则需要重新加载所有页面（因为已经加载的页面字体大小不会修改）
				// uni.showModal({
				// 	title: '提示',
				// 	content: '确定修改字体大小？',
				// 	success(res) {
				// 		if(res.confirm){
				// 			console.log('success');
				// 			// this.$u.vuex('vuex_fontScale',this.fontScale)
				// 			// this.$u.vuex('vuex_user','8')
				// 			// console.log(this.vuex_user);
				// 			// this.$store.commit('setFontScale', this.fontScale);
				// 			// this.$storage.setLocalFontScale(this.fontScale)
				// 			// 使用uni.reLaunch跳转到某个页面，并关闭所有页面
				// 			// this.$Router.reLaunch(TAB_BAR_ME)
				// 			this.$u.route({
				// 				url: 'pages/mine/setting',
				// 				type: 'reLaunch'
				// 			})
				// 		}

				// 	}
				// })

            }
        }
    }
</script>

<style lang="scss" scoped>
.btn-box{
	width: 100%;
	display: flex;
	justify-content: flex-end;
	margin-bottom: 40rpx;
	.btn{
		margin-right: 20rpx;
		width: 100rpx;
		height: 60rpx;
		background-color: #cfc1f8;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
		.btn-word{
			font-size: Arial;
			color: #FFFFFF;
			
		}
	}
}
	.man{
		display: flex;
		justify-content: flex-end;
		width: 100%;
		padding-right: 30rpx;
		.review-box{
			padding: 10rpx 15rpx 10rpx 15rpx;
			margin-right: 15rpx;
			margin-top: 10rpx;
			height: 60rem;
			background-color: #a8ea7c;
			border-radius: 10rpx;
			.review {
				font-size: 28rem;
			}
		}
	}
	.hr{
		margin-top: 40rpx;
		display: flex;
		justify-content: flex-start;
		width: 100%;
		padding-left: 30rpx;
		.instru-box{
			padding: 10rpx 15rpx 10rpx 15rpx;
			margin-left: 0rpx;
			margin-top: 10rpx;
			height: 60rem;
			background-color: #fff;
			border-radius: 10rpx;
			.instru{
				font-size: 28rem;
			}
		}
	}
	.slider-box{
		
		margin-top: 500rpx;
		.top-wrap{
			display: flex;
			justify-content: space-between;
			height: 60rpx;
			margin: 0 100rpx 0 70rpx;
		}
		.slider-container {
			// padding: 0 32rpx 24rpx;
			
			margin: 0 50rpx 0 50rpx;
		}
	}

#font-scale {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	// background-color: $color_backgroud;
	padding-top: 24rpx;
	
	.slider-label-container {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		padding: 16rpx 32rpx 0;
		
		.label-text {
			display: flex;
			align-items: center;
			flex: 1;
		}
	}
}
</style>

