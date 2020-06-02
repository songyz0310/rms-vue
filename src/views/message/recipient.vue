<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-row>
        <el-button size="small" type="warning" @click="showDeleteConfirm">删除</el-button>
        <el-button size="small" type="danger" @click="showRealDeleteConfirm">彻底删除</el-button>
        <el-button size="small" type="success">转发</el-button>
        <el-button size="small" type="primary">回复</el-button>
        <el-dropdown>
          <el-button size="small">
            标记
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>已读</el-dropdown-item>
            <el-dropdown-item>未读</el-dropdown-item>
            <el-dropdown-item>垃圾</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-header>
    <el-main class="page-main">
      <data-table ref="dataTable" :requestData="queryMessageList" rowKey="mrId">
        <el-table-column prop="messageId" type="selection" width="55"></el-table-column>
        <el-table-column prop="sendUser.userName" label="发送人" width="100"></el-table-column>
        <el-table-column label="发送时间" width="200">
          <template slot-scope="scope">{{ scope.row.sendTime }}</template>
        </el-table-column>
        <el-table-column prop="messageTitle" label="邮件标题" width="300"></el-table-column>
        <el-table-column prop="simpleContent" label="邮件内容" show-overflow-tooltip></el-table-column>
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
      return messageApi.recipientList(param);
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
        .deleteRecipientMessage({ ids })
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
        .realDeleteRecipientMessage({ ids })
        .then(result => this.$refs["dataTable"].refreshData());
    }
  }
};
</script>
<style scoped>
</style>