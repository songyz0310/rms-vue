<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-row>
        <el-button size="small" type="warning" @click="deleteMessage">删除</el-button>
        <el-button size="small" type="danger">彻底删除</el-button>
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
      <data-table ref="dataTable" :requestData="queryMessageList" rowKey="messageId">
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
    deleteMessage() {
      console.info("进入删除方法");
      console.info(this.$refs["dataTable"].getSelectRows());
    }
  }
};
</script>
<style scoped>
</style>