<template>
    <div class="background">
      <el-container></el-container>
      <el-header class="header"><globalHeader></globalHeader></el-header>
      <el-main style="background-color: white;width: 70%;height:100%;margin-left: 15%">
        <user />
      </el-main>
    </div>
  </template>
  
  <script>
  import globalHeader from "@/components/globalHeader";
  import user from "@/components/user"
  
  export default {
    components:{globalHeader,user},
    name: "carAccele"
  }
  </script>
  
  <style scoped>
  .header{
    margin: 0;
    padding: 0;
  }
  .background {
    background-color: #E4E6E7FF;
  }
  </style>