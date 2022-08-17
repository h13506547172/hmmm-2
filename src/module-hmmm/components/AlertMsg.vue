<template>
  <el-alert type="info" show-icon :closable="false"
    >数据一共 {{ total }} 条</el-alert
  >
</template>

<script>
export default {
  props: {
    total: {
      type: Number || String,
      required: true,
    },
  },
  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style lang="less" scoped>
/deep/ .el-alert__icon {
  font-size: 16px !important;
}
/deep/ .el-alert__description {
  margin: 0 !important;
}
</style>
