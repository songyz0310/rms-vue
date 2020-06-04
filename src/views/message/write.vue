<template>
  <div>
    <el-row style="margin-bottom:15px">
      <el-button size="small" type="danger" @click="saveDraftMessage">存为草稿</el-button>
      <el-button size="small" type="success" @click="saveFormalMessage">发送</el-button>
    </el-row>
    <hr />
    <el-form ref="messageForm" :rules="messageRules" :model="messageForm" label-width="80px">
      <el-form-item label="邮件原文" v-if="refMessage != null">
        <el-link type="primary" @click="readMessage(refMessage)">
          <b>{{ refMessage.messageTitle }}</b>
        </el-link>
      </el-form-item>
      <el-form-item label="发件人">
        <el-input v-model="messageForm.sendUserName" disabled></el-input>
      </el-form-item>
      <el-form-item label="收件人" prop="recipients" :disabled="refMessage != null">
        <remote-select
          multiple
          ref="remoteSelect"
          :disabled="refMessage != null"
          :requestData="queryUserList"
          :initValue="messageForm.recipients"
          v-model="messageForm.recipients"
          placeholder="请选择收件人"
        >
          <template slot-scope="scope">
            <el-option
              v-for="user in scope.list"
              :disabled="user.userId == messageForm.sendUser"
              :key="user.userId"
              :value="user.userId"
              :label="user.userName"
            ></el-option>
          </template>
        </remote-select>
      </el-form-item>
      <el-form-item label="主题" prop="messageTitle">
        <el-input v-model="messageForm.messageTitle" placeholder="请输入主题"></el-input>
      </el-form-item>
      <el-form-item label="邮件内容" prop="richContent">
        <tinymce
          ref="tinymce"
          menubar="false"
          :height="500"
          :content="messageForm.richContent"
          @contentUpdateEvent="messageContentUpdate"
        />
      </el-form-item>
    </el-form>

    <read-message ref="readMessage"></read-message>
  </div>
</template>
<script>
import receiverApi from "../../api/message/receiver";
import senderApi from "../../api/message/sender";
import userApi from "../../api/user/index";

import Tinymce from "@/components/Tinymce";
import RemoteSelect from "@/components/RemoteSelect";

import ReadMessage from "./components/read";

export default {
  components: { Tinymce, RemoteSelect, ReadMessage },
  data() {
    return {
      formPath: null, //来源路径
      refMessage: null, //原文
      messageForm: {
        messageId: null,
        messageTitle: null,
        richContent: null,
        simpleContent: null,
        sendUser: 0,
        sendUserName: 0,
        recipients: [],
        refMessageId: null
      },
      messageRules: {
        recipients: [
          {
            type: "array",
            required: true,
            message: "请选择收件人",
            trigger: "blur"
          },
          {
            type: "array",
            max: 5,
            message: "收件人不能大于5人",
            trigger: "change"
          }
        ],
        messageTitle: [
          { required: true, message: "请输入主题", trigger: "blur" }
        ],

        richContent: [
          { required: true, message: "请输入邮件内容", trigger: "blur" }
        ]
      }
    };
  },
  created: function() {
    console.info("写信Vue create");
    let sessionUser = JSON.parse(sessionStorage.getItem("user"));
    this.messageForm.sendUser = sessionUser.userId;
    this.messageForm.sendUserName = sessionUser.userName;

    let routeParam = this.$route.params; //此参数有值代表从其他列表跳转过来的
    if (routeParam.data) {
      this.formPath = routeParam.formPath;
      this.messageForm.messageId = routeParam.data.messageId;
      this.messageForm.messageTitle = routeParam.data.messageTitle;
      this.messageForm.richContent = routeParam.data.richContent;
      this.messageForm.simpleContent = routeParam.data.simpleContent;
      this.$nextTick(() => {
        this.messageForm.recipients = routeParam.data.recipients;
      });

      if (routeParam.data.refMessage) {
        this.messageForm.refMessageId = routeParam.data.refMessage.messageId;
        this.refMessage = routeParam.data.refMessage;
      }
      console.info("信息页面初始化", routeParam);
    }
  },
  mounted() {},
  methods: {
    queryUserList(param) {
      return userApi.list(param);
    },
    messageContentUpdate({ text, html }) {
      if (this.$refs.remoteSelect) {
        this.$refs.remoteSelect.doBlur();
      }

      this.messageForm.simpleContent = text;
      this.messageForm.richContent = html;
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs["messageForm"].validate(valid => {
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
    saveFormalMessage() {
      this.validateForm()
        .then(() => senderApi.saveFormal(this.messageForm))
        .then(result => {
          if (this.formPath) {
            this.$message({
              message: "信息发送成功",
              type: "success"
            });
            this.$router.push({ path: this.formPath });
          } else {
            this.messageForm = {};
            this.$refs.tinymce.setContent("");

            this.$confirm("信息发送成功, 是否跳转至发件箱?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success"
            }).then(() => {
              this.$router.push({ path: "/message/outBox" });
            });
          }
        });
    },
    saveDraftMessage() {
      this.validateForm()
        .then(() => senderApi.saveDraft(this.messageForm))
        .then(result => {
          if (this.formPath) {
            this.$message({
              message: "信息保存成功",
              type: "success"
            });
            this.$router.push({ path: this.formPath });
          } else {
            this.messageForm = {};
            this.$refs.tinymce.setContent("");

            this.$confirm("信息保存成功, 是否跳转至草稿箱?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success"
            }).then(() => {
              this.$router.push({ path: "/message/draftBox" });
            });
          }
        });
    },
    readMessage(message) {
      this.$refs.readMessage.show(message);
      if (message.isRead == 0) {
        message.isRead = 1;
        receiverApi.markMessage({ ids: [message.mrId], type: 1 });
      }
    }
  }
};
</script>
<style scoped>
</style>