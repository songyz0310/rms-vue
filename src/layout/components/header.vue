<template>
  <div class="rms-header">
    <el-container>
      <el-aside class="rms-left" width="200px">
        <span class="toggle-span">
          <i
            :class="menuObj.isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"
            @click="menuObj.isCollapse=!menuObj.isCollapse"
          ></i>
        </span>
      </el-aside>
      <el-container class="rms-main"></el-container>
      <el-aside class="rms-left" width="120px">
        <el-dropdown @command="handleI18nCommand">
          <div class="avatar-wrapper">
            <b>{{$t("i18n.lang")}}</b>
            <i class="el-icon-s-tools" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-aside>
      <el-aside class="rms-left" width="130px">
        <el-dropdown @command="handleCommand">
          <div class="avatar-wrapper">
            <img
              :src="user.avatar+'?imageView2/1/w/80/h/80'"
              @error="user.avatar=ds"
              class="user-avatar"
            />
            <b>{{user.userName}}</b>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">{{$t("i18n.user.info")}}</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
export default {
  props: {
    menuObj: {
      type: Object
    }
  },
  data() {
    return {
      ds: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      user: {
        userId: 0,
        avatar: "",
        userName: "",
        account: "",
        email: ""
      }
    };
  },
  created: function() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user.userId = user.userId;
    this.user.avatar = user.avatar;
    this.user.userName = user.userName;
    this.user.account = user.account;
    this.user.email = user.email;
  },
  methods: {
    handleCommand(cmd) {
      if (cmd == "logout") {
        console.info("登出");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");

        this.$router.push({ path: "/" });
      } else {
        console.info(this.$t("i18n.user.info"));
      }
    },
    handleI18nCommand(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("__i18n", lang);
    }
  }
};
</script>
<style scoped>
.rms-header {
  height: 100%;
  line-height: 45px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  position: absolute;
  right: -40px;
}
.toggle-span {
  cursor: pointer;
  font-size: 22px;
  margin-left: 10px;
}
</style>