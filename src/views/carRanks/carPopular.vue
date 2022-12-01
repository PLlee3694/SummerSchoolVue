<template>
  <div class="background">
    <el-container></el-container>
    <el-header class="header"><globalHeader></globalHeader></el-header>
    <el-main style="background-color: white;width: 70%;margin-left: 15%">
      <popular/>
    </el-main>
  </div>
</template>

<script>
import globalHeader from "@/components/globalHeader";
import popular from "@/components/ranks/popular"

export default {
  components:{globalHeader,popular},
  name: "carPower"
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