<template>
  <div>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#3d8cda"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item @click="method1" index="1">汽车大数据平台</el-menu-item>
      <el-menu-item @click="method2" index="/carGuide">购车指导</el-menu-item>

      <el-submenu v-if="this.isvip==true">
        <template slot="title">市场业务</template>
        <el-menu-item @click="method3" index="3-1">汽车性能数据排行榜</el-menu-item>
        <el-menu-item @click="method4" index="3-2">热销地区</el-menu-item>
        <el-menu-item @click="method5" index="3-3">厂商销量榜单</el-menu-item>
        <el-menu-item @click="method6" index="3-4">市场销售情况</el-menu-item>
      </el-submenu>

      <div v-if="this.isvip==true">
        <i class="iconfont icon-vip"
           style="float:right;margin-right: 0%;font-size: 40px;color: #ffdd02;margin-top: 10px"></i>
      </div>
      <div v-else>
        <i class="iconfont icon-vip" style="float:right;margin-right: 0%;font-size: 40px;margin-top: 10px"></i>
      </div>
      <el-submenu style="float: right;right: 1%" index="1">
        <template slot="title">{{ this.username }}</template>

        <el-menu-item @click="toPayment">升级为VIP用户</el-menu-item>
        <el-menu-item @click="method10">查看浏览记录</el-menu-item>
        <el-menu-item @click="method11">查看收藏记录</el-menu-item>
        <el-menu-item @click="method7">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-dialog
        title="请使用支付宝扫码支付"
        :visible.sync="vis"
        width="252px"
    >
      <vueQr :text="qr" :size="200" :margin="10" :correctLevel="0" :whiteMargin="false" ></vueQr>
	  <span style="font-size: 20px;color:black">￥</span><span style="font-size: 30px;color:black">0.88</span>
      <span id="dialogSpan" v-show="paySucc == true"></span>
      <span id="dialogSpan2" v-show="paySucc == true">
        <i class="el-icon-success" style="background-color: #FFFFFF; color:#67C23A; font-size: 60px;border-radius: 30px;"/>
        <br/>
        支付成功
      </span>
    </el-dialog>

    <el-dialog
        title="浏览"
        :visible.sync="vis1"
        width="30%"
    >
      <el-table
          :data="tableData1"
          stripe
          style="width: 100%">
        <el-table-column
            prop="context"
            label="浏览记录"
            style="width: 100%;">
        </el-table-column>
        <el-table-column
            label="网页链接"
            prop="url"
            style="width: 100%;">
          <template slot-scope="scope">
            <a @click="method12(scope.row.url)" style="color: lightskyblue">{{ scope.row.url }}</a>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="vis1 = false">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="收藏"
        :visible.sync="vis2"
        width="30%"
    >
      <el-table
          :data="tableData2"
          stripe
          style="width: 100%">
        <el-table-column
            prop="series"
            label="收藏记录"
            style="width: 100%;">
        </el-table-column>
        <el-table-column
            label="网页链接"
            prop="url"
            style="width: 100%;">
          <template slot-scope="scope">
            <a @click="method12(scope.row.url)" style="color: lightskyblue">{{ scope.row.url }}</a>
          </template>
        </el-table-column>
      </el-table>
      <!--      <el-table-->
      <!--          :data="tableData2"-->
      <!--          stripe-->
      <!--          style="width: 100%">-->
      <!--        <el-table-column-->
      <!--            prop="table.series"-->
      <!--            label="收藏记录"-->
      <!--            style="width: 100%;">-->
      <!--        </el-table-column>-->
      <!--          <el-table-column-->
      <!--              prop="url"-->
      <!--              label="网页链接"-->
      <!--              style="width: 100%;">-->
      <!--        </el-table-column>-->
      <!--      </el-table>-->
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="vis2 = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
export default {
  components:{
    vueQr
  },
  name: "globalHeader",
  mounted() {
    this.$axios.post(this.$url + '/admin/isvip/', {
      name: this.username
    }).then(res => {
      this.isvip = res.data
    }).catch(err => {
      console.log(err)
    })
  },
  data() {
    return {
      tableData1: [],
      tableData2: [],
      username: localStorage.getItem('username'),
      isvip: '',
      vis: false,
      vis1: false,
      vis2: false,
      qr: "",
      paySucc: false
    }
  },
  methods: {
    method1() {
      this.$router.push({path: '/'})
    },
    method2() {
      this.$router.push({path: '/carGuide'})
    },
    method3() {
      this.$router.push({path: '/carRank'})
    },
    method4() {
      this.$router.push({path: '/carMap'})
    },
    method5() {
      this.$router.push({path: '/carOperator'})
    },
    method6() {
      this.$router.push({path: '/carPie'})
    },
    method7() {
      localStorage.clear()
      this.$router.push('/')
    },
    method8() {
      this.vis = true
    },
    method9() {
    },
    method10() {
      this.$axios.post(this.$url + '/user/browselog', {
        name: this.username
      }).then(res => {
        let item
        for (item in res.data) {
          let record = {
            url: 'detailPage?name=' + res.data[item].context,
            context: res.data[item].context
          }
          this.tableData1.push(record)
        }
      })
      console.log(this.tableData1)
      this.vis1 = true
    },
    method11() {
      this.$axios.post(this.$url + '/user/collect', {
        name: this.username
      }).then(res => {
        let item
        for (item in res.data) {
          let record = {
            url: 'detailPage?name=' + res.data[item].series,
            series: res.data[item].series
          }
          this.tableData2.push(record)
        }
      })
      console.log(this.tableData2)
      this.vis2 = true
    },
    method12(item) {
      this.$router.push({path: item})
      location.reload()
    },
    toPayment(){
      let _this = this;
      // 这里填写后台支付的地址
      this.$axios.post(this.$url+"/admin/isvip",{
        name:this.username
      }).then(res=>{
        if(res.data==true){
          this.$alert('您已经是vip','提示',{
            confirmButtonText: '确定'
          })
        }
        else{
          this.vis = true
          this.$axios.post(this.$url+"/alipay/sandboxpay",{
            name:this.username
          }).then(res => {
            console.log(res)
            this.qr = res.data;
            if ("WebSocket" in window) {
              // 打开一个 web socket
              // 通道地址按照项目进行配置
              var ws = new WebSocket("ws://180.76.235.163:8088/bindingRecord");
              ws.onopen = function() {
                // Web Socket 已连接上，使用 send() 方法发送数据
                // ws.send("data");
                // alert("数据发送中...");
              };
              ws.onmessage = function(evt) {
                console.log(evt)
                // var received_msg = evt.data;
                // 接收后台推送的数据
                // alert("数据已接收..." + evt.data);
                if (evt.data) {
                  _this.paySucc = true;
                  location.reload()
                  setTimeout(() => {
                    this.vis=false
                  }, 3 * 1000);
                }
                ws.close();
              };
              ws.onclose = function() {

              };
            } else {
              // 浏览器不支持 WebSocket
              alert("您的浏览器不支持 WebSocket!");
            }
          });
        }
      })
    }
  },


}

</script>

<style scoped>
#dialogSpan{
  display: inline-block;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 80px;
  right: 27px;
  opacity:0.9;
  background-color: #FFFFFF;
}
#dialogSpan2{
  display: inline-block;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 124px;
  right: 80px;
  font-size: 20px;
  text-align: center;
}
</style>