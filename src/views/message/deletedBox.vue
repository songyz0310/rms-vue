<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-row>
        <el-button size="small" type="danger" @click="showRealDeleteConfirm">彻底删除</el-button>
        <el-button size="small" type="success" @click="revertDeletedMessage">还原</el-button>
      </el-row>
    </el-header>
    <el-main class="page-main">
      <data-table ref="dataTable" selection :requestData="queryMessageList">
        <el-table-column prop="messageTitle" label="邮件标题" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link type="primary" @click="readMessage(scope.row)">
              <b v-if="scope.row.mrId != 0 && scope.row.isRead == 0">{{ scope.row.messageTitle }}</b>
              <span v-else>{{ scope.row.messageTitle }}</span>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="sendUser.userName" label="发送人" width="100"></el-table-column>
        <el-table-column prop="sendTime" label="发送时间" width="200">
          <template slot-scope="scope">{{ scope.row.sendTime }}</template>
        </el-table-column>
        <el-table-column prop="recipientUsers" label="收件人">
          <template slot-scope="scope">
            <span
              v-for="(user ,index) in scope.row.recipientUsers"
              :key="user.userId"
            >{{(index > 0 ? ',' : '') + user.userName}}</span>
          </template>
        </el-table-column>
      </data-table>
    </el-main>
    <read-message ref="readMessage"></read-message>
  </el-container>
</template>
<script>
import messageApi from "../../api/message/index";
import receiverApi from "../../api/message/receiver";
import senderApi from "../../api/message/sender";

import DataTable from "../../components/DataTable";
import ReadMessage from "./components/read";
export default {
  components: { DataTable, ReadMessage },
  data() {
    return {};
  },
  created: function() {},
  methods: {
    queryMessageList(param) {
      return messageApi.deletedList(param);
    },
    readMessage(message) {
      this.$refs.readMessage.show(message);
      if (message.mrId != 0 && message.isRead == 0) {
        message.isRead = 1;
        receiverApi.markMessage({ ids: [message.mrId], type: 1 });
      }
    },
    showRealDeleteConfirm() {
      if (this.$refs["dataTable"].getSelectRows().length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择信息",
          type: "warning"
        });
        return;
      }

      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => this.realDeleteMessage());
    },
    realDeleteMessage() {
      let rows = this.$refs["dataTable"].getSelectRows();
      var arr = [];
      var mrIds = rows.filter(i => i.mrId > 0).map(i => i.mrId);
      if (mrIds.length > 0) {
        console.info("mrIds", mrIds);
        arr.push(receiverApi.realDeleteMessage({ ids: mrIds }));
      }

      var messageIds = rows.filter(i => i.mrId == 0).map(i => i.messageId);
      if (messageIds.length > 0) {
        console.info("messageIds", messageIds);
        arr.push(senderApi.realDeleteMessage({ ids: messageIds }));
      }

      Promise.all(arr)
        .then(() => this.$refs["dataTable"].refreshData())
        .catch(() => this.$refs["dataTable"].refreshData());
    },
    revertDeletedMessage() {
      let rows = this.$refs["dataTable"].getSelectRows();
      if (rows.length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择信息",
          type: "warning"
        });
        return;
      }

      var arr = [];
      var mrIds = rows.filter(i => i.mrId > 0).map(i => i.mrId);
      if (mrIds.length > 0) {
        console.info("mrIds", mrIds);
        arr.push(receiverApi.revertMessage({ ids: mrIds }));
      }

      var messageIds = rows.filter(i => i.mrId == 0).map(i => i.messageId);
      if (messageIds.length > 0) {
        console.info("messageIds", messageIds);
        arr.push(senderApi.revertMessage({ ids: messageIds }));
      }

      Promise.all(arr)
        .then(() => this.$refs["dataTable"].refreshData())
        .catch(() => this.$refs["dataTable"].refreshData());
    }
  }
};
</script>
<style scoped>
</style>