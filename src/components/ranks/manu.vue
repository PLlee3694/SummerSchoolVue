<template>
	<div>
		<div class="heade" style="margin-left: 225px;margin-right: 225px;margin-top: 5px;margin-bottom: 40px;">
			<dv-border-box-7>{{message}}排行榜</dv-border-box-7>
		</div>
		<el-col :span="16">
			<el-table :data="tableData" border style="width: 100%;margin-left: 25%">
				<el-table-column fixed prop="id" label="排名" width="50">
				</el-table-column>
				<el-table-column prop="carName" label="车型" align="center" width="200">
				</el-table-column>
				<el-table-column prop="saleNum" label="销量" align="center" width="100">
				</el-table-column>


				<el-table-column label="车型相关" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleClick(scope.row )">月份销量</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>

	</div>
</template>

<script>
	export default {
		name: 'manu',
		methods: {
			handleClick(row, event, column) {
				this.$router.push({
					path: '/carMonth',
					query: {
						nameId: row.carName
					}
				})
			},
			created: function() {
				this.getParams();
			},
			watch: {
				'$route': 'gerParams'
			},
			getParams: function() {
				var manufact = this.$route.query.nameId
				this.textareText = manufact
			}
		},
		created() {
			const _this = this
			axios.get('http://180.76.235.163:8088/summary/brandcardata?brand=' + _this.message).then(function(resp) {
				console.log(resp)
				_this.tableData = resp.data
				_this.total = resp.data
			})
		},
		data() {
			return {
				message: this.$route.query.nameId,
				total: null,
				tableData: null,
			}
		}
	}
</script>
