<template>
	<view class="">
		
		<view class="from1-wrap">
			
			<view class="u-p-l-10" style="border: 1rpx solid #c3b1f6;border-radius: 30rpx;margin: 30rpx 30rpx 0 30rpx;">
				<view class="textarea-wrap">
					<textarea v-model="evaluate"
					placeholder="请输入评价~" placeholder-style="color: #a8a8a8; font-size: 30rpx;font-family:Arial"
					maxlength="-1" class="textarea"
					></textarea>
				
				
					<view class="u-demo-wrap">
						<view class="u-demo-area">
							<!-- <u-toast ref="uToast"></u-toast> -->
							<view class="pre-box" v-if="!showUploadList">
								<view class="pre-item" v-for="(item, index) in lists" :key="index">
									<image class="pre-item-image" :src="item.url" mode="scaleToFill"></image>
									<view class="u-delete-icon" @tap.stop="deleteItem(index)">
										<u-icon name="close" size="20" color="#ffffff"></u-icon>
									</view>
								</view>
								<u-upload @on-choose-fail="onChooseFail" :before-remove="beforeRemove"
								ref="uUpload"  :show-upload-list="showUploadList" @on-success="onSuccess()" @on-uploaded="onUploaded()"
								:action="action" :auto-upload="false" :file-list="fileList" name="files" :before-upload="beforeUpload"
								 :show-progress="false" :custom-btn="true" :deletable="deletable" :max-count="9" @on-list-change="onListChange">
									<view v-if="customBtn" slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
										<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
									</view>
								</u-upload>
							</view>

							<!-- <u-button :custom-style="{marginTop: '40rpx'}" @click="clear">清空列表</u-button> -->
							<!-- <u-button :custom-style="{marginTop: '40rpx'}" @click="reUpload">重新上传</u-button> -->
						</view>
					</view>
				</view>
				
				
			</view>
			
			<view class="" style="border: 1rpx solid #c3b1f6;border-radius: 30rpx;margin: 30rpx 30rpx 0 30rpx;padding: 20rpx;">
				<view class="u-m-b-0" style="display: flex;">
					<text class="u-p-r-20">薪资待遇</text>
					<view class="u-p-l-5 u-p-r-5" >
						
						<text class="iconfont u-p-l-5 u-p-r-5" v-for="(item,index) in star_list1" @click="changeStar1(item,index)" :key="index"
						:class="star_list1[index]" 
						></text>
					</view>
				</view>
				
				<view class="u-m-b-10" style="display: flex;">
					<text class="u-p-r-20">工作氛围</text>
					<view class="u-p-l-5 u-p-r-5" >
						 
						<text class="iconfont u-p-l-5 u-p-r-5" v-for="(item,index) in star_list2" @click="changeStar2(item,index)" :key="index"
						:class="star_list2[index]" 
						></text>
					</view>
				</view>
				
				<view class="u-m-b-10" style="display: flex;">
					<text  class="u-p-r-20">工作强度</text>
					<view class="u-p-l-5 u-p-r-5" >
						 
						<text class="iconfont u-p-l-5 u-p-r-5" v-for="(item,index) in star_list3" @click="changeStar3(item,index)" :key="index"
						:class="star_list3[index]" 
						></text>
					</view>
				</view>
				
				<view class="u-m-b-10" style="display: flex;">
					<text  class="u-p-r-20">福利补贴</text>
					<view class="u-p-l-5 u-p-r-5" >
						 
						<text class="iconfont u-p-l-5 u-p-r-5" v-for="(item,index) in star_list4" @click="changeStar4(item,index)" :key="index"
						:class="star_list4[index]" 
						></text>
					</view>
				</view>
			</view>
			
			
			<view class="" style="width: 100%;display: flex;justify-content: center;"> 
				<view class="button u-m-t-40" hover-class="hover-class" hover-stay-time="200" @click="upload">
					发布
				</view>
			</view>

		</view>

	</view>
</template>

<script>
export default{
	data(){
		return{
			classes: ['icon-xingjibie','icon-xingjibie'],
			star_list1: ['icon-xingjibie', 'icon-xingjibie', 'icon-xingjibie','icon-xingjibie', 'icon-xingjibie'],
			star_list2: ['icon-xingjibie', 'icon-xingjibie', 'icon-xingjibie','icon-xingjibie', 'icon-xingjibie'],
			star_list3: ['icon-xingjibie', 'icon-xingjibie', 'icon-xingjibie','icon-xingjibie', 'icon-xingjibie'],
			star_list4: ['icon-xingjibie', 'icon-xingjibie', 'icon-xingjibie','icon-xingjibie', 'icon-xingjibie'],
			salaryScore: 0,
			workScore: 0,
			jobScore: 0,
			welfareScore: 0,
			evaluate: '',
			hrid:'',
			action: 'https://jxnckj.cn/OSSOpration/upload/file',
			// 预置上传列表
			fileList: [],
			showUploadList: false,
			customBtn: true,
			deletable: true,
			
			lists: [], // 组件内部的文件列表
			urlList: [],//从后端获得的urllist
		}
	},
	onLoad(options) {
		this.hrid = options.hrid
	},
	methods: {
		changeStar1(item,index){
			for (let i = 0; i <= 4; i++) {
				if(i <= index){
					this.star_list1[i] = 'icon-a-ziyuan676';
				}
				else {
					this.star_list1[i] = 'icon-xingjibie';
				}
			}
			this.salaryScore = index+1
			console.log('salaryScore',this.salaryScore);
			this.$forceUpdate()
		},
		changeStar2(item,index){
			for (let i = 0; i <= 4; i++) {
				if(i <= index){
					this.star_list2[i] = 'icon-a-ziyuan676';
				}
				else {
					this.star_list2[i] = 'icon-xingjibie';
				}
			}
			this.workScore = index+1
			console.log('workScore',this.workScore);
			this.$forceUpdate()
		},
		changeStar3(item,index){
			for (let i = 0; i <= 4; i++) {
				if(i <= index){
					this.star_list3[i] = 'icon-a-ziyuan676';
				}
				else {
					this.star_list3[i] = 'icon-xingjibie';
				}
			}
			this.jobScore = index+1
			console.log('jobScore',this.jobScore);
			this.$forceUpdate()
		},
		changeStar4(item,index){
			for (let i = 0; i <= 4; i++) {
				if(i <= index){
					this.star_list4[i] = 'icon-a-ziyuan676';
				}
				else {
					this.star_list4[i] = 'icon-xingjibie';
				}
			}
			this.welfareScore = index+1
			console.log('welfareScore',this.welfareScore);
			this.$forceUpdate()
		},
		beforeUpload(index,lists){
			return true
			
		},
		upload() {
			this.$refs.uUpload.upload();
		},
		deleteItem(index) {
			this.$refs.uUpload.remove(index);
		},
		onOversize(file, lists) {
			
			console.log('onOversize', file, lists);
			
		},
		onPreview(url, lists) {
			// console.log('onPreview', url, lists);
		},
		onRemove(index, lists) {
			// console.log('onRemove', index, lists);
		},
		onSuccess(data, index, lists) {
			console.log('success');
			console.log('hello');
			console.log('onSuccess', data, index, lists);
			this.urlList.push(data.data[0])
		},
		onChange(res, index, lists) {
			console.log('onChange', res, index, lists);
		},
		error(res, index, lists) {
			console.log('onError', res, index, lists);
		},
		onProgress(res, index, lists) {
			console.log('onProgress', res, index, lists);
		},
		// 点击上传按钮
		async onUploaded(lists) {
			console.log('onUploaded', lists);
			
			let picture = {}
			for (let i = 1; i <= this.urlList.length; i++) {	
				let str = 'picture' + i
				picture[str] = this.urlList[i-1]
			}
			let totalScore = 0.3*this.salaryScore + 0.3*this.workScore + 0.2*this.jobScore + 0.2* this.welfareScore
			// 配置参数
			let params = {
				corporationId: this.hrid,
				userId: this.vuex_user.openid,
				userEvaluate: this.evaluate,
				userScore: totalScore,
				...picture,
			}
			console.log('params',params);
			const res = await this.$u.api.postEvaluate(params)
			console.log(res)
			if(res.data == true){
				uni.showToast({
					icon:"success",
					title:'评价成功'
				})
			}
			if(res.msg == "已经评价过！"){
				uni.showToast({
					icon:"error",
					title:'您已评价过！'
				})
			}
		},
		onListChange(lists) {
			console.log('listChange');
			// console.log('onListChange', lists);
			this.lists = lists;
		},
		beforeRemove(index, lists) {
			return true;
		},
		onChooseFail(e) {
			// console.log(e);
		}
	}
}
</script>

<style lang="scss" scoped>

.textarea-wrap{
	margin: 0 22rpx 0 22rpx;
	padding-top: 20rpx;
	.textarea{
		width: 100%;
		font-size: 32rpx;
	}
}
.u-demo-wrap {
		background-color: #FFFFFF;
		padding: 40rpx 8rpx;
		margin-left: -14rpx;
		margin-right: -14rpx;
	}
	
	.u-add-wrap {
		flex-direction: column;
		color: $u-content-color;
		font-size: 28rpx;
	}
	
	/deep/ .slot-btn {
		width: 170rpx;
		height: 170rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		width: 170rpx;
		height: 170rpx;
		background-color: rgb(235, 236, 238);
	}

	.pre-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		
	}

	.pre-item {
		// flex: 0 0 48.5%;
		border-radius: 10rpx;
		height: 170rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}

	.u-progress {
		position: absolute;
		bottom: 10rpx;
		left: 8rpx;
		right: 8rpx;
		z-index: 9;
		width: auto;
	}

	.pre-item-image {
		// width: 100rpx;
		width: 170rpx !important;
		height: 170rpx !important;
	}

	.u-delete-icon {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 10;
		background-color: $u-type-error;
		border-radius: 100rpx;
		width: 24rpx;
		height: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.button{
		width: 150rpx;
		height: 70rpx;
		background-color: #c3b1f6;
		border-radius: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
	.hover-class{
		background-color: #c3c3c3;
	}
.icon-a-ziyuan676{
	color: #7573e6;
	font-size: 36rpx;
}
.icon-xingjibie{
	color: #cccccc;
	font-size: 34rpx;
}
</style>