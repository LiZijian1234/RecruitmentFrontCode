<template>
	<view class="">
		<u-form :model="form" ref="uForm" label-width="190" :border-bottom="true" :label-style="labelStyle">
			<view class="u-p-l-10" style="border: 1rpx solid #bba7f3;">
				<u-form-item label="剩余人数" prop="remainNum" >
					<u-input v-model="form.remainNum" placeholder="请输入剩余招聘人数"
					:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
				</u-form-item>
			</view>
		</u-form>
		
<!-- 		<view class="btn-wrap u-m-t-50">
			<view class="btn-submit" >
				<u-button :ripple="true" ripple-bg-color="#7573e6" 
				:custom-style="customStyle1" @click="submit">
					<text class="login">
						保存
					</text>
				</u-button>
			</view>
		</view> -->
		<view class="btn-bottom"  @click="submit">
			<text class="bottom-word1">保存</text>
		</view>
		
		
	</view>
</template>

<script>
export default{
	data(){
		return {
			form: {
				remainNum:''//剩余数量
			},
			// 左边的标签的样式
			labelStyle: {
				fontSize: '30rpx',
			},
			//右边的placeholder样式
			placeholderStyle:{
				fontSize: '28rpx',
				color: '#a8a8a8'
			},
			// 输入框的样式
			customStyle: {
				fontSize: '30rpx',
			},
			// 点击下面按钮样式
			customStyle1: {
				height: '80rpx',
				width: '250rpx',
				backgroundColor: '#b7a2f4'
				// background: 'linear-gradient(to right, #b7a2f4, #ebebeb 50%, #b7a2f4)'
			},
			rules: {
				remainNum: [{
					required: true,
					message: '请输入岗位剩余招聘人数', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				},{
					type: 'number',
					message: '请输入纯数字',
					trigger: ['blur']
				}],
			}
		}
	},
	onLoad(options) {
		this.form.remainNum = options.remainNum
	},
	onReady() {
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		// 点击保存
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					console.log(this.form);
					// 把数据提交给后台，然后提示保存成功
					uni.$emit('remainNum',{
						remainNum: this.form.remainNum
					})
					uni.showToast({
						title: '保存成功',
						icon:"success"
					});
					setTimeout(()=>{
						this.$u.route({
							url: 'pages_HR/HR/job/JobDetail',
							type: 'navigateBack'
						})
					},1000)

				} else {
					console.log('验证失败');
					uni.showToast({
						title: '请填写人数~',
						icon:"error"
					});
				}
			});
		},
	}
}
</script>

<style lang="scss" scoped>
	.btn-bottom{
		// position: fixed;
		margin: 0 50rpx 0 50rpx;
		height: 100rpx;
		// bottom: 50rpx;
		// width: 100%;
		width: 550rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #7573e6;
		border-radius: 25rpx;
	}
	.bottom-word1{
		font-family: Arial;
		color:#fff;
		font-size: 40rpx;
	}
.wrap{
	padding: 0 20rpx 0 20rpx;
	border-radius: 40rpx;
	background-color: #fff;
}
.btn-wrap{
	display: flex;
	justify-content: center;
	align-items: center;
	.btn-submit{
		// border-radius: ;
		background: linear-gradient(to right, #b7a2f4, #fff 50%, #b7a2f4);
		display: flex;
		justify-content: center;
		align-items: center;
		.login{
			font-size: 40rpx;
			color: #fff;
			font-weight: 500;
		}
	}
}
</style>