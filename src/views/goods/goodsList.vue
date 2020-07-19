<template>
  <el-container class="page-container">
    <el-main class="page-main">
      <data-table
        id="inbox-table"
        ref="dataTable"
        checkbox
        :requestData="queryGoodsList"
        rowKey="mrId"
      >
        <el-table-column prop="goodsTitle" label="商品标题" width="100"></el-table-column>
        <el-table-column prop="goodsPrice" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <div class="goods-status">
              <span v-if="scope.row.status == 0">已创建</span>
              <span v-else-if="scope.row.status == 1">已申请</span>
              <span v-else-if="scope.row.status == 2">已驳回</span>
              <span v-else-if="scope.row.status == 3">已发布</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="updateTime" label="创建时间" width="200"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="goods-status">
              <span v-if="scope.row.status == 0 || scope.row.status == 2">
                <el-button size="small" @click="createApply(scope.row.goodsId)">发布</el-button>
              </span>
            </div>
          </template>
        </el-table-column>
      </data-table>
    </el-main>
  </el-container>
</template>
<script>
import goodsApi from "../../api/goods/index";
import DataTable from "../../components/DataTable";
export default {
  components: { DataTable },
  data() {
    return {};
  },
  created: function() {},
  methods: {
    queryGoodsList(param) {
      return goodsApi.goodslist(param);
    },
    createApply(goodsId) {
      return goodsApi.createApply({ goodsId });
    }
  }
};
</script>
<style scoped>
</style>