<template>
  <el-container class="page-container">
    <el-header class="clear-padding page-header" >
      <el-row>
        <el-button size="small" type="warning">删除</el-button>
        <el-button size="small" type="danger">彻底删除</el-button>
        <el-button size="small" type="success">转发</el-button>
      </el-row>
    </el-header>
    <el-main class="clear-padding">
      <data-table :requestData="queryMessageList">
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
    return {
      message: {
        messageId: 10,
        messageTitle: "",
        richContent: "",
        simpleContent: "",
        status: 0,
        createTime: 0,
        sendTime: 0,
        sendUser: 0,
        recipientUser: 0,
        refMessage: 0
      },
      tableData: {
        data: null,
        total: 0,
        pageNo: 1,
        pageSize: 10,
        needTotal: true,
        pageSizes: [10, 20, 30, 50]
      },
      multipleSelection: []
    };
  },
  created: function() {
    this.queryMessageList().then(() => (this.tableData.needTotal = false));
  },
  methods: {
    queryMessageList(param) {
      return messageApi.sendedList(param);
    },
    toPage(path) {
      this.$router.push({ path });
    }
  }
};
</script>
<style scoped>
</style>