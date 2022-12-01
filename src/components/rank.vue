<template>
	<div>

		<div class="heade" style="margin:0 200px 0 200px">
			<dv-border-box-7>汽车排行榜大全</dv-border-box-7>
		</div>
		<div>
			<el-row :gutter="10">

				<el-col :span="8">
					<div id="ranking-board1">
						<div class="ranking-board-title">汽车最快速度</div>
						<dv-scroll-ranking-board :config="config" />
						<el-link type="primary" @click='method1'>点击此处</el-link>
					</div>
		
				</el-col>

				<el-col :span="8">
					<div id="ranking-board2">
						<div class="ranking-board-title">汽车加速性能</div>
						<dv-scroll-ranking-board :config="config1" />
						<el-link type="primary" @click='method2'>点击此处</el-link>
					</div>
				</el-col>

				<el-col :span="8">
					<div id="ranking-board3">
						<div class="ranking-board-title">汽车扭矩</div>
						<dv-scroll-ranking-board :config="config2" />
						<el-link type="primary" @click='method3' >点击此处</el-link>
					</div>
				</el-col>

			</el-row>
			<el-row :gutter="10">

				<el-col :span="8">
					<div id="ranking-board4">
						<div class="ranking-board-title">汽车功率</div>
						<dv-scroll-ranking-board :config="config3" />
						<el-link type="primary" @click='method4' >点击此处</el-link>
					</div>
				</el-col>

				<el-col :span="8">
					<div id="ranking-board5">
						<div class="ranking-board-title">汽车人气指数</div>
						<dv-scroll-ranking-board :config="config4" />
						<el-link type="primary" @click='method5'>点击此处</el-link>
					</div>
				</el-col>

				<el-col :span="8">
					<div id="ranking-board6">
						<div class="ranking-board-title">汽车百公里能耗</div>
						<dv-scroll-ranking-board :config="config5" />
						<el-link type="primary" @click='method6' >点击此处</el-link>
					</div>
				</el-col>

			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		methods:{
			method1(){
				this.$router.push("/carMaxSpeed")
			},
			method2(){
				this.$router.push("/carAccele")
			},
			method3(){
				this.$router.push("/carTorQue")
			},
			method4(){
				this.$router.push("/carPower")
			},
			method5(){
				this.$router.push("/carPopular")
			},
			method6(){
				this.$router.push("/carKmEner")
			},
			
			

		},
		name: 'HelloWorld',
		data() {
			return {
				number: [],
				number1: [],
				number2: [],
				number3: [],
				number4: [],
				number5: [],
				config: {
					data: this.number,
					rowNum: 5
				},
				config2: {
					data: this.number1,
					rowNum: 5
				},
				config3: {
					data: this.number,
					rowNum: 5
				},
				config4: {
					data: this.number,
					rowNum: 5
				},
				config5: {
					data: this.number,
					rowNum: 5
				}
			}
		},
		mounted() {
			axios.get('http://180.76.235.163:8088/carguide/toprank?type=1').then((res1) => {
					console.log(res1)
					for (var i = 0; i < 5; i++) {
						var value = res1.data.records[i].sysParaMaxspeed
						var name = res1.data.records[i].sysParaCarSeries
						var duixiang = {
							name,
							value
						}
						this.number.push(duixiang)
					}
					this.config = {
						data: this.number,
						rowNum: 5
					}
				})
				.catch((err) => {
					this.$message.error(err.message);
					console.log(err);
				})
			axios.get('http://180.76.235.163:8088/carguide/toprank?type=2').then((res2) => {
					console.log(res2)
					for (var i = 0; i < 5; i++) {
						var value = res2.data.records[i].sysParaAcc
						var name = res2.data.records[i].sysParaCarSeries
						var duixiang = {
							name,
							value
						}
						this.number1.push(duixiang)
					}
					this.config1 = {
						data: this.number1,
						rowNum: 5,
						sort:false
					}
				})
				.catch((err) => {
					this.$message.error(err.message);
					console.log(err);
				})
			axios.get('http://180.76.235.163:8088/carguide/toprank?type=3').then((res3) => {
					console.log(res3)
					for (var i = 0; i < 5; i++) {
						var value = res3.data.records[i].sysParaTorque
						var name = res3.data.records[i].sysParaCarSeries
						var duixiang = {
							name,
							value
						}
						this.number2.push(duixiang)
					}
					this.config2 = {
						data: this.number2,
						rowNum: 5
					}
				})
				.catch((err) => {
					this.$message.error(err.message);
					console.log(err);
				})
			axios.get('http://180.76.235.163:8088/carguide/toprank?type=4').then((res4) => {
					console.log(res4)
					for (var i = 0; i < 5; i++) {
						var value = res4.data.records[i].sysParaPower
						var name = res4.data.records[i].sysParaCarSeries
						var duixiang = {
							name,
							value
						}
						this.number3.push(duixiang)
					}
					this.config3 = {
						data: this.number3,
						rowNum: 5
					}
				})
				.catch((err) => {
					this.$message.error(err.message);
					console.log(err);
				})
			axios.get('http://180.76.235.163:8088/carguide/toprank?type=5').then((res5) => {
					console.log(res5)
					for (var i = 0; i < 5; i++) {
						var value = res5.data.records[i].sysParaPopularity
						var name = res5.data.records[i].sysParaCarSeries
						var duixiang = {
							name,
							value
						}
						this.number4.push(duixiang)
					}
					this.config4 = {
						data: this.number4,
						rowNum: 5
					}
				})
				.catch((err) => {
					this.$message.error(err.message);
					console.log(err);
				})
			axios.get('http://180.76.235.163:8088/carguide/toprank?type=6').then((res6) => {
					console.log(res6)
					for (var i = 0; i < 5; i++) {
						var value = res6.data.records[i].sysParaKmEnergy
						var name = res6.data.records[i].sysParaCarSeries
						var duixiang = {
							name,
							value
						}
						this.number5.push(duixiang)
					}
					this.config5 = {
						data: this.number5,
						rowNum: 5
					}
				})
				.catch((err) => {
					this.$message.error(err.message);
					console.log(err);
				})
		},
	}
</script>

<style lang="less">
	#ranking-board1 {
		height: 270px;
		font-size: 20px;
		margin-top: 20px;
		margin-left: 50px;
		margin-bottom: 10px;
		box-shadow: 0 0 3px rgb(109, 201, 255);
		display: flex;
		flex-direction: column;
		background-color: rgb(4, 1, 57);
		box-sizing: border-box;
		padding: 0px 10px;

		.ranking-board-title {
			font-weight: bold;
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 20px;
			background-color: rgba(4, 1, 57, 0.503);
		}

		.dv-scroll-ranking-board {
			flex: 1;
			background-color: rgba(4, 1, 57, 0.503);

		}
	}

	#ranking-board2 {
		height: 270px;
		font-size: 20px;
		margin-top: 20px;
		margin-bottom: 10px;
		box-shadow: 0 0 3px rgb(109, 201, 255);
		display: flex;
		flex-direction: column;
		background-color: rgb(4, 1, 57);
		box-sizing: border-box;
		padding: 0px 10px;

		.ranking-board-title {
			font-weight: bold;
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 20px;
			background-color: rgba(4, 1, 57, 0.503);
		}

		.dv-scroll-ranking-board {
			flex: 1;
			background-color: rgba(4, 1, 57, 0.503);

		}
	}

	#ranking-board3 {
		height: 270px;
		font-size: 20px;
		margin-top: 20px;
		margin-right: 50px;
		margin-bottom: 10px;
		box-shadow: 0 0 3px rgb(109, 201, 255);
		display: flex;
		flex-direction: column;
		background-color: rgb(4, 1, 57);
		box-sizing: border-box;
		padding: 0px 10px;

		.ranking-board-title {
			font-weight: bold;
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 20px;
			background-color: rgba(4, 1, 57, 0.503);
		}

		.dv-scroll-ranking-board {
			flex: 1;
			background-color: rgba(4, 1, 57, 0.503);

		}
	}

	#ranking-board4 {
		height: 270px;
		font-size: 20px;
		margin-top: 3px;
		margin-left: 50px;
		margin-bottom: 10px;
		box-shadow: 0 0 3px rgb(109, 201, 255);
		display: flex;
		flex-direction: column;
		background-color: rgb(4, 1, 57);
		box-sizing: border-box;
		padding: 0px 10px;

		.ranking-board-title {
			font-weight: bold;
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 20px;
			background-color: rgba(4, 1, 57, 0.503);
		}

		.dv-scroll-ranking-board {
			flex: 1;
			background-color: rgba(4, 1, 57, 0.503);
		}
	}

	#ranking-board5 {
		height: 270px;
		font-size: 20px;
		margin-top: 3px;
		margin-bottom: 10px;
		box-shadow: 0 0 3px rgb(109, 201, 255);
		display: flex;
		flex-direction: column;
		background-color: rgb(4, 1, 57);
		box-sizing: border-box;
		padding: 0px 10px;

		.ranking-board-title {
			font-weight: bold;
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 20px;
			background-color: rgba(4, 1, 57, 0.503);
		}

		.dv-scroll-ranking-board {
			flex: 1;
			background-color: rgba(4, 1, 57, 0.503);
		}
	}

	#ranking-board6 {
		height: 270px;
		font-size: 20px;
		margin-top: 3px;
		margin-right: 50px;
		margin-bottom: 10px;
		box-shadow: 0 0 3px rgb(109, 201, 255);
		display: flex;
		flex-direction: column;
		background-color: rgb(4, 1, 57);
		box-sizing: border-box;
		padding: 0px 10px;

		.ranking-board-title {
			font-weight: bold;
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 20px;
			background-color: rgba(4, 1, 57, 0.503);
		}

		.dv-scroll-ranking-board {
			flex: 1;
			background-color: rgba(4, 1, 57, 0.503);
		}
	}

	.heade {
		text-align: center;
		height: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40px;
		margin-bottom: 10px;
		margin-top: 20px;
		margin-left: 50px;
		margin-right: 50px;
		color: black;
	}
</style>
