<template>
  <div>
    <div class="heade" style="margin-left: 5%; margin-right: 225px">
      <div style="width:500px;float:left;margin-left: 5%">
        <el-input v-model="input" placeholder="请输入内容" style="width:60%"></el-input>
        <el-button icon="el-icon-search" circle style="margin-left:10%" @click="search"></el-button>
      </div>
      <dv-border-box-7>用户列表</dv-border-box-7>
    </div>
    <el-row>
      <el-col :span="24" style="height: 740px;">
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          border
          style="width: 100%"
        >
          <el-table-column
            prop="userId"
            label="用户id"
            align="center"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="userRegisterDate"
            label="注册时间"
            align="center"
            width="230"
          >
          </el-table-column>
          <el-table-column
            prop="userLastlogDate"
            label="最近登录时间"
            align="center"
            width="230"
          >
          </el-table-column>
          <el-table-column
            prop="userState"
            label="封禁状态"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="userType"
            label="用户类型"
            align="center"
            width="80"
          >
          </el-table-column>

          <el-table-column label="管理操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="
                  deleteRow(scope.row.userId, scope.$index, tableData)
                "
                size="mini"
              >
                移除
              </el-button>
              <el-button
                size="mini"
                @click.native.prevent="handleban(scope.row.userId, tableData)"
                >封禁</el-button
              >
              <el-button
                size="mini"
                @click.native.prevent="
                  handlechange(scope.row.userId, tableData)
                "
                >转换用户类型</el-button
              >
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
        :total="length"
      >
      </el-pagination>
    </el-row>
  </div>
</template>
    
    <script>
export default {
  name: "BiaoGe",
  inject: ["reload"],
  methods: {
    deleteRow(index, ind, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(ind, 1);
          const _this = this;
          axios
            .post("http://180.76.235.163:8088/admin/remove", {
              id: index,
            })
            .then(function (res2) {})
            .catch((error) => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleban(index, rows) {
      const _this = this;
      axios
        .post("http://180.76.235.163:8088/admin/ban", {
          id: index,
        })
        .then(function (res2) {
          _this.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handlechange(index, rows) {
      const _this = this;
      axios
        .post("http://180.76.235.163:8088/admin/vip", {
          id: index,
        })
        .then(function (res2) {
          _this.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      const _this = this;
      axios
        .get("http://180.76.235.163:8088/admin/listuser?"+"page="+currentPage)
        .then(function (res1) {
          for (var i = 0; i < res1.data.records.length; i++) {
            var userId = res1.data.records[i].userId;
            var userName = res1.data.records[i].userName;
            var userLastlogDate = res1.data.records[i].userLastlogDate;
            var userRegisterDate = res1.data.records[i].userRegisterDate;
            var userState;
            if (res1.data.records[i].userState == true) {
              userState = "未封禁";
            } else {
              userState = "已封禁";
            }
            var userType;
            if (res1.data.records[i].userType == true) {
              userType = "VIP";
            } else {
              userType = "非VIP";
            }
            var duixiang = {
              userId,
              userName,
              userRegisterDate,
              userLastlogDate,
              userState,
              userType,
            };
            _this.tableData.push(duixiang);
          }
          _this.length = res1.data.total;
          this.$forceUpdate();
        });
    },
    search(){
      var userName = this.input;
      axios.get('http://180.76.235.163:8088/admin/searchuser?name='+userName).then(res=>{
		    this.length = res.data.records.length
        this.tableData=[]
		  for(var i = 0;i<res.data.records.length;i++){
        var userObj={
          userId:0,userName:'',userLastlogDate:'',userRegisterDate:'',userState:'',userType:''
        }
        userObj.userId = res.data.records[i].userId;
        console.log(res.data.records[i].userId,'res.id')
        userObj.userName = res.data.records[i].userName
        userObj.userLastlogDate = res.data.records[i].userLastlogDate
        userObj.userRegisterDate = res.data.records[i].userRegisterDate
        userObj.userState 
        userObj.userType 
        if (res.data.records[i].userState == true) {
            userObj.userState = "未封禁";
          } else {
            userObj.userState = "已封禁";
          }
        if (res.data.records[i].userType == true) {
          userObj.userType = "VIP";
        } else {
          userObj.userType = "非VIP";
        }
        console.log(userObj,'userObj')
        this.tableData.push(userObj)
      }
	  })
	  this.input=''
	  }
    ,
  },
  data() {
    return {
      total: null,
      tableData: [],
      length: null,
      currentPage: 1,
      pageSize: 12,
      input:'',
    };
  },
  created() {
    const _this = this;
    axios
      .get("http://180.76.235.163:8088/admin/listuser")
      .then(function (res1) {
        console.log(res1);
        for (var i = 0; i < res1.data.records.length; i++) {
          var userId = res1.data.records[i].userId;
          var userName = res1.data.records[i].userName;
          var userLastlogDate = res1.data.records[i].userLastlogDate;
          var userRegisterDate = res1.data.records[i].userRegisterDate;
          var userState;
          if (res1.data.records[i].userState == true) {
            userState = "未封禁";
          } else {
            userState = "已封禁";
          }
          var userType;
          if (res1.data.records[i].userType == true) {
            userType = "VIP";
          } else {
            userType = "非VIP";
          }
          var duixiang = {
            userId,
            userName,
            userRegisterDate,
            userLastlogDate,
            userState,
            userType,
          };
          _this.tableData.push(duixiang);
        }
        console.log(_this.tableData);
        _this.length = res1.data.total;
      });
  },
};
</script>