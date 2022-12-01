<template>
	<div>
		<div class="heade" style="width=50%;margin-left: 50px;margin-top:5px;margin-bottom:40px;text-align:center;">
			<el-col :span="16">
				<dv-border-box-8>厂商排行榜</dv-border-box-8>
			</el-col>
		</div>
		<el-row>
			<el-col :span="16">
				<div style="width: 100%;margin-left:175px">
					<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border>
						<el-table-column fixed prop="id" label="排名" width="50">
						</el-table-column>
						<el-table-column prop="brandName" label="厂商" align="center" width="200">
						</el-table-column>
						<el-table-column prop="saleNum" label="销量" align="center" width="100">
						</el-table-column>

						<el-table-column label="厂商相关" align="center">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleClick(scope.row)">内部销量</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
				layout="prev, pager, next, jumper" :total="length">
			</el-pagination>
		</el-row>

	</div>
</template>

<script>
	export default {
		name: 'BiaoGe',
		methods: {
			handleClick(row, event, column) {
				this.$router.push({
					path: '/carManu',
					query: {
						nameId: row.brandName
					}
				})
			},
			handleCurrentChange: function(currentPage) {
				console.log(currentPage)
				this.currentPage = currentPage
				console.log(this.currentPage)
			},
		},
		created() {
			const _this = this
			axios.get('http://180.76.235.163:8088/summary/branddata').then(function(resp) {
				console.log(resp)
				for (var i = 0; i < resp.data.length; i++) {
					var id = resp.data[i].id
					var brandName = resp.data[i].brandName
					var saleNum = resp.data[i].saleNum
					var duixiang = {
						id,
						brandName,
						saleNum
					}
					_this.tableData.push(duixiang)
				}

				_this.length = resp.data.length
			})
		},
		data() {
			return {
				total: null,
				tableData: [],
				length: null,
				currentPage: 1,
				pageSize: 12

			}
		}
	}
</script>
