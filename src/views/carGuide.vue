<template>
	<div class="background">
		<el-container>
			<el-header class="header">
				<globalHeader></globalHeader>
			</el-header>
			<el-button @click="loadCar" type="primary"
				style="position: fixed;width: 100px;margin-top:150px;margin-left: 100px;">
				车辆对比
			</el-button>
			<el-drawer :visible.sync="drawer" size="47%" style="z-index: 1000;">
				<span style="font-size: 40px;font-weight: 700;">车辆对比</span>
				<el-row>
					<el-col span=12 style="position: center">
						<div>
							<div v-if="this.url1=='null'">
								<img src="../assets/car1.jpg">
							</div>
							<div v-else><img :src='this.url1'></div>
							<span>{{this.carName1}}</span>
							<el-table :data="compareTable.tableData1" style="width: 100%">
								<el-table-column prop="对比项" label="对比项" width="180">
								</el-table-column>
								<el-table-column prop="数据" label="数据" width="180">
									<template scope="scope">
										<span
											:class="(Number(scope.row.数据) - Number(compareTable.tableData2[scope.$index].数据))>0 ? 'bg2':'bg'">{{
			                  scope.row.数据
			                }}</span>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-col>
					<el-col span=12>
						<div>
							<div v-if="this.url2=='null'">
								<img src="../assets/car2.jpg">
							</div>
							<div v-else><img :src='this.url2'></div>
							<span>{{this.carName2}}</span>
							<el-table :data="compareTable.tableData2" style="width: 100%">
								<el-table-column prop="对比项" label="对比项" width="180">
								</el-table-column>
								<el-table-column prop="数据" label="数据" width="180">
									<template scope="scope">
										<span
											:class="(Number(scope.row.数据) - Number(compareTable.tableData1[scope.$index].数据))<=0 ? 'bg':'bg2'">{{
			                  scope.row.数据
			                }}</span>
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
			<el-main style="background-color: white;width: 70%;margin-left: 15%">
				<el-row style="margin:auto">
					<i class="el-icon-search" style="margin-right: 16px"></i>
					<el-input style="width:40%;margin:10px auto" v-model="carname" placeholder="搜索车辆名"></el-input>
					<el-button class="search" type="primary" style="margin-left:20px" @click="sendInformation()">搜索
					</el-button>
				</el-row>

				<div style="width:80%;margin:10px auto;">
					<div style="left:0px">
						<el-row type="flex">
							<el-link disabled style="font-size: 20px">热门品牌</el-link>
							<div v-for="tag in tags" :key="tag.id" style="margin-left:10px">
								<div>
									<el-link type="primary" style="font-size: 20px" @click="chooseBrand(tag.brandName)">
										{{
                      tag.brandName
                    }}
									</el-link>
								</div>
							</div>
						</el-row>
					</div>

					<div style="margin-left:0%">
						<el-row style="display: flex;align-items: flex-end">
							<el-link disabled style="font-size: 20px">热门车型</el-link>
							<div v-for="item in types" :key="item.id" style="margin-left: 10px">
								<el-link type="primary" style="font-size: 20px" @click="chooseType(item.type)">
									{{ item.type }}
								</el-link>
							</div>
						</el-row>
					</div>

					<div style="margin-top: 15px">
						<el-form :model="dynamicValidateForm" label-width="50px" class="demo-dynamic">
							<el-form-item style="margin-bottom:5px;"
								v-for="(domain, index) in dynamicValidateForm.domains" :label="'条件' + index"
								:key="domain.key">
								<el-select v-model=label1[index] placeholder="请选择" style="margin-left: 0px">
									<el-option v-for="item in options1" :key="item.value" :value="item.label">
									</el-option>
								</el-select>
								<el-input v-model="input1[index]" placeholder="请输入最小值"
									style="width: 20%;margin-left: 10px" clearable></el-input>
								<el-input v-model="input2[index]" placeholder="请输入最大值"
									style="width: 20%;margin-left: 10px" clearable></el-input>
								<el-button @click.prevent="removeDomain(domain)" style="margin-left: 10px">删除
								</el-button>
							</el-form-item>
							<el-form-item>
								<el-button @click="addDomain">新增条件</el-button>
								<el-button @click="sendForm">确 定</el-button>
							</el-form-item>
						</el-form>
					</div>

				</div>
				<cars class="cars-area" ref="carsArea" style="width: 80%;margin-left: 10%;margin-top: 30px"
					:str1="label1"></cars>
			</el-main>
		</el-container>
	</div>
</template>


<script>
	import globalHeader from '@/components/globalHeader.vue'
	import cars from "@/components/cars";
	import axios from "axios"


	export default {
		mounted() {
			axios.get(this.url + '/summary/hotbrand').then(res => {
				this.tags = res.data
				console.log(res.data)
			})
		},
		methods: {
			del() {
				let username = localStorage.getItem('username')
				window.localStorage.clear()
				localStorage.setItem('username', username)
				location.reload()
			},
			chooseType(item) {
				this.type = item
				this.sendInformation()
			},
			sendForm() {
				let url = this.url + '/carguide/search?';

				for (let i = 0; i < this.label1.length; i++) {
					if (this.label1[i] == "最大时速") {
						url = url + '&speedmin=' + this.input1[i] + '&speedmax=' + this.input2[i]
					} else if (this.label1[i] == "最大扭矩") {
						url = url + '&torquemin=' + this.input1[i] + '&torquemax=' + this.input2[i]
					} else if (this.label1[i] == "综合耗油") {
						url = url + '&energymin=' + this.input1[i] + '&energymax=' + this.input2[i]
					} else {
						url = url + '&pricemin=' + this.input1[i] + '&pricemax=' + this.input2[i]
					}
				}

				this.$refs.carsArea.filterForm.input1 = this.input1
				this.$refs.carsArea.filterForm.input2 = this.input2
				this.$refs.carsArea.filterForm.label1 = this.label1
				console.log(this.label1.length)
				axios.get(url).then(res => {
					this.$refs.carsArea.total = res.data.total
					this.$refs.carsArea.cars = res.data.records
				})
			},
			removeDomain(item) {
				if (this.domainNum > 0) {
					this.domainNum--
					const index = this.dynamicValidateForm.domains.indexOf(item);
					if (index !== -1) {
						this.dynamicValidateForm.domains.splice(index, 1);
					}
				}
			},

			addDomain() {
				if (this.domainNum < 4) {
					this.domainNum++
					this.dynamicValidateForm.domains.push({
						value: '',
						key: Date.now()
					});
				}
			},

			sendInformation() {
				let url = this.url + '/carguide/search?';
				console.log(this.carname)
				if (this.carname) {
					url = url + 'name=' + this.carname;
				}
				if (this.brand) {
					url = url + '&manufactor=' + this.brand;
				}
				if (this.type) {
					url = url + '&type=' + this.type
				}

				this.$refs.carsArea.filterForm.brand = this.brand
				this.$refs.carsArea.filterForm.carName = this.carname
				this.$refs.carsArea.filterForm.type = this.type
				console.log(url)
				axios.get(url).then(res => {
					this.$refs.carsArea.total = res.data.total
					this.$refs.carsArea.cars = res.data.records
					console.log(res)

				}).catch()
			},
			chooseBrand(tag) {
				this.brand = tag
				this.sendInformation()
			},
			loadCar() {
				this.carName1 = localStorage.getItem("car1Name")
				this.carName2 = localStorage.getItem("car2Name")
				this.url2 = localStorage.getItem('car2Pic')
				this.url1 = localStorage.getItem('car1Pic')
				console.log(this.url1)
				this.drawer = true
			}
		},
		name: "carGuide",
		components: {
			globalHeader,
			cars,
		},
		data() {
			return {
				selectType: "请选择",
				dynamicValidateForm: {
					domains: [{
						value: ''
					}]
				},
				url1: '',
				url2: '',
				label1: [], //匹配字段1
				input1: [],
				input2: [],
				url: "http://180.76.235.163:8088",
				type: "",
				brand: "",
				domainNum: 1,
				carname: "",
				carName1: "",
				carName2: "",
				car: [],
				options1: [{
					value: '选项1',
					label: '最大时速'
				}, {
					value: '选项2',
					label: '最大扭矩'
				}, {
					value: '选项3',
					label: '综合耗油'
				}, {
					value: '选项4',
					label: '厂商指导价'
				}],
				value1: '',
				options2: [{
					value: '选项1',
					label: '最大时速'
				}, {
					value: '选项2',
					label: '最大扭矩'
				}, {
					value: '选项3',
					label: '厂商指导价'
				}, {
					value: '选项4',
					label: '综合耗油'
				}],
				value2: '',
				compareTable: {
					tableData1: [{
							对比项: "官方指导价",
							数据: localStorage.car1GuidePrice
						},
						{
							对比项: "最低成交价",
							数据: localStorage.car1MinPrice
						},
						{
							对比项: "百公里油耗",
							数据: localStorage.car1KmEnerge
						},
						{
							对比项: "最大速度",
							数据: localStorage.car1MaxSpeed
						},
						{
							对比项: "百公里加速",
							数据: localStorage.car1Acc
						},
						{
							对比项: "最大扭矩",
							数据: localStorage.car1Torque
						},
					],
					tableData2: [{
							对比项: "官方指导价",
							数据: localStorage.car2GuidePrice
						},
						{
							对比项: "最低成交价",
							数据: localStorage.car2MinPrice
						},
						{
							对比项: "百公里油耗",
							数据: localStorage.car2KmEnerge
						},
						{
							对比项: "最大速度",
							数据: localStorage.car2MaxSpeed
						},
						{
							对比项: "百公里加速",
							数据: localStorage.car2Acc
						},
						{
							对比项: "最大扭矩",
							数据: localStorage.car2Torque
						},
					],
				},
				tags: [],
				types: [{
						id: 0,
						type: "微型车"
					},
					{
						id: 1,
						type: "小型车"
					},
					{
						id: 2,
						type: "中型车"
					},
					{
						id: 3,
						type: "中大型车"
					},
					{
						id: 4,
						type: "紧凑型车"
					},
					{
						id: 5,
						type: "微卡"
					},
					{
						id: 6,
						type: "MPV"
					},
					{
						id: 7,
						type: "SUV"
					},
					{
						id: 8,
						type: "轻客"
					},
				],
				drawer: false,
			};
		},
	}
</script>

<style scoped>
	.background {
		/* background-color: #f2f2f2; */
		background-image: url("../assets/What-lies-Beyond-200-Vertices2.jpeg");
		background-repeat: no-repeat;
		background-size: cover;
		margin-top: 0px;
		top: 0px;
		height: 100%;
		display: grid;
	}

	table {
		border-spacing: 0px;
		border-collapse: collapse;
	}

	tbody tr:nth-child(2n) td {
		border: 1px solid #D5D5D5;
	}

	tbody tr:nth-child(2n+1) td {
		border: 1px solid #E5E5E5;
	}

	.cars-area {
		margin-left: 10%;
	}

	.header {
		margin: 0;
		padding: 0;
	}

	img {
		width: 250px;
		height: 150px;
	}

	.bg {
		color: red;
	}

	.bg2 {
		color: green;
	}
</style>
