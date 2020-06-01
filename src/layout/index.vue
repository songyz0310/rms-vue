<template>
  <el-container class="rms-container">
    <el-header class="rms-header" height="45px">
      <rms-header />
    </el-header>
    <el-container>
      <el-aside class="rms-left" width="200px">
        <rms-left />
      </el-aside>
      <el-container class="rms-main">
        <el-main>
          <router-view />
        </el-main>
        <el-footer height="30px">
          <rms-footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import rmsHeader from "./components/header";
import rmsLeft from "./components/left";
import rmsFooter from "./components/footer";
export default {
  components: { rmsHeader, rmsLeft, rmsFooter }
};
</script>
<style scoped>
.rms-container {
  height: 100vh;
}
.rms-header {
  background: lightgray;
}
.rms-left {
  background-color: rgb(84, 92, 100);
}

.rms-main {
  background: white;
}
</style>