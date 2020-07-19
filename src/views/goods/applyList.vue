<template>
  <el-container class="page-container">
    <!-- <el-header class="page-header">
      <el-row>
        <el-button size="small" type="warning" @click="showDeleteConfirm">删除</el-button>
        <el-button size="small" type="danger" @click="showRealDeleteConfirm">彻底删除</el-button>
        <el-button size="small" type="success" @click="forwardMessage">转发</el-button>
        <el-button size="small" type="primary" @click="replyMessage">回复</el-button>
        <el-dropdown @command="handleMarkCommand">
          <el-button size="small">
            标记
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">已读</el-dropdown-item>
            <el-dropdown-item command="0">未读</el-dropdown-item>
            <el-dropdown-item command="3">垃圾</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-header> -->
    <el-main class="page-main">
      <data-table
        id="inbox-table"
        ref="dataTable"
        checkbox
        :requestData="queryMessageList"
        rowKey="mrId"
      >
        <el-table-column prop="isRead" label="状态" width="50">
          <template slot-scope="scope">
            <div class="read-status">
              <i v-if="scope.row.isRead == 0" class="el-icon-folder un-read"></i>
              <i v-else class="el-icon-folder-opened"></i>
            </div>
          </template>
        </el-table-column>
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
        <el-table-column prop="simpleContent" label="邮件内容" show-overflow-tooltip></el-table-column>
      </data-table>
    </el-main>
   <!--  <read-message ref="readMessage"></read-message> -->
  </el-container>
</template>
<script>
import messageApi from "../../api/message/receiver";
import DataTable from "../../components/DataTable";
// import ReadMessage from "./components/read";
export default {
  components: { DataTable/* , ReadMessage */ },
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
    handleMarkCommand(cmd) {
      if (this.$refs["dataTable"].getSelectRowKeys().length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择信息",
          type: "warning"
        });
        return;
      }

      let ids = this.$refs["dataTable"].getSelectRowKeys();
      messageApi
        .markMessage({ ids, type: cmd })
        .then(result => {
          this.$message({
            type: "success",
            message: "标记成功!"
          });
        })
        .then(() => this.$refs["dataTable"].refreshData());
    },
    readMessage(message) {
      this.$refs.readMessage.show(message);
      if (message.isRead == 0) {
        message.isRead = 1;
        messageApi.markMessage({ ids: [message.mrId], type: 1 });
      }
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
    },
    replyMessage() {
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
          message: "目前只能选择一条信息进行回复",
          type: "warning"
        });
        return;
      }

      let message = this.$refs["dataTable"].getSelectRows()[0];
      this.$router.push({
        name: "writeMessagePage",
        params: {
          data: {
            messageTitle: "回复：" + message.messageTitle,
            recipients: [message.sender],
            refMessage: message
          },
          formPath: this.$route.path
        }
      });
    }
  }
};
</script>
<style scoped>
.read-status {
  text-align: center;
}
.read-status i {
  font-size: 18px;
}
.un-read {
  color: black;
  font-weight: 800;
}
.read {
  color: lightgray;
}
</style>