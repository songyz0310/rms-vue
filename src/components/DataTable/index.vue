<template>
  <el-container class="page-container">
    <el-main ref="elMain" class="clear-padding">
      <hr />
      <el-table
        v-loading="loading"
        border
        stripe
        :height="height"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        :data="data"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <el-table-column v-if="selection" class-name="selection" type="selection" width="48"></el-table-column>
        <slot />
      </el-table>
      <hr />
    </el-main>
    <el-footer height="35px">
      <div class="block" style="text-align: right;">
        <el-pagination
          background
          :page-sizes="param.pageSizes"
          :page-size="param.pageSize"
          :current-page="param.pageNo"
          :total="data.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  props: {
    requestData: {
      type: Function,
      default: () => []
    },
    rowKey: {
      type: String
    },
    selection: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      height: null,
      pageSizes: [10, 20, 30, 50],
      param: {
        sort: null,
        search: null,
        needTotal: true,
        pageNo: 1,
        pageSize: 10
      },
      data: null,
      total: 0,
      selectRows: []
    };
  },
  created: function() {
    this.queryList().then(() => (this.param.needTotal = false));
  },
  mounted() {
    this.height = this.$refs.elMain.$el.clientHeight - 36;
  },
  methods: {
    getSelectRows() {
      if (this.rowKey) {
        return this.selectRows.map(row => row[this.rowKey]);
      } else {
        return this.selectRows;
      }
    },
    refreshData() {
      return this.queryList();
    },
    queryList() {
      this.loading = true;
      this.data = [];
      return this.requestData(this.param)
        .then(result => {
          this.loading = false;

          this.data = result.data;
          if (param.needTotal) {
            this.total = result.total;
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
      console.info("============修改选中行数============");
      console.info(val);
      this.selectRows = val;
    },
    handleSortChange({ column, prop, order }) {
      console.info("============修改排序规则============");
      console.info(column);
      console.info(prop);
      console.info(order);
      if (order == "ascending") {
        this.param.sort = "+" + prop;
      } else if (order == "descending") {
        this.param.sort = "-" + prop;
      } else {
        this.param.sort = null;
      }
      this.queryList();
    },
    handleSizeChange(val) {
      console.info("============修改每页条数============");
      this.param.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.queryList();
    },
    handleCurrentChange(val) {
      console.info("============修改当前页数============");
      this.param.pageNo = val;
      console.log(`当前页: ${val}`);
      this.queryList();
    }
  }
};
</script>
<style scoped>
</style>