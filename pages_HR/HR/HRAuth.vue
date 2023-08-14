<template>
	<view class="">
		<view class="from1-wrap">
			<view class="form-wrap">
				<u-form :model="form" ref="uForm" label-width="250" :border-bottom="true">
					<view class="" style="border-bottom: 2rpx solid #D7D7D7;">
						<u-form-item label="手机号" prop="phone">
								<u-input v-model="form.phone" placeholder="请输入电话"></u-input>
						</u-form-item>
					</view>
					<view class="" style="border-bottom: 2rpx solid #D7D7D7;">
						<u-form-item label="邮箱" prop="email">
							<u-input v-model="form.email" placeholder="请输入邮箱"></u-input>
						</u-form-item>
					</view>
					<view class="" style="border-bottom: 2rpx solid #D7D7D7;">
						<u-form-item label="企业全称" prop="compName">
							<u-input v-model="form.compName" placeholder="请输入企业全称"></u-input>
						</u-form-item>
					</view>
					<view class="" style="border-bottom: 2rpx solid #D7D7D7;">
						<u-form-item label="社会统一信用代码" prop="sociCode">
							<u-input v-model="form.sociCode" placeholder="请输入社会统一信用代码"></u-input>
						</u-form-item>
					</view>
					<view class="" style="border-bottom: 2rpx solid #D7D7D7;">
						<u-form-item label="营业执照" prop="license">
							<view class=""  @click="chooseImg" v-if="form.license !== ''">
								<u-avatar  :src="form.license" size="150" mode="square"></u-avatar>
							</view>
							<view v-else style="width: 150rpx; height: 150rpx;display: flex; justify-content: center;align-items: center;">
								<text class="iconfont icon-camera" @click="chooseImg"></text>
							</view>
							
							
							
							<!-- <u-input v-model="form.license" placeholder="请输入营业执照"></u-input> -->
						</u-form-item>
					</view>
<!-- 					<u-form-item label="企业介绍" prop="brifeIntroduction">
						<view class="textarea">
							<textarea v-model="form.brifeIntroduction" placeholder="请输入社会统一信用代码"></textarea>
						</view>
					</u-form-item> -->
				</u-form>
				
			</view>
			<view class="field-wrap">
				<u-field
					v-model="form.comment"
					label="备注说明"
					type="textarea"
					:border-top="true"
					placeholder="请添加备注"
					label-width="250"
					placeholder-style="color: #c0c4cc"
				>
				</u-field>
			</view>
		</view>
		<view class="">
			<text class="little-word">*需要1~3个工作日人工审核，麻烦耐心等待哦~</text>
			<text class="little-word">*企业以及HR信息仅仅在HR身份认证时使用，保证不用做其他用途</text>
		</view>
		
		
<!-- 		<view class="btn-submit">
			<u-button :ripple="true" ripple-bg-color="#909399" 
			:custom-style="customStyle" @click="submit">
				<text class="login">
					注册
				</text>
			</u-button>
		</view> -->
		
		<view class="btn-bottom"  @click="submit">
			<text class="bottom-word1">注册</text>
		</view>
		
		
		<u-modal v-model="showModal" :show-cancel-button="true" :content="Modelcontent" @cancel="goToIndex"
		@confirm="showModal = false"></u-modal>
		
	</view>
</template>

<script>
export default{
	data(){
		return{
			// 提交的表单
			form:{
				phone: '',//电话
				email:'',//邮箱
				license:'',//营业执照
				compName: '',//企业全称
				sociCode: '',//社会统一信用代码
				brifeIntroduction: ''
			},
			showModal: false,
			Modelcontent: '本页面用于HR身份认证，将采集HR身份信息及公司信息，仅用作仅在HR身份认证时使用，不用做其他用途。请确定是否要继续',
			// 下面的按钮的样式
			customStyle: {
				height: '120rpx',
				width: '750rpx',
				background: 'linear-gradient(to right, #b7a2f4, #ebebeb 50%, #b7a2f4)'
			},
			rules: {
				phone: [{
						required: true,
						message: '请输入联系电话', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
				}],
				email: [{
						required: true,
						message: '请输入邮箱', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
				},{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.email(value);
						},
						message: '邮箱输入不正确',
						// 触发器可以同时用blur和change
						trigger: ['blur'],
				}],
				license: [{
					required: true,
					type: 'string',
					message: '请上传营业执照照片',
					trigger: ['blur']
				}],
				compName: [{
					required: true,
					type: 'string',
					message: '请输入企业全称',
					trigger: ['blur']
				}],
				sociCode: [{
					required: true,
					type: 'string',
					message: '请输入社会统一信用代码',
					trigger: ['blur']
				}],
			}
		}
	},
	async onLoad() {
		setTimeout(()=>{
			// 模态框的显示
			this.showModal = true
		},500)
		const HRAuthInfo = await this.$u.api.getHRAuth(this.vuex_user.openid)
		console.log(HRAuthInfo.data[0])
		if(HRAuthInfo.data.length != 0){
			let data = HRAuthInfo.data[0]
			this.form.phone = data.corporationPhone
			this.form.email = data.corporationMail
			this.form.license = data.corporationBusinessLicense
			this.form.compName = data.corporationName
			this.form.sociCode = data.socialUnicodeCreditCode
		}

		// this.form.brifeIntroduction = data.
	},
	onReady() {
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		this.$refs.uForm.setRules(this.rules);
	},
	methods:{
		// HR选择照片
			chooseImg(){
				const _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						 const tempFilePaths = res.tempFilePaths;
						 const uploadTask = uni.uploadFile({
							  url : 'https://jxnckj.cn/OSSOpration/upload/file',
							  filePath: tempFilePaths[0],
							  name: 'files',
							  success: uploadFileRes=> {
								  console.log(uploadFileRes);
							   console.log('uploadfile的返回结果',JSON.parse(uploadFileRes.data).data[0]);
							   let imgsrc = JSON.parse(uploadFileRes.data).data[0]
							   _this.form.license = imgsrc
							   // _this.$u.vuex('vuex_hrauth_img',imgsrc)
							  }
						 });
					},
                });
			},
		
		// 用户模态框点击取消调到index
		goToIndex(){
			this.$u.route({
				url: 'pages/mine/index',
			})
		},
		// 点击提交
		  submit() {
			this.$refs.uForm.validate(async valid => {
				if (valid) {
					console.log('验证通过');
					console.log(this.form);
					// 把数据提交给后台，然后提示保存成功
					let params = {}
					params = {
						"id": this.vuex_user.openid,
						"corporationPhone": this.form.phone,
						"corporationMail": this.form.email,
						"corporationName": this.form.compName,
						// 还有一个营业执照的图片地址没有提交
						'corporationBusinessLicense': this.form.license,
						"socialUnicodeCreditCode": this.form.sociCode
					}
					const res = await this.$u.api.postHRAuth(params)
					console.log(res);
					console.log(this.vuex_user.openid);
					if(res.data){					
						uni.showToast({
							title: '提交成功',
							icon:"success"
						})
					}
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
.btn-bottom{
	position: fixed;
	margin: 0 50rpx 0 50rpx;
	height: 100rpx;
	bottom: 50rpx;
	// width: 100%;
	width: 650rpx;
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
	.icon-camera{
		color: #8f8f8f;
		font-size: 55rpx;
	}
.from1-wrap{
	margin: 30rpx 30rpx 0 30rpx;
	background-color: #fff;
	border-radius: 40rpx;
	.form-wrap{
		padding: 0 40rpx 0 40rpx;
		.textarea{
			height: 100rpx;	
		}
	}
	.field-wrap{
		padding:  0 22rpx 0 15rpx;
	}
}
.little-word{
	font-size: 28rpx;
	font-family: Arial;
	line-height: 30rpx;
	display: block;
	text-align: center;
	margin: 30rpx 30rpx 0 30rpx;
}
.btn-submit{
	position: fixed;
	
	width: 750rpx;
	background: linear-gradient(to right, #b7a2f4, #fff 50%, #b7a2f4);
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 0rpx;
	.login{
		font-size: 44rpx;
		color: #fff;
		font-weight: 500;
	}
}
</style>