<template>
  <el-drawer :visible.sync="visible" direction="rtl" size="60%" :with-header="false">
    <el-form :model="message" label-width="80px" class="read-form">
      <slot />
      <h2>发件人：{{message.sendUser.userName}}</h2>
      <h2 v-if="message.recipientUsers.length>0">
        收件人：
        <span
          v-for="(user ,index) in message.recipientUsers"
          :key="user.userId"
        >{{(index > 0 ? ',' : '') + user.userName}}</span>
      </h2>
      <h2>主 题：{{message.messageTitle}}</h2>
      <el-divider>
        <i class="el-icon-message"></i>
      </el-divider>
      <div v-html="message.richContent"></div>
    </el-form>
  </el-drawer>
</template>
<script>
import messageApi from "../../../api/message/sender";
import userApi from "../../../api/user/index";

export default {
  data() {
    return {
      sessionUser: null,
      visible: false,
      message: {
        sendUser: {},
        recipientUsers: []
      }
    };
  },
  mounted() {
    this.sessionUser = JSON.parse(sessionStorage.getItem("user"));
  },
  methods: {
    queryUserList(param) {
      return userApi.list(param);
    },
    show(data) {
      console.info(data);
      this.$nextTick(() => {
        this.visible = true;
        this.message.messageTitle = data.messageTitle;
        this.message.richContent = data.richContent;
        this.message.sendTime = data.sendTime;
        this.message.createTime = data.createTime;
        if (data.sendUser) {
          this.message.sendUser = data.sendUser;
        } else if (data.sender == this.sessionUser.userId) {
          this.message.sendUser = this.sessionUser;
        } else {
          this.message.sendUser = null;
        }

        if (data.recipientUsers) {
          this.message.recipientUsers = data.recipientUsers;
        } else {
          this.message.recipientUsers = [];
        }
      });
    }
  }
};
</script>
<style scoped>
.read-form {
  padding: 20px;
  height: 100%;
}
.mce-container-body {
  display: none;
}
</style>