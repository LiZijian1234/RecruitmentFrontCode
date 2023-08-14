import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token','vuex_resume_img','vuex_fontScale','vuex_hrauth_img','vuex_sharerId'];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中，如果变量名在saveStateKeys中，就把变量名写入到lifeData中。
	//变量名不在saveStateKeys中，就不把变量名写入到lifeData中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	// 下面这些值仅为示例，使用过程中请删除
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {},
		// vuex_openid: lifeData.vuex_openid ? lifeData.vuex_openid : '',
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		vuex_resume_img: lifeData.vuex_resume_img ? lifeData.vuex_resume_img : '',
		vuex_fontScale: lifeData.vuex_fontScale ? lifeData.vuex_fontScale : 1,
		vuex_hrauth_img: lifeData.vuex_hrauth_img ? lifeData.vuex_hrauth_img : '',
		vuex_sharerId: lifeData.vuex_sharerId ? lifeData.vuex_sharerId: ''
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		// vuex_version: '1.0.1',
		//要想新增加一个vuex_name的话，并且需要永久存储，需要在saveStateKeys中存储（15行），并且在state中加入。（41行）
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');    // nameArr = ['user','info','score']
			let saveKey = '';
			let len = nameArr.length;
			if(nameArr.length >= 2) {
				let obj = state[nameArr[0]];   // obj = state[user] = 0
				// obj = obj[info] = 0
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;  //obj[score] = 1
				saveKey = nameArr[0];        //saveKey = user
			} else {
				// 单层级变量，在state就是一个普通变量的情况   score = 1    
				state[payload.name] = payload.value;
				saveKey = payload.name;  // state[score] = 1   saveKey = score
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store