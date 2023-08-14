<template>
	<view class="base_body" style="">
<!-- 		<u-dropdown>
			<u-dropdown-item v-model="dropValue2" title="全部行业" @change="changeDropDown2"
			:options="dropOptions2" ></u-dropdown-item>
			<u-dropdown-item 
			v-model="dropValue" title="距离大小" @change="changeDropDown"
			:options="dropOptions"></u-dropdown-item>
		</u-dropdown> -->
		<map  id="myMap" style="width: 750rpx; "
		  layer-style="1" subkey="Z3VBZ-7QREW-I72RZ-RZKRA-FR5KF-LXFYS"
		  :style="{height:mapheight}"
		  :latitude="latitude" 
		  :longitude="longitude" :markers="marker" 
		  :scale="scale"
		  :show-location="true" 
		  @markertap="markertap"
		  @updated="this.flag = true"
		  @callouttap='markertap'>
		>
		</map>
		
		<view class="search-wrap">
			<view class="suggestion-wrap" :key="index" v-if="showMessage"
			v-for="(item,index) in suggestion" @tap="fulfill(index)">
				<text>{{item.addr}}</text>
			</view>
			<view class="" style="display: flex;align-items: center;padding-left:10rpx">
<!-- 				<u-icon name="map-fill" color="#7573e6" size="40" ></u-icon>
				<text style="width: 130rpx;display: block;padding-left:10rpx">{{city}}</text> -->
				<view class="input-wrap" style="padding: 0 10rpx 0 10rpx;">
					<!-- <text class="iconfont icon-shoucang1" style="padding-left: 5rpx;" @click="search"> </text> -->
					<u-icon name="search" color="#ababb2" size="30" @click="search"></u-icon>
<!-- 					<input type="text" @confirm="search" @input="inputValue" placeholder-style="plceholderstyle"
					placeholder="请输入位置/地区" v-model="keyword" class="input"> -->
					<input type="text" @confirm="search"  placeholder-style="plceholderstyle"
					placeholder="请输入位置/地区" v-model="keyword" class="input">
<!-- 						<view class="search-wrap-view">
							<u-search placeholder="搜索位置/地区" 
							v-model="keyword" shape="round" 
							:show-action="false"
							placeholder-color="#6a696c"
							bg-color="#f2f2f2"
							:height="serachHeight" @change="inputValue" @search="search"
							input-align="center"
							border-color="#fff"
							search-icon-color="#797979"
							:input-style="searchStyle"
							></u-search>
						</view> -->
					
				</view>
			</view>
			
			<view class="" style="display: flex;justify-content: space-around;margin-top: 19rpx;">
				<view class="" @click="this.showIndustry = true">
					<text>全部行业</text>
					<u-icon name="arrow-down"></u-icon>
				</view>
				<view class="" style="" @click="this.showDistance = true">
					<text>距离大小</text>
					<u-icon name="arrow-down"></u-icon>
				</view>

			</view>
			
<!-- 			<u-dropdown>
				<u-dropdown-item v-model="dropValue2" title="全部行业" @change="changeDropDown2"
				:options="dropOptions2" ></u-dropdown-item>
				<u-dropdown-item 
				v-model="dropValue" title="距离大小" @change="changeDropDown"
				:options="dropOptions"></u-dropdown-item>
			</u-dropdown> -->
			
			

		</view>
		<!-- <input type="text" placeholder="请输入内容"> -->

		<u-action-sheet :list="industryList" v-model="showIndustry" @click="changeDropDown2"></u-action-sheet>
		<u-action-sheet :list="distanceList" v-model="showDistance" @click="changeDropDown"></u-action-sheet>
		
		<image @click="loding" class="dw"
		src="../../static/dw.png" mode=""></image>
		
		<view class="comp-wrap" @click="toComp" v-if="isShow == true">
			<view class="" style="display: flex; flex-direction:column">
				<text class="comp-name">{{compInfo.corporationName != null ? compInfo.corporationName :  ''}}</text>
				<view class="comp-detail">
					<text>{{compInfo.corporationNature !=null ? compInfo.corporationNature : ''}}</text>
					<text class="u-p-l-10 u-p-r-10">|</text>
					<text >{{compInfo.corporationEmployees}}</text>
					<text class="u-p-l-10 u-p-r-10">|</text>
					<text>{{compInfo.corporationIndustry}}</text>
				</view>
			</view>
			<u-image :src="compInfo.corporationPicture1" mode="scaleToFill" width="120rpx" height="120rpx" border-radius="10"></u-image>
		</view>
		
<!-- 		<view class="tobus" v-if="isShow == true">
			<view class="tobus_box">
				
				<view class="txt_list" style="font-size: 30rpx;">
					{{address}}
				</view>
				<view class="" style="display: flex;">
					<view class="" style="font-size: 32rpx;">
						{{company}}
					</view>
					<button type="default" @click="toComp">查看公司</button>
				</view>

			</view>
		</view> -->
	</view>
</template>

<script>
	let timer
	// import  QQMapWX from "@/common/qqmap-wx-jssdk.min.js"
	// this.mapCtx = wx.createMapContext('myMap', this);
	// const qqmapsdk = new QQMapWX({
	// 	 // 填写自己的Key值，这个值是与AppID绑定的
	// 	 // key: '5I5BZ-EYHE6-DELSZ-MT57U-ANDN6-AXFBJ'
	// 	 key: 'Z3VBZ-7QREW-I72RZ-RZKRA-FR5KF-LXFYS',
	//  });
	export default {
		data() {
			return {
				changedMarker: [],//改变之后的marker
				realScale: 0,
				distanceList:[
					{
						text: '不限'
					},{
						text: '10公里内'
					},{
						text: '20公理内'
					}
				],
				industryList: [
					{
						text: '不限'
					},{
						text: '建筑'
					},{
						text: '计算机'
					},{
						text: '广告'
					},{
						text: '影视'
					},{
						text: '教育'
					},{
						text: '餐饮'
					},{
						text: '医疗'
					},{
						text: '物流'
					},{
						text: '电力'
					},{
						text: '互联网'
					},{
						text: '软件'
					}
				],
				showDistance: false,
				showIndustry: false,
				searchStyle:{
					width: '550rpx',
					height: '60rpx',
					// fontWeight: '500',
					// fontSize: '30rpx',
					// fontFamily: '微软雅黑',
					// // borderRadius: '40rpx'
					// // boxShadow: '5rpx 5rpx 5rpx #f0f0f0'
				},
				iduseless: 0,//点击的岗位的iduseless
				clickID: -1,
				postName: '',
				compInfo: {},//公司信息
				address: '',
				company: '',
				
				// 请求后端的页数
				page: 1,
				// 用户自己的位置
				mylatitude: 0,
				mylongitude: 0,
				scale: 12,
				dropValue2: 1,
				dropOptions2: [{
					label: '不限',
					value: 1
				},
				{
					label: '建筑',
					value: 2,
				},
				{
					label: '计算机',
					value: 3,
				},{
					label: '广告',
					value: 4,
				},{
					label: '建筑',
					value: 5,
				},
				{
					label: '影视',
					value: 6,
				},{
					label: '教育',
					value: 7,
				},
				{
					label: '餐饮',
					value: 8,
				},
				{
					label: '医疗',
					value: 9,
				},
				{
					label: '物流',
					value: 10,
				},
				{
					label: '电力',
					value: 11,
				},
				{
					label: '互联网',
					value: 12,
				},
				{
					label: '软件',
					value: 13,
				},
				{
					label: '汽车',
					value: 14,
				}		
				],
				//下拉菜单
				dropOptions: [{
						label: '不限',
						value: 1,
					},
					{
						label: '10公里内',
						value: 2,
					},
					{
						label: '20公里内',
						value: 3,
					}
				],
				dropValue: 1,
				showMessage: false,//显示提示
				searchStyle:{
					height: '60rpx'
				},
				actionStyle: {
					fontSize: '28rpx',
					width: '80rpx'
				},
				city: '',//城市
				newDistrict: '',//地区
				suggestion: [],
				keyword: '',
				mapheight: '89vh',
				flag: true,
				isShow: false,
				latitude: 34.23175862630208, // 地图默认显示的维度
				longitude: 108.9141148546007, // 地图默认显示的经度
				
				markers: [
					//{ //标记点
				// 	id: 1,
				// 	latitude: 34.242437,
				// 	longitude: 108.920616,
				// 	title: "点击提示1",
				// 	joinCluster: true,
				// 	width: 32,
				// 	height: 40,
				// 	iconPath: '../../static/man.png'
				// }, {
				// 	id: 2,
				// 	latitude:  34.243437,//纬度
				// 	longitude: 108.920616,//经度
				// 	title: "点击提示2",
				// 	joinCluster: true,
				// 	width: 32,
				// 	height: 40,
				// 	iconPath: '../../static/man.png'
				// }, {
				// 	id: 3,
				// 	latitude:  34.244437,//纬度
				// 	longitude: 108.920616,//经度
				// 	title: "点击提示3",
				// 	joinCluster: true,
				// 	width: 32,
				// 	height: 40,
				// 	iconPath: '../../static/man.png'
				// }, {
				// 	id: 4,
				// 	latitude:  34.245437,//纬度
				// 	longitude: 108.920616,//经度
				// 	title: "点击提示4",
				// 	joinCluster: false,
				// 	width: 32,
				// 	height: 40,
				// 	iconPath: '../../static/man.png'
				// }, {
				// 	id: 5,
				// 	latitude:  34.246437,//纬度
				// 	longitude: 108.920616,//经度
				// 	title: "点击提示5",
				// 	joinCluster: false,
				// 	width: 32,
				// 	height: 40,
				// 	iconPath: '../../static/man.png'
				// },{
				// 	id: 6,
				// 	latitude:  34.247437,//纬度
				// 	longitude: 108.920616,//经度
				// 	title: "点击提示6",
				// 	joinCluster: false,
				// 	width: 32,
				// 	height: 40,
				// 	iconPath: '../../static/man.png'
				// },{
				// 	id: 7,
				// 	latitude:  34.248437,//纬度
				// 	longitude: 108.920616,//经度
				// 	title: "点击提示7",
				// 	joinCluster: false,
				// 	width: 32,
				// 	height: 40,
				// 	iconPath: '../../static/man.png'
				// },{
				// 	id: 8,
				// 	latitude:  34.249437,//纬度
				// 	longitude: 108.920616,//经度
				// 	title: "点击提示8",
				// 	joinCluster: false,
				// 	width: 32,
				// 	height: 40,
				// 	iconPath: '../../static/man.png'
				// }
				],
			}
		},
		watch:{
			realScale(newValue,oldValue) {
				if(newValue >= 13.278216){
					// for (let i = 0; i < this.changedMarker.length; i++) {
					// 	this.changedMarker[i].
					// }
					this.addMarkers(this.changedMarker,'ALWAYS')
					
					// this.changedMarker
				}else if(newValue > 12 || newValue < 12){
					this.addMarkers(this.changedMarker,'BYCLICK')
				}
			}
		},
		computed: {
			serachHeight(){
				return 80
				// 后面可以改成这样的
				// if(this.vuex_fontScale == 1)
				// {
				// 	return 80
				// }else{
				// return this.vuex_fontScale  * 60
				// }
			}
		},
		onShow() {
			timer = setInterval(()=>{
				this.mapCtx.getScale({
					success: res=>{
						this.realScale = res.scale
						console.log('getScale',res.scale);
						// this.scale = res.scale - 1
					}
				})
			},300)
		},
		onHide() {
			console.log('进入onhide');
			clearInterval(timer)
		},
		async onLoad() {
			this.mapCtx = wx.createMapContext('myMap', this);
			let _this = this

			
			const dataJob = await uni.request({
					url: 'https://jxnckj.cn/corporation',
					// data: {
					// 	pageCurrent: _this.page,
					// 	pageSize: 1000
					// }
				})
			let dataList = dataJob[1].data.data
			console.log('公司');
			console.log(dataJob[1].data.data);
			
			let newDataList = dataList.filter((item)=>{
				return item.corporationLocationDecode != null
			})
			newDataList.forEach((item,index)=>{
				let arr = item.corporationLocationDecode.split(',')
				item.latitude = arr[1]//维度
				item.longitude = arr[0]//精度
				item.ID = index
			})
			console.log(newDataList);
			
			_this.markers = [..._this.markers,...newDataList]
			_this.changedMarker =  _this.markers
			// _this.page = _this.page + 1
			// 开始渲染聚合点
			_this.openAggator()
			_this.addMarkers(_this.markers,'BYCLICK')
			
			// 引入腾讯地图api
			// 实例化API核心类
			// const qqmapsdk = new QQMapWX({
			// 	 // 填写自己的Key值，这个值是与AppID绑定的
			// 	 // key: '5I5BZ-EYHE6-DELSZ-MT57U-ANDN6-AXFBJ'
			// 	 key: 'Z3VBZ-7QREW-I72RZ-RZKRA-FR5KF-LXFYS',
			//  });
			// 向用户发起授权请求，弹框提示
			// uni.authorize({
			// 	// 获取用户定位信息
			// 		scope: 'scope.userLocation',
			// 		// 用户同意授权执行
			// 		success:(res)=>{
			// 			// 获取用户当前的经纬度
			// 			uni.getLocation({
			// 				type: 'gcj02',
			// 				// highAccuracyExpireTime: 5000,
			// 				// timeout: 10,
			// 				// isHighAccuracy: true,
			// 				success: async res => {
			// 					console.log(res);
			// 					// 我自己的位置
			// 					// _this.latitude = res.latitude
			// 					// _this.longitude = res.longitude
			// 					// _this.mylatitude = res.latitude
			// 					// _this.mylongitude = res.longitude
			// 					// console.log('当前位置的经度：' + res.longitude);
			// 					// console.log('当前位置的纬度：' + res.latitude);
			// 					// console.log('OnLoad,_this.latitude',_this.latitude);
								
								
			// 					const dataJob = await uni.request({
			// 							url: 'https://jxnckj.cn/corporation',
			// 							// data: {
			// 							// 	pageCurrent: _this.page,
			// 							// 	pageSize: 1000
			// 							// }
			// 						})
			// 					let dataList = dataJob[1].data.data
			// 					console.log('公司');
			// 					console.log(dataJob[1].data.data);
								
			// 					let newDataList = dataList.filter((item)=>{
			// 						return item.corporationLocationDecode != null
			// 					})
			// 					newDataList.forEach((item,index)=>{
			// 						let arr = item.corporationLocationDecode.split(',')
			// 						item.latitude = arr[1]//维度
			// 						item.longitude = arr[0]//精度
			// 						item.ID = index
			// 					})
			// 					console.log(newDataList);
								
			// 					_this.markers = [..._this.markers,...newDataList]
			// 					_this.changedMarker =  _this.markers
			// 					// _this.page = _this.page + 1
			// 					// 开始渲染聚合点
			// 					_this.openAggator()
			// 					_this.addMarkers(_this.markers,'BYCLICK')
								
			// 					// while(true){
			// 						// 这里注意一下，为什么第0个是null?
			// 						// uni.request({
			// 						// 	url: 'http://101.42.168.114:50000/postPublicated/getAllPostInfo',
			// 						// 	data: {
			// 						// 		pageCurrent: _this.page,
			// 						// 		pageSize: 1000
			// 						// 	}
			// 						// }).then((res)=>{
			// 						// 	let dataList = res[1].data.data.rows
			// 						// 	console.log(res[1].data.data.rows);
			// 						// 	_this.markers = [..._this.markers,...dataList]
			// 						// 	_this.page = _this.page + 1
										
			// 						// 	// if(res[1].data.data.rows.length == 0){
			// 						// 	// 	console.log('_this.page',_this.page);
			// 						// 	// 	break
			// 						// 	// }
			// 						// })
			// 					// }

								
								
			// 					// 使用地图实例中的方法，让标记和我的位置都在可视区域里显示
								
			// 					// _this.mapCtx.includePoints({
			// 					//       padding: [40,40,40,40],
			// 					//       points: [
			// 					// 		  // 第一个是我的位置数据
			// 					// 		{
			// 					//           latitude: _this.latitude,
			// 					//           longitude: _this.longitude
			// 					//         },
			// 					// 		// 第二个是岗位位置数据
			// 					//         {
			// 					//           latitude: _this.markers[0].latitude,
			// 					//           longitude: _this.markers[0].longitude
			// 					//         },
			// 					// 		{
			// 					// 		  latitude: _this.markers[1].latitude,
			// 					// 		  longitude: _this.markers[1].longitude
			// 					// 		},
			// 					// 		{
			// 					// 		  latitude: _this.markers[2].latitude,
			// 					// 		  longitude: _this.markers[2].longitude
			// 					// 		},
			// 					// 		{
			// 					// 		  latitude: _this.markers[3].latitude,
			// 					// 		  longitude: _this.markers[3].longitude
			// 					// 		}
			// 					//       ],
			// 					// 		success: function(){
			// 					// 			console.log('includePoints成功');
			// 					// 			_this.openAggator();
			// 					// 			_this.addMarkers()
			// 					// 		}
			// 					// })

			// 					// qqmapsdk.reverseGeocoder({
			// 					// 	location: {
			// 					// 		latitude: res.latitude,
			// 					// 		longitude: res.longitude
			// 					// 	},
			// 					// 	// coord_type: 5,
			// 					// 	success(res) {
			// 					// 		console.log('通过腾讯地图获取用户位置成功')
			// 					// 		console.log(res)
			// 					// 		// 取到用户的定位城市，赋值传递出去
			// 					// 		_this.city = res.result.address_component.city
			// 					// 		_this.newDistrict = res.result.address_component.district
										
			// 					// 		console.log(_this.city);
			// 					// 		console.log(_this.newDistrict);
			// 					// 		// 开始渲染聚合点
			// 					// 		_this.openAggator()
			// 					// 		_this.addMarkers(_this.markers,'BYCLICK')
										
			// 					// 	}
			// 					// })
			// 				}
			// 			})
			// 		},
			// 		// 若用户不同意授权，弹框提示
			// 		fail(res){
			// 			uni.showToast({
			// 				icon :"none",
			// 				title: '注意：需要获取您的定位授权,否则部分功能将无法使用',
			// 				duration: 2000
			// 			})
			// 		}
			// })
					
		},
		onUnload() {
			console.log('进入onUnload');
			clearInterval(timer);
		},
		onReady() {
		},
		mounted() {
		},
		methods: {
			// regionchange(){
			// 	console.log('视野发生变化的函数');
			// 	this.mapCtx.getScale({
			// 		success: res=>{
			// 			this.realScale = res.scale
			// 			console.log('getScale',res.scale);
			// 			// this.scale = res.scale - 1
			// 		}
			// 	})
			// },
			// 行业
			async changeDropDown2(value){
				console.log(value);
				if(value == 0){
					if(this.realScale >= 12.5){
						this.addMarkers(this.changedMarker,'ALWAYS')
					}else {
						this.addMarkers(this.changedMarker,'BYCLICK')
					}
					return
				}
				// this.dropOptions2[value-1].label
				// console.log(this.dropOptions2[value-1].label);
				// const res = await this.$u.api.getCorporationByCorporationIndustry(this.dropOptions2[value-1].label)
				const res = await uni.request({
					url: `https://jxnckj.cn/corporation/getCorporationByCorporationIndustry/${this.industryList[value].text}`,
				})
				console.log('res',res);
				let dataList = res[1].data.data
				// let dataList = res.data
				let newDataList = dataList.filter((item)=>{
					return item.corporationLocationDecode != null
				})
				newDataList.forEach((item,index)=>{
					let arr = item.corporationLocationDecode.split(',')
					item.latitude = arr[1]//维度
					item.longitude = arr[0]//精度
					item.ID = index
				})
				this.changedMarker = newDataList
				if(this.realScale >= 12.5){
					this.addMarkers(newDataList,'ALWAYS')
				}else {
					this.addMarkers(newDataList,'BYCLICK')
				}
				// this.addMarkers(newDataList)
				// this.markers = newDataList
				
			},
			// 距离
			// 改变下拉的菜单
			changeDropDown(value){
				this.mapCtx = wx.createMapContext('myMap', this);
				if(value == 0){
					if(this.realScale >= 12.5){
						this.addMarkers(this.changedMarker,'ALWAYS')
					}else {
						this.addMarkers(this.changedMarker,'BYCLICK')
					}
					// this.addMarkers(this.markers)
					// this.mapCtx.getScale({
					// 	success: res=>{
					// 		console.log(res.scale);
					// 		this.scale = res.scale - 1
					// 	}
					// })
				}
				else if(value !==  0){
						let qualifyDistance = 0
						let qualifyList = []
						if(value == 1){
							qualifyDistance = 10000
						}else if (value == 2){
							qualifyDistance = 20000
						}
					    var _this = this;
						let toList = []
						for (let i = 0; i < this.markers.length; i++) {
							toList.push({
								 latitude: this.markers[i].latitude,
								 longitude: this.markers[i].longitude
							})
						}
						console.log('toList',toList);
						//得到toList是只有距离的list
					    //调用距离计算接口
					    qqmapsdk.calculateDistance({
					        mode: 'straight',//可选值：'driving'（驾车
							// ）、'walking'（步行），不填默认：'walking',可不填
					        //from参数不填默认当前地址
					        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
					        from: `${_this.latitude},${_this.longitude}` || '', //若起点有数据则采用起点坐标，若为空默认当前地址
					        to: toList, //终点坐标
					        success: res1=> {//成功后的回调
					          console.log(res1);
					          let res = res1.result;
							  console.log(44);
					          let dis = [];
					          for (let i = 0; i < res.elements.length; i++) {
					            dis.push(res.elements[i].distance); //将返回数据存入dis数组，
					          }
							  console.log(dis);
							  console.log('qualifyDistance',qualifyDistance);
							  dis.forEach((item,index)=>{
								  if(item < qualifyDistance){
									  qualifyList.push(_this.markers[index])
									  
								  }
							  })
							  console.log(789);
							  console.log(qualifyList);
							  // _this.markers = qualifyList
							  _this.changedMarker = qualifyList
							  if(_this.realScale >= 12.5){
							  	_this.addMarkers(qualifyList,'ALWAYS')
							  }else {
							  	_this.addMarkers(qualifyList,'BYCLICK')
							  }
							  // _this.addMarkers(qualifyList)
							  
					        },
					        fail: function(error) {
					          console.error(error);
					        },
					        complete: function(res) {
					          console.log(res);
					        }
					    });
					
				}
			},
			// //用户点击下面的提示触发的函数
			// fulfill(index){
			// 	this.keyword = this.suggestion[index].addr
			// 	this.showMessage = false
			// 	var _this = this;
			// 	setTimeout(()=>{
			// 		//调用地址解析接口
			// 		qqmapsdk.geocoder({
			// 			//获取表单传入地址
			// 			address: _this.keyword, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
			// 			success: function(res) {//成功后的回调
			// 				console.log(res);
			// 				var res = res.result;
			// 				_this.latitude = res.location.lat;
			// 				_this.longitude = res.location.lng;
			// 			}
			// 		})	
			// 	},400)
			// },
			
			// 用户输入就会触发函数
			// inputValue(e){
			// 	console.log('用户写了字');
			// 	// console.log(e);
			// 	let _this = this;
			// 	    //调用关键词提示接口
			// 	    qqmapsdk.getSuggestion({
					
			// 	      //获取输入框值并设置keyword参数
			// 	      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
			// 	      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
			// 	      success: function(res) {//搜索成功后的回调
			// 	        console.log(res);
			// 	        let sug = [];
			// 	        for (let i = 0; i < 5; i++) {
			// 	          sug.push({ // 获取返回结果，放到sug数组中
			// 	            title: res.data[i].title,
			// 	            id: res.data[i].id,
			// 	            addr: res.data[i].address,
			// 	            city: res.data[i].city,
			// 	            district: res.data[i].district,
			// 	            latitude: res.data[i].location.lat,
			// 	            longitude: res.data[i].location.lng
			// 	          });
			// 	        }
			// 			_this.suggestion = sug
			// 			_this.showMessage = true
			// 	      },
			// 	      fail: function(error) {
			// 	        console.error(error);
			// 	      },
			// 	      complete: function(res) {
			// 	        console.log(res);
			// 	      }
			// 	    });
			// },
			// 用户点击搜索
			async search(){
				// 根据搜索结果创建markers
				let markerList = []
				const res = await this.$u.api.getCompByName(this.keyword)
				for (let i = 0; i < res.data.length; i++) {
					const res1 = await this.$u.api.getCompInfoByCompName(res.data[i])
					let arr = res1.data.corporationLocationDecode.split(',')
					res1.data.latitude = arr[1]//维度
					res1.data.longitude = arr[0]//维度
					res1.data.ID = i
					markerList.push(res1.data)
					console.log('循环',i);
				}
				// res.data.forEach(async(item,index) =>{
				// 	const res1 = await this.$u.api.getCompInfoByCompName(item)
				// 	let arr = res1.data.corporationLocationDecode.split(',')
				// 	res1.data.latitude = arr[1]//维度
				// 	res1.data.longitude = arr[0]//维度
				// 	res1.data.ID = index
				// 	markerList.push(res1.data)
				// 	console.log('循环',index);
				// })
				console.log('markerList',markerList);
				this.changedMarker = markerList
				if(this.realScale >= 12.5){
					this.addMarkers(markerList,'ALWAYS')
				}else {
					this.addMarkers(markerList,'BYCLICK')
				}
				
				// this.addMarkers(markerList)
				console.log('结束循环');
				// let _this = this;
				//    // 调用接口
				//    qqmapsdk.search({
				//       keyword: _this.keyword,  //搜索关键词
				//    //    location: {
				// 		 //   latitude: _this.latitude,
				// 		 //    longitude: _this.longitude
				// 	  // },  //设置周边搜索中心点
				// 	  region: '西安市',
				// 	  page_size: 20,
				//       success: function (res) { //搜索成功后的回调
				//         let mks = []
				// 		console.log(res);
				// 		console.log(res.data[0].location.lat);
				// 		console.log(res.data[0].location.lng);
				// 		_this.latitude = res.data[0].location.lat
				// 		_this.longitude = res.data[0].location.lng
				// 		console.log(_this.latitude,_this.longitude);
				//         // for (var i = 0; i < res.data.length; i++) {
				//         //   mks.push({ // 获取返回结果，放到mks数组中
				//         //     title: res.data[i].title,
				//         //     id: res.data[i].id,
				//         //     latitude: res.data[i].location.lat,
				//         //     longitude: res.data[i].location.lng,
				//         //     iconPath: "/resources/my_marker.png", //图标路径
				//         //     width: 20,
				//         //     height: 20
				//         //   })
				//         // }
				//         // _this.setData({ //设置markers属性，将搜索结果显示在地图中
				//         //   markers: mks
				//         // })
				//       },
				//       fail: function (res) {
				//         console.log(res);
				//       },
				//       complete: function (res){
				//         console.log(res);
				//       }
				//   });
			},
			// 添加markers
			addMarkers(Markers,string) {
				this.mapCtx = wx.createMapContext('myMap', this);
				// this.mapCtx.getScale({
				// 	success: res=>{
				// 		console.log(res.scale);
				// 		// this.scale = res.scale - 1
				// 	}
				// })
				let markers = []
				let iconPath = '../../static/man.png'
				// console.log('this.markers',this.markers);
				Markers.forEach((item,index) => {
					let markerObj = {
						width: 45,
						height: 45,
						id: item.ID,
						// iconPath: iconPath,
						iconPath: item.industryLogo,
						latitude: Number(item.latitude),
						longitude: Number(item.longitude),
						joinCluster: true, // 产生聚合簇，需添加该属性
						zIndex: 99999,
						callout:{//自定义标记点上方的气泡窗口 点击有效  
							content:item.corporationName,//文本
							color:'#ffffff',//文字颜色
							fontSize:14,//文本大小
							borderRadius:15,//边框圆角
							padding: 10,
							bgColor:'#7573e6',//背景颜色
							// display:'BYCLICK',//常显
							display:string,//常显
						},
						// label: {
						// 	content: item.postName,
						// 	anchorX: 0,
						// 	anchorY: 0.5,
							
						// },
						// anchor: {
						// 	x: .5,
						// 	y: 1
						// }
					}
					const newMarker = Object.assign({},markerObj)
					markers.push(newMarker)
					//把每一个marker都遍历push到markers中
				})
				this.mapCtx.addMarkers({
					markers,
					clear: true, // 是否先清空地图上所有marker
					complete(res) {
					  console.log('初始化聚合点时的addMarkers', res)
					}
				})
			},
			
			// 点聚合
			openAggator() {
				let that = this
				this.mapCtx.initMarkerCluster({
					enableDefaultStyle: false,
					zoomOnClick: true,
					gridSize: 60,
					complete(res) {
						console.log('初始化initMarkerCluster', res)
					}
				})
				
				this.mapCtx.on('markerClusterCreate', res => {
					console.log('监听到了markerClusterCreate', res)
					
					// that.mapCtx.getScale({
					// 	success: res=>{
					// 		that.realScale = res.scale
					// 		console.log('getScale',res.scale);
					// 		// this.scale = res.scale - 1
					// 	}
					// })
					
					let clusterMarkers = []
					const clusters = res.clusters // 新产生的聚合簇
					 clusters.forEach((cluster,index) => {
						const {
							center, // 聚合点的经纬度数组
							clusterId, // 聚合簇id
							markerIds // 已经聚合了的标记点id数组
						} = cluster
						let clusterObj = {
							clusterId, //必须
							...center,
							width: 50,
							height: 50,
							// iconPath: '../../static/logo1.png',
							label: {// 定制聚合簇样式
								content: markerIds.length + '',
								fontSize: 16,
								color: '#fff',
								width: 50,
								height: 50,
								bgColor: '#7573e6',
								borderRadius: 25,
								textAlign: 'center',
								anchorX: -10,
								anchorY: -35,
								
							}
						}
						clusterMarkers.push(clusterObj)
					})
					// 添加聚合簇
					this.mapCtx.addMarkers({
						markers:clusterMarkers,
						clear: false, //是否先清空地图上所有的marker
						complete(res) {
						  console.log('添加聚合点时的addMarkers', res)
						}
					})
				})
			},
			// 点击回到自己的位置
			loding() {
				if(this.flag){
					this.mapCtx.moveToLocation()
				}
			},
			    //地图点击事件
			markertap(e) {
				// uni.navigateTo({
				// 	url:'./jobMapTest'
				// })
				if(this.flag){
					// 如果当前点击的这个id还是显示的id，直接return
					
					let id = e.detail.markerId
					if(this.clickID == -1){
						this.isShow = true
					}
					if(this.clickID == e.detail.markerId){
						console.log('点了了相同的');
						this.isShow = !this.isShow
					}
					if(this.clickID != -1 && this.clickID != e.detail.markerId){
						this.isShow = true
					}
					// if(this.clickID == e.detail.markerId || this.clickID == -1){
					// 	this.isShow = 
					// 	console.log(this.isShow);
					// }
					this.clickID = id
					console.log('this.markers[id]',this.markers[id]);
					if(this.isShow == true){
						this.mapheight = '71vh'
					}
					else{
						this.mapheight = '89vh'
					}
					console.log("===你点击了标记点===",e)
					// this.postName = this.markers[id].postName
					// this.address = this.markers[id].corporationHeadquarters
					// this.company = this.markers[id].corporationName
					this.compInfo = this.markers[id]
					this.HRid = this.markers[id].id
				}
			
			},
			// 点击到岗位
			toComp(){
				uni.navigateTo({
					url: `/pages/index/compDetail?HRid=${this.HRid}`
				})
			}
			//地图点击事件
			// callouttap(e){
			// 	if(this.flag){
			// 		this.isShow = !this.isShow
			// 		this.mapheight = '90vh'
			// 		console.log('地图点击事件',e)
			// 	}
			// }
		}
	}
</script>

<style lang="scss" scoped>
.comp-wrap{
	margin: 18rpx 20rpx 1rpx 20rpx;
	// height: 250rpx;
	border: 3rpx solid #D7D7D7;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 28rpx;
	border-radius: 16rpx;
	.comp-name{
		padding-left: 10rpx;
		font-family: '等线';
		font-weight: bold;
		padding-bottom: 13rpx;
		color: #000000;
		font-size: 40rpx;
		// line-height: 36rpx;
	}
	.comp-detail{
		font-family: '等线';
		color:#555555;
		font-size: 28rpx;
		line-height: 35rpx;
		margin-top: 8rpx;
	}
}
/deep/ .data-v-4c556b40{
	width: 550rpx !important;
}
	.search-wrap-view{
		display: flex;
		justify-content: center;
		// margin-bottom: 120rpx;
		// top: 0rpx;
		// width: 100%;
		margin: 0 0 40rpx 0;
	}
	#myMap{
		position: relative;
	}
	
	.tobus{
		position: fixed;
		height: 266rpx;
		box-sizing: border-box;
		padding: 20rpx 30rpx 30rpx 30rpx;
		background-color: #fff;
		margin: 0 0rpx;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: 10rpx 10rpx 0 0;
	}
	.tobus_box_title{
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
	.txt_list{
		display: flex;
		margin: 30rpx 0;
	}
	.txt_list text{
		font-size: 24rpx;
		color: #333;
		margin-right: 14rpx;
	}
	.tobus .tobus_box button{
		height: 84rpx;
		background: #1588ED;
		border-radius: 10rpx;
		color: #fff;
		font-size: 32rpx;
	}
	.dw{
		/* position: fixed; */
		transform: translateY(-100%);
		position: absolute;
		right: 20rpx;
		width: 70rpx;
		height: 70rpx;
		top: 150rpx;
	}
	.input{
		border-radius: 10rpx;
		padding-left: 20rpx;
		width: 100%;
		background-color: #f2f2f2;
		
	}
	.plceholderstyle{
		font-family: '等线';
		font-weight: bold;
		color: #7F7F7F;
		font-size: 34rpx;
	}
	.input-wrap{
		margin: 21rpx 50rpx 0 50rpx;
		height: 71rpx;
		padding: 0 10rpx 0 24rpx;
		background-color: #f2f2f2;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		box-shadow: 7rpx 4rpx 20rpx #797979;
	}
	.search-wrap{
		/* height: 0; */
		/* position: absolute; */
		/* top: 100rpx; */
		/* margin: 0 0 0 0; */
		/* width: 100%; */
		/* z-index: 9999; */
		/* height: 80rpx; */
		background-color: #fff;
	}
	.suggestion-wrap{
		padding: 0 20rpx 0 20rpx;
		margin-bottom: 6rpx;
		/* border-bottom: 1rpx solid #626262; */
	}
</style>
