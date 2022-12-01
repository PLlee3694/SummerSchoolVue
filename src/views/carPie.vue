<template>
	<div class="root">
		<el-container></el-container>
		<el-header class="header">
			<globalHeader></globalHeader>
		</el-header>
		<div style="height:50px;line-height: 50px;text-align: center;">
			<div style="height: 20px;display: inline-block;margin: auto 250px;width: auto;font-size: 30px;font-weight: 600;color: black;">全国市场销售占比</div>
			<div style="height: 20px;display: inline-block;margin: auto 250px;width:auto;font-size: 30px;font-weight: 600;color: black;">全国市场销量折线图</div>
		</div>
		<div class="back">
			<el-row>
				<el-col :span="12">
					<div id="app">
						<pie />
					</div>
				</el-col>
				<el-col :span="12">
					<div id="container"></div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import globalHeader from "../components/globalHeader";
	import pie from "@/components/pie";
	import * as echarts from "echarts";
	export default {
		name: "carPie",
		components: {
			globalHeader,
			pie
		},
		data() {
			return {
				lineXData: [
					// "2016-1",
					// "2016-2",
					// "2016-3",
					// "2016-4",
					// "2016-5",
					// "2016-6",
					// "2016-7",
					// "2016-8",
					// "2016-9",
					// "2016-10",
					// "2016-11",
					// "2016-12",
				],
				lineYData: [
					// 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
				],
				barXData: [
					// "2015-1",
					// "2015-2",
					// "2015-3",
					// "2015-4",
					// "2015-5",
					// "2015-6",
					// "2015-7",
					// "2015-8",
					// "2015-9",
					// "2015-10",
					// "2015-11",
					// "2015-12",
				],
				barYData: [
					// 3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7,
				],
			};
		},
		mounted() {
			this.getDataAndDraw();
		},
		methods: {
			Draw() {
				const colors = ["#5470C6", "#EE6666"];
				var chartDom = document.getElementById("container");
				const line = {
					width: 660,
					height: 550,
				};
				var myChart = echarts.init(chartDom, null, line);
				var option = {
					color: colors,
					tooltip: {
						trigger: "none",
						axisPointer: {
							type: "cross",
						},
					},
					legend: {},
					grid: {
						top: 70,
						bottom: 50,
					},
					xAxis: [{
							type: "category",
							axisTick: {
								alignWithLabel: true,
							},
							axisLine: {
								onZero: false,
								lineStyle: {
									color: colors[1],
								},
							},
							axisPointer: {
								label: {
									formatter: function(params) {
										return (
											"销量 （万） " +
											params.value +
											(params.seriesData.length ?
												"：" + params.seriesData[0].data :
												"")
										);
									},
								},
							},
							data: this.barXData,
						},
						{
							type: "category",
							axisTick: {
								alignWithLabel: true,
							},
							axisLine: {
								onZero: false,
								lineStyle: {
									color: colors[0],
								},
							},
							axisPointer: {
								label: {
									formatter: function(params) {
										return (
											"销量 (万) " +
											params.value +
											(params.seriesData.length ?
												"：" + params.seriesData[0].data :
												"")
										);
									},
								},
							},
							data: this.lineXData,
						},
					],
					yAxis: [{
						type: "value",
					}, ],
					series: [{
							name: "月度总销量",
							type: "bar",
							xAxisIndex: 1,
							smooth: true,
							emphasis: {
								focus: "series",
							},
							data: this.lineYData,
						},
						{
							name: "年度总销量",
							type: "line",
							smooth: true,
							emphasis: {
								focus: "series",
							},
							data: this.barYData,
						},
					],
				};
				option && myChart.setOption(option);
			},
			getDataAndDraw() {
				this.$http
					.get("http://180.76.235.163:8088/summary/totalsale")
					.then((res) => {
						var number = 0;
						for (var i = 0; i < res.data.length; i++) {
							this.lineXData.push(
								res.data[i].saleYear.toString() +
								"-" +
								res.data[i].saleMonth.toString()
							);
							this.lineYData.push(res.data[i].saleNum / 10000);
						}
						for (var i = 0; i < 15; i++) {
							this.barXData.push(res.data[i * 12].saleYear.toString());
							for (var j = 0; j < 12; j++) {
								number += res.data[i * 12 + j].saleNum;
							}
							this.barYData.push(number / 10000);
							number = 0;
						}
						this.Draw()
					})
					.catch((err) => {
						console.log(err);
						alert("请求失败！请检查后端接口！！！！");
					});

			},
		},
	};
</script>

<style scoped>
	.header {
		margin: 0;
		padding: 0;
	}

	.back {
		/* background-image: url("../assets/What-lies-Beyond-200-Vertices.jpeg"); */
		background-repeat: no-repeat;
		background-size: cover;
	}

	#app {
		display: inline-block;
		margin-top: 50px;
	}

	#container {
		display: inline-block;
		margin-top: 30px;
		padding-left: 60px;
		/* margin-right: -60px; */

	}
</style>
