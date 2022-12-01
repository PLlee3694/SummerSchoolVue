<template>
	<div class="hello">
		<globalHeader></globalHeader>
		<el-main style="background-color: white;width: 80%;margin:auto">
			<div style="height=50px;width: 100%;display: block;margin: 0 auto;line-height:50px">
				<div style="display: inline-block;margin:30px 40px 10px;font-size: 50px;font-weight: 600;color: black;">
					{{carName}}
				</div>
				<div
					style="display: inline-block;margin:0px 60px 10px;font-size: 30px;font-weight: 600;color: #4b4b4b;">
					近期销售热点分布
				</div>
				<div style="display: inline-block;margin:20px 0 20px 340px;line-height:50px">
					<el-input placeholder="请输入车名" v-model="input" style="width:250px; margin:auto" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" id="button" @click="searchAndDraw"
						style="right:15px;margin-left:15px">搜索
					</el-button>
				</div>
			</div>
			<div style="margin: auto;height=700px">
				<div style="display:inline-block;width=1000px;margin:auto;">
					<div id="container" style="background-color: transparent;"></div>
				</div>
				<div id="table" style="display:inline-block;margin:auto">
					<el-table :data="tableData" height="570" style="width:100%" border="true">
						<el-table-column prop="name" label="省份" width="180">
						</el-table-column>
						<el-table-column prop="value" label="成交数" width="180">
						</el-table-column>
					</el-table>
				</div>
			</div>
		</el-main>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	import globalHeader from '@/components/globalHeader.vue';
	import {
		mapData
	} from "../assets/map.js"
	export default {
		name: "HelloWorld",
		props: {
			msg: String
		},
		components: {
			globalHeader,
		},
		data() {
			return {
				input: "",
				carName: "",
				areaData: [],
				province: [
					"河北",
					"山西",
					"辽宁",
					"吉林",
					"黑龙江",
					"江苏",
					"浙江",
					"安徽",
					"福建",
					"江西",
					"山东",
					"河南",
					"湖北",
					"湖南",
					"广东",
					"海南",
					"四川",
					"贵州",
					"云南",
					"陕西",
					"甘肃",
					"青海",
					"台湾",
					"北京",
					"天津",
					"上海",
					"重庆",
					"内蒙古",
					"广西",
					"西藏",
					"宁夏",
					"新疆",
					"香港特别行政区",
					"澳门特别行政区"
				],
				tableData: [],
				max: 0,
			};
		},
		mounted() {
			this.updateAndDraw();
		},
		methods: {
			Draw() {
				this.tableData.sort(this.sortTableData);
				var chartDom = document.getElementById("container");
				var myChart = echarts.init(chartDom);
				const map = {
					// height:850,
					// width:1526
					height: 500,
					width: 1000
				};
				echarts.registerMap("ChinaMap", mapData);
				var option = {
					// title:{
					//   text:this.carName + "近期销售热点分布",
					//   x: 'center',
					//   y: 'top',
					//   textAlign:'left',
					// },
					tooltip: {
						trigger: "item",
						formatter: "{b}<br/>{c} (辆)"
					},
					toolbox: {
						show: true,
						orient: "vertical",
						left: "right",
						top: "center",
						feature: {
							dataView: {
								readOnly: false
							},
							restore: {},
							saveAsImage: {}
						},
					},
					visualMap: {
						min: 0,
						max: this.max,
						text: ["High", "Low"],
						realtime: false,
						calculable: true,
						inRange: {
							color: ["lightskyblue", "yellow", "orangered"]
						}
					},
					dataZoom: [{
						type: "inside",
					}],
					series: [{
						name: "testMap",
						type: "map",
						map: "ChinaMap",
						label: {
							show: false,
							fontSize: "10px",
						},
						roam: true,
						zoom: 1.2,
						data: this.areaData,
					}]
				};
				myChart.clear();
				myChart.setOption(option);
			},
			updateAndDraw() {
				this.tableData = []
				var i;
				this.max = 0;
				for (i = 0; i < 23; i++) {
					this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i])
						.then((res1) => {
							var tempObj = {
								name: "",
								value: 0
							};
							tempObj.value = res1.data.saleCnt;
							tempObj.name = res1.data.province + "省";
							this.areaData.push(tempObj);
							this.tableData.push(tempObj);
							if (this.max < tempObj.value)
								this.max = tempObj.value;
						});
				}
				for (; i < 27; i++) {
					this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i])
						.then((res1) => {
							var tempObj = {
								name: "",
								value: 0
							};
							tempObj.value = res1.data.saleCnt;
							tempObj.name = res1.data.province + "市";
							this.areaData.push(tempObj);
							this.tableData.push(tempObj);
							if (this.max < tempObj.value)
								this.max = tempObj.value;
						});
				}
				this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i++])
					.then((res2) => {
						var tempObj = {
							name: "",
							value: 0
						};
						tempObj.value = res2.data.saleCnt;
						tempObj.name = res2.data.province + "自治区";
						this.areaData.push(tempObj);
						this.tableData.push(tempObj);
						if (this.max < tempObj.value)
							this.max = tempObj.value;
					});
				this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i++])
					.then((res2) => {
						var tempObj = {
							name: "",
							value: 0
						};
						tempObj.value = res2.data.saleCnt;
						tempObj.name = res2.data.province + "壮族自治区";
						this.areaData.push(tempObj);
						this.tableData.push(tempObj);
						if (this.max < tempObj.value)
							this.max = tempObj.value;
					});
				this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i++])
					.then((res2) => {
						var tempObj = {
							name: "",
							value: 0
						};
						tempObj.value = res2.data.saleCnt;
						tempObj.name = res2.data.province + "自治区";
						this.areaData.push(tempObj);
						this.tableData.push(tempObj);
						if (this.max < tempObj.value)
							this.max = tempObj.value;
					});
				this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i++])
					.then((res2) => {
						var tempObj = {
							name: "",
							value: 0
						};
						tempObj.value = res2.data.saleCnt;
						tempObj.name = res2.data.province + "回族自治区";
						this.areaData.push(tempObj);
						this.tableData.push(tempObj);
						if (this.max < tempObj.value)
							this.max = tempObj.value;
					});
				this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i++])
					.then((res2) => {
						var tempObj = {
							name: "",
							value: 0
						};
						tempObj.value = res2.data.saleCnt;
						tempObj.name = res2.data.province + "维吾尔自治区";
						this.areaData.push(tempObj);
						this.tableData.push(tempObj);
						if (this.max < tempObj.value)
							this.max = tempObj.value;
					});
				this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i++])
					.then((res2) => {
						var tempObj = {
							name: "",
							value: 0
						};
						tempObj.value = res2.data.saleCnt;
						tempObj.name = res2.data.province;
						this.areaData.push(tempObj);
						this.tableData.push(tempObj);
						if (this.max < tempObj.value)
							this.max = tempObj.value;
					});
				this.$axios.get(this.$url + "/summary/areadata?carname=" + this.carName + "&area=" + this.province[i])
					.then((res2) => {
						var tempObj = {
							name: "",
							value: 0
						};
						tempObj.value = res2.data.saleCnt;
						tempObj.name = res2.data.province;
						this.areaData.push(tempObj);
						this.tableData.push(tempObj);
						if (this.max < tempObj.value)
							this.max = tempObj.value;
						this.Draw();
					});
			},
			searchAndDraw() {
				console.log(this.input);
				this.areaData = [];
				this.carName = this.input;
				this.updateAndDraw();
			},
			sortTableData(obj1, obj2) {
				var val1 = obj1.value;
				var val2 = obj2.value;
				if (val1 < val2) {
					return 1;
				} else if (val1 > val2) {
					return -1;
				} else {
					return 0;
				}
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}

	#title {}

	#table {
		margin: 0, auto;
	}

	.hello {
		background-image: url("../assets/What-lies-Beyond-200-Vertices2.jpeg");
		background-repeat: no-repeat;
		background-size: cover;
		height: 800px;
		margin: 0;
		padding: 0;
	}

	#search {
		margin-top: 10px;
		margin-right: 10px;
		float: right;
		z-index: 999;

	}

	#container {
		width: 800px;
		height: 600px;
		margin: auto;
		background-color: transparent;
	}
</style>
