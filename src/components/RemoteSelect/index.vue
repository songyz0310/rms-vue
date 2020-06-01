<template>
  <el-select
    :loading="loading"
    :disabeld="disabled"
    :clearable="clearable"
    :multiple="multiple"
    :filterable="filterable"
    :remote="remote"
    :placeholder="placeholder"
    :style="{display}"
    :remote-method="queryList"
    :value="value"
    v-model="value"
    v-loadmore="queryMoreList"
    @visible-change="toggleVisible"
  >
    <slot :list="list"></slot>
  </el-select>
</template>
<script>
export default {
  model: {
    prop: "value"
  },
  props: {
    requestData: {
      type: Function,
      default: () => []
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //是否可清空
    clearable: {
      type: Boolean,
      default: true
    },
    //是否可过滤
    filterable: {
      type: Boolean,
      default: true
    },
    //是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    //是否是inline
    display: {
      type: String,
      default: "block" //inline-block?block
    }
  },
  data() {
    return {
      value: null,
      loading: false,
      remote: true,
      pageParam: {
        pageNo: 1,
        pageSize: 10,
        needTotal: true
      },
      list: [],
      total: 0,
      isAll: false
    };
  },
  directives: {
    // 注册一个局部的自定义指令 v-loadmore
    loadmore: {
      // 指令的定义
      bind: function(el, binding) {
        // 获取element-ui定义好的scroll盒子
        el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        ).addEventListener("scroll", function() {
          if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
            binding.value();
          }
        });
      }
    }
  },
  created: function() {
    console.info("远程列表组件初始化");

    this.queryList();
  },
  methods: {
    //查询第一页数据
    queryList(search) {
      this.pageParam.pageNo = 1;
      this.pageParam.search = search;
      this.pageParam.needTotal = true;

      this.loading = true;
      return this.requestData(this.pageParam)
        .then(result => {
          this.loading = false;

          this.list = result.data;
          this.total = result.total;

          this.isAll = this.list.length == this.total;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    //查询更多数据
    queryMoreList() {
      if (this.isAll == false) {
        console.info("查询下一页数据");
        this.pageParam.pageNo += 1;
        this.pageParam.needTotal = false;

        this.loading = true;
        this.requestData(this.pageParam)
          .then(result => {
            this.loading = false;
            this.list = this.list.concat(result.data);

            if (this.pageParam.needTotal) {
              this.total = result.total;
            }

            this.isAll = this.list.length == this.total;
          })
          .catch(err => {
            this.loading = false;
          });
      }
    },
    //搜索框有内容时，收起下拉框时，刷新数据，以防止下次展开数据是上次搜索的结果
    toggleVisible(flag) {
      if (flag == false && this.pageParam.search != undefined) {
        this.queryList();
      }
    }
  },
  watch: {
    value: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style scoped>
</style>