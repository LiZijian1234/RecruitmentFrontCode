<template>
	<view class="">
		
		<view class="u-m-30 wrap">
			<u-form :model="form" ref="uForm" label-width="190" :border-bottom="true" :label-style="labelStyle">
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="企业名称" prop="compName">
						<u-input v-model="form.compName" placeholder="请输入企业名称"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="企业地址" prop="compAddre">
						<u-input v-model="form.compAddre" placeholder="请输入企业地址" 
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="联系方式" prop="phone">
						<u-input v-model="form.phone" placeholder="请输入联系方式"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="招聘时间" prop="hireTime">
						<u-input v-model="form.hireTime" placeholder="请输入招聘时间"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				<view class="u-p-l-10" style="">
					<u-form-item label="公司人数" prop="compNum" >
						<u-input v-model="form.compNum" placeholder="请输入公司人数"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
	<!-- 					<u-form-item label="企业介绍" prop="brifeIntroduction">
					<view class="textarea">
						<textarea v-model="form.brifeIntroduction" placeholder="请输入社会统一信用代码"></textarea>
					</view>
				</u-form-item> -->
			</u-form>

		</view>
		<view class="btn-wrap u-m-t-50">
			<view class="btn-submit" >
				<u-button :ripple="true" ripple-bg-color="#bba7f3" 
				:custom-style="customStyle1" @click="submit">
					<text class="login">
						保存
					</text>
				</u-button>
			</view>
		</view>
		
	</view>
</template>

<script>
export default{
	data(){
		return {
			form: {
				compName: '',//公司名称
				compAddre: '',//公司地址
				phone:'',//联系方式
				hireTime: '',//招聘时间
				compNum: ''//公司人数
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
				compName: [{
					required: true,
					message: '请输入公司名称', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				compAddre: [{
					required: true,
					message: '请输入公司地址', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				phone: [{
					required: true,
					message: '请输入联系方式', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				hireTime: [{
					required: true,
					message: '请输入招聘时间', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				compNum: [{
					required: true,
					message: '请输入公司人数', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
			},
			
		}
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
					
					uni.showToast({
						title: '保存成功，请等待人工审核哦',
						icon:"success"
					});
		
		
				} else {
					console.log('验证失败');
					uni.showToast({
						title: '请填写完整哦',
						icon:"error"
					});
				}
			});
		},
	}
}
</script>
<style>
	page{
		background-color: #f0f0f0;
	}
</style>
<style lang="scss" scoped>
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