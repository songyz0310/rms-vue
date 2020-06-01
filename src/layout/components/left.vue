<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      :default-openeds="defaultOpen"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-comment"></i>
          <span>信息管理</span>
        </template>
        <el-menu-item index="1-1" @click="toPage('/message/write')">写信</el-menu-item>
        <el-menu-item index="1-2" @click="toPage('/message/recipient')">收件箱</el-menu-item>
        <el-menu-item index="1-3" @click="toPage('/message/send')">发件箱</el-menu-item>
        <el-menu-item index="1-4" @click="toPage('/message/recipient')">草稿箱</el-menu-item>
        <el-menu-item index="1-5" @click="toPage('/message/recipient')">垃圾箱</el-menu-item>
        <el-menu-item index="1-6" @click="toPage('/message/recipient')">已删除</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: "1-3",
      defaultOpen: ["1"]
    };
  },
  methods: {
    toPage(path) {
      if (this.$route.path != path) {
        this.$router.push({ path });
      }
    }
  }
};
</script>
<style scoped>
.el-menu {
  border: 0;
}
</style>