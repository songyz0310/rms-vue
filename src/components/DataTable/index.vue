<template>
  <div>
    <el-table
      v-loading="loading"
      border
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      :data="tableData.data"
      @selection-change="handleSelectionChange"
    >
      <slot />
    </el-table>
    <hr />
    <div class="block" style="text-align: right;">
      <el-pagination
        background
        :page-sizes="tableData.pageSizes"
        :page-size="tableData.pageSize"
        :current-page="tableData.pageNo"
        :total="tableData.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    requestData: {
      type: Function,
      default: () => []
    },
    rowKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
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
    console.info("表格组件初始化");

    this.queryList().then(() => (this.tableData.needTotal = false));
  },
  methods: {
    getSelectRows() {
      return this.multipleSelection.map(row => row[this.rowKey]);
    },
    queryList() {
      let param = {};
      param.pageNo = this.tableData.pageNo;
      param.pageSize = this.tableData.pageSize;
      param.needTotal = this.tableData.needTotal;
      this.loading = true;
      this.tableData.data = [];
      return this.requestData(param)
        .then(result => {
          this.loading = false;

          this.tableData.data = result.data;
          if (param.needTotal) {
            this.tableData.total = result.total;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.info(val);
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.tableData.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.queryList();
    },
    handleCurrentChange(val) {
      this.tableData.pageNo = val;
      console.log(`当前页: ${val}`);
      this.queryList();
    }
  }
};
</script>