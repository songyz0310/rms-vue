<template>
  <div class="user-login">
    <el-form class="login-form" ref="form" :model="form" label-width="80px">
      <div class="login-avatar">
        <el-avatar
          :size="100"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
      </div>
      <el-form-item label="登录账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>

      <el-form-item label="记住我">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import userApi from "../../api/user";
export default {
  data() {
    return {
      form: {
        account: null,
        password: null
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      userApi.login(this.form).then(user => {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", user.token);

        this.$router.push({ path: "/message/sended" });
      });
    }
  }
};
</script>
<style scoped>
.login-form {
  position: absolute;
  top: 20%;
  left: 25%;
  width: 40%;
  min-width: 360px;
}
.login-avatar {
  text-align: center;
  padding-bottom: 25px;
}
</style>