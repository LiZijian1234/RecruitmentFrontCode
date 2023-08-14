// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index'; // API太多了，直接在下面用就可以了

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	// 每写一个api，记得在最后把api挂在到vm.$u.api里面
	// 登录 index变为了API
	let index = (params = {}) => vm.$u.get('/api/index', params);
	// 我的相关的API
	let getOpenId = params => vm.$u.get(`/WxOpenData/${params}`)//根据code获取openid
	let getUserInfo = params => vm.$u.get(`/user/${params}`);//获取用户信息
	let postUserInfo = params => vm.$u.post('/user',params);
	let getUserIdUseless = params => vm.$u.get(`/user/${params}`)//获取用户的uselessid
	
	// 简历相关的
	let postResumeOnline = params => vm.$u.post('/resume',params);//在线简历提交
	let getResumeOnline = params => vm.$u.get(`/resume/${params}`);//get根据用户id查询在线简历
	let putResumeOnline = params => vm.$u.put('/resume',params)//修改简历
	//HR相关的
	// let getJobByHRId = params => vm.$u.get(`/postPublicated/getPostsByid/${params}`)//根据hrid获得岗位详情
	let getResumeByPostIdUseless = params => vm.$u.get(`/hrResumeUser/getResumeByPostIduseless/${params}`)//根据岗位的uselessid来查询申请这个岗位的id，即用户的id
	// let getResumeInfoById = params => vm.$u.get(`/resume/${params}`)//根据用户的简历id也就是openid来查询简历信息
	
	//HR相关的
	let postHRAuth = params => vm.$u.post('/corporationRegisterInfo',params)//HR认证身份及公司信息提交
	let getHRAuth = params => vm.$u.get(`/corporationRegisterInfo/${params}`)//获取HR认证信息
	let passResume = params  => vm.$u.put('/hrResumeUser/passResumeStatusByPostIduseless',params)//HR根据posiduseless和resumeid来通过简历
	let putJobByJobIdUseless = params  => vm.$u.put('/postPublicated',params)//根据iduseless修改岗位
	let postJobByHrId = params => vm.$u.post('/postPublicated',params)
	let deleteJobByIduseless = params => vm.$u.delete(`/postPublicated/deleteByIduseless/${params}`)//根据iduseless删除单个岗位
	let getDecode = params => vm.$u.get(`/GaoDeMap/geographicalDecode/${params}`)//通过地址获得经纬度
	let getReveseAddress = params => vm.$u.get(`/GaoDeMap/inverseGeographicalDecode/${params}`)//通过经纬度获得地址
	let getcountUnhandleResumeByHrId = params => vm.$u.get(`/hrResumeUser/countUnhandleResumeByHrId/${params}`)//获取HR未审核的简历的数字
	let getResumeIdByHrId = params => vm.$u.get(`/hrResumeUser/getResumeIdByHrId/${params}`)//根据HRid获取收到的简历id
	
	
	//用户查询岗位投递反馈相关
	let getJobIdByResumeId = params => vm.$u.get(`/hrResumeUser/getPostByResumeId/${params}`)//根据resumeid来查询兜底的岗位的iduseless
	let getJobCode = params => vm.$u.get(`/hrResumeUser/getResumeStatusByPostIduseless`,params)//用户查询自己的简历状态码
	
	// 公司相关的
	let postCompInfo = params => vm.$u.post('/corporation',params)//提交公司信息
	let getCompInfo = params => vm.$u.get(`/corporation/id/${params}`)//根据hrid也就是HR的填写公司的openid来get公司信息
	let putCompInfo = params => vm.$u.put(`/corporation`,params)//put修改公司信息
	let getAverageScore = params => vm.$u.get(`/userEvaluateCorporation/getAverageScore/${params}`)//根据公司id来查询公司分数
	let getAllEvaluateByHrid = params => vm.$u.get(`/userEvaluateCorporation/getAllEvaluate/${params}`)//根据公司id查询所有评论
	let getEvaluateLike = params => vm.$u.get(`/evaluateLikeDislike/countLike`,params)//根据评价统计点赞数
	let getEvaluateDislike = params => vm.$u.get(`/evaluateLikeDislike/countDislike`,params)//获得评价的踩数
	let postEvaluate = params => vm.$u.post(`/userEvaluateCorporation`,params)//提交信息
	let isLike = params => vm.$u.get(`/evaluateLikeDislike/isLikeOrDislike`,params)//统计用户是否已经点赞了这个评价
	
	
	
	// 主页相关的,岗位相关的
	let getAllJob = params => vm.$u.get('/postPublicated/getAllPostInfo',params)//显示在主页的推荐岗位
	let getNewJob = params => vm.$u.get('/postPublicated/addtimeMonthSalary',params)//显示在主页的最新的岗位
	let getRecommendJob = (pamams) => vm.$u.get(`/postPublicated/expectedSalary/${pamams}`)//用于获取推荐的数据
	let getJobDetailByIdUseless = params => vm.$u.get(`/postPublicated/iduseless/${params}`)//用于根据iduseless查询具体某个岗位信息
	let getAllNewJob = () => vm.$u.get('/postPublicated/latest')//获取最新的所有数据
	let getFilterData = params => vm.$u.get('/postPublicated/cityMonthSalary',params)//筛选后刷新数据
	let getJobByHrid = params => vm.$u.get(`/postPublicated/getPostsByid`,params)//根据hrid来查询岗位
	let getAllDayJob = params => vm.$u.get(`/postPublicated/selectBatchPostByDailySettlement`)//获取所有日结招聘
	
	
	//搜索相关的
	let getJobByName = params => vm.$u.get(`/postPublicated/name/${params}`)//搜索框查询岗位名称
	let getCompByName = params => vm.$u.get(`/corporation/getCorporationByFuzzyInput/${params}`)//根据搜索框查询公司
	let getCompInfoByCompName = params => vm.$u.get(`/corporation/name/${params}`)//根据公司名字获取公司信息
	
	//岗位先关的 设置了请求头，导致post的参数只能变成body的json形式，不能变成query形式
	let favoriteJob = params => vm.$u.post('/userFavoritePost/createUserFavoritePost',params)//添加收藏
	let cancelFavJob = params => vm.$u.delete('/userFavoritePost',params)//取消收藏
	let getFavJbo = params => vm.$u.get(`/userFavoritePost/selectUserFavoritePost/${params}`)//获取收藏
	
	
	//营长岗位相关的
	let getRecommendResumeInfo = params => vm.$u.get(`/referrer/selectRecommendedMemberInfo/${params}`)//获取营长推荐的人的简历状态信息
	let getSelectRemainedWithdrawCash = params => vm.$u.get(`/referrer/selectRemainedWithdrawCash/${params}`)//获取营长可提现金额
	let getSelectAlreadyWithdrawCash = params => vm.$u.get(`/referrer/selectWithdrawCash/${params}`)//查询营长已提现金额
	
	
	// 测试集中API请求
	// const res = await this.$u.api.authLogin({email: "test@a.com", password: '123123'})
	// console.log(res);
	// 使用API举例： const res = await this.$u.api.index() 获得get获得的数据
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		index,
		getOpenId,
		getUserInfo,
		postUserInfo,
		postResumeOnline,
		getResumeOnline,
		putResumeOnline,
		postHRAuth,
		getAllJob,
		getRecommendJob,
		getJobDetailByIdUseless,
		getAllNewJob,
		getFilterData,
		getNewJob,
		getJobByName,
		favoriteJob,
		getUserIdUseless,
		cancelFavJob,
		getFavJbo,
		getCompInfo,
		getJobByHrid,
		getResumeByPostIdUseless,
		passResume,
		getJobIdByResumeId,
		getJobCode,
		postCompInfo,
		putCompInfo,
		putJobByJobIdUseless,
		postJobByHrId,
		deleteJobByIduseless,
		getCompByName,
		getCompInfoByCompName,
		getHRAuth,
		getAverageScore,
		getAllEvaluateByHrid,
		getEvaluateLike,
		postEvaluate,
		getDecode,
		getReveseAddress,
		getEvaluateDislike,
		getcountUnhandleResumeByHrId,
		getResumeIdByHrId,
		isLike,
		getRecommendResumeInfo,
		getSelectRemainedWithdrawCash,
		getSelectAlreadyWithdrawCash,
		getAllDayJob
	}
}
export default {
	install
}