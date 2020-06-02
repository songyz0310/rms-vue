<template>
  <el-container class="fill-view">
    <el-aside class="layout-menu" :width="menuWidth">
      <rms-menu :menuObj="menuObj" />
    </el-aside>
    <el-container class="layout-main">
      <el-header class="layout-header" height="45px">
        <rms-header :menuObj="menuObj" :menuWidth="menuWidth" />
      </el-header>
      <el-main style="padding-bottom: 0;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import rmsHeader from "./components/header";
import rmsMenu from "./components/menu";

let flag = localStorage.getItem("__menuObj.isCollapse");
// let flag = localStorage.getItem("__menuObj.isCollapse");
// this.menuObj.isCollapse = flag == "true";

export default {
  components: { rmsHeader, rmsMenu },
  data() {
    return {
      menuObj: {
        isCollapse: flag == "true"
      },
      menuWidth: flag == "true" ? "65px" : "200px"
    };
  },
  created() {},
  methods: {},
  watch: {
    menuObj: {
      handler: function(val, oldval) {
        localStorage.setItem("__menuObj.isCollapse", val.isCollapse);
        if (val.isCollapse) {
          this.menuWidth = "65px";
        } else {
          this.menuWidth = "200px";
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  }
};
</script>
<style scoped>
</style>