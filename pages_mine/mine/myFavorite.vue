<template>
	<page-meta :root-font-size="`${0.5 * baseFontSize}px`"></page-meta>
	<view class="u-m-30">
		<view class="item-wrap" v-for="(item,index) in jobList" :key="index" @click="toJobDetail(item)">
			<text class="word">
				{{item.postName}}
			</text>
		</view>
	</view>
	<view class="u-m-t-50" style="display: flex;width: 750rpx;justify-content: center;" v-if="jobList.length == 0">
		<text>暂时没有添加收藏哦~</text>
	</view>
</template>

<script>
export default{
	data(){
		return {
			jobList: [],
		}
	},
	computed:{
		baseFontSize() {
		    return this.vuex_fontScale
		}
	},
	async onLoad() {
		const res = await this.$u.api.getFavJbo(this.vuex_user.idUseless)
		res.data.forEach(async (value,index)=>{
			const res1 = await this.$u.api.getJobDetailByIdUseless(value)
			console.log(res1.data[0])
			this.jobList.push(res1.data[0])
		})
	},
	methods: {
		toJobDetail(item){
			this.$u.route({
				url: 'pages/index/jobDetail',
				params: {
					iduseless: item.idUseless
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.item-wrap{
	margin: 10rem 25rem 10rem 25rem;
	padding: 5rem 30rem 5rem 50rem;
	height: 80rem;
	border: 1rem solid #D7D7D7;
	border-radius: 16rem;
	.word{
		color: #333333;
		font-family: '等线';
		font-size: 32rem;
		display: flex;
		font-weight: bold;
		justify-content: flex-start;
		align-items: center;
		line-height: 80rem;
	}
}
</style>