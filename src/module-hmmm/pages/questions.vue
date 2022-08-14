<template>
  <el-card class="box-card">
    <el-row type="flex" style="margin-bottom: 15px">
      <el-col>
        <el-alert title="说明：目前支持学科和关键字条件筛选" type="success">
        </el-alert
      ></el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <el-button type="success" icon="el-icon-edit">新增试题</el-button>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.el-alert {
  padding: 0;
}
.el-alert--success.is-light {
  background-color: #fff;
  color: pink;
  font-size: 12px;
}
/deep/.el-alert__title {
  font-size: 12px;
}
.el-button--success {
  width: 97px;
  height: 32px;
  font-size: 12px;
}
</style>
