<template>
<div>
  <div class="heade"  style="margin-left: 225px;margin-right: 225px"
    ><dv-border-box-7 >最快车速排行榜</dv-border-box-7></div>
    <el-row>
  <el-col :span="16">
  <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    border
    style="width: 100%;margin-left: 25%"
    >
    <el-table-column
      prop="id"
      label="排名"
      align="center"
      width="200">
    </el-table-column>
    <el-table-column
      prop="brandName"
      label="车系"
      align="center"
      width="200">
    </el-table-column>
    <el-table-column
      prop="speed"
      label="最快车速"
      align="center"
      width="100">
    </el-table-column>
    
    <el-table-column label="厂商相关" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleClick(scope.row)">汽车详情页</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-col>
  </el-row>
  <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="length">
      </el-pagination>
    </el-row>
</div>
</template>

<script>
  export default {
    name: 'BiaoGe',
    mounted: function () {
      const _this=this
      axios.get('http://180.76.235.163:8088/carguide/toprank?type=1&page='+this.currentPage).then(function(res1){
        console.log(res1)
            for(var i=0;i<res1.data.records.length;i++)
            {
              var speed=res1.data.records[i].sysParaMaxspeed
              var brandName=res1.data.records[i].sysParaCarSeries
              var id=1+i+(_this.currentPage-1)*_this.pageSize
              var duixiang={id,brandName,speed}
              _this.tableData.push(duixiang)
            }
            _this.length=res1.data.total
      })
  },
    methods: {
      handleClick(row, event, column) {
       this.$router.push({ 
        path:'/detailPage',
        query:{name:row.brandName}})
      },
      handleCurrentChange: function (currentPage) {
      console.log(currentPage)
      this.currentPage = currentPage
      const _this=this
      axios.get('http://180.76.235.163:8088/carguide/toprank?type=1&page='+this.currentPage).then(function(res1){
        console.log(res1)
            for(var i=0;i<res1.data.records.length;i++)
            {
              var speed=res1.data.records[i].sysParaMaxspeed
              var brandName=res1.data.records[i].sysParaCarSeries
              var id=1+i+(_this.currentPage-1)*_this.pageSize
              var duixiang={id,brandName,speed}
              _this.tableData.push(duixiang)
            }
            _this.length=res1.data.total
      })
      console.log(this.currentPage)
      this.$forceUpdate();
  },
    },
    data() {
      return {
        total:null,
        tableData: [],
        length:null,
        currentPage: 1,
      pageSize: 12
    }
  },
  created(){  
    },
  }
</script>