<template>
	<view class="u-m-50">
		<view class="wrap">
			<textarea v-model="skillValue"  class="textarea" maxlength="-1"
			 placeholder="请在此填写技能与工作经历" placeholder-class="placeholder-class"/>
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
export default{
	data(){
		return {
			skillValue: '',
			// 提交按钮的样式
			btnStyle: {
				backgroundColor: '#7573e6'
			},
		}
	},
	onLoad(options) {
		this.skillValue = options.skill
	},
	methods: {
		// 点击保存，跳转回简历页面
		submit(){
			
			console.log('点击保存，跳转回简历页面');
			console.log(this.skillValue);
			uni.showToast({
				title: '保存成功',
				icon:"success"
			});
			// 创建监听，其他页面可以触发监听接收到参数
			uni.$emit('updateSkill',{data: this.skillValue});
			setTimeout(()=>{
				this.$u.route({
					url: './completeResume',
					type: 'navigateBack',
				})
			},1500)
		}
	}
}
</script>

<style lang="scss">
.wrap{
	border: 1rpx solid #9473ef;
	height: 500rpx;
	padding: 20rpx;
}
.placeholder-class{
	font-family: Arial;
	font-size: 30rpx;
	line-height: 25rpx;
}
.textarea{
	font-family: Arial;
	font-size: 30rpx;
	line-height: 25rpx;
}
.btn-wrap{
	margin: 60rpx 70rpx 0 70rpx;
	width: auto;
	height: 150rpx;
	
	.save{
		color: #060400;
	}
}
</style>