// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		// baseUrl: 'http://101.42.168.114:50000', // 请求的本域名，请求是会自动找baseUrl，且在完整的url前面拼接上baseUrl
		baseUrl: 'https://jxnckj.cn', // 请求的本域名，请求是会自动找baseUrl，且在完整的url前面拼接上baseUrl
		// method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		// 这里是false的话就是只返回数据的data，true的话就返回全部信息
		originalData: true, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});
	
	// 请求拦截，配置Token等参数 请求拦截是向服务器发送请求的过程
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		// config.header.Authorization = "Bearer " + vm.vuex_token
		// config.header.Authorization = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnNob3AuZWR1d29yay5jblwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY0MjA2MTQ0NCwiZXhwIjoxNjQyNDIxNDQ0LCJuYmYiOjE2NDIwNjE0NDQsImp0aSI6IkRieVFzM05Db0ZHRW4xZTQiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.f87fJKOSHf5WE7ThR5UBzI5mhL4AG3O6r3IKzBHbnug";
		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;
		
		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;
		// config.header.Token = 'xxxxxx';
		
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if(config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
	
	// 响应拦截，判断状态码是否通过，如果不通过，就返回消息提醒
	Vue.prototype.$u.http.interceptor.response = (res) => {
		console.log('拦截器');
		
		// 响应状态码和数据为statusCode,data。   res为接收到的总的数据
		const {statusCode,data} = res	
		// 状态码小于400，就是正确的，返回data
		if(statusCode < 400) {
			// 如果配置了originalData为true，请留意这里的返回值
			return data;
		}
		else if(statusCode == 400) {
			// 假设400为向服务端请求到了，但是服务器认为请求不正确5
			console.log(res)
			vm.$u.toast(data.message) // 弹窗显示data.message的数据，即400显示的错误消息提示
			return false;  // return false错误的请求
		}
		else if(statusCode == 401) {
			//401有两种情况，一种是认证未通过，一种是没有token或者token过期
			if(data.message == "Unauthorized"){
				vm.$u.toast('账号或密码错误');
			}else{			// 401第二种情况为token失效，这里跳转登录,这里的跳转是请求数据没有请求头token的时候，就需要跳转了
			// 而utils上的那个isLogin（）是进入某个页面时判断有没有token，没有就跳转
				vm.$u.toast('请登录');
				setTimeout(() => {
					vm.$u.route('/pages/auth/login') // 此为uView的跳转方法，详见路由相关文档
				}, 1500)
			}
			return false
		}
		else if(statusCode == 422) {
			// 422为表单验证未通过，例如一些必填参数没填
			// errors内部第一个元素以及第一个元素的值就是用户没填的内容，如： type: type不能为空
			var { errors } = data
			// console.log(errors); //errors是一个对象，不是数组
			// console.log(Object.values(errors)[0][0]);   //values方法是拿到error对象下的属性的值
			// console.log(Object.keys(errors));  keys方法是拿到error对象下的属性名
			vm.$u.toast(Object.values(errors)[0][0])
			return false;
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	},
	
	
	// 增加patch请求，上面只能使用get，post，delete，put接口，如果要用patch接口，需要增加以下代码
	vm.$u.patch = (url, params = {}, header = {}) => {
		// 模拟patch请求
		const _params = {
			...params,
			_method: 'PATCH'
		}
		// _params作为第二个参数
		return vm.$u.post(url, _params, header)
	}
	// vm.$u.patch = (url) => {
	// 	return vm.$u.get(url)
	// }
}
// 在调用接口的时候只需要用async onLoad(){
// 	const res = await this.$u.post("/api/auth/login")
// }来调用接口，不需要别的操作。 如果出现异常，会执行响应拦截，执行promise的reject，res不会接收到数据，下面的代码就不会执行
//也可以用try catch来不影响下面的数据
export default {
	install
}