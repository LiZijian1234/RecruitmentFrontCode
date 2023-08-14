<template>
	<view class="">
		<view class="u-m-30 wrap">
				<u-form :model="form" ref="uForm" label-width="220" :border-bottom="true" :label-style="labelStyle">
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司名称:" prop="corporationName">
							<u-input v-model="form.corporationName" placeholder="请输入公司名称"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view>
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="详细地址:" prop="corporationHeadquarters">
							<view class="" style="display: flex;">
								<u-input v-model="form.corporationHeadquarters" placeholder="请输入公司地址"
								:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
								<!-- <view class="" style=""> -->
								<view class="" @click="recognizeAddresses"
								style="width: 120rpx;height: 70rpx;display: flex;background-color: #f8f8f8;justify-content: center;align-items: center;">
									识别
								</view>
								<!-- <button type="default" size="mini" @click="recognizeAddresses">识别</button> -->
							</view>

							<!-- </view> -->
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="识别地址:" prop="recognizeAddress">
							<u-input v-model="form.recognizeAddress" placeholder="公司地址智能识别" 
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="补充地址:" prop="addressSupplement">
							<u-input v-model="form.addressSupplement" placeholder="识别地址不精确时可填写补充地址" 
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
							<!-- <button type="default" @click="recognizeAddress">识别</button> -->
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="联系方式:" prop="corporationConnectionPhone">
							<u-input v-model="form.corporationConnectionPhone" placeholder="请输入联系方式"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司人数:" prop="corporationEmployees">
							<u-input v-model="form.corporationEmployees" placeholder="请输入公司规模"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;" @click="showSelect = true">
						<u-form-item label="公司类型:" prop="corporationNature">
							<u-input v-model="form.corporationNature" placeholder="请输入公司类型"
							:placeholder-style="placeholderStyle" :custom-style="customStyle" 
							:disabled="true" @click="showSelect = true"></u-input>
							<u-select v-model="showSelect" :list="selectList" @confirm="confirmSelect"></u-select>
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司行业:" prop="corporationIndustry">
							<u-input v-model="form.corporationIndustry" placeholder="请输入公司行业"
							:placeholder-style="placeholderStyle" :custom-style="customStyle" 
							 ></u-input>
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司优势1:" prop="corporationTag1">
							<u-input v-model="form.corporationTag1" placeholder="最多3条,6个字以内"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司优势2:" prop="corporationTag2">
							<u-input v-model="form.corporationTag2" :placeholder="placeHolder"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
							
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司优势3:" prop="corporationTag3">
							<u-input v-model="form.corporationTag3" :placeholder="placeHolder"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view>
					
<!-- 					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司优势4:" prop="corporationTag4">
							<u-input v-model="form.corporationTag4" :placeholder="placeHolder"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view>
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司优势5:" prop="corporationTag5">
							<u-input v-model="form.corporationTag5" :placeholder="placeHolder"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view>
					
					
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司优势6:" prop="corporationTag6">
							<u-input v-model="form.corporationTag6" :placeholder="placeHolder"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
						</u-form-item>
					</view> -->
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司图标Logo:" prop="corporationPicture1">
							<view class=""  @click="chooseImg" v-if="form.corporationPicture1 !== ''">
								<u-avatar  :src="form.corporationPicture1" size="150" mode="square"></u-avatar>
							</view>
							<view v-else style="width: 150rpx; height: 150rpx;display: flex; justify-content: center;align-items: center;">
								<text class="iconfont icon-camera" style="color: #8f8f8f;font-size: 55rpx;" @click="chooseImg"></text>
							</view>
							<!-- <u-input v-model="form.corporationPicture1" :placeholder="placeHolder"
							:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input> -->
						</u-form-item>
					</view>
<!-- 					<view class="field-wrap">
						<u-field
							v-model="form.corporationIntroduction"
							label="公司介绍"
							type="textarea"
							:border-top="true"
							placeholder="请输入公司介绍"
							label-width="250"
							:placeholder-style=""
						>
						</u-field>
					</view> -->
					
					<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
						<u-form-item label="公司介绍:" prop="corporationIntroduction" >
							<view class="textarea-wrap">
								<textarea v-model="form.corporationIntroduction"
								placeholder="请输入公司介绍" placeholder-style="color: #a8a8a8; font-size: 30rpx;font-family:Arial"
								maxlength="-1" class="textarea"
								></textarea>
							</view>
							
							
							
							
							
						</u-form-item>
					</view>
				</u-form>
				
				
			</view>
		<view class="btn-wrap u-m-t-50 u-m-b-50">
			<view class="btn-submit" >
				<u-button :ripple="true" ripple-bg-color="#bba7f3" 
				:custom-style="customStyle1"  @click="submit">
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
		return{
			form: {
				corporationName: '',
				corporationHeadquarters: '',//公司地址
				recognizeAddress: '',//识别的地址
				addressSupplement: '',//补充地址
				corporationEmployees: '',//公司人数
				corporationIndustry: '',//行业
				corporationConnectionPhone: '',//联系方式
				corporationTag1: '',
				corporationTag2: '',
				corporationTag3: '',
				corporationTag4: '',
				corporationTag5: '',
				corporationTag6: '',
				corporationNature: '',//公司类型
				corporationIntroduction: '',//公司介绍
				corporationPicture1: '',//照片
			},
			alreadyhasInfo: false,//get数据时是否有值，有值的话就提交用put，否则用post
			showSelect: false,
			selectList:[
				{
					value: '1',
					label: '国有企业'
				},{
					value: '2',
					label: '民营公司'
				}
			],
			// 左边的标签的样式
			labelStyle: {
				fontSize: '30rpx',
			},
			//右边的placeholder样式
			placeholderStyle:"font-size:30rpx;font-family:Arial;color:#a8a8a8",
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
				corporationName: [{
						required: true,
						message: '请输入公司名称', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
				}],
				corporationHeadquarters: [{
						required: true,
						message: '请输入所在城市', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
				}],
				corporationConnectionPhone: [{
						required: true,
						message: '请输入联系方式', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
				},{
					type: 'number',
					message: '请输入纯数字',
					trigger: ['blur']
				}],
				corporationEmployees: [{
					required: true,
					type: 'string',
					message: '请输入公司规模',
					trigger: ['blur']
				},{
					type: 'number',
					message: '请输入纯数字',
					trigger: ['blur']
				}],
				corporationIndustry: [{
					required: true,
					type: 'string',
					message: '请输入公司行业',
					trigger: ['blur']
				}],
				corporationNature: [{
					required: true,
					type: 'string',
					message: '请输入公司类型',
					trigger: ['blur']
				}],
				corporationIntroduction: [{
					required: true,
					type: 'string',
					message: '请输入公司介绍',
					trigger: ['blur']
				}],
				corporationTag1: [{
					max: 6,
					message: '输入最多6个字',
					trigger: ['blur']
				}],
				corporationTag2: [{
					max: 6,
					message: '输入最多6个字',
					trigger: ['blur']
				}],
				corporationTag3: [{
					max: 6,
					message: '输入最多6个字',
					trigger: ['blur']
				}]
			}
		}
	},
	async onLoad() {
		const res = await this.$u.api.getCompInfo(this.vuex_user.openid)
		console.log(44);
		console.log(res);
		// console.log(res.data[0].corporationName);
		if(res.data.length != 0 && res.data[0].corporationName){
			this.alreadyhasInfo = true
			this.form.corporationName = res.data[0].corporationName
			this.form.corporationHeadquarters = res.data[0].corporationHeadquarters
			if(res.data[0].addressSupplement == null){
				this.form.addressSupplement = ''
			}else{
				this.form.addressSupplement = res.data[0].addressSupplement
			}
			this.form.corporationIntroduction = res.data[0].corporationIntroduction
			this.form.corporationConnectionPhone = res.data[0].corporationConnectionPhone
			this.form.corporationEmployees = res.data[0].corporationEmployees
			this.form.corporationNature = res.data[0].corporationNature
			this.form.corporationIndustry = res.data[0].corporationIndustry
			this.form.corporationPicture1 =  res.data[0].corporationPicture1
			
			for (var i = 1; i <= 6; i++) {
				let words = 'corporationTag' + i
				if(res.data[0][words]){
					console.log('是有值的')
					this.form[words] = res.data[0][words]
				}
			}
			console.log('form',this.form)
		
		}
	},
	onReady() {
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		this.$refs.uForm.setRules(this.rules);
	},
	methods:{
		async recognizeAddresses(){
			console.log('this.form.corporationHeadquarters',this.form.corporationHeadquarters);
			const res = await this.$u.api.getDecode(this.form.corporationHeadquarters)
			console.log('res',res);
			const res1 = await this.$u.api.getReveseAddress(res.data)
			console.log('res1',res1);
			this.form.recognizeAddress = res1.data
			console.log('识别到的地址：',res1.data);
		},
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
						   console.log('uploadfile的返回结果',JSON.parse(uploadFileRes.data).data[0]);
						   let imgsrc = JSON.parse(uploadFileRes.data).data[0]
						   console.log('imgsrc',imgsrc);
						   _this.form.corporationPicture1 = imgsrc
						   // _this.$u.vuex('vuex_hrauth_img',imgsrc)
						  }
					 });
				},
			});
		},
		// 确定select的value
		confirmSelect(e){
			this.form.corporationNature = e[0].label
			console.log(e[0].label);
		},
		
		submit() {
			console.log(1);
			this.$refs.uForm.validate(async valid => {
				if (valid) {
					console.log('验证通过');
					console.log(this.form);
					// 把数据提交给后台，然后提示保存成功
					let params = {
						id: this.vuex_user.openid,
						corporationName: this.form.corporationName,
						corporationHeadquarters: this.form.recognizeAddress,
						addressSupplement: this.form.addressSupplement,
						corporationIntroduction: this.form.corporationIntroduction,
						corporationConnectionPhone: this.form.corporationConnectionPhone,
						corporationEmployees: this.form.corporationEmployees,
						corporationNature: this.form.corporationNature,
						corporationIndustry: this.form.corporationIndustry,
						corporationPicture1: this.form.corporationPicture1
					}
					for (var i = 1; i <= 6; i++) {
						let word = 'corporationTag' + i
						if(this.form[word]){
							console.log('canshu');
							params[word] = this.form[word]
						}
					}
					console.log('params',params);
					if(this.alreadyhasInfo){
						this.$u.api.putCompInfo(params).then(()=>{
							uni.showToast({
								icon:"success",
								title:'修改成功'
							})
							
						})
					
					}else if(!this.alreadyhasInfo){
						const res = await this.$u.api.postCompInfo(params)
						uni.showToast({
							icon:"success",
							title:'保存成功'
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

<style lang="scss" scoped>
	.field-wrap{
		padding:  0 22rpx 0 15rpx;
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
.textarea-wrap{
	margin: 0 22rpx 0 22rpx;
	.textarea{
		width: 430rpx;
		font-size: 32rpx;
	}
}

</style>