<template>
	<div id="hello">
		<el-header class="header">
			<globalHeader></globalHeader>
		</el-header>

		<span style="
        position: fixed;
        margin-left: 100px;
        margin-top: 220px;
        color: white;
        font-size: 20px;
      ">收藏:</span>
		<i v-if="this.collect == true" @click="method1" class="el-icon-star-on" style="
        position: fixed;
        margin-top: 200px;
        margin-left: 140px;
        z-index: 100;
        font-size: 70px;
        color: #ffae00;
      "></i>
		<i v-else class="el-icon-star-on" @click="method1" style="
        position: fixed;
        margin-top: 200px;
        margin-left: 140px;
        z-index: 100;
        font-size: 70px;
        color: white;
      "></i>

		<el-button style="
        position: fixed;
        width: 100px;
        margin-top: 100px;
        margin-left: 100px;
      " @click="toCompare">加入对比</el-button>
		<el-button style="
        position: fixed;
        width: 100px;
        margin-top: 150px;
        margin-left: 100px;
      " @click="loadCar" type="primary">
			车辆对比
		</el-button>
		<el-drawer title="车辆对比" :visible.sync="drawer" size="50%" style="z-index: 1000">
			<el-row>
				<el-col span="12" style="position: center">
					<div>
						<div v-if="this.url1 == 'null'">
							<img style="width: 250px; height: 150px" src="../assets/car1.jpg" />
						</div>
						<div v-else>
							<img style="width: 250px; height: 150px" :src="this.url1" />
						</div>
						<span>{{ this.carName1 }}</span>
						<el-table :data="compareTable.tableData1" style="width: 100%">
							<el-table-column prop="对比项" label="对比项" width="180">
							</el-table-column>
							<el-table-column prop="数据" label="数据" width="180">
								<template scope="scope">
									<span :class="
                      Number(scope.row.数据) -
                        Number(compareTable.tableData2[scope.$index].数据) >
                      0
                        ? 'bg2'
                        : 'bg'
                    ">{{ scope.row.数据 }}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-col>
				<el-col span="12">
					<div>
						<div v-if="this.url2 == 'null'">
							<img style="width: 250px; height: 150px" src="../assets/car2.jpg" />
						</div>
						<div v-else>
							<img style="width: 250px; height: 150px" :src="this.url2" />
						</div>
						<span>{{ this.carName2 }}</span>
						<el-table :data="compareTable.tableData2" style="width: 100%">
							<el-table-column prop="对比项" label="对比项" width="180">
							</el-table-column>
							<el-table-column prop="数据" label="数据" width="180">
								<template scope="scope">
									<span :class="
                      Number(scope.row.数据) -
                        Number(compareTable.tableData1[scope.$index].数据) <=
                      0
                        ? 'bg'
                        : 'bg2'
                    ">{{ scope.row.数据 }}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-col>
			</el-row>
			<el-footer style="margin-top: 20px">
				<el-button @click="del">清除对比</el-button>
			</el-footer>
		</el-drawer>
		<div class="container">
			<div class="sku_box" id="panel">
				<div class="sku_main">
					<div class="sku_left">
						<div id="title">
							<div style="
                  display: inline-block;
                  height: 135px;
                  width: 240px;
                  line-height: 90px;
                  float: left;
                ">
								<div class="product_title" id="goods_name" style="line-height: 60px">
									{{ name }}
								</div>
								<div id="unquantitifiable" style="display: block">
									<el-tag id="factory" color="white" style="display: block">生产厂家：{{ factory }}
									</el-tag>
									<el-tag id="energyType" color="white" style="display: block">动力类型：{{ energy }}
									</el-tag>
								</div>
							</div>
							<div style="
                  width: 270px;
                  height: 135px;
                  display: inline-block;
                  float: right;
                ">
								<div id="carTypeSelector">
									<el-select v-model="value" placeholder="请选择" @change="selectChange(value)">
										<el-option v-for="item in options" :key="item.value" :label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</div>
								<div class="product_price_box">
									<div id="guide">
										<div style="
                        line-height: 30px;
                        font-size: 15px;
                        font-weight: 700;
                      ">
											市场指导价:
										</div>
										<div style="line-height: 30px; height: 40px">
											<div style="
                          line-height: 30px;
                          display: inline-block;
                          margin: auto 5px;
                          font-size: 15px;
                        ">
												{{ price }}万元
											</div>
											<div style="
                          line-height: 40px;
                          display: inline-block;
                          margin: auto 5px;
                        "></div>
										</div>
									</div>
									<div id="lowest">
										<div style="
                        line-height: 30px;
                        font-size: 15px;
                        font-weight: 700;
                      ">
											历史最低价格:
										</div>
										<div style="color: #e30000; line-height: 30px; height: 40px">
											<div style="
                          line-height: 30px;
                          display: inline-block;
                          margin: auto 5px;
                          font-size: 15px;
                        ">
												{{ lowestPrice }}万元
											</div>
											<div style="
                          line-height: 40px;
                          display: inline-block;
                          margin: auto 5px;
                        "></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="gallery_top_box"
							v-if="this.picSrc=='null'||this.picSrc=='https://i.img16888.com//default-piclib-1024.jpg_240.jpg'">
							<img :src="require('../assets/wodetutune.jpeg')" @error="setDefaultImage"
								style="max-width: 500px; width: 500px; overflow: hidden">
						</div>
						<div class="gallery_top_box" v-else>
							<img :src="this.picSrc" @error="setDefaultImage"
								style="max-width: 500px; width: 500px; overflow: hidden">

						</div>
					</div>
					<div class="sku_right">
						<div class="product_sku_box">
							<div id="product_detail">
								<div id="quantitifiable">
									<div id="radarGraph"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="
            margin: 0 auto;
            display: block;
            background-color: #ffffff;
            text-align: left;
          ">
					<div style="width: 1000px; display: block; padding: 0 10px 0 10px">
						<div class="row">
							<div class="detailTitle">
								最高车速: {{ (this.speedTitle) }} km/h
							</div>
							<el-progress :show-text="false" :text-inside="true" :stroke-width="15"
								:percentage="this.speed" :color="customColor[0]"></el-progress>
						</div>

						<div class="row">
							<div class="detailTitle">
								汽车百公里油耗: {{(this.consumeTitle) }} L
							</div>
							<el-progress :show-text="false" :text-inside="true" :stroke-width="15"
								:percentage="this.consume" :color="customColor[1]"></el-progress>
						</div>

						<div class="row">
							<div class="detailTitle">
								百公里加速: {{ (this.accelarateTitle) }} s
							</div>
							<el-progress :show-text="false" :text-inside="true" :stroke-width="15"
								:percentage="this.accelarate" :color="customColor[2]"></el-progress>
						</div>
						<div class="row">
							<div class="detailTitle">
								汽车扭矩: {{ (this.niujuTitle) }} N*m
							</div>
							<el-progress :show-text="false" :text-inside="true" :stroke-width="15"
								:percentage="this.niuju" :color="customColor[3]"></el-progress>
						</div>
					</div>

					<div style="width: 1000px; display: block; padding: 0 10px 10px 10px">
						<div class="row">
							<div class="detailTitle">
								汽车功率: {{(this.powerTitle) }} kW
							</div>
							<el-progress :show-text="false" :text-inside="true" :stroke-width="15"
								:percentage="this.power" :color="customColor[4]"></el-progress>
						</div>
						<div class="row">
							<div class="detailTitle">
								最小离地间隙: {{ (this.minHeightTitle) }} mm
							</div>
							<el-progress :show-text="false" :text-inside="true" :stroke-width="15"
								:percentage="this.minHeight" :color="customColor[5]"></el-progress>
						</div>
						<div class="row">
							<div id="popularityTitle">
								车辆人气值:{{ (this.popularityTitle) }}
							</div>
							<el-progress :show-text="false" :text-inside="true" :stroke-width="15"
								:percentage="popularity">
							</el-progress>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container2">
			<div class="xq_title">商品详情（<span style="color: green;font-size: 18px;">绿色段</span>为未来一段时间销售预测信息）</div>
			<div style="margin: auto">
				<div style="display: inline-block; margin: auto">
					<div id="line1"></div>
				</div>
				<div style="display: inline-block; margin: auto">
					<div id="line2"></div>
				</div>
			</div>
		</div>
		<div id="pieGraph">
			<div class="xq_title" id="title2">商品占比</div>
			<div id="graph">
				<div id="pie1"></div>
				<div id="pie2"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import globalHeader from "@/components/globalHeader.vue";
	import * as echarts from "echarts";
	import defaultImage from "@/assets/wodetutune.jpeg";
	export default {
		name: "detailPage",
		props: {
			msg: String,
		},
		mounted() {
			this.nameForSearch = this.$route.query.name;
			if (this.nameForSearch == "RAV4荣放双擎E+")
				this.nameForSearch = "RAV4荣放双擎E";
			if (this.nameForSearch == "瑞虎8 PLUS鲲鹏e+")
				this.nameForSearch = "瑞虎8 PLUS鲲鹏e+";
			//请求详细参数
			this.$http
				.get(this.$url + "/carguide/carparameter?name=" + this.nameForSearch)
				.then((res3) => {
					this.bfLoad = this.$loading({ //开启loading动画
						lock: true,
						text: '正在加载数据，请稍等···',
						spinner: 'el-icon-loading', // 设置图标
						background: 'rgba(0,0,0,.7)',

					})
					this.manufactor = res3.data[0].sysParaManufactor
					this.name = res3.data[0].sysParaCarSeries;
					this.carType = res3.data[0].sysParaType;
					let username = localStorage.getItem("username");
					this.$axios
						.post(this.$url + "/user/iscollected", {
							name: username,
							series: this.name,
						})
						.then((res) => {
							if (res.data == true) {
								this.collect = true;
							} else {
								this.collect = false;
							}
						});
					for (var i = 0; i < res3.data.length; i++) {
						var tempObj = {
							speed: 0,
							accelarate: 0,
							energy: "",
							factory: "",
							consume: 0,
							niuju: 0,
							minHeight: 0,
							power: 0,
							picSrc: "",
							popularity: 0,
							guide: 0,
							lowestPrice: 0,
						};
						tempObj.speed =
							res3.data[i].sysParaMaxspeed == -1 ?
							"暂无" :
							res3.data[i].sysParaMaxspeed;
						tempObj.accelarate =
							res3.data[i].sysParaAcc == -1 ? "暂无" : res3.data[i].sysParaAcc;
						tempObj.energy =
							res3.data[i].sysParaPowerType == -1 ?
							"暂无" :
							res3.data[i].sysParaPowerType;
						tempObj.consume =
							res3.data[i].sysParaKmEnergy == -1 ?
							"暂无" :
							res3.data[i].sysParaKmEnergy;
						tempObj.niuju =
							res3.data[i].sysParaTorque == -1 ?
							"暂无" :
							res3.data[i].sysParaTorque;
						tempObj.minHeight =
							res3.data[i].sysParaMinclearance == -1 ?
							"暂无" :
							res3.data[i].sysParaMinclearance;
						tempObj.factory = res3.data[i].sysParaManufactor;
						tempObj.power =
							res3.data[i].sysParaPower == -1 ?
							"暂无" :
							res3.data[i].sysParaPower;
						tempObj.picSrc = res3.data[i].sysParaPicUrl;
						tempObj.popularity =
							res3.data[i].sysParaPopularity == -1 ?
							"暂无" :
							res3.data[i].sysParaPopularity;

						tempObj.guide = res3.data[i].sysParaGuidePrice;
						tempObj.lowestPrice = res3.data[i].sysParaMinPrice;

						this.detail.push(tempObj);
						var tempLabel = {
							value: 0,
							label: "",
						};
						tempLabel.value = i;
						tempLabel.label = res3.data[i].sysParaCarName;
						this.options.push(tempLabel);
					}
				})
				.catch((err) => {
					console.log(err);
				});
			//获得折线图数据
			this.$http
				.get(this.$url + "/summary/cartimesale?name=" + this.nameForSearch)
				.then((res1) => {
					var max1 = 0;
					this.index1 = res1.data[2].length - 1;
					this.index2 = res1.data[4].length - 1;
					this.line2ForecastRange =
						res1.data[4].length / 5 > 2 ? 2 : res1.data[4].length / 5;
					console.log(this.line2ForecastRange, 'line2Forcast')
					//折线图1的数据
					for (var i = 0; i < res1.data[2].length; i++) {
						this.line1XData.push(res1.data[2][i]);
						this.line1YData.push(res1.data[3][i]);
						if (parseFloat(res1.data[3][i]) > parseFloat(max1))
							max1 = parseFloat(res1.data[3][i]);
					}
					this.line1YMax.push(max1);
					//折线图2的数据
					var max2 = 0;
					for (var i = res1.data[4].length - 1; i >= 0; i--) {
						this.line2XData.push(res1.data[4][i]);
						this.line2YData.push(res1.data[5][i]);
						if (parseFloat(res1.data[5][i]) > parseFloat(max2))
							max2 = parseFloat(res1.data[5][i]);
					}
					this.line2YMax.push(max2);
					this.priceEx = parseFloat(res1.data[6]);
					this.saleEx = parseFloat(res1.data[7]);
				})
				.catch((err) => {
					console.log(err);
				});
			//请求本品牌占比的数据
			this.$http
				.get(this.$url + "/summary/brandpercentage?name=" + this.nameForSearch)
				.then((res2) => {
					var carSale = res2.data[0];
					var brandSale = res2.data[1];
					this.pie1Data[0].value = carSale;
					this.pie2Data[0].value = carSale;
					this.pie1Data[1].value = brandSale - carSale;
				})
				.catch((err) => {
					console.log(err);
				});
			//请求本车型占比的数据
			this.$http
				.get(this.$url + "/carguide/typesale?name=" + this.nameForSearch)
				.then((res4) => {
					this.pie2Data[1].value = res4.data - this.pie2Data[0].value;
				})
				.catch((err) => {
					console.log(err);
				});
			//请求各项最大参数
			this.$http
				.get(this.$url + "/carguide/topparameter?name=" + this.nameForSearch)
				.then((res4) => {
					var tempObj = {
						minClearance: 0,
						maxSpeed: 0,
						acc: 0,
						torQue: 0,
						kmPower: 0,
						kmEnergy: 0,
						popularity: 0,
					};
					tempObj.minClearance = res4.data.sysParaMinclearance;
					tempObj.maxSpeed = res4.data.sysParaMaxspeed;
					tempObj.acc = res4.data.sysParaAcc;
					tempObj.kmEnergy = res4.data.sysParaKmEnergy;
					tempObj.kmPower = res4.data.sysParaPower;
					tempObj.popularity = res4.data.sysParaPopularity;
					tempObj.torQue = res4.data.sysParaTorque;
					this.maxParam.push(tempObj);
					this.getRadarData();
					this.Draw();
					this.bfLoad.close()
				})
				.catch((err) => {
					console.log(err);
				});
		},
		components: {
			globalHeader
		},
		//相关的data
		data() {
			return {
				idLoading: true,
				collect: "",
				carName1: "",
				carName2: "",
				compareTable: {
					tableData1: [{
							对比项: "官方指导价",
							数据: localStorage.car1GuidePrice,
						},
						{
							对比项: "最低成交价",
							数据: localStorage.car1MinPrice,
						},
						{
							对比项: "百公里油耗",
							数据: localStorage.car1KmEnerge,
						},
						{
							对比项: "最大速度",
							数据: localStorage.car1MaxSpeed,
						},
						{
							对比项: "百公里加速",
							数据: localStorage.car1Acc,
						},
						{
							对比项: "最大扭矩",
							数据: localStorage.car1Torque,
						},
					],
					tableData2: [{
							对比项: "官方指导价",
							数据: localStorage.car2GuidePrice,
						},
						{
							对比项: "最低成交价",
							数据: localStorage.car2MinPrice,
						},
						{
							对比项: "百公里油耗",
							数据: localStorage.car2KmEnerge,
						},
						{
							对比项: "最大速度",
							数据: localStorage.car2MaxSpeed,
						},
						{
							对比项: "百公里加速",
							数据: localStorage.car2Acc,
						},
						{
							对比项: "最大扭矩",
							数据: localStorage.car2Torque,
						},
					],
				},
				value: "请选择",
				drawer: false,
				carType: '',
				manufactor: '',
				name: "",
				url1: "",
				url2: "",
				nameForSearch: "",
				price: 0,
				lowestPrice: 0,
				detail: [],
				percentage: [],
				picSrc: "",
				factory: "",
				energy: "",
				speed: 0,
				consume: 0,
				accelarate: 0,
				niuju: 0,
				minHeight: 0,
				power: 0,
				popularity: 0,
				speedTitle: 0,
				consumeTitle: 0,
				accelarateTitle: 0,
				niujuTitle: 0,
				minHeightTitle: 0,
				powerTitle: 0,
				popularityTitle: 0,
				line2ForecastRange: 0,
				alrSrc: "../assets/wodetutune.jpeg",
				priceEx: 0,
				saleEx: 0,
				index1: 0,
				index2: 0,
				maxParam: [],
				line1XData: [],
				line1YData: [],
				line1YMax: [],
				line2XData: [],
				line2YData: [],
				line2YMax: [],
				pie1Data: [{
						value: "",
						name: "本车销量",
					},
					{
						value: "",
						name: "本汽车厂商其他销量",
					},
				],
				pie2Data: [{
						value: "",
						name: "本车销量",
					},
					{
						value: "",
						name: "同汽车类型其他销量",
					},
				],
				radarData: [],
				radarLegend: [],
				options: [],
				customColor: [],
			};
		},
		methods: {
			method1() {
				let username = localStorage.getItem("username");
				if (this.collect == true) {
					this.collect = false;
					this.$axios.post(this.$url + "/user/removecollect", {
						name: username,
						series: this.name,
					});
				} else {
					this.collect = true;
					this.$axios.post(this.$url + "/user/addcollect", {
						name: username,
						series: this.name,
					});
				}
			},

			del() {
				let username = localStorage.getItem("username");
				window.localStorage.clear();
				localStorage.setItem("username", username);
				this.drawer=false;
			},
			loadCar() {
				this.compareTable.tableData1[0].数据 = localStorage.getItem('car1GuidePrice')
				this.compareTable.tableData1[1].数据 = localStorage.getItem('car1MinPrice')
				this.compareTable.tableData1[2].数据 = localStorage.getItem('car1KmEnerge')
				this.compareTable.tableData1[3].数据 = localStorage.getItem('car1MaxSpeed')
				this.compareTable.tableData1[4].数据 = localStorage.getItem('car1Acc')
				this.compareTable.tableData1[5].数据 = localStorage.getItem('car1Torque')
				this.compareTable.tableData2[0].数据 = localStorage.getItem('car2GuidePrice')
				this.compareTable.tableData2[1].数据 = localStorage.getItem('car2MinPrice')
				this.compareTable.tableData2[2].数据 = localStorage.getItem('car2KmEnerge')
				this.compareTable.tableData2[3].数据 = localStorage.getItem('car2MaxSpeed')
				this.compareTable.tableData2[4].数据 = localStorage.getItem('car2Acc')
				this.compareTable.tableData2[5].数据 = localStorage.getItem('car2Torque')
				this.carName1 = localStorage.getItem("car1Name");
				this.carName2 = localStorage.getItem("car2Name");
				this.url2 = localStorage.getItem("car2Pic");
				this.url1 = localStorage.getItem("car1Pic");
				this.drawer = true;
			},
			toCompare() {
				if (this.value == "请选择") {
					this.$alert("请选择具体车款", "提示", {
						confirmButtonText: "确定",
					});
				} else {
					let car1 = localStorage.getItem("car1Name");
					console.log(car1);
					if (car1 != null) {
						let car2 = localStorage.getItem("car2Name");
						if (car2 != null) {
							this.$alert("加入对比车辆过多", "提示", {
								confirmButtonText: "确定",
							});
						} else {
							this.$http
								.get(this.$url + "/carguide/carparameter?name=" + this.name)
								.then((res) => {
									localStorage.setItem(
										"car2Pic",
										res.data[this.value].sysParaPicUrl
									);
									localStorage.setItem(
										"car2Name",
										res.data[this.value].sysParaCarName
									);
									localStorage.setItem(
										"car2KmEnerge",
										res.data[this.value].sysParaKmEnergy
									);
									localStorage.setItem(
										"car2MaxSpeed",
										res.data[this.value].sysParaMaxspeed
									);
									localStorage.setItem(
										"car2Acc",
										res.data[this.value].sysParaAcc
									);
									localStorage.setItem(
										"car2GuidePrice",
										res.data[this.value].sysParaGuidePrice
									);
									localStorage.setItem(
										"car2MinPrice",
										res.data[this.value].sysParaMinPrice
									);
									localStorage.setItem(
										"car2Torque",
										res.data[this.value].sysParaTorque
									);
									alert("加入成功");
									// location.reload()
								});
						}
					} else {
						this.$http
							.get(this.$url + "/carguide/carparameter?name=" + this.name)
							.then((res) => {
								localStorage.setItem(
									"car1Pic",
									res.data[this.value].sysParaPicUrl
								);
								localStorage.setItem(
									"car1Name",
									res.data[this.value].sysParaCarName
								);
								localStorage.setItem(
									"car1KmEnerge",
									res.data[this.value].sysParaKmEnergy
								);
								localStorage.setItem(
									"car1MaxSpeed",
									res.data[this.value].sysParaMaxspeed
								);
								localStorage.setItem("car1Acc", res.data[this.value].sysParaAcc);
								localStorage.setItem(
									"car1GuidePrice",
									res.data[this.value].sysParaGuidePrice
								);
								localStorage.setItem(
									"car1MinPrice",
									res.data[this.value].sysParaMinPrice
								);
								localStorage.setItem(
									"car1Torque",
									res.data[this.value].sysParaTorque
								);
								alert("加入成功");
								// location.reload()
							});
					}
				}
			},
			Draw() {
				var chartDom = document.getElementById("line1");
				var chartDom2 = document.getElementById("line2");
				var chartDom3 = document.getElementById("pie1");
				var chartDom4 = document.getElementById("pie2");
				var chartDom5 = document.getElementById("radarGraph");
				const line = {
					height: 480,
					width: 720,
				};
				var myChart1 = echarts.init(chartDom, null, line);
				var myChart2 = echarts.init(chartDom2, null, line);
				var myChart3 = echarts.init(chartDom3);
				var myChart4 = echarts.init(chartDom4);
				const graph = {
					height: 700,
					width: 420,
				};
				var myChart5 = echarts.init(chartDom5, null, graph);

				// myChart4.showLoading()
				// setTimeout(() => {
				// 	myChart4.hideLoading()
				// }, 500)
				this.calculatePercentage();
				this.forecast();
				this.factory = this.detail[0].factory;
				this.energy = this.detail[0].energy;
				this.speed = this.percentage[0].maxSpeed;
				this.consume = this.percentage[0].kmEnergy;
				this.niuju = this.percentage[0].torQue;
				this.accelarate = this.percentage[0].acc;
				this.minHeight = this.percentage[0].minClearance;
				this.power = this.percentage[0].kmPower;
				this.picSrc = this.detail[0].picSrc;
				this.popularity = this.percentage[0].popularity;
				this.price = this.detail[0].guide;
				this.lowestPrice = this.detail[0].lowestPrice;
				this.powerTitle = this.detail[0].power;
				this.speedTitle = this.detail[0].speed;
				this.consumeTitle = this.detail[0].consume;
				this.niujuTitle = this.detail[0].niuju;
				this.accelarateTitle = this.detail[0].accelarate;
				this.minHeightTitle = this.detail[0].minHeight;
				this.popularityTitle = this.detail[0].popularity;
				var optionLine1;
				var optionLine2;
				var optionPie1;
				var optionPie2;
				var optionRadar;
				optionLine1 = {
					title: {
						text: "历史价格折线图",
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
								color: "#999",
							},
						},
					},
					legend: {
						top: "30px",
						orient: "vertical",
						left: "right",
						top: "bottom",
						data: ["价格"],
					},
					xAxis: [{
						type: "category",
						data: this.line1XData,
						axisPointer: {
							type: "shadow",
						},
					}, ],
					yAxis: [{
						type: "value",
						name: "价格（万元）",
						min: 0,
						max: this.line1YMax[0] + 5,
						interval: 10,
					}, ],
					visualMap: {
						show: false,
						dimension: 0,
						pieces: [{
								lte: this.index1,
								color: "#5470c6",
							},
							{
								gt: this.index1,
								lte: this.index1 + 15,
								color: "rgb(38, 244, 72)",
							},
						],
					},

					series: [{
						name: "价格",
						type: "line",
						tooltip: {
							valueFormatter: function(value) {
								return value + " 万元";
							},
						},
						data: this.line1YData,
					}, ],
				};
				optionLine2 = {
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
						data: this.line2XData,
						axisPointer: {
							type: "shadow",
						},
					}, ],
					yAxis: [{
						type: "value",
						name: "销售数量",
						min: 0,
						max: this.line2YMax[0] + 2000,
						interval: 10000,
						axisLabel: {
							formatter: "{value} 辆",
						},
					}, ],
					visualMap: {
						show: false,
						dimension: 0,
						pieces: [{
								lte: this.index2 - 1,
								color: "#5470c6",
							},
							{
								gt: this.index2 - 1,
								lte: this.index2 + this.line2ForecastRange,
								color: "rgb(38, 244, 72)",
							},
						],
					},
					series: [{
						name: "销售数量",
						type: "line",
						tooltip: {
							valueFormatter: function(value) {
								return value + " 辆";
							},
						},
						data: this.line2YData,
					}, ],
				};
				optionPie1 = {
					title: {
						text: "在 " + this.manufactor + " 中销售占比",
						left: "center",
					},
					tooltip: {
						trigger: "item",
					},
					legend: {
						orient: "vertical",
						left: "left",
					},
					series: [{
						name: "品牌占比",
						type: "pie",
						radius: "50%",
						data: this.pie1Data,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					}, ],
				};
				optionPie2 = {
					title: {
						text: "在 " + this.carType + " 中销售占比",
						left: "center",
					},
					tooltip: {
						trigger: "item",
					},
					legend: {
						orient: "vertical",
						left: "left",
					},
					color: ["#5470c6", "#75bedc"],
					series: [{
						name: "车型占比",
						type: "pie",
						radius: "50%",
						data: this.pie2Data,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					}, ],
				};
				optionRadar = {
					textStyle: {
						fontSize: 12,
					},
					legend: {
						data: this.radarLegend,
					},
					radar: {
						indicator: [{
								name: "最高车速",
								max: 5,
							},
							{
								name: "百公里油耗",

								max: 5,
							},
							{
								name: "百公里加速",
								max: 5,
							},
							{
								name: "汽车扭矩",
								max: 5,
							},
							{
								name: "汽车功率",
								max: 5,
							},
							{
								name: "最小\n离地间隙",
								max: 5,
							},
						],
					},
					series: [{
						name: "Budget vs spending",
						type: "radar",
						data: this.radarData,
					}, ],
				};
				optionLine1 && myChart1.setOption(optionLine1);
				optionLine2 && myChart2.setOption(optionLine2);
				optionPie1 && myChart3.setOption(optionPie1);
				//   optionPie2 && myChart4.setOption(optionPie2);
				optionRadar && myChart5.setOption(optionRadar);
				optionPie2 && myChart4.setOption(optionPie2);
			},
			selectChange(value) {
				var index = value;
				this.factory = this.detail[index].factory;
				this.energy = this.detail[index].energy;
				this.speed = this.percentage[index].maxSpeed;
				this.consume = this.percentage[index].kmEnergy;
				this.niuju = this.percentage[index].torQue;
				this.accelarate = this.percentage[index].acc;
				this.minHeight = this.percentage[index].minClearance;
				this.power = this.percentage[index].kmPower;
				this.picSrc = this.detail[index].picSrc;
				this.popularity = this.percentage[index].popularity;
				this.price = this.detail[index].guide;
				this.lowestPrice = this.detail[index].lowestPrice;

				this.powerTitle = this.detail[index].power;
				this.speedTitle = this.detail[index].speed;
				this.consumeTitle = this.detail[index].consume;
				this.niujuTitle = this.detail[index].niuju;
				this.accelarateTitle = this.detail[index].accelarate;
				this.minHeightTitle = this.detail[index].minHeight;
				this.popularityTitle = this.detail[index].popularity;
			},
			setDefaultImage(e) {
				e.target.src = defaultImage;
			},
			calculatePercentage() {
				for (var i = 0; i < this.detail.length; i++) {
					var tempObj = {
						minClearance: 0,
						maxSpeed: 0,
						acc: 0,
						torQue: 0,
						kmPower: 0,
						kmEnergy: 0,
						popularity: 0,
					};
					tempObj.minClearance =
						(this.detail[i].minHeight / this.maxParam[0].minClearance) * 100;
					tempObj.maxSpeed =
						(this.detail[i].speed / this.maxParam[0].maxSpeed) * 100;
					tempObj.acc =
						((this.maxParam[0].acc - this.detail[i].accelarate) / this.maxParam[0].acc) * 100;
					tempObj.kmEnergy =
						(this.detail[i].consume / this.maxParam[0].kmEnergy) * 100;
					tempObj.kmPower =
						(this.detail[i].power / this.maxParam[0].kmPower) * 100;
					tempObj.torQue = (this.detail[i].niuju / this.maxParam[0].torQue) * 100;
					tempObj.popularity =
						(this.detail[i].popularity / this.maxParam[0].popularity) * 100;
					this.percentage.push(tempObj);
				}
			},
			getRadarData() {
				for (var i = 0; i < this.detail.length; i++) {
					var tempObj = {
						value: [],
						name: "",
					};
					tempObj.name = this.options[i].label;
					tempObj.value.push(
						Math.sqrt(this.detail[i].speed / this.maxParam[0].maxSpeed) * 5
					);
					tempObj.value.push(
						Math.sqrt(this.detail[i].consume / this.maxParam[0].kmEnergy) * 5
					);
					tempObj.value.push(
						(1 - Math.sqrt(this.detail[i].accelarate / this.maxParam[0].acc)) * 5
					);
					tempObj.value.push(
						Math.sqrt(this.detail[i].niuju / this.maxParam[0].torQue) * 5
					);
					tempObj.value.push(
						Math.sqrt(this.detail[i].power / this.maxParam[0].kmPower) * 5
					);
					tempObj.value.push(
						Math.sqrt(this.detail[i].minHeight / this.maxParam[0].minClearance) *
						5
					);
					this.radarData.push(tempObj);
					this.radarLegend.push(this.options[i].label);
				}
			},
			forecast() {
				var popular = this.percentage[0].popularity / 100;
				var dX1 = this.priceEx * popular;
				var dX2 = this.saleEx * popular;
				for (var i = 3; i < 9; i++) {
					this.line1XData.push("2022-08-2" + i.toString());
				}
				for (var k = 1; k < this.line2ForecastRange; k++) {
					this.line2XData.push("2022-" + (k + 7).toString());
					console.log(this.line2XData[this.index2 + k], 'line2X')
				}
				for (var i = 1; i < 6; i++) {
					var result1 =
						(parseFloat(this.line1YData[this.index1]) + parseFloat(i * dX1)).toFixed(2);
					this.line1YData.push(result1.toString());
				}
				for (var k = 1; k < this.line2ForecastRange; k++) {
					var result2 =
						parseInt(this.line2YData[this.index2]) + parseInt(k * dX2);
					this.line2YData.push(result2.toString());
				}
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/* 清除浮动 */
	.is-fullscreen>>>.el-icon-loading {
		font-size: 100px !important;
	}

	* {
		font-family: "Microsoft YaHei";
		outline: none;
		-moz-outline-style: none;
		font-size: 0.12rem;
	}

	.price_box_price_xyj {
		width: 450px;
		height: 100%;
	}

	#radarGraph {
		/* width: 700px; */
	}

	#title2 {
		text-align: left;
		background-color: #ffffff;
		width: 90%;
	}

	#energyType {}

	#carTypeSelector {
		height: 40px;
		width: 220px;
		margin: auto;
	}

	.detailTitle {
		height: 20px;
		width: 200px;
		font-size: 15px;
		margin-bottom: 5px;
	}

	.rowl {
		width: 40%;
		height: 50px;
		display: inline-block;
		/* float:left; */
	}

	.rowr {
		width: 40%;
		/* float:right; */
		height: 50px;
		display: inline-block;
	}

	.row {
		width: 200px;
		margin: auto 20px;
		display: inline-block;
	}

	#unquantitifiable {
		height: 60px;
		line-height: 60px;
		margin: 0px auto;
	}

	#quantitifiable {
		/* 	margin-top:0px;
	height: 400px;; */
		text-align: left;
	}

	#title {
		height: 135px;
		line-height: 60px;
		margin: 25px 20px 0px;
	}

	.el-select {
		size: medium;
		float: left;
		/* 	margin-top:30px;
	margin-left: 30px; */
	}

	#guide {
		font-size: 20px;
		line-height: 60px;
		width: 100px;
		/* height:70px; */
		display: inline-block;
		margin: 0 auto;
		border-radius: 8px;
	}

	#lowest {
		font-size: 20px;
		line-height: 60px;
		width: 100px;
		/* height:70px; */
		display: inline-block;
		margin: 0 auto;
		border-radius: 8px;
	}

	#graph {
		width: 1000px;
	}

	#hello {
		/* background-color: #f2f2f2; */
		background-image: url("../assets/What-lies-Beyond-200-Vertices2.jpeg");
		background-repeat: no-repeat;
		background-size: cover;
		margin-top: 0px;
		top: 0px;
		height: 100%;
		display: grid;
	}

	.container {
		width: 100%;
		height: 100%;
		justify-self: center;
		align-self: center;
	}

	#popularity {
		width: 180px;
		margin-top: 0px;
		margin-left: 80px;
		text-align: left;
	}

	#popularityTitle {
		font-size: 15px;
		text-align: left;
		margin-bottom: 5px;
		margin-top: 0px;
	}

	#line1 {
		/* 	width:700px;
	height:500px; */
		margin-top: 0;
		margin-bottom: 20px;
		margin-right: 0;
		margin-left: 0;
	}

	#line2 {
		/* 	width:700px;
	height:500px; */
		margin-top: 0;
		margin-bottom: 20px;
		margin-right: 0;
		margin-left: 0;
	}

	#pieGraph {
		width: 1000px;
		/* height: 550px; */
		margin: 20px auto;
		background-color: #ffffff;
		text-align: left;
	}

	#pie1 {
		width: 45%;
		height: 450px;
		vertical-align: middle;
		background-color: #ffffff;
		float: left;
		margin-left: 20px;
	}

	#pie2 {
		width: 45%;
		height: 450px;
		float: right;
		display: block;
		background-color: #ffffff;
	}

	.sku_box {
		width: 1000px;
		height: auto;
		margin: 20px auto;
		position: relative;
	}

	.sku_pop_close {
		position: absolute;
		right: 10px;
		top: 10px;
		display: none;
	}

	.sku_pop_close:hover {
		transform: rotate(180deg);
		transition: transform 0.5s;
	}

	.sku_main {
		margin: 0 auto;
		display: flex;
		background-color: #ffffff;
	}

	.sku_left {
		display: inline-block;
		/* width: 550px; */
		min-height: 380px;
		margin: 0 10px;
	}

	/*swiper*/

	.gallery_top_box {
		padding: 10px 20px 10px;
	}

	.gallery_top_box img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.sku_right {
		display: inline-block;
		/* width: 530px; */
		/* margin: 0 10px; */
	}

	.product_title {
		color: #333;
		font-size: 27px;
		font-weight: 700;
		margin: auto;
	}

	.product_price_box {
		background: #f4f9fe;
		display: flex;
		justify-content: flex-start;
		width: 220px;
		margin: auto;
		border-radius: 10px;
	}

	.product_price_left {
		text-align: center;
		flex-grow: 1;
		display: flex;
		align-items: center;
		width: 100%;
	}

	.price_box {
		margin: 20px;
		width: 300px;
	}

	.price_name {
		font-size: 14px;
		color: #333;
		margin-right: 7px;
	}

	.product_price_right {
		display: flex;
		justify-content: right;
		padding: 20px;
	}

	/*sku*/
	.product_sku_box {
		padding: 10px 0;
		width: 380px;
		/* height:570px; */
	}

	.product_main {
		width: 100%;
		display: block;
		margin: 0 auto;
	}

	.product_con {
		margin-bottom: 40px;
	}

	.product_item {
		display: flex;
		font-size: 26px;
		color: #323232;
		/*padding-bottom: 10px;*/
	}

	.product_item_name {
		display: inline-block;
		min-width: 36px;
		margin-right: 30px;
		padding-top: 17px;
		font-size: 14px;
		font-weight: bold;
	}

	.product_sku_item {
		margin-top: 10px;
	}

	.product_sku_item {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.product_sku_item li {
		cursor: pointer;
		display: inline-block;
		height: 20px;
		line-height: 20px;
		text-align: center;
		padding: 5px 10px;
		border: 1px solid #ffffff;
		border-radius: 4px;
		margin-right: 15px;
		margin-bottom: 10px;
	}

	.product_sku_item li:hover {
		border: 1px solid #fb6a42;
	}

	.product_sku_item li.productActive {
		background: #fb6a42;
		color: #fff;
		border: 1px solid #fb6a42;
	}

	.product_sku_item li.noneActive {
		background-color: #ffffff;
		opacity: 0.4;
		color: #000;
		pointer-events: none;
	}

	.price {
		font-size: 30px;
		height: 60px;
		line-height: 60px;
	}

	/*详情*/
	.sku_con {
		padding: 20px;
	}

	.xq_title {
		height: 18px;
		line-height: 18px;
		border-left: 4px solid rgb(251, 106, 66);
		color: #333;
		text-align: left;
		font-size: 16px;
		padding-left: 10px;
		margin-bottom: 20px;
		margin-left: 30px;
		margin-top: 30px;
	}

	#product_detail {
		font-size: 30px;
		margin: auto;
		height: 520px;
	}

	.container2 {
		width: 1000px;
		margin: auto;
		/* height:1100px; */
		/* 	margin-top:20px;
	margin-right:0; */
		/* margin-left:14%;; */
		background: #ffffff;
		/* text-align: left; */
		justify-self: center;
		align-self: center;
		/* margin-left:-30px; */
	}

	.product_con_box {
		text-align: center;
	}

	.product_con_box img {
		width: 100%;
	}

	.header {
		margin: 0;
		padding: 0;
	}

	.bg {
		color: red;
	}

	.bg2 {
		color: green;
	}
</style>
