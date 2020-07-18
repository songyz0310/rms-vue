<template>
  <div class="user-login">
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRule"
      label-width="80px"
      v-show="isLogin"
    >
      <el-form-item>
        <div class="login-avatar">
          <el-avatar
            :size="100"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
        </div>
      </el-form-item>

      <el-form-item label="登录账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item label="记住我">
        <el-switch v-model="loginForm.delivery"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" plain @click="isLogin=false">注册</el-button>
      </el-form-item>
    </el-form>
    <el-form
      class="registe-form"
      ref="registeForm"
      :model="registeForm"
      :rules="registeRule"
      label-width="80px"
      v-show="!isLogin"
    >
      <el-form-item>
        <div class="login-avatar">
          <el-avatar
            shape="square"
            :size="100"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
        </div>
        <el-input style="display:none" v-model="registeForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="registeForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registeForm.email"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="registeForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registeForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button plain @click="isLogin=true">返回登录</el-button>
        <el-button type="primary" plain @click="registe">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import userApi from "../../api/user";
export default {
  data() {
    return {
      isLogin: true,
      loginForm: {
        account: null,
        password: null
      },
      registeForm: {
        email: null,
        userName: null,
        account: null,
        password: null
      },
      loginRule: {
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ]
      },
      registeRule: {
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  methods: {
    validateForm(form) {
      return new Promise((resolve, reject) => {
        this.$refs[form].validate(valid => {
          if (valid) {
            resolve("表单校验通过");
          } else {
            reject("表单校验未通过");
          }
        });
      }).catch(err => {
        this.$notify({
          title: "警告",
          message: "请确认信息合法性",
          type: "warning"
        });
        throw new Error(err);
      });
    },
    login() {
      this.validateForm("loginForm")
        .then(() => userApi.login(this.loginForm))
        .then(user => {
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("token", user.token);

          this.$router.push({ path: "/message/inBox" });
        });
    },
    registe() {
      this.validateForm("registeForm")
        .then(() => userApi.registe(this.registeForm))
        .then(user => {
          this.isLogin = true;
          this.$notify({
            title: "提示",
            message: "激活链接已发送至邮箱，请尽快前往激活",
            type: "success"
          });
        });
    }
  }
};
</script>
<style scoped>
.login-form,
.registe-form {
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