<template>
  <el-card class="box-card">
    <el-row type="flex" style="margin-bottom: 20px">
      <el-col>
        <el-input
          v-model="username"
          placeholder="根据用户名搜索"
          style="width: 200px"
        ></el-input>
        <el-button style="margin-left: 15px" @click="username = ''"
          >清空</el-button
        >
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-col>
      <el-col
        ><el-row type="flex" justify="end">
          <el-button type="success" icon="el-icon-edit" @click="newUserName">
            新增用户</el-button
          >
        </el-row></el-col
      >
    </el-row>
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
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            circle
            icon="el-icon-edit"
            @click="reverse(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            plain
            circle
            icon="el-icon-delete"
            @click="deleteFn(scope.row)"
            v-if="scope.row.id !== 2"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagesize"
        layout=" prev, pager, next, sizes, jumper"
        :total="total"
        style="margin-top: 10px"
      >
      </el-pagination>
    </div> -->
    <pageTool
      :pageChange="pageChange"
      :pageSizeChange="pageSizeChange"
      :total="total"
      :paginationPagesize="pagesize"
    ></pageTool>
    <!-- 弹框 -->
    <userAdd
      :dialogVisible.sync="dialogShow"
      :list="list"
      :title="title"
      :rowList="rowList"
      ref="userAdd"
      @add-success="getList"
    ></userAdd>
  </el-card>
</template>

<script>
import { list, remove } from "@/api/base/users";
// 权限组简单列表
import { simple } from "@/api/base/permissions";
import pageTool from "../components/page-tool.vue";
import userAdd from "../components/user-dialog.vue";

export default {
  data() {
    return {
      username: "",
      currentPage: 1,
      tableData: [],
      total: 0,
      pagesize: 10,
      page: 1,
      //弹层显示按钮
      dialogShow: false,
      tableData: [],
      // 弹框的title
      title: "",
      // 请求的权限组数据list
      list: [],
      // 点击修改，获取当前行的数据，传递子组件id
      rowList: {},
    };
  },
  components: {
    pageTool,
    userAdd,
  },
  created() {
    this.getList();
  },

  methods: {
    styleFunc({ row, column, rowIndex, columnIndex }) {
      return "background:rgba(250,250,250)";
    },
    // 获取初始列表
    async getList() {
      const res = await list({
        page: 1,
        pagesize: 10,
        username: this.username,
      });
      console.log(res);
      // 初始化列表-父组件
      this.tableData = res.data.list;
      console.log(res);
      this.pagesize = res.data.pagesize * 1;
      this.total = res.data.counts;
    },
    //搜索数据
    async searchList() {
      try {
        const res = await list({
          page: 1,
          pagesize: 10,
          username: this.username,
        });
        this.tableData = res.data.list;
      } catch (e) {
        console.log(e);
      }
    },
    pageChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 点击新增，获取权限数据
    async newUserName() {
      this.dialogShow = true;
      // 点击新增时，获取弹框中的权限数据
      const res = await simple();
      console.log(res);
      this.list = res.data;
      this.title = "创建用户";
    },
    // 修改
    async reverse(val) {
      this.dialogShow = true;
      this.title = "编辑用户";
      console.log(val);
      this.rowList = val;
      this.$refs.userAdd.form = {
        email: val.email,
        introduction: val.introduction,
        permission_group_id: val.permission_group_title,
        phone: val.phone,
        role: val.role,
        username: val.username,
      };
    },
    // 删除用户
    async deleteFn(val) {
      // console.log(val.id);
      try {
        const res = await remove({ id: val.id });
        // console.log(res);
        this.getList();
      } catch (e) {}
    },
  },
};
</script>

<style scoped lang="less">
.box-card {
  // margin: 20px;
  background-color: #fff;
  border-radius: 2px;
}
/deep/ .el-table--medium .el-table__cell {
  padding: 20px 0;
}
</style>
