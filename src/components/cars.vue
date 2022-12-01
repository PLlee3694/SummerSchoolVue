<template>
	<div>
		<div>
			<el-row style="margin-bottom: 0px;">
				<div v-for="item in cars.slice(0,12)" :key="item.sysParaCarId">
					<el-card style="width: 180px;margin-bottom: 20px;height: 180px;float: left;margin-right: 15px"
						class="car" bodyStyle="padding:10px" shadow="hover">
						<div class="cover">
							<router-link :to="{path:'/detailPage',query: {name: item.sysParaCarSeries}}">
								<div
									v-if="item.sysParaPicUrl=='null'||item.sysParaPicUrl=='https://i.img16888.com//default-piclib-1024.jpg_240.jpg'">
									<img @click="showCar(item)" :src="require('../assets/wodetutune.jpeg')">
								</div>
								<div v-else>
									<img @click="showCar(item)" :src="item.sysParaPicUrl" alt="封面">
								</div>
							</router-link>
						</div>
						<div class="info">
							<div class="carname">
								<span
									style="font-family: 微软雅黑;font-size: 17px;font-weight:bold">{{ item.sysParaCarSeries }}</span>
							</div>
						</div>
						<span class="price"
							style="font-family: 微软雅黑;font-size: 13px;float: left;">{{ item.sysParaGuidePrice + " 万" }}</span>
						<div>
							<span v-if="item.sysParaPopularity>400000"><i class="iconfont icon-huo"></i></span>
							<span v-else-if="item.sysParaPopularity>200000"><i
									class="iconfont icon-daochu1024-07"></i></span>
							<span
								style="font-family: 微软雅黑;float: right;font-size:13px">{{ item.sysParaPopularity }}</span>
						</div>
					</el-card>
				</div>
			</el-row>
		</div>
		<div>
			<el-row>
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
					:page-size="pagesize" layout="prev, pager, next, jumper" :total="this.total">
				</el-pagination>
			</el-row>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "cars",
		mounted: function() {
			this.username = localStorage.getItem('username')
			axios.get(this.url + "/carguide/search/?page=" + this.currentPage).then(res => {
				console.log(this.url + '/carguide/search/?page=' + this.currentPage)
				console.log(res);
				this.total = res.data.total;
				this.cars = res.data.records
			})

		},
		methods: {
			showCar(item) {
				console.log(item.sysParaCarSeries)
				this.$axios.post(this.$url + '/user/addlog/', {
					series: item.sysParaCarSeries,
					name: this.username
				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			dialogClose() {
				this.dialogVisible = false;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage
				let Gurl = this.$url + '/carguide/search?page=' + this.currentPage
				console.log(this.filterForm)
				if (this.filterForm.carName != '') {
					Gurl = Gurl + '&name=' + this.filterForm.carName
				}
				if (this.filterForm.brand != '') {
					Gurl = Gurl + '&manufactor=' + this.filterForm.brand
				}
				if (this.filterForm.type != '') {
					Gurl = Gurl + '&type=' + this.filterForm.type
				}

				for (let i = 0; i < this.filterForm.label1.length; i++) {
					if (this.filterForm.label1[i] == "最大时速") {
						Gurl = Gurl + '&speedmin=' + this.filterForm.input1[i] + '&speedmax=' + this.filterForm.input2[
							i]
					} else if (this.filterForm.label1[i] == "最大扭矩") {
						Gurl = Gurl + '&torquemin=' + this.filterForm.input1[i] + '&torquemax=' + this.filterForm
							.input2[i]
					} else if (this.filterForm.label1[i] == "综合耗油") {
						Gurl = Gurl + '&energymin=' + this.filterForm.input1[i] + '&energymax=' + this.filterForm
							.input2[i]
					} else {
						Gurl = Gurl + '&pricemin=' + this.filterForm.input1[i] + '&pricemax=' + this.filterForm.input2[
							i]
					}
				}
				axios.get(Gurl).then(res => {
					console.log(Gurl);

					this.cars = res.data.records
					this.$forceUpdate();
				})
				console.log(this.currentPage)
			},
			loadCar() {
				let url = this.url + '/carguide/search';
				axios.get(url).then(res => {
					this.cars = res.data
				}).catch(error => {

				})
			}
		},

		data() {
			return {
				filterForm: {
					username: '',
					carName: '',
					brand: '',
					type: '',
					label1: [],
					input1: [],
					input2: [],
				},
				url: "http://180.76.235.163:8088",
				dialogVisible: false,
				form: {
					carname: "",
					price: "",
					performance: "",
				},
				list1: [],
				cars: [],
				currentPage: 1,
				pagesize: 12,
				total: ""
			}
		}
	}
</script>

<style scoped>
	.cover {
		width: 160px;
		height: 115px;
		margin-bottom: 7px;
		overflow: hidden;
		cursor: pointer;
	}

	img {
		width: 160px;
		height: 115px;
		/*margin: 0 auto;*/
	}

	.carname {
		font-size: 14px;
		text-align: left;
	}

	.price {
		color: #333;
		width: 102px;
		font-size: 13px;
		margin-bottom: 6px;
		text-align: left;
	}
</style>
