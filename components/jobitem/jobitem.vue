<template>
	<!-- <page-meta :root-font-size="`${baseFontSize}px`"></page-meta> -->
	<view>
		<view class="job-ground">
			<view class="job-item-top">
				<view class="">
					<text class="job-item-name">{{item.postName}}</text>
					<!-- <text class="company-name u-m-l-30">{{item.specificLocation}}</text> -->
				</view>
				
				<text class="job-item-salary" v-if="isWork">{{item.monthSalary}}元/月</text>
				<text class="job-item-salary" v-if="!isWork">{{item.daySalary?item.daySalary:'100' }}元/天</text>
			</view>
			<view class="job-item-middle u-m-b-20">
				
				<text class="u-m-l-10 u-m-r-10 item-word u-m-b-5" :class="index1 == 2 ? 'yello-word' : ''"
				v-for="(item1,index1) in item.postWelfare" 
				:key="index1">
					{{item1}}
				</text>
			</view>
			<view class="job-item-bottom-wrap">
				<view class="image-wrap1" >
					<!-- <text class="iconfont icon-24gf-building2"></text> -->
					<view class="" style="border: 1rpx solid #D7D7D7;border-radius: 50rem;">
						<u-image width="50rem" height="50rem" shape="circle"
						:src="company.corporationPicture1 != null ? company.corporationPicture1 : src" mode="scaleToFill"></u-image>
					</view>
					
					<text class="company-name">{{company.corporationName}}</text>	
				</view>
				<view class="applybtn">
					申请
				</view>
				<!-- <text class="company-name u-m-l-30">{{item.specificLocation}}</text> -->
			</view>
			

			
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"jobitem",
		props: ['item','TaghasValueNum','index'],
		
		data() {
			return {
				isWork: true,//判断是不是正职
				src: '',
				compName: '',
				city:'',
				items: this.item,
				company: {},
			};
		},
		computed:{
			baseFontSize() {
			    return this.vuex_fontScale * 0.5
			},
		},
		async mounted() {
			// //把postwelfare取出来
			// console.log('原来的postwelfare是',this.item.postWelfare);
			// if(this.item.postWelfare != '' && this.item.postWelfare != null && this.item.postWelfare != ' '){
			// 	this.item.postWelfare = JSON.parse(this.item.postWelfare)
			// 	console.log('parse之后的为',this.item.postWelfare);
			// 	if(this.item.postWelfare.length > 3){
			// 		this.item.postWelfare = this.item.postWelfare.slice(0,3)
			// 	}
			// 	console.log('改变为对象之后的数据',this.item.postWelfare);
			// }
			if(this.items.hiringTime == '日结'){
				this.isWork = false
			}
			
			const res = await this.$u.api.getCompInfo(this.items.id)
			// console.log('在组件里面',res)
			// console.log(res.data[0])
			this.company = res.data[0]
		},
		
	}
</script>

<style lang="scss" scoped>
	.yello-word{
		background-color: #fdecd5 !important;
		color: #F59A23 !important;
	}
	.image-wrap1{
		    display: flex;
		    justify-content: center;
		    align-items: center;
	}
	.job-ground{
		margin: 10rpx 25rpx 18rpx 25rpx;
		box-shadow: 3rpx 5rpx 15rpx #AAAAAA;
		padding: 0 40rpx 0 40rpx;
		border-bottom: 1rpx solid #c1c1c1;
		padding-bottom: 15rpx;
		border-radius: 24rpx;
		.job-item-top{
			padding-bottom: 30rpx;
			padding-top: 30rpx;
			display: flex;
			justify-content: space-between;
			.job-item-name{
				font-size: 32rem;
				font-family: "等线";
				font-weight: 700;
				
			}
			.job-item-salary{
				color: #7573E6;
				font-size: 30rem;
				font-weight: 600;
			}
			.company-name{
				margin-left: 20rem;
				font-family: Arial, Helvetica, sans-serif;
				font-size: 30rem;
				color: #333333;
			}
		}
		.job-item-middle{
			display: flex;
			flex-wrap: wrap;
		}
		.job-item-bottom-wrap{
			display: flex;
			justify-content: space-between;
			.icon-24gf-building2{
				color:#9473ef;
				font-size: 40rem;
			}
			.company-name{
				
				margin-left: 20rem;
				font-family: Arial, Helvetica, sans-serif;
				font-size: 27rem;
				color: #333333;
			}
		}
	}
	.item-word{
		color: #333333;
		font-family: Arial;
		display: block;
		padding: 6rpx 10rpx 6rpx 10rpx;
		background-color: #E5E5E5;
		border-radius: 10rpx;
		font-size: 24rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.applybtn{
		width: 112rem;
		height: 53rem;
		display: flex;
		justify-content:center;
		align-items: center;
		margin-left: 20rpx;
		// margin-bottom: 40rem;
		margin-bottom: 20rpx;
		font-size: 28rem;
		background-color: #8080ff;
		border-radius: 40rem;
		color: #FFFFFF;
	}
</style>