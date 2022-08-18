<template>
  <div class="pages">
    <el-pagination
      background
      @size-change="onPageSizeChange"
      @current-change="onPageChange"
      :current-page="Number(paginationPage)"
      :total="Number(total)"
      :page-size="Number(paginationPagesize)"
      :page-sizes="[5, 10, 20, 30, 50]"
      layout=" prev, pager, next,sizes, jumper"
      style="margin-top: 15px"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "PageTool",
  props: ["total", "paginationPage", "paginationPagesize"],
  data() {
    return {};
  },
  methods: {
    // 进入某一页
    onPageChange: function (pageNum) {
      this.$emit("pageChange", pageNum);
    },
    // 每页显示信息条数
    onPageSizeChange: function (pageSize) {
      this.$emit("pageSizeChange", pageSize);
    },
  },
};
</script>
<style lang="less" scoped>
.blue {
  color: #409eff;
}
.pages {
  display: flex;
  justify-content: end;
  /deep/ .el-input__inner {
    width: 100px;
  }
}
/deep/.el-pagination__jump {
  margin-left: 0;
  .el-input__inner {
    width: 50px;
  }
}
</style>
