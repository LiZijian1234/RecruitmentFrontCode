<template>
	<page-meta :root-font-size="`${baseFontSize}px`"></page-meta>
	<view class="">
		<view class="u-flex-col"
		v-for="(item,index) in jobList" :key="index" @click="toJobDetail(index)">
			<jobitem :item="item" :index="index" ></jobitem>
		</view>	
	</view>
</template>

<script>
export default{
	data(){
		return{
			jobList: []
		}
	},
	async onLoad() {
		const res = await this.$u.api.getAllDayJob()
		console.log('结果是',res)
		res.data.forEach((item,index)=>{
			if(res.data[index].postWelfare != '' && res.data[index].postWelfare != null && res.data[index].postWelfare != ' '){
				res.data[index].postWelfare = JSON.parse(res.data[index].postWelfare)
				if(res.data[index].postWelfare.length > 3){
					res.data[index].postWelfare = res.data[index].postWelfare.slice(0,3)
				}
			}
			console.log('改变为对象之后的数据',res.data[index].postWelfare);
		})
		this.jobList = res.data
		
	},
	computed:{
		baseFontSize() {
		    return this.vuex_fontScale * 0.5
		}
	},
	methods:{
		toJobDetail(index){
			this.$u.route({
				url: 'pages/index/jobDetail',
				params: {
					iduseless: this.jobList[index].idUseless
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
</style>