<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-row type="flex">
          <el-input v-model="input" placeholder="根据用户名搜索"></el-input>
          <el-button size="small" @click="clearBtn">清除</el-button>
          <el-button type="primary" size="small" @click="searchBtn"
            >搜索</el-button
          >
        </el-row>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <el-button
            type="success"
            icon="el-icon-edit"
            class="addMenus"
            size="small"
            @click="addPowerBtn"
            >新增权限组
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-alert
      class="title"
      :title="`共 ${counts} 条记录`"
      type="info"
      show-icon
      :closable="false"
    >
    </el-alert>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{
        background: 'rgb(250,250,250)',
        color: '#909399',
      }"
    >
      <el-table-column type="selection" width="300"> </el-table-column>
      <el-table-column prop="title" label="用户"> </el-table-column>
      <el-table-column label="日期" prop="create_date" sortable>
        <template v-slot="{ row }">
          {{ row.create_date | formatTimeFromMia }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain
            @click="editBtn(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            plain
            @click="delBtn(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[10, 20, 30, 50]"
        layout="prev, pager, next,sizes,jumper"
        :total="counts"
      >
      </el-pagination>
    </el-row>
    <addPermissions
      ref="addPermissions"
      :dialogVisible.sync="dialogVisible"
      @renderList="getlist"
    />
  </el-card>
</template>

<script>
import { list, remove } from "@/api/base/permissions";
import addPermissions from "../components/addPermissions.vue";

export default {
  components: {
    addPermissions,
  },
  data() {
    return {
      counts: 0, //提示有多少条记录
      input: "", //输入框
      //表格数据
      tableData: [],
      send: {
        title: "" || undefined, //输入框
        page: 1, //当前页码
        pagesize: 10, //展示几行数据
      },
      dialogVisible: false, //控制弹窗开关
      treeList: [],
    };
  },

  created() {
    this.$message.success("杨博制作，程序和我有一个能跑就行！");
    //获取列表
    this.getlist();
  },

  methods: {
    //点击跳页后
    handleCurrentChange(val) {
      this.send.page = val;
      this.getlist();
    },
    //点击选择页面行数
    handleSizeChange(val) {
      this.send.pagesize = val;
      this.getlist();
    },
    //获取表单数据
    async getlist() {
      const { data } = await list(this.send);
      this.counts = data.counts;
      this.tableData = data.list;
    },
    //点击【表格内】修改按钮
    editBtn(row) {
      //弹出弹出框
      this.dialogVisible = true;
      this.$refs.addPermissions.editWay(row);
    },
    //点击【表格内】删除按钮
    async delBtn(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await remove(row);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加权限按钮
    addPowerBtn() {
      //获取树形列表
      this.dialogVisible = true;
      this.$refs.addPermissions.bigTitle = "创建权限组";
      this.$nextTick(() => {
        this.$refs.addPermissions.resetTree();
      });
      this.$refs.addPermissions.getTreeList();
    },
    //清理按钮
    clearBtn() {
      if (this.input.trim() == "") return;
      this.input = "";
      this.searchBtn();
    },
    //搜索按钮
    searchBtn() {
      this.input = this.input.trim();
      this.send.title = this.input;
      this.getlist();
    },
  },
};
</script>

<style scoped lang="less">
.el-input--medium {
  width: 200px;
  margin-right: 10px;
}
.title {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
