<template>
  <el-select
    ref="elSelect"
    v-loading="loading"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    :filterable="filterable"
    :remote="remote"
    :placeholder="placeholder"
    :style="{display}"
    :remote-method="queryList"
    v-model="value"
    v-loadmore="queryMoreList"
    @visible-change="toggleVisible"
  >
    <slot :list="list"></slot>
  </el-select>
</template>
<script>
export default {
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
        needTotal: true,
        includes: null, // 当分页回显时，可能会出现不在本页的选中数据，这时将选中的参数放入此参数请求接口，接口会额外包含需要回显的参数，
        excludes: null //由于开启了额外包含机制，可能会在后续的翻页中，查询到重复记录，所以，在后续的查询中，排除第一步选中的参数
      },
      list: null,
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
    console.info("远程列表组件 created", this.value);
  },
  mounted: function() {
    console.info("远程列表组件 mounted", this.value);
  },
  updated: function() {
    console.info("远程列表组件 updated", this.value);
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
      } else if (flag == true && this.list == null) {
        this.queryList();
      }
    },
    doBlur() {
      this.$refs.elSelect.blur();
    }
  },
  watch: {
    value: function(val) {
      console.info("===========value=================");
      console.info(val);
      this.$emit("input", val);
    },
    "$attrs.value": function(val) {
      if (this.value == val) {
        return;
      }

      //当组件引用时设置了默认值，不知道为什么，value总是监控不到变化，经查不靠谱资料，可以监控$attrs.value，发现居然好用！！！
      //结合includes和excludes，实现，默认值肯定在第一页可以正常选中显示
      console.info("==============$attrs.value==============");
      console.info(val);
      this.value = val;

      this.pageParam.includes = val;
      this.queryList().then(() => {
        //将包含的元素，移到排除项中，
        this.pageParam.includes = null;
        this.pageParam.excludes = val;
      });
    }
  }
};
</script>
<style scoped>
</style>