<template>
	<div class="column-container">
		<div ref="monthWorkOrder" class="echarts-box" style="width: 1000px; height: 650px;"></div>
	</div>
</template>

<script>
	export default {
		name: 'Column',
		data() {
			return {
				dataa: [],
				datab: [],
			}
		},
		mounted() {
			const _this = this
			axios.get('http://180.76.235.163:8088/summary/branddata').then(function(resp) {
				console.log(resp)
				for (var i = 0; i < 10; i++) {
					var value = resp.data[i].saleNum
					var name = resp.data[i].brandName
					var duixiang = {
						value,
						name
					}
					_this.dataa.push(duixiang)
				}
				var value = 0;
				var name = "其他"
				for (var i = 10; i < resp.data.length; i++) {
					value += resp.data[i].saleNum
				}
				var elseduixiang = {
					value,
					name
				}
				_this.dataa.push(elseduixiang)
				console.log(_this.dataa)
				_this.initMonthWorkOrder()
			})
			axios.get('http://180.76.235.163:8088/summary/typesale').then(function(res2) {
				console.log(res2)
				for (var i = 0; i < 12; i++) {
					var value = res2.data.records[i].saleNum
					var name = res2.data.records[i].typeName
					var duixiang = {
						value,
						name
					}
					_this.datab.push(duixiang)
				}
				_this.initMonthWorkOrder()
			})
		},
		methods: {
			// 月工单处理数
			initMonthWorkOrder() {
				const value={
					width:1000,
					height:500
				}
				let myChart = this.$echarts.init(this.$refs.monthWorkOrder,null,value)
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: ' {b}: {c} ({d}%)'
					},
					legend: {
						data: [
							'中型车',
							'小型车',
							'SUV',
							'微型车',
							'紧凑型车',
							'中大型车',
							'紧凑型SUV',
							'紧凑型MPV',
							'MPV',
							'大型SUV',
							'中型MPV',
							'中大型MPV',
						]
					},
					series: [{
							name: '',
							type: 'pie',
							selectedMode: 'single',
							radius: [0, '30%'],
							label: {
								position: 'inner',
								fontSize: 14,
								show: false
							},
							labelLine: {
								show: false
							},
							data: this.dataa,
						},
						{
							name: '',
							type: 'pie',
							radius: ['45%', '60%'],
							labelLine: {
								length: 30
							},
							label: {
								formatter: ' {b|{b}：}{c}  {per|{d}%}  ',
								backgroundColor: '#F6F8FC',
								borderColor: '#8C8D8E',
								borderWidth: 1,
								borderRadius: 4,
								rich: {
									a: {
										color: '#6E7079',
										lineHeight: 22,
										align: 'center'
									},
									hr: {
										borderColor: '#8C8D8E',
										width: '100%',
										borderWidth: 1,
										height: 0
									},
									b: {
										color: '#4C5058',
										fontSize: 14,
										fontWeight: 'bold',
										lineHeight: 33
									},
									per: {
										color: '#fff',
										backgroundColor: '#4C5058',
										padding: [3, 4],
										borderRadius: 4
									}
								}
							},
							data: this.datab
						}
					]
				};

				option && myChart.setOption(option);
			}

		}
	}
</script>

<style lang="scss" scoped>
	.column-container {
		margin-top: 0px;
		margin-left: -40px;
		padding: 0;
		width: 100%;
	}
</style>
