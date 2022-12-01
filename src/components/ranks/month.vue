<template>
	<div>
		<div class="heade" style="margin-left: 225px; margin-right: 225px;margin-bottom: 40px;margin-top: 5px;">
			<dv-border-box-7>{{ message }}排行榜</dv-border-box-7>
		</div>
		<el-col :span="5" style="margin-top: 25px;">
			<el-table :data="tableData" border max-height="600" style="width: 214px; margin:auto">
				<el-table-column prop="date" label="年月" align="center" width="90px">
				</el-table-column>
				<el-table-column prop="saleNum" label="销量" align="center" width="123px">
				</el-table-column>
			</el-table>
		</el-col>
		<el-col :span="19">
			<div id="graphContainer"></div>
		</el-col>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	export default {
		name: "manu",
		data() {
			return {
				message: this.$route.query.nameId,
				tableData: [],
				total: null,
				lineXData: [],
				lineYData: [],
				lineYMax: [],
			};
		},
		methods: {
			created: function() {
				this.getParams();
			},
			watch: {
				$route: "gerParams",
			},
			getParams: function() {
				var model = this.$route.query.nameId;
				this.textareText = model;
			},

			draw() {
				var chartDom = document.getElementById("graphContainer");
				const line = {
					width: 800,
					height: 600,
				}
				var chart = echarts.init(chartDom, null, line);
				var lineOption;
				lineOption = {
					title: {
						text: "历史销量折线图",
						left: "center", //设置组件离容器左侧的距离，'left'，'center'，'right'，'20%'
						top: "5px", //设置组件离容器上侧的距离，'top'，'middle'，'bottom'，'20%'
						right: "auto", //设置组件离容器右侧的距离，'20%'
						bottom: "auto",
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							crossStyle: {
								olor: "#999",
							},
						},
					},
					legend: {
						top: "30px",
						orient: "vertical",
						left: "right",
						top: "bottom",
						data: ["销售数量"],
					},
					xAxis: [{
						type: "category",
						data: this.lineXData,
						axisPointer: {
							type: "shadow",
						},
					}, ],
					yAxis: [{
						type: "value",
						name: "销售数量",
						min: 0,
						max: this.lineYMax[0] + 2000,
						interval: 10000,
						axisLabel: {
							formatter: "{value} 辆",
						},
					}, ],

					series: [{
						name: "销售数量",
						type: "line",
						tooltip: {
							valueFormatter: function(value) {
								return value + " 辆";
							},
						},
						data: this.lineYData,
					}, ],
				};
				lineOption && chart.setOption(lineOption);
			},
		},
		created() {
			const _this = this;
			axios
				.get(
					"http://180.76.235.163:8088/summary/cartimesale?name=" + _this.message
				)
				.then((res1) => {
					for (var i = 0; i < 10; i++) {
						var date = res1.data[4][i];
						var saleNum = res1.data[5][i];
						var duixiang = {
							date,
							saleNum
						};
						this.tableData.push(duixiang);
					}
				});
			this.$http
				.get(this.$url + "/summary/cartimesale?name=" + _this.message)
				.then((res1) => {
					var max2 = 0;
					console.log(res1);
					console.log(res1.data[4].length);
					for (var i = res1.data[4].length - 1; i >= 0; i--) {
						this.lineXData.push(res1.data[4][i]);
						this.lineYData.push(res1.data[5][i]);
						if (parseFloat(res1.data[5][i]) > parseFloat(max2))
							max2 = parseFloat(res1.data[5][i]);
					}
					this.lineYMax.push(max2);
					this.draw();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
</script>
<style scoped>
	#graphContainer {
		width: 800px;
		height: 600px;
		margin: auto;
	}
</style>
