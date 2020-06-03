<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-row>
        <el-button size="small" type="danger" @click="showRealDeleteConfirm">彻底删除</el-button>
        <el-button size="small" type="success" @click="doMarkMessage">这不是垃圾</el-button>
      </el-row>
    </el-header>
    <el-main class="page-main">
      <data-table ref="dataTable" selection :requestData="queryMessageList" rowKey="mrId">
        <el-table-column prop="messageTitle" label="邮件标题" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link type="primary" @click="readMessage(scope.row)">
              <b v-if="scope.row.isRead == 0">{{ scope.row.messageTitle }}</b>
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
import messageApi from "../../api/message/receiver";
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
      return messageApi.rubbishList(param);
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
      let ids = this.$refs["dataTable"].getSelectRows();
      messageApi
        .realDeleteRecipientMessage({ ids })
        .then(result => this.$refs["dataTable"].refreshData());
    },
    doMarkMessage() {
      if (this.$refs["dataTable"].getSelectRows().length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择信息",
          type: "warning"
        });
        return;
      }

      let ids = this.$refs["dataTable"].getSelectRows();
      messageApi
        .markMessage({ ids, type: 2 })
        .then(result => this.$refs["dataTable"].refreshData());
    },
    readMessage(message) {
      this.$refs.readMessage.show(message);
      if (message.isRead == 0) {
        message.isRead = 1;
        messageApi.markMessage({ ids: [message.mrId], type: 1 });
      }
    }
  }
};
</script>
<style scoped>
</style>