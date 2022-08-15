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

    <!-- 选框 -->
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 第一行 -->
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="学科">
              <el-select v-model="form.subject" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="二级目录">
              <el-select v-model="form.category" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="标签">
              <el-select v-model="form.tag" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple"></div>
          <el-form-item label="关键字">
            <el-input v-model="form.keywords"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <!-- 第二行  -->
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="试题类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="难度">
              <el-select v-model="form.difficulty" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="方向">
              <el-select v-model="form.toward" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="录入人">
              <el-select v-model="form.people" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
      </el-row>

      <!-- 第三行 -->
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="题目备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="企业简称">
              <el-input v-model="form.simpleName"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="城市">
              <el-select
                v-model="form.cityone"
                placeholder="请选择"
                class="cityone"
              >
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
              <el-select
                v-model="form.citytwo"
                placeholder="请选择"
                class="citytwo"
              >
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end">
            <el-button>清除</el-button>
            <el-button type="primary">搜索</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>

    <!--  数据一共4条  -->
    <!-- 第二部分 -->
    <el-alert
      type="info"
      show-icon
      style="margin-bottom: 20px"
      :closable="false"
    >
      <template #title> 共 {{ total }}条记录 </template>
    </el-alert>
    <!--第三部分  -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="styleFunc"
    >
      <el-table-column prop="id" label="序号" width="180"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="phone" label="联系电话"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="permission_group_title" label="权限组名称">
      </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button
            type="primary"
            plain
            circle
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="danger"
            plain
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        subject: "",
        category: "",
        tag: "",
        keywords: "",

        type: "",
        difficulty: "",
        toward: "",
        people: "",

        remark: "",
        simpleName: "",
        cityone: "",
        citytwo: "",
      },
    };
  },
};
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
/deep/.el-input__inner {
  width: 251px;
}
/deep/.cityone {
  width: 45%;
  margin-right: 10px;

  .el-input__inner {
    width: 100%;
  }
}
/deep/.citytwo {
  width: 45%;
  .el-input__inner {
    width: 100%;
  }
}
</style>
