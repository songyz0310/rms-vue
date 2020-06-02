<template>
  <div>
    <el-row style="margin-bottom:15px">
      <el-button size="small" type="danger" @click="createDraftMessage">存为草稿</el-button>
      <el-button size="small" type="success" @click="createFormalMessage">发送</el-button>
    </el-row>
    <hr />
    <el-form ref="messageForm" :rules="messageRules" :model="messageForm" label-width="80px">
      <el-form-item label="发件人">
        <el-input v-model="myName" disabled></el-input>
      </el-form-item>
      <el-form-item label="收件人" prop="recipients">
        <remote-select
          multiple
          ref="remoteSelect"
          :requestData="queryUserList"
          v-model="messageForm.recipients"
          placeholder="请选择收件人"
        >
          <template slot-scope="scope">
            <el-option
              v-for="user in scope.list"
              :disabled="user.userId==myId"
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
      myName: null,
      myId: null,
      messageForm: {
        messageId: null,
        messageTitle: null,
        richContent: null,
        simpleContent: null,
        sendUser: 0,
        recipients: [],
        refMessage: null
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
            max: 3,
            message: "收件人不能大于3人",
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
    this.myName = sessionUser.userName;
    this.myId = sessionUser.userId;
  },
  methods: {
    queryUserList(param) {
      return userApi.list(param);
    },
    messageContentUpdate({ text, html }) {
      this.$refs.remoteSelect.doBlur();
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
    createFormalMessage() {
      this.validateForm()
        .then(() => messageApi.createFormalMessage(this.messageForm))
        .then(result => {
          this.$confirm("信息发送成功, 是否跳转至发件箱?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.$router.push({ path: "/message/sended" });
            })
            .catch(() => {
              this.messageForm.messageId = null;
              this.messageForm.messageTitle = null;
              this.messageForm.richContent = null;
              this.messageForm.simpleContent = null;
              this.messageForm.recipients = null;
              this.messageForm.refMessage = null;
              this.$refs.tinymce.setContent("");
            });
        });
    },
    createDraftMessage() {
      this.validateForm()
        .then(() => messageApi.createDraftMessage(this.messageForm))
        .then(result => {
          this.$confirm("信息保存成功, 是否跳转至草稿箱?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.$router.push({ path: "/message/draft" });
            })
            .catch(() => {
              this.messageForm.messageId = null;
              this.messageForm.messageTitle = null;
              this.messageForm.richContent = null;
              this.messageForm.simpleContent = null;
              this.messageForm.recipients = null;
              this.messageForm.refMessage = null;
              this.$refs.tinymce.setContent("");
            });
        });
    }
  }
};
</script>
<style scoped>
</style>