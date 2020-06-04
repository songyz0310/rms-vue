<template>
  <el-container class="page-container">
    <el-main ref="elMain" class="clear-padding">
      <hr />
      <el-table
        ref="elTable"
        border
        stripe
        :id="tableId"
        :height="height"
        :data="data"
        v-loading="loading"
        style="width: 100%"
        tooltip-effect="dark"
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="checkbox"
          class-name="table-column-checkbox"
          type="selection"
          width="48"
        ></el-table-column>
        <slot />
      </el-table>
      <hr />
    </el-main>
    <el-footer height="35px">
      <div class="block" style="text-align: right;">
        <el-pagination
          background
          :page-sizes="pageSizes"
          :page-size="param.pageSize"
          :current-page="param.pageNo"
          :total="total"
          :layout="toolbar"
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
    id: {
      type: String,
      default: () => "rms-table-" + (Math.random() * 100000000).toFixed(0)
    },
    requestData: {
      type: Function,
      default: () => []
    },
    rowKey: {
      type: String
    },
    checkbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableId: this.id,
      toolbar: "total, sizes, prev, pager, next, jumper",
      loading: false, //是否正在加载中
      height: null, //表格高度
      pageSizes: [10, 30, 50, 100], //可以切换的页面条数
      param: {
        //查询参数
        sort: null, //表格排序字段
        search: null, //表格搜索条件
        needTotal: true, //表格查询是否需要总数
        pageNo: 1, //表格当前页数
        pageSize: 10 //表格当前页面分页条数
      },
      data: [], //表格数据
      total: 0, //表格数据总数
      selectRows: [] //表格选中的行数
    };
  },
  created: function() {
    let cache = localStorage.getItem(`cache-${this.tableId}`);
    if (cache) {
      let cacheObj = JSON.parse(cache);
      this.param.pageSize = cacheObj.pageSize;
    }

    this.queryList().then(() => (this.param.needTotal = false));
  },
  mounted() {
    this.height = this.$refs.elMain.$el.clientHeight - 36;
  },
  methods: {
    getSelectRowKeys() {
      if (this.rowKey) {
        return this.selectRows.map(row => row[this.rowKey]);
      } else {
        return this.selectRows;
      }
    },
    getSelectRows() {
      return this.selectRows;
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
          if (this.param.needTotal) {
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
          this.$refs.elTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.elTable.clearSelection();
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

      let cacheObj;
      let cache = localStorage.getItem(`cache-${this.tableId}`);
      if (cache) {
        cacheObj = JSON.parse(cache);
      } else {
        cacheObj = {};
      }
      cacheObj.pageSize = val;
      localStorage.setItem(`cache-${this.tableId}`, JSON.stringify(cacheObj));

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