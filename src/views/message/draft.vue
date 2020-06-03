<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-row>
        <el-button size="small" type="warning" @click="showDeleteConfirm">删除</el-button>
        <el-button size="small" type="danger" @click="showRealDeleteConfirm">彻底删除</el-button>
        <el-button size="small" type="success">发送</el-button>
      </el-row>
    </el-header>
    <el-main class="page-main">
      <data-table ref="dataTable" :requestData="queryMessageList" rowKey="mrId">
        <el-table-column prop="messageId" type="selection" width="55"></el-table-column>
        <el-table-column prop="messageTitle" label="邮件标题" width="300"></el-table-column>
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
  </el-container>
</template>
<script>
import messageApi from "../../api/message";
import DataTable from "../../components/DataTable";
export default {
  components: { DataTable },
  data() {
    return {};
  },
  created: function() {},
  methods: {
    queryMessageList(param) {
      return messageApi.draftList(param);
    },
    showDeleteConfirm() {
      if (this.$refs["dataTable"].getSelectRows().length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择信息",
          type: "warning"
        });
        return;
      }

      this.$confirm("此操作将该文件移动到已删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => this.deleteMessage());
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

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => this.realDeleteMessage());
    },
    deleteMessage() {
      let ids = this.$refs["dataTable"].getSelectRows();
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
      let ids = this.$refs["dataTable"].getSelectRows();
      messageApi
        .realDeleteMessage({ ids })
        .then(result => this.$refs["dataTable"].refreshData());
    }
  }
};
</script>
<style scoped>
</style>