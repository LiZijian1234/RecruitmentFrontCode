<template>
	<page-meta :root-font-size="`${0.5 * baseFontSize}px`"></page-meta>
	<view class="page-wrap">
		
		<view class="u-m-t-50">
			<text class="word u-flex u-row-center u-m-b-30">支持导入pdf/docx/doc格式，最大20M</text>
			<!-- 上传按钮 -->
			<view class="btn-wrap" >
				<u-button :custom-style="btnStyle"  shape="circle" @click="selectFile">
					<text class="save">从微信中导入</text>
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data(){
		return {
			hasUploadFile: false,
			pdfInfo: [],
			// 从微信中导入按钮的样式
			btnStyle: {
				backgroundColor: '#7573e6'
			},
		}
	},
	computed:{
		baseFontSize() {
		    return this.vuex_fontScale
		}
	},
	async onLoad() {
		const {data} = await this.$u.api.getResumeOnline(this.vuex_user.openid)
		if(data.resumeFile != null && data.resumeFile != '' && data.resumeFile != undefined){
			this.hasUploadFile = true
			console.log('data.resumeFile',data.resumeFile);
			this.previewFile1(data.resumeFile)
		}
	},
	methods: {
		// 点击按钮导入文件
		selectFile(){
			console.log(11);
			if(this.pdfInfo.length != 0){ //this.pdfInfo 这个是页面进来获取的油污上传过文件，要求不可重复上传
				// this.$uniApi.tipMsg('如果重新上传请先删除已有的简历附件～')
				return
			}
			let _that = this
			wx.chooseMessageFile({
				count: 1, //最多可以选择的文件个数，可以 0～100
				type: 'file', //所选的文件的类型，具体看官方文档
				success (res) {
					console.log(777);
					console.log('chooseMessageFile',res);
					console.log(456);
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = res.tempFiles[0].path
					console.log('tempFilePaths',tempFilePaths);
					let filename = res.tempFiles[0].name; //用于页面显示的文件名
					console.log('filename',filename);
						// 这一步判断可以省略，如果需求没有格式要求的话
					if(filename.indexOf(".pdf")==-1 && filename.indexOf(".docx")==-1 && filename.indexOf(".doc")==-1){
						// _that.$uniApi.tipMsg('暂时仅支持pdf格式的文件')
						uni.showToast({
							icon:"error",
							title:'暂不支持此格式'
						})
						return
					} else {
						console.log("开始上传")
						uni.showToast({
							icon:"none",
							title:"上传中",
							duration:1000
						})
						wx.uploadFile({
							url: 'https://jxnckj.cn/OSSOpration/upload/file',   //上传的路径
							filePath: tempFilePaths, //刚刚在data保存的文件路径
							name: 'files',   //后台获取的凭据
							// formData:{ //如果是需要带参数，请在formData里面添加，不需要就去掉这个就可以的
							// 	"userId": 1,
							// 	"fileName": filename
							// },
							async success(res1) {
								console.log('成功后的结果',res1);
								
								console.log(JSON.parse(res1.data).data[0])
								console.log('上传到服务器了')
								
								uni.showToast({
									icon:"success",
									title:'上传成功',
									duration:	1000
								})
								
								// let URL = JSON.parse(res.data).data
								let URL = JSON.parse(res1.data).data[0]
								// 将简历的文件url上传到后端
								let params = {
									id: _that.vuex_user.openid,
									resumeFile: URL
								}
								
								
								const res = await _that.$u.api.putResumeOnline(params)

								_that.previewFile1(URL)
								// TO_DO
								// data: "{"code":"00000","msg":"成功","count":null,"data":true}"
								// if(res.data.code != "00000"){
								// 	this.errTips(res.data.msg)
								// 	return
								// }
								// _that.getUserFile()//上传成功后，用于页面展示，所以在此在服务器拉取一次文件展示前端
							},
							
						})
					}
				}
			})
		},
		previewFile1(URL) {
					// 流程步骤: 利用下载文件功能 先生成临时文件 - 调用api打开临时文件里面的内容,从而生成预览的效果,但是这个未能真实的下载到本地
					// 1.pdfUrl  可以直接在浏览器打开  2.一定要在小程序后台配置该pdf的域名 让其可以下载
					uni.showLoading({
						title: '正在打开...'
					});
					const downloadTask = uni.downloadFile({
						url: URL,  // 图片或者文件地址
						success: function(res) {
							console.log('下载的res', res);
							var filePath = res.tempFilePath;  // 临时文件存储路径
							//  文件打开文件预览
							uni.openDocument({
								filePath: encodeURI(filePath),
								// fileType: 'pdf',
								success: function(res) {
									console.log('打开文档成功');
									uni.hideLoading();
									uni.showToast({
										icon:"none",
										title:'打开文档成功',
										duration:	1000
									})
								},
								fail: function(err) {
									uni.hideLoading();
									uni.showToast({
										title: '打开失败',
										duration: 1500,
										icon: 'none'
									});
									console.log('打开失败');
								}
							});
						},
						fail: function(err) {
							console.log('下载失败原因', err);
							uni.showModal({
								title: '您需要授权相册权限',
								success(res) {
									if (res.confirm) {
										uni.openSetting({
											success(res) {},
											fail(res) {
												console.log(res);
											}
										});
									}
								}
							});
						}
					});
					// downloadTask.onProgressUpdate(res => {
					// 	console.log('下载进度' + res.progress);
					// 	// console.log('已经下载的数据长度' + res.totalBytesWritten);
					// 	// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					// });
					// console.log(item, this.$url(item.template), '加载的当前文件');
					// this.$apiGet(`/api/file/download/${item.template}`).then(res => {
					// 	console.log(res, '下载的文件');
					// });
				},
		// previewFile(URL) {
		// 	uni.showLoading({
		// 		title: '加载中'
		// 	})

		// 	uni.downloadFile({
		// 		url: URL, //后端返回的文件地址
		// 		filePath: wx.env.USER_DATA_PATH + '/gwy.pdf',
		// 		// filePath: wx.env.USER_DATA_PATH + '/' + item.name + '.' + item.value.split('.')[item.value.split('.').length - 1],
		// 		success: function(res) {
		// 			if (res.statusCode === 200) {
		// 				uni.openDocument({
		// 					showMenu: true,
		// 					filePath: res.filePath,
		// 					success: function(res) {
		// 						console.log(res, '打开文件成功')
		// 					},
		// 					fail: (err) => {
		// 						uni.showToast({
		// 							title: '打开文件失败请重试',
		// 							icon: 'none'
		// 						})
		// 					}
		// 				})
		// 			} else {
		// 				uni.showToast({
		// 					title: '打开文件失败请重试',
		// 					icon: 'none'
		// 				})
		// 			}
		// 			uni.hideLoading()
		// 		},
		// 		fail: (err) => {
		// 			uni.hideLoading()
		// 			uni.showToast({
		// 				title: '加载失败请重试',
		// 				icon: "none"
		// 			})
		// 		}
		// 	})

		// }
		
	}
}
</script>

<style lang="scss" scoped>
.page-wrap{
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.btn-wrap{
	margin: 0 40rpx 0 40rpx;
	width: auto;
	height: 150rpx;
	.save{
		color: #FFFFFF;
		font-size: 28rem;
	}
}
.word{
	padding-left: 20rpx;
	color: #AAAAAA;
	font-size: 26rem;
}
</style>