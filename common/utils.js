const install = (Vue, vm) =>{
	/**
	 * 判断页面是否跳转到登录页面
	 */
	const isLogin = ()=>{
		// 从这里到本地存储的代码这一段都是为了拿到跳转到登录之前的页面的参数以及路径地址
		// currentPage为跳转到登录页面之前的最后一个页面,例如点击个人中心后跳转到登录，
		// currentPage里面的route属性就是pages/center/center了
		const currentPage = getCurrentPages().pop()
		console.log('getCurrentPages' + getCurrentPages());
		console.log('currentPage' + currentPage);
		// 解构赋值，只取对象里面的键为options和route的值
		const {options, route} = currentPage
		// options是一个对象，里面有键值对
		const optionKeys = Object.keys(options) //取到options的所有的键组成一个数组
		console.log(optionKeys);
		// 下面写每个页面自带的参数,每个页面可能带有自己的参数，我们在跳转到页面之前需要得到原来页面的参数，
		// 并把原来页面的地址存到本地存储中
		let params = ''//先设置参数为空，然后往里面写东西
		if(optionKeys.length !==0){
			params = '?'
			let newOptionKeys = []
			// 如果键名的最后一个为空的话，就不让newOptionKeys等于最后一个了，值等于前面几个
			if(optionKeys[optionKeys.length-1]==''){
				newOptionKeys = optionKeys.slice(0,-1)
				
			}else{
				// 如果键名的最后一个不为空的话，就让他们两个相等
				newOptionKeys = optionKeys
			}
			// 下面进行参数的拼接，params = ?id=1&name = 3
			for(let i=0;i<newOptionKeys.length;i++){
				params += newOptionKeys[i] + '=' +  options[newOptionKeys[i]] + '&'
			}
			// 去掉最后一位的&号
			params = params.slice(0,-1)
			// params = optionKeys.reduce((preValue,currentValue)=>{
			// 	return `${preValue}${currentValue}=${options[currentValue]}&`//模板字符串等价于下面
			// 	// return preValue + currentValue + '=' + options[currentValue] + '&'
			// },'?').slice(0,-1)
			console.log('params' + params);
		}
		// 把pages/center/center存储到localStorage里面
		uni.setStorageSync('back_url',route + params)
		// 下面是判断是否跳转的代码
		// 判断vm.vuex_token有没有，如果没有token，跳转到登录页面
		const openid = vm.vuex_user.openid
		if(!openid){
			vm.$u.toast('请登录')
			Login()
			return false
		}
		return true
		
	}
	let  ToLogin = function(){
		return new Promise((resolve11,reject) =>{
			// Login().then(res =>{
			// 	console.log(123224)
			// 	console.log(res)
			// 	getCode(res)
			// }).then(res =>{
			// 	console.log(456);
			// 	console.log(res);
			// })
			uni.getUserProfile({
				desc: '获取用户名，头像',
			}).then(res =>{
				return new Promise((resolve,reject)=>{
					console.log(res[1]);
					// getCode(res.userInfo,resolve)
					console.log(12358);
					console.log(res[1].userInfo)
					resolve(res[1].userInfo)					
				})
			}).then(res =>{
				return new Promise((resolve,reject)=>{
					uni.login({
						success: (result)=>{
							console.log(res)
							console.log(5484)
							let info = {
								"nickName": res.nickName,
								"headPortrait": res.avatarUrl,
								"tempCode": result.code
							}
							
							resolve(info)
						}
					})
				})
			}).then(res =>{
				return new Promise((resolve,reject)=>{
					vm.$u.api.getOpenId(res.tempCode).then((result1)=>{
						console.log(result1);
						console.log(5784122);
						let info1 = {
							"nickName": res.nickName,
							"headPortrait": res.headPortrait,
							"openid": result1.openid
						}
						resolve(info1)
					})
				})
			}).then(res =>{
				return new Promise((resolve,reject)=>{
					console.log(res)
					console.log(55555);
					vm.$u.api.getUserIdUseless(res.openid).then((data)=>{
						console.log('判断有没有用户信息');
						if(data.data == null){
							console.log('没有用户信息，需要重新创建');
							
							let params = {}
							params.nickName = res.nickName
							params.headPortrait = res.headPortrait
							params.id = res.openid
							console.log('创建的用户信息用于post',params);
							
							vm.$u.api.postUserInfo(params).then(()=>{
								console.log('进入psot的promise了');
								vm.$u.api.getUserIdUseless(res.openid).then((resid)=>{
									// 把用户信息vuexUserInfo存储到vuex里面
									console.log(resid.data.idUseless)
									res.idUseless = resid.data.idUseless
									console.log(8888888);
									console.log(res);
									vm.$u.vuex('vuex_user', res)
									resolve()
									resolve11()
								})
							
							})
						}
						else {
							res.idUseless = data.data.idUseless
							res.identity =  data.data.identity
							console.log('数据库有用户信息了');
							console.log(res);
							vm.$u.vuex('vuex_user', res)
							resolve()
							resolve11()
						}
					})
					// vm.$u.api.postUserInfo(res).then(()=>{
						
					// 	vm.$u.api.getUserIdUseless(res.openid).then((resid)=>{
					// 		// 把用户信息vuexUserInfo存储到vuex里面
					// 		console.log(resid.data.idUseless)
					// 		res.idUseless = resid.data.idUseless
					// 		console.log(8888888);
					// 		console.log(res);
					// 		vm.$u.vuex('vuex_user', res)
					// 		resolve()
					// 		resolve11()
					// 	})

					// })
				})
			})
		})
	}
	
	// 判断有没有登录，没有的话就跳转到我的页面去登录
	const goToLogin = function(){
		if(!vm.vuex_user.openid){
			uni.showModal({
				title: '登录提示',
				content: '您还没有登录，请登录并填写在线简历后使用更多功能~',
				success: (res)=>{
					if(res.confirm){
						console.log('用户点击确定了');
						vm.$u.route({
							url: 'pages/mine/index',
							type: 'switchTab'
						})
					}
					if(res.cancel){
						console.log('用户点击取消了');
					}
				},
			})
		}
	}
	
	/**
	 * 判断有没有简历，没有的话就跳转到我的页面去填写简历
	 */
	const isResumeAndLogin = function(){
	//没有简历
		if(vm.vuex_user.hasResume == undefined || vm.vuex_user.hasResume == false || vm.vuex_user.hasResume == null){
			uni.showModal({
				title: '提示',
				content: '您还没有创建简历，请创建在线简历后申请职位吧~~',
				success: (confirm,cancel)=>{
					if(confirm){
						console.log('用户点击确定了');
						vm.$u.route({
							url: 'pages_mine/mine/resumeOnline'
						})
					}
					if(cancel){
						console.log('用户点击取消了');
					}
				},
			})
			
		}
	}
	
	/**
	 * 请求用户信息，并把用户信息存储到vuex里面
	 */
	const updateUser = async() =>{
		// 重新请求用户信息
		const userInfo = await vm.$u.api.userInfo()
		// 把收到的用户信息缓存到localstorage中
		vm.$u.vuex('vuex_user',userInfo)
	}
	
	
	vm.$u.utils = {
		isLogin,
		// Login,
		updateUser,
		ToLogin,
		goToLogin,
		isResumeAndLogin
	}
}
export default {
	install
}