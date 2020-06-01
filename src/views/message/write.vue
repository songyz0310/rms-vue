<template>
  <div>
    <el-row style="margin-bottom:15px">
      <el-button size="small" type="warning">放弃</el-button>
      <el-button size="small" type="danger">保存为草稿</el-button>
      <el-button size="small" type="success" @click="createFormalMessage">发送</el-button>
    </el-row>
    <hr />
    <el-form ref="form" :model="message" label-width="80px">
      <el-form-item label="发件人">
        <el-input v-model="message.sendUser"></el-input>
      </el-form-item>
      <el-form-item label="收件人">
        <remote-select
          multiple
          :requestData="queryUserList"
          v-model="message.recipients"
          placeholder="请选择收件人"
        >
          <template slot-scope="scope">
            <el-option
              v-for="user in scope.list"
              :key="user.userId"
              :value="user.userId"
              :label="user.userName"
            ></el-option>
          </template>
        </remote-select>
      </el-form-item>
      <el-form-item label="主题">
        <el-input v-model="message.messageTitle"></el-input>
      </el-form-item>

      <el-form-item label="邮件内容">
        <tinymce
          :value="message.richContent"
          :height="400"
          @contentUpdateEvent="messageContentUpdate"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import messageApi from "../../api/message";
import userApi from "../../api/user";

import Tinymce from "@/components/Tinymce";
import RemoteSelect from "@/components/RemoteSelect";

export default {
  components: { Tinymce, RemoteSelect },
  data() {
    return {
      message: {
        messageId: 10,
        messageTitle: "",
        richContent: "我是Rich",
        simpleContent: "",
        sendUser: 0,
        recipients: [],
        refMessage: 0
      }
    };
  },
  created: function() {
    console.info("create");
  },
  methods: {
    queryUserList(param) {
      return userApi.list(param);
    },
    createFormalMessage() {
      this.message.richContent += " rich:" + Date.now();
      this.message.simpleContent += " simple:" + Date.now();
      messageApi.createFormalMessage(this.message).then(result => {
        console.info(result);
      });
    },
    messageContentUpdate({ text, html }) {
      this.message.simpleContent = text;
      this.message.richContent = html;
    }
  }
};
</script>
<style scoped>
</style>