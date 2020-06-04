<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-row>
        <el-button size="small" type="warning" @click="showDeleteConfirm">删除</el-button>
        <el-button size="small" type="danger" @click="showRealDeleteConfirm">彻底删除</el-button>
        <el-button size="small" type="success" @click="forwardMessage">转发</el-button>
      </el-row>
    </el-header>
    <el-main class="page-main">
      <data-table
        id="out-box-table"
        ref="dataTable"
        checkbox
        :requestData="queryMessageList"
        rowKey="messageId"
      >
        <el-table-column
          prop="messageTitle"
          label="邮件标题"
          sortable
          :sort-orders="['ascending', 'descending']"
          width="300"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-link type="primary" @click="readMessage(scope.row)">
              <b v-if="scope.row.isRead == 0">{{ scope.row.messageTitle }}</b>
              <span v-else>{{ scope.row.messageTitle }}</span>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="sendTime"
          label="发送时间"
          sortable
          :sort-orders="['ascending', 'descending']"
          width="200"
        >
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
import messageApi from "../../api/message/sender";
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
      return messageApi.formalList(param);
    },
    showDeleteConfirm() {
      if (this.$refs["dataTable"].getSelectRowKeys().length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择信息",
          type: "warning"
        });
        return;
      }

      this.$confirm("此操作将该信息移动到已删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => this.deleteMessage());
    },
    showRealDeleteConfirm() {
      if (this.$refs["dataTable"].getSelectRowKeys().length == 0) {
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
    deleteMessage() {
      let ids = this.$refs["dataTable"].getSelectRowKeys();
      messageApi
        .deleteMessage({ ids })
        .then(result => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .then(() => this.$refs["dataTable"].refreshData());
    },
    realDeleteMessage() {
      let ids = this.$refs["dataTable"].getSelectRowKeys();
      messageApi
        .realDeleteMessage({ ids })
        .then(result => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .then(() => this.$refs["dataTable"].refreshData());
    },
    readMessage(message) {
      this.$refs.readMessage.show(message);
    },
    forwardMessage() {
      let ids = this.$refs["dataTable"].getSelectRowKeys();
      if (ids.length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择信息",
          type: "warning"
        });
        return;
      } else if (ids.length > 1) {
        this.$notify({
          title: "警告",
          message: "目前只能选择一条信息进行转发",
          type: "warning"
        });
        return;
      }

      let message = this.$refs["dataTable"].getSelectRows()[0];
      this.$router.push({
        name: "writeMessagePage",
        params: {
          data: {
            messageTitle: "转发：" + message.messageTitle,
            richContent:
              "<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>---------------------- 原始邮件 ----------------------</p>" +
              message.richContent
          },
          formPath: this.$route.path
        }
      });
    }
  }
};
</script>
<style scoped>
</style>