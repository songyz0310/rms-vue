<template>
  <div>
    <el-row style="margin-bottom:15px">
      <el-button size="small" type="warning">删除</el-button>
      <el-button size="small" type="danger">彻底删除</el-button>
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
    <hr />

    <data-table :requestData="queryMessageList">
      <el-table-column prop="sendUser.userName" label="发送人2" width="100"></el-table-column>
      <el-table-column label="发送时间2" width="200">
        <template slot-scope="scope">{{ scope.row.sendTime }}</template>
      </el-table-column>
      <!-- <el-table-column prop="messageTitle" label="邮件标题2" width="300"></el-table-column> -->
      <el-table-column prop="simpleContent" label="邮件内容2" show-overflow-tooltip></el-table-column>
    </data-table>
  </div>
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
      return messageApi.sendList(param);
    },
    toPage(path) {
      this.$router.push({ path });
    }
  }
};
</script>
<style scoped>
</style>