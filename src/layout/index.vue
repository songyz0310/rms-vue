<template>
  <el-container class="rms-container">
    <el-header class="rms-header" height="45px">
      <rms-header :menuObj="menuObj" />
    </el-header>
    <el-container>
      <el-aside class="rms-left" :width="menuWidth" style="transition: all 0.3s ease 0s;">
        <rms-left :menuObj="menuObj" />
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
  components: { rmsHeader, rmsLeft, rmsFooter },
  data() {
    return {
      menuObj: {
        isCollapse: false
      },
      menuWidth: "200px"
    };
  },
  methods: {
    changeCollapse(isCollapse) {
      console.info("修改：", isCollapse);
    }
  },
  watch: {
    menuObj: {
      handler: function(val, oldval) {
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
.rms-container {
  height: 100vh;
}
.rms-header {
  background: #efefef;
  padding: 0;
}
.rms-left {
  background-color: rgb(84, 92, 100);
}

.rms-main {
  background: white;
}
</style>