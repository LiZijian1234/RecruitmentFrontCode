<template>
	<view class="" style="padding-bottom: 1rpx;">
		<view class="u-m-30 wrap">
			<u-form :model="form" ref="uForm" label-width="190" :border-bottom="true" :label-style="labelStyle">
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="职位名称" prop="postName">
						<u-input v-model="form.postName" placeholder="请输入职位名称"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>

				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="职位类型" prop="hiringTime">
						<u-input v-model="form.hiringTime" placeholder="请选择职位类型" :disabled="true"
						@click="showTypePicker"
						:placeholder-style="placeholderStyle" :custom-style="customStyle" ></u-input>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="学历要求" prop="educationRequirement">
						<u-input v-model="form.educationRequirement" placeholder="请选择学历要求" :disabled="true"
						@click="showDegreePicker"
						:placeholder-style="placeholderStyle" :custom-style="customStyle" ></u-input>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="地区" prop="postLocationCity">
						<u-input v-model="form.postLocationCity" placeholder="请选择职位所在地区" :disabled="true"
						@click="showPicker"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="招聘人数" prop="hireNum">
						<u-input v-model="form.hireNum" placeholder="请输入招聘人数"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;" v-if="form.hiringTime != '日结'">
					<u-form-item label="月薪" prop="monthSalary">
						<u-input v-model="form.monthSalary" placeholder="请输入月薪数字"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;" v-if="form.hiringTime == '日结'">
					<u-form-item label="日薪" prop="daySalary">
						<u-input v-model="form.daySalary" placeholder="请输入日薪数字"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
<!-- 				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="福利待遇" prop="postWelfare">
						<view class="textarea-wrap">
							<textarea v-model="form.postWelfare"
							placeholder="请输入福利待遇" placeholder-style="color: #a8a8a8; font-size: 30rpx;font-family:Arial"
							maxlength="-1" class="textarea"
							></textarea>
						</view>
						
					</u-form-item>
				</view> -->
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="月休天数" prop="sapareDayMonth">
						<u-input v-model="form.sapareDayMonth" placeholder="请输入月休天数"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="工作内容" prop="postTask">
						<view class="textarea-wrap">
							<textarea  v-model="form.postTask"
							placeholder="请输入工作内容" placeholder-style="color: #a8a8a8; font-size: 30rpx;font-family:Arial"
							maxlength="-1" class="textarea"
							></textarea>
							
						</view>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="经验要求" prop="workExperienceRequirement" >
						<u-input v-model="form.workExperienceRequirement" placeholder="请输入经验要求"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
<!-- 						<view class="textarea-wrap">
							<textarea v-model="form.workExperienceRequirement"
							placeholder="请输入技能要求" placeholder-style="color: #c0c4cc; font-size: 34rpx"
							maxlength="-1" class="textarea"
							></textarea>
						</view> -->
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="技能要求" prop="skillRequirement" >
<!-- 						<u-input v-model="form.skillRequirement" placeholder="请输入技能要求"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input> -->
						<view class="textarea-wrap">
							<textarea v-model="form.skillRequirement"
							placeholder="请输入技能要求" placeholder-style="color: #a8a8a8; font-size: 30rpx;font-family:Arial;"
							maxlength="-1" class="textarea"
							></textarea>
						</view>
					</u-form-item>
				</view>
				

				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="联系电话" prop="postConnectionPhone" >
						<u-input v-model="form.postConnectionPhone" placeholder="请输入联系电话"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="福利标签" prop="postTag1" >
						<u-input v-model="form.postTag1" placeholder="5个字以内短语,最多填写4个"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="福利标签" prop="postTag2" >
						<u-input v-model="form.postTag2" :placeholder="placeHolderTag"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="福利标签" prop="postTag3" >
						<u-input v-model="form.postTag3" :placeholder="placeHolderTag"
						:placeholder-style="placeholderStyle" :custom-style="customStyle"></u-input>
					</u-form-item>
				</view>
				
				<view class="u-p-l-10" style="border-bottom: 2rpx solid #c3b1f6;">
					<u-form-item label="福利标签" prop="postTag4" >
						<u-input v-model="form.postTag4" :placeholder="placeHolderTag"
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
<!-- 		<view class="btn-wrap u-m-t-50">
			<view class="btn-submit" >
				<u-button :ripple="true" ripple-bg-color="#bba7f3" 
				:custom-style="customStyle1"  @click="submit">
					<text class="login">
						保存
					</text>
				</u-button>
			</view>
		</view> -->
		
		<view class="btn-bottom"  @click="submit">
			<text class="bottom-word1">保存</text>
		</view>
		
		
		<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
		<u-select v-model="showDegree" mode="single-column" :list="degreeList" @confirm="confirmDegree"></u-select>
		<u-select v-model="showType" mode="single-column" :list="TypeList" @confirm="confirmType"></u-select>
	</view>
</template>

<script>
export default{
	data(){
		return {
			TypeList: [
				{
					value: 0,
					label: '长期'
				},
				{
					value: 1,
					label: '日结'
				}
			],
			showType: false,
			showDegree: false,
			show: false,//显示城市选择
			degreeList: [
				{
					value: 0,
					label: '无'
				},
				{
					value: 1,
					label: '小学'
				},
				{
					value: 2,
					label: '初中'
				},
				{
					value: 3,
					label: '高中'
				},
				{
					value: 4,
					label: '中专'
				},
				{
					value: 5,
					label: '大专'
				},
				{
					value: 6,
					label: '本科'
				},
				{
					value: 7,
					label: '硕士'
				},
				{
					value: 8,
					label: '博士'
				}
			],
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
			jobIdUseless: '',
			alreadyhasJobInfo: '',
			form:{
				daySalary: '',
				postName: '',//岗位名称
				// jobType:'',//职位类别
				// specificLocation:'',//地区
				postLocationCity: '',
				educationRequirement: '',//学历要求
				hiringTime: '',
				hireNum: '',//招聘人数
				monthSalary:'',//薪资
				sapareDayMonth: '',//工作时间
				postTask: '',//工作内容
				skillRequirement: '',//技能
				postConnectionPhone: '',
				workExperienceRequirement: '',
				postWelfare: '',
				postTag1: '',
				postTag2: '',
				postTag3: '',
				postTag4: '',
			},
			placeHolderTag: '',
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
				postName: [{
					required: true,
					message: '请输入职位名称', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				postLocationCity: [{
					required: true,
					message: '请选择职位地区', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				daySalary: [{
					type: 'number',
					message: '请输入纯数字',
					trigger: ['blur']
				}],
				hiringTime: [{
					required: true,
					message: '请选择职位类型', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				educationRequirement: [{
					required: true,
					message: '请选择学历要求', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				hireNum: [{
					required: true,
					message: '请输入招聘人数', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				},{
					type: 'number',
					message: '请输入纯数字',
					trigger: ['blur']
				}],
				monthSalary: [{
					type: 'number',
					message: '请输入纯数字',
					trigger: ['blur']
				}],
				sapareDayMonth: [{
					required: true,
					message: '请输入工作时长', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				postTask: [{
					required: true,
					message: '请输入工作内容', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				skillRequirement: [{
					required: true,
					message: '请输入技能要求', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				postConnectionPhone: [{
					required: true,
					message: '请输入联系方式', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				workExperienceRequirement: [{
					required: true,
					message: '请输入经验要求',
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				postWelfare: [{
					required: true,
					message: '请输入福利待遇', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				}],
				postTag1: [{
					required: true,
					message: '请输入至少一个福利标签', 
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['blur'],
				},{
					max: 5,
					message: '短语不能多于5个字',
					trigger:  ['blur']
				}],
			},
		}
	},
	async onLoad(options) {
		if(options.jobIduseless){
			this.jobIdUseless = options.jobIduseless
			
			const res = await this.$u.api.getJobDetailByIdUseless(this.jobIdUseless)
			// if(res.data[0].postName != undefined)
				this.form.postName = res.data[0].postName
				this.form.postLocationCity = res.data[0].postLocationCity
				
				this.form.educationRequirement = res.data[0].educationRequirement
				if(res.data[0].hiringTime != null){
					this.form.hiringTime = res.data[0].hiringTime
				}
				// this.form.hireNum = res.data[0].hireNum ? res.data[0].hireNum : ''
				if(res.data[0].hiringTime == '日结'){
					this.form.daySalary = res.data[0].daySalary
				}else if(res.data[0].hiringTime ==  '长期'){
					this.form.monthSalary = res.data[0].monthSalary
				}
				this.form.sapareDayMonth = res.data[0].sapareDayMonth
				this.form.postTask = res.data[0].postTask
				this.form.skillRequirement = res.data[0].skillRequirement
				this.form.postConnectionPhone = res.data[0].postConnectionPhone
				this.form.workExperienceRequirement = res.data[0].workExperienceRequirement
				this.form.postName = res.data[0].postName
				this.form.hireNum = res.data[0].recruitmentMember
				// this.form.postWelfare = res.data[0].postWelfare
				
				this.alreadyhasJobInfo = true
				//把postWelfare 一一赋值给tag
				if(res.data[0].postWelfare != null && res.data[0].postWelfare != '' && res.data[0].postWelfare != ' '){
					let postWelfareList = JSON.parse(res.data[0].postWelfare)
					for (var i = 1; i <= 4; i++) {
						let words = 'postTag' + i
						console.log('要赋值的为',postWelfareList[i-1]);
							// this.form[words] = res.data[0][words]
						this.form[words] = postWelfareList[i-1]
						
					}
				}
				

		}

	},
	onReady() {
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		confirmType(e){
			console.log('单列选择的',e);
			this.form.hiringTime = e[0].label
		},
		showTypePicker(){
			this.showType = true
		},
		// 点击显示picker
		showDegreePicker(){
			this.showDegree = true
		},
		confirmDegree(e){
			console.log('单列选择的',e);
			this.form.educationRequirement = e[0].label
		},
		confirm(e){
			console.log(e);
			if(e[1].label == null){
				e[1].label = ''
			}
			this.form.postLocationCity = e[0].label + e[1].label
		},
		// 点击显示picker
		showPicker(){
			this.show = true
		},
		// 点击保存
		async submit() {
			this.$refs.uForm.validate(async valid => {
				if (valid) {
					console.log('验证通过');
					if(!this.form.postTask){
						uni.showToast({
							title: '请填写完整哦',
							icon: "error"
						})
						return
					}
					if(this.form.hiringTime == '日结'){
						if(!this.form.daySalary){
							uni.showToast({
								title: '请输入日薪',
								icon: "error"
							})
							return
						}
					}
					if(this.form.hiringTime == '长期'){
						if(!this.form.monthSalary){
							uni.showToast({
								title: '请输入月薪',
								icon: "error"
							})
							return
						}
					}
					
					console.log('验证通过');
					console.log(this.form);
					let postWelfare = []
					for (var i = 1; i <= 4; i++) {
						let word = 'postTag' + i
						console.log(this.form[word]);
						if(this.form[word] != '' && this.form[word] != undefined){
							// params[word] = this.form[word]
							postWelfare.push(this.form[word])
							console.log('当前有值',i);
						}
					}
					postWelfare = JSON.stringify(postWelfare)
					console.log('要上传的postwelfare为',postWelfare);
					//设置学历要求
					let num  = -1
					switch(this.form.educationRequirement){
						case '无':
							num = 0
							break;
						case '小学':
							num = 1
							break;
						case '初中':
							num = 2
							break;
						case '高中':
							num = 3
							break;
						case '中专':
							num = 4
							break;
						case '大专':
							num = 5
							break;
						case '本科':
							num = 6
							break;
						case '硕士':
							num = 7
							break;
						case '博士':
							num = 8
							break;
					}
					
					let params = {
						idUseless: this.jobIdUseless,
						postName: this.form.postName,
						postLocationCity: '西安-' + this.form.postLocationCity,
						sapareDayMonth:  this.form.sapareDayMonth,
						
						hiringTime:this.form.hiringTime,

						// educationRequirement:  num,
						educationRequirement: this.form.educationRequirement,
						postTask:  this.form.postTask,
						skillRequirement: this.form.skillRequirement,
						
						postWelfare: postWelfare,
						
						postConnectionPhone: this.form.postConnectionPhone,
						workExperienceRequirement: this.form.workExperienceRequirement,
						recruitmentMember: this.form.hireNum
					}
					
					if(this.form.hiringTime == '日结'){
						
						params.daySalary = this.form.daySalary
					}else{
						params.monthSalary = this.form.monthSalary
					}
					
					console.log(444);
					console.log(params);
					if(this.alreadyhasJobInfo == true){
						// put
						// 把数据提交给后台，然后提示保存成功
						// TODO
						// const res = await this.$u.api.putJobByJobIdUseless(params)
						// console.log(res)
						uni.$emit('jobInfo',{params:params,alreadyhasJobInfo:true})
						uni.showToast({
							icon:"success",
							title:'已保存，请发布'
						})
						setTimeout(()=>{
							this.$u.route({
								url: 'pages_HR/HR/job/JobDetail',
								type: 'navigateBack'
							})
						},1000)

					}
					else if(!this.alreadyhasJobInfo){
						delete params.idUseless
						params.id = this.vuex_user.openid
						console.log('params:',params);
						uni.$emit('jobInfo',{params:params,alreadyhasJobInfo:false})
						// const res = await this.$u.api.postJobByHrId(params)
						// console.log(res)
						uni.showToast({
							icon:"success",
							title:'已保存，请发布吧'
						})
						setTimeout(()=>{
							this.$u.route({
								url: 'pages_HR/HR/job/JobDetail',
								type: 'navigateBack'
							})
						},1000)
					}
				} else {
					console.log('验证失败');
				}
			});
		},
	}
}
</script>

<style lang="scss" scoped>
	.btn-bottom{
		// position: fixed;
		margin: 50rpx 100rpx 86rpx 100rpx;
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
.textarea-wrap{
	
	.textarea{
		height: 150rpx;
		width: 430rpx;
		font-size: 32rpx;
	}
}
</style>