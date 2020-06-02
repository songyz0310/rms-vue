<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-row>
        <el-button size="small" type="danger">彻底删除</el-button>
        <el-button size="small" type="success">还原</el-button>
      </el-row>
    </el-header>
    <el-main class="page-main">
      <data-table :requestData="queryMessageList">
        <el-table-column prop="messageId" type="selection" width="55"></el-table-column>
        <el-table-column prop="messageTitle" label="邮件标题" width="300"></el-table-column>
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
      return messageApi.deletedList(param);
    }
  }
};
</script>
<style scoped>
</style>